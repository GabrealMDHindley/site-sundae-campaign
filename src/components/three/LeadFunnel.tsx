"use client";
import { useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

// Leads stream in wide on the left, the funnel narrows them, and a few emerge in Sundae red
// on the right as members — the plan's whole thesis in one moving picture.
// Palette on a white ground (BRAND-SPEC 5): leads in Sundae blue and slate, members in Sundae red, rings in slate.
const N_SMALL = 900, N_LARGE = 2200;

function radiusAt(t: number) {
  const s = THREE.MathUtils.smoothstep(t, 0.22, 0.78);
  return THREE.MathUtils.lerp(2.3, 0.16, s);
}

function Particles({ n, reduce }: { n: number; reduce: boolean }) {
  const pts = useRef<THREE.Points>(null);
  const seed = useMemo(() => {
    const t = new Float32Array(n), a = new Float32Array(n), sp = new Float32Array(n), r = new Float32Array(n), win = new Uint8Array(n), tone = new Float32Array(n);
    for (let i = 0; i < n; i++) { t[i] = Math.random(); a[i] = Math.random() * Math.PI * 2; sp[i] = 0.045 + Math.random() * 0.05; r[i] = 0.55 + Math.random() * 0.45; win[i] = Math.random() < 0.035 ? 1 : 0; tone[i] = Math.random(); }
    return { t, a, sp, r, win, tone };
  }, [n]);
  const geo = useMemo(() => {
    const g = new THREE.BufferGeometry();
    g.setAttribute("position", new THREE.BufferAttribute(new Float32Array(n * 3), 3));
    g.setAttribute("aAlpha", new THREE.BufferAttribute(new Float32Array(n), 1));
    g.setAttribute("aWin", new THREE.BufferAttribute(Float32Array.from(seed.win), 1));
    g.setAttribute("aTone", new THREE.BufferAttribute(seed.tone, 1));
    return g;
  }, [n, seed]);
  const mat = useMemo(() => new THREE.ShaderMaterial({
    transparent: true, depthWrite: false,
    uniforms: { uPx: { value: Math.min(window.devicePixelRatio, 1.6) } },
    vertexShader: `attribute float aAlpha; attribute float aWin; attribute float aTone; varying float vA; varying float vW; varying float vT; uniform float uPx;
      void main(){ vA=aAlpha; vW=aWin; vT=aTone; vec4 mv=modelViewMatrix*vec4(position,1.0); gl_Position=projectionMatrix*mv; gl_PointSize=(aWin>0.5?11.0:5.0)*uPx*(6.0/-mv.z); }`,
    fragmentShader: `varying float vA; varying float vW; varying float vT;
      void main(){ vec2 c=gl_PointCoord-0.5; float d=length(c); if(d>0.5) discard; float s=smoothstep(0.5,0.2,d);
        vec3 blue=vec3(0.110,0.318,0.627); vec3 slate=vec3(0.788,0.824,0.878); vec3 red=vec3(0.859,0.239,0.333);
        vec3 lead=mix(blue,slate,step(0.62,vT)); gl_FragColor=vec4(mix(lead,red,vW), s*vA); }`,
  }), []);
  const step = (dt: number) => {
    const pos = geo.attributes.position.array as Float32Array, al = geo.attributes.aAlpha.array as Float32Array;
    for (let i = 0; i < n; i++) {
      let t = seed.t[i] + dt * seed.sp[i];
      if (t > 1) { t -= 1; seed.a[i] = Math.random() * Math.PI * 2; }
      seed.t[i] = t;
      const ang = seed.a[i] + t * 3.2;
      const rr = radiusAt(t) * seed.r[i];
      pos[i * 3] = THREE.MathUtils.lerp(-6.2, 6.2, t);
      pos[i * 3 + 1] = Math.sin(ang) * rr;
      pos[i * 3 + 2] = Math.cos(ang) * rr;
      const fadeIn = THREE.MathUtils.smoothstep(t, 0, 0.08);
      const filtered = seed.win[i] ? 1 : 1 - THREE.MathUtils.smoothstep(t, 0.55, 0.8);
      al[i] = fadeIn * filtered * (seed.win[i] ? 1 : seed.tone[i] >= 0.62 ? 0.95 : 0.55) * (1 - THREE.MathUtils.smoothstep(t, 0.94, 1));
    }
    geo.attributes.position.needsUpdate = true; geo.attributes.aAlpha.needsUpdate = true;
  };
  useMemo(() => step(0), []); // eslint-disable-line react-hooks/exhaustive-deps
  useFrame((s, dt) => {
    if (!reduce) step(Math.min(dt, 0.05));
    if (pts.current) pts.current.rotation.x = reduce ? 0.18 : 0.18 + Math.sin(s.clock.elapsedTime * 0.2) * 0.05;
  });
  return <points ref={pts} geometry={geo} material={mat} />;
}

function Rings() {
  const rings = useMemo(() => [0.08, 0.3, 0.45, 0.6, 0.78].map((t) => {
    const r = radiusAt(t), pts: THREE.Vector3[] = [];
    for (let i = 0; i <= 96; i++) { const a = (i / 96) * Math.PI * 2; pts.push(new THREE.Vector3(THREE.MathUtils.lerp(-6.2, 6.2, t), Math.sin(a) * r, Math.cos(a) * r)); }
    return new THREE.Line(new THREE.BufferGeometry().setFromPoints(pts), new THREE.LineBasicMaterial({ color: "#c9d2e0", transparent: true, opacity: 0.9 }));
  }), []);
  return <group rotation={[0.18, 0, 0]}>{rings.map((l, i) => <primitive key={i} object={l} />)}</group>;
}

export default function LeadFunnel() {
  const reduce = typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const small = typeof window !== "undefined" && window.innerWidth < 768;
  return (
    <Canvas dpr={[1, 1.6]} camera={{ position: [0, 0.6, 9], fov: 42 }} gl={{ alpha: true, antialias: true, powerPreference: "low-power" }} frameloop={reduce ? "demand" : "always"} aria-hidden style={{ position: "absolute", inset: 0 }}>
      <group rotation={[0, -0.32, 0]} position={[0.4, -0.1, 0]}>
        <Rings />
        <Particles n={small ? N_SMALL : N_LARGE} reduce={reduce} />
      </group>
    </Canvas>
  );
}
