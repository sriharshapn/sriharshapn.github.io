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

  // Materials for smooth line-art-to-solid transition
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
    capScale: 0.35,
    wireframeToSolid: 0,
    camZ: 4.5,
    camY: 0,
    sceneOpacity: 0, // Starts completely cleared for Scene 1
  };

  constructor(container: HTMLElement) {
    this.container = container;

    // 1. Scene setup
    this.scene = new THREE.Scene();

    // 2. Camera setup
    const width = container.clientWidth || window.innerWidth;
    const height = container.clientHeight || window.innerHeight;
    this.camera = new THREE.PerspectiveCamera(36, width / height, 0.1, 100);
    this.camera.position.set(0, 0, 4.5);

    // 3. WebGL Renderer
    this.renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance',
    });
    this.renderer.setSize(width, height);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
    this.renderer.toneMappingExposure = 1.1;
    this.container.appendChild(this.renderer.domElement);

    // 4. Setup Lighting
    this.setupLights();

    // 5. Build Proportional Realistic Graduation Cap
    this.capGroup = new THREE.Group();
    this.buildGraduationCap();
    this.scene.add(this.capGroup);

    // 6. Bind resize & start loop
    window.addEventListener('resize', this.onResize);
    this.animate();
  }

  private setupLights() {
    // Soft ambient fill
    const ambientLight = new THREE.AmbientLight(0x181a24, 1.4);
    this.scene.add(ambientLight);

    // Primary key directional light
    const keyLight = new THREE.DirectionalLight(0xffffff, 2.2);
    keyLight.position.set(3, 5, 4);
    this.scene.add(keyLight);

    // Subtle cool rim light for elegant edge definition
    const rimLight = new THREE.DirectionalLight(0xe2e8f0, 1.2);
    rimLight.position.set(-4, 3, -3);
    this.scene.add(rimLight);

    // Bottom soft fill catching the circular underside aperture
    const bottomFill = new THREE.PointLight(0xf1f5f9, 1.6, 12);
    bottomFill.position.set(0, -2, 3.5);
    this.scene.add(bottomFill);
  }

  private buildGraduationCap() {
    // ----------------------------------------------------
    // Authentic Restrained Materials
    // ----------------------------------------------------
    // Realistic matte woven black fabric (no shiny plastics or bright outlines)
    const blackFabricMaterial = new THREE.MeshStandardMaterial({
      color: 0x14161e,
      roughness: 0.82,
      metalness: 0.05,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0,
    });
    this.solidMaterials.push(blackFabricMaterial);

    // Dark charcoal silk for tassel cord and brush
    const tasselSilkMaterial = new THREE.MeshStandardMaterial({
      color: 0x181d22,
      roughness: 0.72,
      metalness: 0.1,
      transparent: true,
      opacity: 0,
    });
    this.solidMaterials.push(tasselSilkMaterial);

    // Subtle brushed brass/gold accent for center button clasp
    const brassAccentMaterial = new THREE.MeshStandardMaterial({
      color: 0xc4a052,
      roughness: 0.4,
      metalness: 0.65,
      transparent: true,
      opacity: 0,
    });
    this.solidMaterials.push(brassAccentMaterial);

    // Clean white line-art wireframe (strictly for Scene 2/3 morphing, no green)
    const lineMat = new THREE.LineBasicMaterial({
      color: 0xffffff,
      transparent: true,
      opacity: 0,
    });
    this.wireframeMaterials.push(lineMat);

    // Geometric center of rotation
    const yCenter = 0.25;

    // ----------------------------------------------------
    // 1. Square Mortarboard Top (Plinth) - Proportional & Flat
    // ----------------------------------------------------
    const boardWidth = 2.2;
    const boardHeight = 0.045;
    const boardDepth = 2.2;
    const boardGeo = new THREE.BoxGeometry(boardWidth, boardHeight, boardDepth);
    const boardMesh = new THREE.Mesh(boardGeo, blackFabricMaterial);
    boardMesh.position.y = yCenter;
    boardMesh.rotation.y = Math.PI / 4; // Classic diamond alignment
    this.capGroup.add(boardMesh);

    // Board line-art outline
    const boardEdgesGeo = new THREE.EdgesGeometry(boardGeo);
    const boardEdges = new THREE.LineSegments(boardEdgesGeo, lineMat);
    boardEdges.position.y = yCenter;
    boardEdges.rotation.y = Math.PI / 4;
    this.capGroup.add(boardEdges);

    // ----------------------------------------------------
    // 2. Center Pivot Button (Low profile on top of plinth)
    // ----------------------------------------------------
    const buttonGeo = new THREE.CylinderGeometry(0.08, 0.08, 0.03, 24);
    const buttonMesh = new THREE.Mesh(buttonGeo, brassAccentMaterial);
    buttonMesh.position.y = yCenter + boardHeight / 2 + 0.015;
    this.capGroup.add(buttonMesh);

    // ----------------------------------------------------
    // 3. Skull Cap / Head Fitting (Mounted Underneath)
    // Recognisable rounded central headpiece with circular cavity
    // ----------------------------------------------------
    const skullCapHeight = 0.52;
    const skullCapTopRadius = 0.68;
    const skullCapBottomRadius = 0.88;
    const skullY = yCenter - skullCapHeight / 2;

    // Outer tapered dome cylinder (openEnded: true for hollow interior)
    const skullOuterGeo = new THREE.CylinderGeometry(
      skullCapTopRadius,
      skullCapBottomRadius,
      skullCapHeight,
      64,
      1,
      true
    );
    const skullOuterMesh = new THREE.Mesh(skullOuterGeo, blackFabricMaterial);
    skullOuterMesh.position.y = skullY;
    this.capGroup.add(skullOuterMesh);

    // Inner lining cylinder (creates clean realistic wall depth)
    const skullInnerGeo = new THREE.CylinderGeometry(
      skullCapTopRadius - 0.03,
      skullCapBottomRadius - 0.03,
      skullCapHeight,
      64,
      1,
      true
    );
    const skullInnerMesh = new THREE.Mesh(skullInnerGeo, blackFabricMaterial);
    skullInnerMesh.position.y = skullY;
    this.capGroup.add(skullInnerMesh);

    // Circular Underside Rim (Authentic circular opening edge)
    const rimGeo = new THREE.RingGeometry(
      skullCapBottomRadius - 0.03,
      skullCapBottomRadius,
      64
    );
    const rimMesh = new THREE.Mesh(rimGeo, blackFabricMaterial);
    rimMesh.rotation.x = Math.PI / 2;
    rimMesh.position.y = yCenter - skullCapHeight;
    this.capGroup.add(rimMesh);

    // Skull cap wireframe outlines (only visible during Scene 2/3 morph)
    const skullEdgesGeo = new THREE.EdgesGeometry(skullOuterGeo);
    const skullEdges = new THREE.LineSegments(skullEdgesGeo, lineMat);
    skullEdges.position.y = skullY;
    this.capGroup.add(skullEdges);

    // Circular rim wireframe guide
    const rimCircleGeo = new THREE.BufferGeometry();
    const rimPoints: THREE.Vector3[] = [];
    const segments = 64;
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
    // 4. Natural Proportional Tassel (Reduced length, organic drape)
    // ----------------------------------------------------
    const tasselCurve = new THREE.CatmullRomCurve3([
      new THREE.Vector3(0, yCenter + boardHeight / 2 + 0.02, 0),
      new THREE.Vector3(0.45, yCenter + boardHeight / 2 + 0.015, 0.45),
      new THREE.Vector3(0.92, yCenter + boardHeight / 2 + 0.01, 0.92), // Reaches board edge
      new THREE.Vector3(1.12, yCenter - 0.08, 1.12),                  // Bends naturally over edge
      new THREE.Vector3(1.18, yCenter - 0.35, 1.18),                  // Hangs gracefully
    ]);
    const tasselCordGeo = new THREE.TubeGeometry(tasselCurve, 28, 0.018, 8, false);
    const tasselCord = new THREE.Mesh(tasselCordGeo, tasselSilkMaterial);
    this.capGroup.add(tasselCord);

    // Small brass clasp
    const claspGeo = new THREE.CylinderGeometry(0.035, 0.035, 0.05, 16);
    const claspMesh = new THREE.Mesh(claspGeo, brassAccentMaterial);
    claspMesh.position.set(1.18, yCenter - 0.37, 1.18);
    this.capGroup.add(claspMesh);

    // Short natural silk fringe skirt
    const fringeGeo = new THREE.CylinderGeometry(0.03, 0.08, 0.28, 20);
    const fringeMesh = new THREE.Mesh(fringeGeo, tasselSilkMaterial);
    fringeMesh.position.set(1.18, yCenter - 0.52, 1.18);
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
      this.renderer.clear();
      this.animationFrameId = requestAnimationFrame(this.animate);
      return;
    }

    // Apply cap transform from animation state
    this.capGroup.position.set(this.state.capX, this.state.capY, this.state.capZ);
    this.capGroup.rotation.set(this.state.rotX, this.state.rotY, this.state.rotZ);
    this.capGroup.scale.setScalar(this.state.capScale);

    // Apply camera transform from state (locked directly on cap center)
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
