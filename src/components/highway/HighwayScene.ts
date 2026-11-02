import * as THREE from 'three';
import { HighwaySpline } from './HighwaySpline';
import { NissanGTR } from './NissanGTR';

export class HighwayScene {
  private container: HTMLElement;
  public scene: THREE.Scene;
  public camera: THREE.PerspectiveCamera;
  public renderer: THREE.WebGLRenderer;
  public spline: HighwaySpline;
  public car: NissanGTR;

  private animationFrameId: number | null = null;
  private isDisposed = false;

  // Current smoothed scroll progress [0, 1]
  public targetProgress: number = 0;
  public currentProgress: number = 0;

  // Active checkpoint tracking
  public activeCheckpointIndex: number = 0;
  private onCheckpointChange?: (index: number) => void;

  // Camera offset relative to car in oblique 3D view
  private readonly cameraOffset = new THREE.Vector3(8.5, 7.2, -13.5);
  private currentCameraPos = new THREE.Vector3();
  private currentLookTarget = new THREE.Vector3();

  // Traveling road energy stream
  private energyParticleGroup!: THREE.Group;
  private energyParticles: { mesh: THREE.Mesh; tOffset: number }[] = [];

  constructor(
    container: HTMLElement,
    onCheckpointChange?: (index: number) => void
  ) {
    this.container = container;
    this.onCheckpointChange = onCheckpointChange;

    // 1. Scene setup
    this.scene = new THREE.Scene();
    this.scene.background = new THREE.Color(0x080b11);

    // Exponential atmospheric fog for deep suspended void feel
    this.scene.fog = new THREE.FogExp2(0x080b11, 0.013);

    // 2. Camera setup (Oblique automotive perspective)
    const width = container.clientWidth || window.innerWidth;
    const height = container.clientHeight || window.innerHeight;
    this.camera = new THREE.PerspectiveCamera(42, width / height, 0.1, 300);

    // 3. WebGL Renderer
    this.renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: false,
      powerPreference: 'high-performance',
    });
    this.renderer.setSize(width, height);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
    this.renderer.toneMappingExposure = 1.15;
    this.renderer.shadowMap.enabled = true;
    this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    this.container.appendChild(this.renderer.domElement);

    // 4. Lighting Rig
    this.setupLighting();

    // 5. Generate Highway Spline & 3D Structure
    this.spline = new HighwaySpline();
    const highwayMesh = this.spline.buildHighwayGroup();
    this.scene.add(highwayMesh);

    // 6. Spawn Nissan GT-R R35
    this.car = new NissanGTR();
    this.scene.add(this.car.group);

    // 7. Setup Traveling Road Energy Stream
    this.setupEnergyStream();

    // 8. Initial placement
    this.car.updateOnCurve(this.spline.curve, 0.02, 0.85);
    const startPt = this.spline.curve.getPointAt(0.02);
    this.currentCameraPos.copy(startPt).add(this.cameraOffset);
    this.currentLookTarget.copy(startPt);
    this.camera.position.copy(this.currentCameraPos);
    this.camera.lookAt(this.currentLookTarget);

    // 9. Resize & Animation Loop
    window.addEventListener('resize', this.onResize);
    this.animate();
  }

  private setupLighting() {
    // Soft ambient twilight fill
    const ambientLight = new THREE.AmbientLight(0x181c26, 1.2);
    this.scene.add(ambientLight);

    // High directional moonlight casting road shadows
    const moonLight = new THREE.DirectionalLight(0xdbeafe, 1.8);
    moonLight.position.set(25, 45, 10);
    moonLight.castShadow = true;
    moonLight.shadow.mapSize.width = 1024;
    moonLight.shadow.mapSize.height = 1024;
    moonLight.shadow.camera.near = 0.5;
    moonLight.shadow.camera.far = 180;
    this.scene.add(moonLight);

    // Soft cool rim light from opposite side
    const rimLight = new THREE.DirectionalLight(0x38bdf8, 0.8);
    rimLight.position.set(-30, 20, -30);
    this.scene.add(rimLight);
  }

  private setupEnergyStream() {
    this.energyParticleGroup = new THREE.Group();
    const particleCount = 12;
    const pulseMat = new THREE.MeshBasicMaterial({ color: 0xa3e635 });

    for (let i = 0; i < particleCount; i++) {
      const pGeo = new THREE.SphereGeometry(0.12, 8, 8);
      const pMesh = new THREE.Mesh(pGeo, pulseMat);
      this.energyParticleGroup.add(pMesh);
      this.energyParticles.push({
        mesh: pMesh,
        tOffset: (i / particleCount) * 0.12,
      });
    }
    this.scene.add(this.energyParticleGroup);
  }

  public setScrollProgress(progress: number) {
    this.targetProgress = THREE.MathUtils.clamp(progress, 0, 1);
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

    // Smoothly interpolate current scroll progress towards target
    this.currentProgress += (this.targetProgress - this.currentProgress) * 0.085;

    // Map progress [0, 1] to spline curve t [0.03, 0.96]
    const carT = THREE.MathUtils.lerp(0.04, 0.95, this.currentProgress);

    // Update Nissan GT-R on highway curve
    this.car.updateOnCurve(this.spline.curve, carT, 0.85);

    // Update Camera kinematics (Subtle tracking oblique isometric view)
    const carPos = this.car.group.position;
    const carTangent = this.spline.curve.getTangentAt(carT).normalize();
    const up = new THREE.Vector3(0, 1, 0);
    const binormal = new THREE.Vector3().crossVectors(carTangent, up).normalize();

    // Desired camera position relative to car
    // Positioned behind and slightly to the outside of curve for dramatic perspective
    const targetCam = carPos.clone()
      .add(carTangent.clone().multiplyScalar(-11.5))
      .add(binormal.clone().multiplyScalar(6.5))
      .add(new THREE.Vector3(0, 5.8, 0));

    // Smooth camera motion
    this.currentCameraPos.lerp(targetCam, 0.075);
    this.camera.position.copy(this.currentCameraPos);

    // Look slightly ahead of the car down the road
    const targetLook = carPos.clone().add(carTangent.clone().multiplyScalar(4.5));
    this.currentLookTarget.lerp(targetLook, 0.085);
    this.camera.lookAt(this.currentLookTarget);

    // Update Energy Stream pulsing along the road ahead of the car
    const timeSec = performance.now() * 0.001;
    this.energyParticles.forEach((ep) => {
      // Moves along road ahead of car
      const pT = (carT + ep.tOffset + (timeSec * 0.08) % 0.08) % 0.98;
      const pt = this.spline.curve.getPointAt(pT);
      ep.mesh.position.set(pt.x, pt.y + 0.1, pt.z);
    });

    // Check which project checkpoint is closest
    let closestCp = 0;
    let minDiff = 999;
    this.spline.checkpoints.forEach((cp, idx) => {
      const diff = Math.abs(carT - cp.t);
      if (diff < minDiff) {
        minDiff = diff;
        closestCp = idx;
      }
    });

    if (closestCp !== this.activeCheckpointIndex) {
      this.activeCheckpointIndex = closestCp;
      if (this.onCheckpointChange) {
        this.onCheckpointChange(closestCp);
      }
    }

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
      if (obj instanceof THREE.Mesh) {
        if (obj.geometry) obj.geometry.dispose();
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
