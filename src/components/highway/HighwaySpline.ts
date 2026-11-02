import * as THREE from 'three';

// ------------------------------------------------------------------
// 3D Elevated Highway Spline & Geometry Generator
// Suspended in a dark environment with concrete deck, pillars,
// guardrails, streetlights, and 6 checkpoint markers.
// ------------------------------------------------------------------

export interface CheckpointData {
  index: number;
  id: string;
  name: string;
  t: number; // Position along curve [0, 1]
  worldPos: THREE.Vector3;
  tangent: THREE.Vector3;
  side: 'left' | 'right';
}

export class HighwaySpline {
  public curve: THREE.CatmullRomCurve3;
  public checkpoints: CheckpointData[] = [];
  public totalLength: number = 0;

  // Road geometry parameters
  public readonly roadWidth = 4.2;
  public readonly deckDepth = 0.65;

  constructor() {
    // ----------------------------------------------------------------
    // Continuous descending winding highway with sweeping S-curves
    // Top-to-bottom vertical progression inspired by automotive visualizers
    // ----------------------------------------------------------------
    const points: THREE.Vector3[] = [
      new THREE.Vector3( -2,   38, -65), // Lead-in top
      new THREE.Vector3(-14,   26, -42), // Curve 1 apex (01 PaarakhMetric)
      new THREE.Vector3(  0,   15, -22), // Center crossing
      new THREE.Vector3( 15,    3,   0), // Curve 2 apex (02 KisanSathi)
      new THREE.Vector3(  1,  -10,  20), // Center crossing
      new THREE.Vector3(-13,  -21,  38), // Curve 3 apex (03 Jan Sathi)
      new THREE.Vector3(  0,  -31,  55), // Center crossing
      new THREE.Vector3( 14,  -41,  72), // Curve 4 apex (04 Drone Aero Lab)
      new THREE.Vector3(  2,  -51,  88), // Center crossing
      new THREE.Vector3(-11,  -61, 104), // Curve 5 apex (05 Udupu)
      new THREE.Vector3(  1,  -71, 120), // Center crossing
      new THREE.Vector3( 10,  -81, 136), // Curve 6 apex (06 College Event Manager)
      new THREE.Vector3(  0,  -92, 155), // Lead-out bottom exit
    ];

    this.curve = new THREE.CatmullRomCurve3(points, false, 'catmullrom', 0.5);
    this.totalLength = this.curve.getLength();

    // Checkpoint stations mapped along the descending curve
    const checkpointIds = [
      { id: 'paarakhmetric', name: 'PaarakhMetric', side: 'left' as const },
      { id: 'kisansathi', name: 'KisanSathi', side: 'right' as const },
      { id: 'jan-sathi', name: 'Jan Sathi', side: 'left' as const },
      { id: 'drone-aero-lab', name: 'Drone Aero Lab', side: 'right' as const },
      { id: 'udupu', name: 'Udupu', side: 'left' as const },
      { id: 'college-event-manager', name: 'College Event Manager', side: 'right' as const },
    ];

    // Normalized progress values corresponding to each curve checkpoint
    const tValues = [0.10, 0.26, 0.43, 0.60, 0.76, 0.91];

    this.checkpoints = checkpointIds.map((item, idx) => {
      const t = tValues[idx];
      const worldPos = this.curve.getPointAt(t);
      const tangent = this.curve.getTangentAt(t).normalize();
      return {
        index: idx,
        id: item.id,
        name: item.name,
        t,
        worldPos,
        tangent,
        side: item.side,
      };
    });
  }

