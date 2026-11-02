import * as THREE from 'three';

// ------------------------------------------------------------------
// Nissan GT-R R35 3D Model
// High-fidelity automotive model featuring iconic GT-R R35 hallmarks:
// - Aggressive low nose & trapezoidal grille
// - Sloping roofline with blacked-out A-pillar visor effect
// - Dual NACA hood vents
// - Raised aerodynamic rear wing spoiler
// - Quad round red taillights (signature GT-R afterburners)
// - Quad exhaust tips & rear diffuser
// - Forward headlights casting spotlight cones onto the road
// ------------------------------------------------------------------

export class NissanGTR {
  public group: THREE.Group;
  public headlightLeft!: THREE.SpotLight;
  public headlightRight!: THREE.SpotLight;
  public taillightGlow!: THREE.PointLight;

  constructor() {
    this.group = new THREE.Group();
    this.group.name = 'NissanGTR_R35';
    this.buildGTRModel();
  }

  private buildGTRModel() {
    // ----------------------------------------------------------------
    // Automotive Materials
    // ----------------------------------------------------------------
    // Metallic Gunmetal / Obsidian Black Body Paint
    const bodyMaterial = new THREE.MeshStandardMaterial({
      color: 0x1f232a,
      roughness: 0.32,
      metalness: 0.85,
    });

    // Dark Tinted Glass Canopy
    const glassMaterial = new THREE.MeshStandardMaterial({
      color: 0x090b10,
      roughness: 0.12,
      metalness: 0.95,
    });

    // Matte Carbon Fiber Splitter / Diffuser / Trim
    const carbonMaterial = new THREE.MeshStandardMaterial({
      color: 0x121417,
      roughness: 0.85,
      metalness: 0.1,
    });

    // Alloy Wheels & Brake Calipers
    const rimMaterial = new THREE.MeshStandardMaterial({
      color: 0x475569,
      roughness: 0.25,
      metalness: 0.9,
    });
    const tireMaterial = new THREE.MeshStandardMaterial({
      color: 0x18181b,
      roughness: 0.95,
      metalness: 0.05,
    });
    const caliperMaterial = new THREE.MeshStandardMaterial({
      color: 0xd97706, // Bronze/gold Brembo caliper
      roughness: 0.35,
      metalness: 0.8,
    });

    // Light Materials
    const headlightLensMat = new THREE.MeshBasicMaterial({ color: 0xf8fafc });
    const taillightLensMat = new THREE.MeshBasicMaterial({ color: 0xef4444 });
    const exhaustMaterial = new THREE.MeshStandardMaterial({
      color: 0x94a3b8,
      roughness: 0.2,
      metalness: 0.95,
    });

    // ----------------------------------------------------------------
    // 1. Lower Chassis & Aerodynamic Floor
    // ----------------------------------------------------------------
    const floorGeo = new THREE.BoxGeometry(1.36, 0.14, 3.1);
    const floorMesh = new THREE.Mesh(floorGeo, carbonMaterial);
    floorMesh.position.y = 0.12;
    this.group.add(floorMesh);

    // Front Splitter
    const splitterGeo = new THREE.BoxGeometry(1.38, 0.05, 0.4);
    const splitterMesh = new THREE.Mesh(splitterGeo, carbonMaterial);
    splitterMesh.position.set(0, 0.07, 1.55);
    this.group.add(splitterMesh);

    // Rear Diffuser
    const diffuserGeo = new THREE.BoxGeometry(1.36, 0.12, 0.35);
    const diffuserMesh = new THREE.Mesh(diffuserGeo, carbonMaterial);
    diffuserMesh.position.set(0, 0.11, -1.55);
    this.group.add(diffuserMesh);

    // ----------------------------------------------------------------
    // 2. Main Body Shell (Low-slung GT-R R35 silhouette)
    // ----------------------------------------------------------------
    // Lower body box
    const mainBodyGeo = new THREE.BoxGeometry(1.38, 0.4, 2.9);
    const mainBodyMesh = new THREE.Mesh(mainBodyGeo, bodyMaterial);
    mainBodyMesh.position.set(0, 0.35, 0);
    this.group.add(mainBodyMesh);

    // Flared front fenders
    const frontFenderGeo = new THREE.BoxGeometry(1.44, 0.36, 1.0);
    const frontFenderMesh = new THREE.Mesh(frontFenderGeo, bodyMaterial);
    frontFenderMesh.position.set(0, 0.34, 0.85);
    this.group.add(frontFenderMesh);

    // Muscular flared rear fenders (GT-R hallmark)
    const rearFenderGeo = new THREE.BoxGeometry(1.46, 0.38, 0.95);
    const rearFenderMesh = new THREE.Mesh(rearFenderGeo, bodyMaterial);
    rearFenderMesh.position.set(0, 0.36, -0.9);
    this.group.add(rearFenderMesh);

    // Sloping front hood
    const hoodGeo = new THREE.BoxGeometry(1.28, 0.14, 1.15);
    const hoodMesh = new THREE.Mesh(hoodGeo, bodyMaterial);
    hoodMesh.position.set(0, 0.52, 0.88);
    hoodMesh.rotation.x = 0.06;
    this.group.add(hoodMesh);

    // Dual NACA hood air scoops
    for (const xSide of [-0.28, 0.28]) {
      const nacaGeo = new THREE.BoxGeometry(0.12, 0.03, 0.24);
      const nacaMesh = new THREE.Mesh(nacaGeo, carbonMaterial);
      nacaMesh.position.set(xSide, 0.58, 0.9);
      nacaMesh.rotation.x = 0.06;
      this.group.add(nacaMesh);
    }

    // Front Trapezoidal GT-R Grille
    const grilleGeo = new THREE.BoxGeometry(0.85, 0.24, 0.05);
    const grilleMesh = new THREE.Mesh(grilleGeo, carbonMaterial);
    grilleMesh.position.set(0, 0.32, 1.48);
    this.group.add(grilleMesh);

    // ----------------------------------------------------------------
    // 3. Cabin Greenhouse & Roof (Sloping R35 profile & blacked-out A-pillars)
    // ----------------------------------------------------------------
    const cabinGeo = new THREE.BoxGeometry(1.14, 0.42, 1.4);
    const cabinMesh = new THREE.Mesh(cabinGeo, glassMaterial);
    cabinMesh.position.set(0, 0.68, -0.15);
    this.group.add(cabinMesh);

    // Fastback rear windshield slope
    const rearGlassGeo = new THREE.BoxGeometry(1.12, 0.12, 0.65);
    const rearGlassMesh = new THREE.Mesh(rearGlassGeo, glassMaterial);
    rearGlassMesh.position.set(0, 0.72, -0.72);
    rearGlassMesh.rotation.x = -0.38;
    this.group.add(rearGlassMesh);

    // Sloping roof top panel
    const roofGeo = new THREE.BoxGeometry(1.12, 0.06, 0.9);
    const roofMesh = new THREE.Mesh(roofGeo, bodyMaterial);
    roofMesh.position.set(0, 0.9, -0.18);
    this.group.add(roofMesh);

    // ----------------------------------------------------------------
    // 4. Iconic Raised GT-R Rear Wing Spoiler
    // ----------------------------------------------------------------
    // Twin vertical support struts
    for (const xStrut of [-0.46, 0.46]) {
      const strutGeo = new THREE.BoxGeometry(0.04, 0.22, 0.12);
      const strutMesh = new THREE.Mesh(strutGeo, carbonMaterial);
      strutMesh.position.set(xStrut, 0.64, -1.36);
      this.group.add(strutMesh);
    }
    // Horizontal main wing blade
    const wingBladeGeo = new THREE.BoxGeometry(1.36, 0.04, 0.26);
    const wingBladeMesh = new THREE.Mesh(wingBladeGeo, carbonMaterial);
    wingBladeMesh.position.set(0, 0.75, -1.36);
    wingBladeMesh.rotation.x = -0.04;
    this.group.add(wingBladeMesh);

    // ----------------------------------------------------------------
    // 5. Legendary Quad Round Taillights (GT-R Hallmark Afterburner Rings)
    // ----------------------------------------------------------------
    const tailY = 0.44;
    const tailZ = -1.48;
    const tailConfigs = [
      { x: -0.44, r: 0.1 },  // Outer left
      { x: -0.22, r: 0.085 },// Inner left
      { x:  0.22, r: 0.085 },// Inner right
      { x:  0.44, r: 0.1 },  // Outer right
    ];

    tailConfigs.forEach(cfg => {
      // Red ring
      const ringGeo = new THREE.RingGeometry(cfg.r * 0.55, cfg.r, 24);
      const ringMesh = new THREE.Mesh(ringGeo, taillightLensMat);
      ringMesh.position.set(cfg.x, tailY, tailZ);
      ringMesh.rotation.y = Math.PI;
      this.group.add(ringMesh);

      // Inner dark core
      const coreGeo = new THREE.CircleGeometry(cfg.r * 0.5, 24);
      const coreMesh = new THREE.Mesh(coreGeo, carbonMaterial);
      coreMesh.position.set(cfg.x, tailY, tailZ - 0.002);
      coreMesh.rotation.y = Math.PI;
      this.group.add(coreMesh);
    });

    // Soft red taillight ambient pointlight
    this.taillightGlow = new THREE.PointLight(0xef4444, 1.2, 5, 2);
    this.taillightGlow.position.set(0, tailY, -1.8);
    this.group.add(this.taillightGlow);

    // Quad Titanium Exhaust Tips (Two twin pipes on left and right)
    const exhaustX = [-0.48, -0.38, 0.38, 0.48];
    exhaustX.forEach(exX => {
      const exGeo = new THREE.CylinderGeometry(0.042, 0.042, 0.18, 16);
      const exMesh = new THREE.Mesh(exGeo, exhaustMaterial);
      exMesh.rotation.x = Math.PI / 2;
      exMesh.position.set(exX, 0.15, -1.6);
      this.group.add(exMesh);
    });

    // ----------------------------------------------------------------
    // 6. Angled Xenon Headlights & Dual Road Spotlights
    // ----------------------------------------------------------------
    const headY = 0.38;
    const headZ = 1.46;
    for (const headX of [-0.5, 0.5]) {
      const lightGeo = new THREE.BoxGeometry(0.24, 0.1, 0.08);
      const lightMesh = new THREE.Mesh(lightGeo, headlightLensMat);
      lightMesh.position.set(headX, headY, headZ);
      lightMesh.rotation.y = headX < 0 ? 0.18 : -0.18;
      this.group.add(lightMesh);
    }

    // Left and Right Headlight Spotlights aimed forward down the road
    const targetL = new THREE.Object3D();
    targetL.position.set(-0.4, -0.2, 10);
    this.group.add(targetL);

    this.headlightLeft = new THREE.SpotLight(0xfffaed, 2.8, 22, Math.PI / 6, 0.4, 1.2);
    this.headlightLeft.position.set(-0.5, headY, headZ + 0.1);
    this.headlightLeft.target = targetL;
    this.group.add(this.headlightLeft);

    const targetR = new THREE.Object3D();
    targetR.position.set(0.4, -0.2, 10);
    this.group.add(targetR);

    this.headlightRight = new THREE.SpotLight(0xfffaed, 2.8, 22, Math.PI / 6, 0.4, 1.2);
    this.headlightRight.position.set(0.5, headY, headZ + 0.1);
    this.headlightRight.target = targetR;
    this.group.add(this.headlightRight);

    // ----------------------------------------------------------------
    // 7. Alloy Wheels & Tires (4 corners)
    // ----------------------------------------------------------------
    const wheelPositions = [
      { x: -0.68, z:  0.92 }, // Front Left
      { x:  0.68, z:  0.92 }, // Front Right
      { x: -0.70, z: -0.92 }, // Rear Left
      { x:  0.70, z: -0.92 }, // Rear Right
    ];

    wheelPositions.forEach(wp => {
      const wheelGroup = new THREE.Group();
      wheelGroup.position.set(wp.x, 0.26, wp.z);

      // Rubber Tire
      const tireGeo = new THREE.CylinderGeometry(0.26, 0.26, 0.18, 24);
      const tireMesh = new THREE.Mesh(tireGeo, tireMaterial);
      tireMesh.rotation.z = Math.PI / 2;
      wheelGroup.add(tireMesh);

      // Alloy Rim
      const rimGeo = new THREE.CylinderGeometry(0.18, 0.18, 0.185, 16);
      const rimMesh = new THREE.Mesh(rimGeo, rimMaterial);
      rimMesh.rotation.z = Math.PI / 2;
      wheelGroup.add(rimMesh);

      // Brembo Brake Caliper
      const caliperGeo = new THREE.BoxGeometry(0.06, 0.1, 0.12);
      const caliperMesh = new THREE.Mesh(caliperGeo, caliperMaterial);
      caliperMesh.position.set(wp.x > 0 ? -0.06 : 0.06, 0.06, 0);
      wheelGroup.add(caliperMesh);

      this.group.add(wheelGroup);
    });
  }

