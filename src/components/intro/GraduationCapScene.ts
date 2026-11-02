import * as THREE from 'three';

export interface CapAnimationState {
  capX: number;
  capY: number;
  capZ: number;
  rotX: number;
  rotY: number;
  rotZ: number;
  capScale: number;
  wireframeToSolid: number;
  camZ: number;
  camY: number;
  sceneOpacity: number;
}

export class GraduationCapScene {
  private container: HTMLElement;
  private scene: THREE.Scene;
  private camera: THREE.PerspectiveCamera;
  private renderer: THREE.WebGLRenderer;
  private capGroup: THREE.Group;
  private animationFrameId: number | null = null;
  private isDisposed = false;

  // Materials for wireframe-to-solid transition
  private wireframeMaterials: THREE.LineBasicMaterial[] = [];
  private solidMaterials: THREE.MeshStandardMaterial[] = [];

  // State
  public state: CapAnimationState = {
    capX: 0,
    capY: 0,
    capZ: 0,
    rotX: 0,
    rotY: 0,
    rotZ: 0,
    capScale: 0.25,
    wireframeToSolid: 0,
    camZ: 5.5,
    camY: 0,
    sceneOpacity: 0, // Starts completely invisible for Scene 1!
  };

  constructor(container: HTMLElement) {
    this.container = container;

    // 1. Scene setup
    this.scene = new THREE.Scene();

    // 2. Camera setup
    const width = container.clientWidth || window.innerWidth;
    const height = container.clientHeight || window.innerHeight;
    this.camera = new THREE.PerspectiveCamera(38, width / height, 0.1, 100);
    this.camera.position.set(0, 0, 5.5);

    // 3. Renderer setup
    this.renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance',
    });
    this.renderer.setSize(width, height);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
    this.renderer.toneMappingExposure = 1.2;
    this.container.appendChild(this.renderer.domElement);

    // 4. Lights
    this.setupLights();

    // 5. Build Graduation Cap Geometry
    this.capGroup = new THREE.Group();
    this.buildGraduationCap();
    this.scene.add(this.capGroup);

    // 6. Bind resize & start loop
    window.addEventListener('resize', this.onResize);
    this.animate();
  }

  private setupLights() {
    // Soft ambient fill
    const ambientLight = new THREE.AmbientLight(0x0e131f, 1.5);
    this.scene.add(ambientLight);

    // Primary key directional light
    const keyLight = new THREE.DirectionalLight(0xffffff, 2.6);
    keyLight.position.set(4, 6, 5);
    this.scene.add(keyLight);

    // Emerald rim light (portfolio signature accent)
    const rimLight = new THREE.DirectionalLight(0x10b981, 2.4);
    rimLight.position.set(-5, 3, -3);
    this.scene.add(rimLight);

    // Bottom soft cyan fill catching the circular underside rim
    const bottomFill = new THREE.PointLight(0x38bdf8, 2.0, 14);
    bottomFill.position.set(0, -2, 4);
    this.scene.add(bottomFill);
  }

  private buildGraduationCap() {
    // Shared solid materials
    const blackFabricMaterial = new THREE.MeshStandardMaterial({
      color: 0x090b11,
      roughness: 0.55,
      metalness: 0.2,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0,
    });
    this.solidMaterials.push(blackFabricMaterial);

    const emeraldSatinMaterial = new THREE.MeshStandardMaterial({
      color: 0x10b981,
      roughness: 0.35,
      metalness: 0.45,
      transparent: true,
      opacity: 0,
    });
    this.solidMaterials.push(emeraldSatinMaterial);

    const goldAccentMaterial = new THREE.MeshStandardMaterial({
      color: 0x34d399,
      roughness: 0.25,
      metalness: 0.8,
      transparent: true,
      opacity: 0,
    });
    this.solidMaterials.push(goldAccentMaterial);

    // Shared wireframe line material (for Scene 2/3 wireframe phase)
    const lineMat = new THREE.LineBasicMaterial({
      color: 0xffffff,
      transparent: true,
      opacity: 0,
    });
    this.wireframeMaterials.push(lineMat);

    // Center offset to keep the geometric center of rotation balanced
    const yCenter = 0.4;

    // ----------------------------------------------------
    // A. Square Mortarboard Top (Plinth)
    // ----------------------------------------------------
    const boardWidth = 3.0;
    const boardHeight = 0.08;
    const boardDepth = 3.0;
    const boardGeo = new THREE.BoxGeometry(boardWidth, boardHeight, boardDepth);
    const boardMesh = new THREE.Mesh(boardGeo, blackFabricMaterial);
    boardMesh.position.y = yCenter;
    // Diamond alignment
    boardMesh.rotation.y = Math.PI / 4;
    this.capGroup.add(boardMesh);

    // Board wireframe outline
    const boardEdgesGeo = new THREE.EdgesGeometry(boardGeo);
    const boardEdges = new THREE.LineSegments(boardEdgesGeo, lineMat);
    boardEdges.position.y = yCenter;
    boardEdges.rotation.y = Math.PI / 4;
    this.capGroup.add(boardEdges);

    // ----------------------------------------------------
    // B. Center Button (on top of mortarboard)
    // ----------------------------------------------------
    const buttonGeo = new THREE.CylinderGeometry(0.15, 0.15, 0.06, 24);
    const buttonMesh = new THREE.Mesh(buttonGeo, goldAccentMaterial);
    buttonMesh.position.y = yCenter + boardHeight / 2 + 0.03;
    this.capGroup.add(buttonMesh);

    // ----------------------------------------------------
    // C. Skull Cap / Head Fitting (Mounted Underneath)
    // CRITICAL: Circular Underside Opening
    // ----------------------------------------------------
    const skullCapHeight = 0.85;
    const skullCapTopRadius = 1.0;
    const skullCapBottomRadius = 1.35;
    const skullY = yCenter - skullCapHeight / 2;

    // Outer tapered skull cylinder (open-ended so interior is hollow!)
    const skullOuterGeo = new THREE.CylinderGeometry(
      skullCapTopRadius,
      skullCapBottomRadius,
      skullCapHeight,
      48,
      1,
      true
    );
    const skullOuterMesh = new THREE.Mesh(skullOuterGeo, blackFabricMaterial);
    skullOuterMesh.position.y = skullY;
    this.capGroup.add(skullOuterMesh);

    // Inner lining cylinder (creates authentic wall depth)
    const skullInnerGeo = new THREE.CylinderGeometry(
      skullCapTopRadius - 0.04,
      skullCapBottomRadius - 0.04,
      skullCapHeight,
      48,
      1,
      true
    );
    const skullInnerMesh = new THREE.Mesh(skullInnerGeo, blackFabricMaterial);
    skullInnerMesh.position.y = skullY;
    this.capGroup.add(skullInnerMesh);

    // Circular Underside Rim (Connecting inner and outer edges at bottom opening)
    const rimGeo = new THREE.RingGeometry(
      skullCapBottomRadius - 0.04,
      skullCapBottomRadius,
      48
    );
    const rimMesh = new THREE.Mesh(rimGeo, goldAccentMaterial);
    rimMesh.rotation.x = Math.PI / 2;
    rimMesh.position.y = yCenter - skullCapHeight;
    this.capGroup.add(rimMesh);

    // Skull cap wireframe edges
    const skullEdgesGeo = new THREE.EdgesGeometry(skullOuterGeo);
    const skullEdges = new THREE.LineSegments(skullEdgesGeo, lineMat);
    skullEdges.position.y = skullY;
    this.capGroup.add(skullEdges);

    // Circular rim wireframe circle
    const rimCircleGeo = new THREE.BufferGeometry();
    const rimPoints: THREE.Vector3[] = [];
    const segments = 48;
    for (let i = 0; i <= segments; i++) {
      const theta = (i / segments) * Math.PI * 2;
      rimPoints.push(
        new THREE.Vector3(
          Math.cos(theta) * skullCapBottomRadius,
          yCenter - skullCapHeight,
          Math.sin(theta) * skullCapBottomRadius
        )
      );
    }
    rimCircleGeo.setFromPoints(rimPoints);
    const rimCircle = new THREE.Line(rimCircleGeo, lineMat);
    this.capGroup.add(rimCircle);

    // ----------------------------------------------------
    // D. Braided Tassel
    // ----------------------------------------------------
    const tasselCurve = new THREE.CatmullRomCurve3([
      new THREE.Vector3(0, yCenter + boardHeight / 2 + 0.03, 0),
      new THREE.Vector3(0.65, yCenter + boardHeight / 2 + 0.02, 0.65),
      new THREE.Vector3(1.35, yCenter + boardHeight / 2 + 0.01, 1.35),
      new THREE.Vector3(1.65, yCenter - 0.2, 1.65),
      new THREE.Vector3(1.75, yCenter - 0.8, 1.75),
    ]);
    const tasselCordGeo = new THREE.TubeGeometry(tasselCurve, 32, 0.024, 8, false);
    const tasselCord = new THREE.Mesh(tasselCordGeo, emeraldSatinMaterial);
    this.capGroup.add(tasselCord);

    // Tassel ornament clasp
    const claspGeo = new THREE.CylinderGeometry(0.05, 0.05, 0.07, 16);
    const claspMesh = new THREE.Mesh(claspGeo, goldAccentMaterial);
    claspMesh.position.set(1.75, yCenter - 0.82, 1.75);
    this.capGroup.add(claspMesh);

    // Tassel fringe skirt
    const fringeGeo = new THREE.CylinderGeometry(0.045, 0.13, 0.5, 24);
    const fringeMesh = new THREE.Mesh(fringeGeo, emeraldSatinMaterial);
    fringeMesh.position.set(1.75, yCenter - 1.1, 1.75);
    this.capGroup.add(fringeMesh);
  }

  private onResize = () => {
    if (this.isDisposed || !this.container) return;
    const width = this.container.clientWidth || window.innerWidth;
    const height = this.container.clientHeight || window.innerHeight;
    this.camera.aspect = width / height;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(width, height);
  };

  private animate = () => {
    if (this.isDisposed) return;

    if (this.state.sceneOpacity <= 0.001) {
      // Invisible in Scene 1
      this.renderer.clear();
      this.animationFrameId = requestAnimationFrame(this.animate);
      return;
    }

    // Apply cap transform from state
    this.capGroup.position.set(this.state.capX, this.state.capY, this.state.capZ);
    this.capGroup.rotation.set(this.state.rotX, this.state.rotY, this.state.rotZ);
    this.capGroup.scale.setScalar(this.state.capScale);

    // Apply camera transform from state
    this.camera.position.z = this.state.camZ;
    this.camera.position.y = this.state.camY;
    this.camera.lookAt(this.state.capX, this.state.capY, this.state.capZ);

    // Morph wireframe to solid
    const morph = this.state.wireframeToSolid; // 0 (wireframe) to 1 (solid)
    this.wireframeMaterials.forEach((mat) => {
      mat.opacity = (1 - morph) * this.state.sceneOpacity;
    });
    this.solidMaterials.forEach((mat) => {
      mat.opacity = morph * this.state.sceneOpacity;
    });

    this.renderer.render(this.scene, this.camera);
    this.animationFrameId = requestAnimationFrame(this.animate);
  };

  public dispose() {
    this.isDisposed = true;
    window.removeEventListener('resize', this.onResize);

    if (this.animationFrameId !== null) {
      cancelAnimationFrame(this.animationFrameId);
    }

    this.scene.traverse((obj) => {
      if (obj instanceof THREE.Mesh || obj instanceof THREE.Line || obj instanceof THREE.LineSegments) {
        if (obj.geometry) {
          obj.geometry.dispose();
        }
        if (Array.isArray(obj.material)) {
          obj.material.forEach((m) => m.dispose());
        } else if (obj.material) {
          obj.material.dispose();
        }
      }
    });

    if (this.renderer.domElement && this.renderer.domElement.parentNode) {
      this.renderer.domElement.parentNode.removeChild(this.renderer.domElement);
    }
    this.renderer.dispose();
  }
}