  // ------------------------------------------------------------------
  // Build Complete 3D Highway Road Structure Group
  // ------------------------------------------------------------------
  public buildHighwayGroup(): THREE.Group {
    const highwayGroup = new THREE.Group();
    highwayGroup.name = 'HighwayStructure';

    const segments = 450;
    const halfW = this.roadWidth / 2;

    // Materials
    // Realistic dark asphalt road surface
    const asphaltMaterial = new THREE.MeshStandardMaterial({
      color: 0x16181e,
      roughness: 0.88,
      metalness: 0.08,
      side: THREE.DoubleSide,
    });

    // Elevated concrete road deck understructure
    const concreteMaterial = new THREE.MeshStandardMaterial({
      color: 0x22252c,
      roughness: 0.92,
      metalness: 0.04,
      side: THREE.DoubleSide,
    });

    // Metallic guardrails
    const guardrailMaterial = new THREE.MeshStandardMaterial({
      color: 0x71717a,
      roughness: 0.35,
      metalness: 0.85,
    });

    // White painted road markings
    const markingMaterial = new THREE.MeshBasicMaterial({
      color: 0xf4f4f5,
      side: THREE.DoubleSide,
    });

    // Restrained electric-lime checkpoint accent material
    const limeAccentMaterial = new THREE.MeshBasicMaterial({
      color: 0xa3e635,
    });

    // ----------------------------------------------------------------
    // 1. Generate Asphalt Road Surface & Concrete Box-Girder Deck
    // ----------------------------------------------------------------
    const roadVerts: number[] = [];
    const roadIndices: number[] = [];
    const roadUvs: number[] = [];

    const deckVerts: number[] = [];
    const deckIndices: number[] = [];

    // Precalculate frames along curve
    const frames = this.curve.computeFrenetFrames(segments, false);

    for (let i = 0; i <= segments; i++) {
      const t = i / segments;
      const pt = this.curve.getPointAt(t);
      const binormal = frames.binormals[i].clone().normalize();

      // Top road surface vertices (Left and Right edge)
      const leftTop = pt.clone().add(binormal.clone().multiplyScalar(halfW));
      const rightTop = pt.clone().add(binormal.clone().multiplyScalar(-halfW));

      // Bottom deck vertices (Chamfered concrete underside)
      const deckDepthVec = new THREE.Vector3(0, -this.deckDepth, 0);
      const leftBottom = pt.clone().add(binormal.clone().multiplyScalar(halfW * 0.85)).add(deckDepthVec);
      const rightBottom = pt.clone().add(binormal.clone().multiplyScalar(-halfW * 0.85)).add(deckDepthVec);

      // Add to road surface
      roadVerts.push(leftTop.x, leftTop.y, leftTop.z);
      roadVerts.push(rightTop.x, rightTop.y, rightTop.z);
      roadUvs.push(0, t * 50);
      roadUvs.push(1, t * 50);

      // Add to concrete underdeck
      deckVerts.push(leftTop.x, leftTop.y, leftTop.z);
      deckVerts.push(leftBottom.x, leftBottom.y, leftBottom.z);
      deckVerts.push(rightBottom.x, rightBottom.y, rightBottom.z);
      deckVerts.push(rightTop.x, rightTop.y, rightTop.z);

      if (i < segments) {
        // Road surface indices (2 tris per segment)
        const base = i * 2;
        roadIndices.push(base, base + 1, base + 2);
        roadIndices.push(base + 1, base + 3, base + 2);

        // Deck quad strips (Left chamfer, bottom slab, right chamfer)
        const dBase = i * 4;
        const dNext = (i + 1) * 4;

        // Left chamfer
        deckIndices.push(dBase, dNext, dBase + 1);
        deckIndices.push(dBase + 1, dNext, dNext + 1);

        // Bottom slab
        deckIndices.push(dBase + 1, dNext + 1, dBase + 2);
        deckIndices.push(dBase + 2, dNext + 1, dNext + 2);

        // Right chamfer
        deckIndices.push(dBase + 2, dNext + 2, dBase + 3);
        deckIndices.push(dBase + 3, dNext + 2, dNext + 3);
      }
    }

    // Road mesh
    const roadGeo = new THREE.BufferGeometry();
    roadGeo.setAttribute('position', new THREE.Float32BufferAttribute(roadVerts, 3));
    roadGeo.setAttribute('uv', new THREE.Float32BufferAttribute(roadUvs, 2));
    roadGeo.setIndex(roadIndices);
    roadGeo.computeVertexNormals();
    const roadMesh = new THREE.Mesh(roadGeo, asphaltMaterial);
    roadMesh.receiveShadow = true;
    highwayGroup.add(roadMesh);

    // Deck mesh
    const deckGeo = new THREE.BufferGeometry();
    deckGeo.setAttribute('position', new THREE.Float32BufferAttribute(deckVerts, 3));
    deckGeo.setIndex(deckIndices);
    deckGeo.computeVertexNormals();
    const deckMesh = new THREE.Mesh(deckGeo, concreteMaterial);
    deckMesh.receiveShadow = true;
    highwayGroup.add(deckMesh);

    // ----------------------------------------------------------------
    // 2. Center Dashed Line & Solid Shoulder Line Markings
    // ----------------------------------------------------------------
    const lineGroup = new THREE.Group();

    // Solid shoulder lines (left & right)
    for (const sideMult of [-1, 1]) {
      const shoulderVerts: number[] = [];
      const shoulderIndices: number[] = [];
      const sOffset = (halfW - 0.28) * sideMult;

      for (let i = 0; i <= segments; i++) {
        const t = i / segments;
        const pt = this.curve.getPointAt(t);
        const binormal = frames.binormals[i].clone().normalize();
        const lineCenter = pt.clone().add(binormal.clone().multiplyScalar(sOffset));
        lineCenter.y += 0.015; // slightly above asphalt

        const edgeA = lineCenter.clone().add(binormal.clone().multiplyScalar(0.06));
        const edgeB = lineCenter.clone().add(binormal.clone().multiplyScalar(-0.06));

        shoulderVerts.push(edgeA.x, edgeA.y, edgeA.z);
        shoulderVerts.push(edgeB.x, edgeB.y, edgeB.z);

        if (i < segments) {
          const b = i * 2;
          shoulderIndices.push(b, b + 1, b + 2);
          shoulderIndices.push(b + 1, b + 3, b + 2);
        }
      }

      const shoulderGeo = new THREE.BufferGeometry();
      shoulderGeo.setAttribute('position', new THREE.Float32BufferAttribute(shoulderVerts, 3));
      shoulderGeo.setIndex(shoulderIndices);
      shoulderGeo.computeVertexNormals();
      lineGroup.add(new THREE.Mesh(shoulderGeo, markingMaterial));
    }

    // Dashed center line markings
    const dashCount = 80;
    for (let d = 0; d < dashCount; d++) {
      const tStart = (d / dashCount) + 0.002;
      const tEnd = tStart + 0.0055;
      if (tEnd >= 1.0) break;

      const pA = this.curve.getPointAt(tStart);
      const pB = this.curve.getPointAt(tEnd);
      pA.y += 0.018;
      pB.y += 0.018;

      const dashCurve = new THREE.LineCurve3(pA, pB);
      const dashGeo = new THREE.TubeGeometry(dashCurve, 4, 0.05, 4, false);
      const dashMesh = new THREE.Mesh(dashGeo, markingMaterial);
      lineGroup.add(dashMesh);
    }
    highwayGroup.add(lineGroup);

    // ----------------------------------------------------------------
    // 3. Metallic Guardrails & Vertical Posts on both sides
    // ----------------------------------------------------------------
    for (const sideMult of [-1, 1]) {
      const railCurvePoints: THREE.Vector3[] = [];
      const railOffset = (halfW + 0.08) * sideMult;

      for (let i = 0; i <= 160; i++) {
        const t = i / 160;
        const pt = this.curve.getPointAt(t);
        const frameIdx = Math.min(Math.floor(t * segments), segments);
        const binormal = frames.binormals[frameIdx].clone().normalize();
        const railPt = pt.clone().add(binormal.multiplyScalar(railOffset));
        railPt.y += 0.38; // guardrail height
        railCurvePoints.push(railPt);
      }

      const railCurve = new THREE.CatmullRomCurve3(railCurvePoints);
      // Twin W-beam style rails
      const topRailGeo = new THREE.TubeGeometry(railCurve, 160, 0.045, 6, false);
      const topRailMesh = new THREE.Mesh(topRailGeo, guardrailMaterial);
      highwayGroup.add(topRailMesh);

      const bottomRailPoints = railCurvePoints.map(p => p.clone().add(new THREE.Vector3(0, -0.16, 0)));
      const bottomRailCurve = new THREE.CatmullRomCurve3(bottomRailPoints);
      const bottomRailGeo = new THREE.TubeGeometry(bottomRailCurve, 160, 0.035, 6, false);
      const bottomRailMesh = new THREE.Mesh(bottomRailGeo, guardrailMaterial);
      highwayGroup.add(bottomRailMesh);

      // Guardrail vertical posts every ~4 units
      const postCount = 60;
      for (let p = 0; p <= postCount; p++) {
        const t = p / postCount;
        const pt = this.curve.getPointAt(t);
        const frameIdx = Math.min(Math.floor(t * segments), segments);
        const binormal = frames.binormals[frameIdx].clone().normalize();
        const postBase = pt.clone().add(binormal.multiplyScalar(railOffset));

        const postGeo = new THREE.CylinderGeometry(0.025, 0.025, 0.5, 6);
        const postMesh = new THREE.Mesh(postGeo, guardrailMaterial);
        postMesh.position.copy(postBase);
        postMesh.position.y += 0.22;
        highwayGroup.add(postMesh);
      }
    }

    // ----------------------------------------------------------------
    // 4. Elevated Concrete Support Pillars & Crossbeams
    // Anchoring the highway into the deep dark void below
    // ----------------------------------------------------------------
    const pillarCount = 10;
    for (let p = 1; p < pillarCount; p++) {
      const t = p / pillarCount;
      const roadPt = this.curve.getPointAt(t);

      // Pillar base point
      const pillarTopY = roadPt.y - this.deckDepth;
      const pillarBottomY = -75; // reaches down into dark fog
      const pillarHeight = pillarTopY - pillarBottomY;

      // Heavy concrete circular column
      const pillarGeo = new THREE.CylinderGeometry(0.95, 1.25, pillarHeight, 20);
      const pillarMesh = new THREE.Mesh(pillarGeo, concreteMaterial);
      pillarMesh.position.set(roadPt.x, pillarBottomY + pillarHeight / 2, roadPt.z);
      pillarMesh.receiveShadow = true;
      highwayGroup.add(pillarMesh);

      // Crossbeam support head under road deck
      const beamGeo = new THREE.BoxGeometry(this.roadWidth * 1.05, 0.5, 1.6);
      const beamMesh = new THREE.Mesh(beamGeo, concreteMaterial);
      beamMesh.position.set(roadPt.x, pillarTopY - 0.25, roadPt.z);
      beamMesh.receiveShadow = true;
      highwayGroup.add(beamMesh);
    }

    // ----------------------------------------------------------------
    // 5. Roadside Lamp Posts (Streetlights) with Warm Pools of Light
    // ----------------------------------------------------------------
    const lampCount = 14;
    for (let l = 0; l <= lampCount; l++) {
      const t = l / lampCount;
      const pt = this.curve.getPointAt(t);
      const frameIdx = Math.min(Math.floor(t * segments), segments);
      const binormal = frames.binormals[frameIdx].clone().normalize();

      // Alternate lamp side (left / right of curve)
      const lampSide = l % 2 === 0 ? 1 : -1;
      const lampBase = pt.clone().add(binormal.clone().multiplyScalar((halfW + 0.6) * lampSide));

      // Vertical lamp pole
      const poleGeo = new THREE.CylinderGeometry(0.04, 0.065, 3.2, 8);
      const poleMesh = new THREE.Mesh(poleGeo, guardrailMaterial);
      poleMesh.position.set(lampBase.x, lampBase.y + 1.6, lampBase.z);
      highwayGroup.add(poleMesh);

      // Curved mast arm arching over the roadway
      const armCurve = new THREE.CatmullRomCurve3([
        new THREE.Vector3(lampBase.x, lampBase.y + 3.1, lampBase.z),
        new THREE.Vector3(
          lampBase.x - binormal.x * 0.45 * lampSide,
          lampBase.y + 3.35,
          lampBase.z - binormal.z * 0.45 * lampSide
        ),
        new THREE.Vector3(
          lampBase.x - binormal.x * 1.1 * lampSide,
          lampBase.y + 3.2,
          lampBase.z - binormal.z * 1.1 * lampSide
        ),
      ]);
      const armGeo = new THREE.TubeGeometry(armCurve, 10, 0.03, 6, false);
      const armMesh = new THREE.Mesh(armGeo, guardrailMaterial);
      highwayGroup.add(armMesh);

      // Luminaire head
      const luminairePos = armCurve.getPointAt(1.0);
      const lampHeadGeo = new THREE.BoxGeometry(0.2, 0.08, 0.35);
      const lampHeadMesh = new THREE.Mesh(lampHeadGeo, guardrailMaterial);
      lampHeadMesh.position.copy(luminairePos);
      highwayGroup.add(lampHeadMesh);

      // Warm street light source (subtle warm pool on asphalt)
      const streetLight = new THREE.PointLight(0xfff3d6, 1.4, 9, 1.6);
      streetLight.position.set(luminairePos.x, luminairePos.y - 0.1, luminairePos.z);
      highwayGroup.add(streetLight);

      // Glowing lens
      const lensGeo = new THREE.PlaneGeometry(0.16, 0.28);
      const lensMat = new THREE.MeshBasicMaterial({ color: 0xfffaed });
      const lensMesh = new THREE.Mesh(lensGeo, lensMat);
      lensMesh.position.set(luminairePos.x, luminairePos.y - 0.045, luminairePos.z);
      lensMesh.rotation.x = Math.PI / 2;
      highwayGroup.add(lensMesh);
    }

    // ----------------------------------------------------------------
    // 6. Checkpoint Overhead Gantries / Roadside Markers (01 to 06)
    // ----------------------------------------------------------------
    this.checkpoints.forEach((cp) => {
      const gantryGroup = new THREE.Group();
      gantryGroup.name = `Checkpoint_${cp.index + 1}_${cp.id}`;

      // Left and right support columns
      const gantryHeight = 3.6;
      const gantrySpan = this.roadWidth + 1.2;

      const norm = new THREE.Vector3(0, 1, 0);
      const binorm = new THREE.Vector3().crossVectors(cp.tangent, norm).normalize();

      const pLeft = cp.worldPos.clone().add(binorm.clone().multiplyScalar(gantrySpan / 2));
      const pRight = cp.worldPos.clone().add(binorm.clone().multiplyScalar(-gantrySpan / 2));

      // Cross arch beam
      const archCurve = new THREE.CatmullRomCurve3([
        new THREE.Vector3(pLeft.x, pLeft.y + 0.1, pLeft.z),
        new THREE.Vector3(pLeft.x, pLeft.y + gantryHeight, pLeft.z),
        new THREE.Vector3(cp.worldPos.x, cp.worldPos.y + gantryHeight + 0.25, cp.worldPos.z),
        new THREE.Vector3(pRight.x, pRight.y + gantryHeight, pRight.z),
        new THREE.Vector3(pRight.x, pRight.y + 0.1, pRight.z),
      ]);
      const archGeo = new THREE.TubeGeometry(archCurve, 20, 0.04, 6, false);
      const archMesh = new THREE.Mesh(archGeo, guardrailMaterial);
      gantryGroup.add(archMesh);

      // Electric-lime glowing checkpoint indicator pill
      const indicatorGeo = new THREE.BoxGeometry(0.9, 0.18, 0.08);
      const indicatorMesh = new THREE.Mesh(indicatorGeo, limeAccentMaterial);
      indicatorMesh.position.set(
        cp.worldPos.x,
        cp.worldPos.y + gantryHeight + 0.12,
        cp.worldPos.z
      );
      indicatorMesh.quaternion.setFromUnitVectors(new THREE.Vector3(0, 0, 1), cp.tangent);
      gantryGroup.add(indicatorMesh);

      // Soft lime beacon glow at checkpoint
      const beaconLight = new THREE.PointLight(0xa3e635, 1.2, 7, 2);
      beaconLight.position.set(cp.worldPos.x, cp.worldPos.y + gantryHeight, cp.worldPos.z);
      gantryGroup.add(beaconLight);

      highwayGroup.add(gantryGroup);
    });

    return highwayGroup;
  }
}