  // ------------------------------------------------------------------
  // Update Car Position and Orientation Along Curve
  // ------------------------------------------------------------------
  public updateOnCurve(
    curve: THREE.CatmullRomCurve3,
    t: number,
    laneOffset: number = 0.85
  ) {
    const clampedT = THREE.MathUtils.clamp(t, 0.001, 0.999);
    const pt = curve.getPointAt(clampedT);
    const tangent = curve.getTangentAt(clampedT).normalize();

    // Lateral binormal vector for lane position (right lane)
    const up = new THREE.Vector3(0, 1, 0);
    const binormal = new THREE.Vector3().crossVectors(tangent, up).normalize();

    // Position car in right lane slightly above asphalt
    const carPos = pt.clone().add(binormal.clone().multiplyScalar(laneOffset));
    carPos.y += 0.06;
    this.group.position.copy(carPos);

    // Look along tangent
    const lookTarget = carPos.clone().add(tangent);
    this.group.lookAt(lookTarget);

    // Organic banking / roll along curves
    // Compute curvature by comparing tangent ahead
    const aheadT = Math.min(clampedT + 0.015, 0.999);
    const tangentAhead = curve.getTangentAt(aheadT).normalize();
    const lateralDelta = binormal.dot(tangentAhead);
    // Subtle realistic body lean into turn
    this.group.rotateZ(lateralDelta * 0.45);
  }
}
