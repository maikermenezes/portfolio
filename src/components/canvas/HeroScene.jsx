import { useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

// Ashima Arts 3D simplex noise (MIT)
const NOISE = /* glsl */ `
vec3 mod289(vec3 x){return x-floor(x*(1.0/289.0))*289.0;}
vec4 mod289(vec4 x){return x-floor(x*(1.0/289.0))*289.0;}
vec4 permute(vec4 x){return mod289(((x*34.0)+1.0)*x);}
vec4 taylorInvSqrt(vec4 r){return 1.79284291400159-0.85373472095314*r;}
float snoise(vec3 v){
  const vec2 C=vec2(1.0/6.0,1.0/3.0);
  const vec4 D=vec4(0.0,0.5,1.0,2.0);
  vec3 i=floor(v+dot(v,C.yyy));
  vec3 x0=v-i+dot(i,C.xxx);
  vec3 g=step(x0.yzx,x0.xyz);
  vec3 l=1.0-g;
  vec3 i1=min(g.xyz,l.zxy);
  vec3 i2=max(g.xyz,l.zxy);
  vec3 x1=x0-i1+C.xxx;
  vec3 x2=x0-i2+C.yyy;
  vec3 x3=x0-D.yyy;
  i=mod289(i);
  vec4 p=permute(permute(permute(
    i.z+vec4(0.0,i1.z,i2.z,1.0))
    +i.y+vec4(0.0,i1.y,i2.y,1.0))
    +i.x+vec4(0.0,i1.x,i2.x,1.0));
  float n_=0.142857142857;
  vec3 ns=n_*D.wyz-D.xzx;
  vec4 j=p-49.0*floor(p*ns.z*ns.z);
  vec4 x_=floor(j*ns.z);
  vec4 y_=floor(j-7.0*x_);
  vec4 x=x_*ns.x+ns.yyyy;
  vec4 y=y_*ns.x+ns.yyyy;
  vec4 h=1.0-abs(x)-abs(y);
  vec4 b0=vec4(x.xy,y.xy);
  vec4 b1=vec4(x.zw,y.zw);
  vec4 s0=floor(b0)*2.0+1.0;
  vec4 s1=floor(b1)*2.0+1.0;
  vec4 sh=-step(h,vec4(0.0));
  vec4 a0=b0.xzyw+s0.xzyw*sh.xxyy;
  vec4 a1=b1.xzyw+s1.xzyw*sh.zzww;
  vec3 p0=vec3(a0.xy,h.x);
  vec3 p1=vec3(a0.zw,h.y);
  vec3 p2=vec3(a1.xy,h.z);
  vec3 p3=vec3(a1.zw,h.w);
  vec4 norm=taylorInvSqrt(vec4(dot(p0,p0),dot(p1,p1),dot(p2,p2),dot(p3,p3)));
  p0*=norm.x;p1*=norm.y;p2*=norm.z;p3*=norm.w;
  vec4 m=max(0.6-vec4(dot(x0,x0),dot(x1,x1),dot(x2,x2),dot(x3,x3)),0.0);
  m=m*m;
  return 42.0*dot(m*m,vec4(dot(p0,x0),dot(p1,x1),dot(p2,x2),dot(p3,x3)));
}
`;

const vertexShader = /* glsl */ `
  uniform float uTime;
  uniform float uPixelRatio;
  uniform float uHover;
  uniform float uFocus;
  attribute float aScale;
  varying float vNoise;
  varying float vDepth;
  ${NOISE}
  void main() {
    vec3 p = position;
    float n = snoise(p * 1.25 + vec3(uTime * 0.18));
    float n2 = snoise(p * 3.0 - vec3(uTime * 0.3));
    float amp = 0.16 + uHover * 0.1;
    vec3 displaced = p * (1.0 + n * amp + n2 * 0.04);
    vec4 mv = modelViewMatrix * vec4(displaced, 1.0);
    gl_Position = projectionMatrix * mv;
    gl_PointSize = aScale * 10.5 * uPixelRatio * (uFocus / 5.2) / -mv.z;
    vNoise = n;
    vDepth = smoothstep(uFocus + 1.3, uFocus - 2.7, -mv.z);
  }
`;

const fragmentShader = /* glsl */ `
  uniform vec3 uColorA;
  uniform vec3 uColorB;
  varying float vNoise;
  varying float vDepth;
  void main() {
    float d = length(gl_PointCoord - 0.5);
    if (d > 0.5) discard;
    float alpha = smoothstep(0.5, 0.0, d);
    vec3 color = mix(uColorA, uColorB, smoothstep(-0.2, 0.9, vNoise));
    gl_FragColor = vec4(color, alpha * (0.25 + vDepth * 0.85));
  }
`;

const fibonacciSphere = (count, radius) => {
  const positions = new Float32Array(count * 3);
  const scales = new Float32Array(count);
  const golden = Math.PI * (3 - Math.sqrt(5));
  for (let i = 0; i < count; i++) {
    const y = 1 - (i / (count - 1)) * 2;
    const r = Math.sqrt(1 - y * y);
    const theta = golden * i;
    positions[i * 3] = Math.cos(theta) * r * radius;
    positions[i * 3 + 1] = y * radius;
    positions[i * 3 + 2] = Math.sin(theta) * r * radius;
    scales[i] = 0.6 + Math.random() * 1.2;
  }
  return { positions, scales };
};

const Orb = ({ count, pointer, position }) => {
  const group = useRef();
  const material = useRef();
  const { positions, scales } = useMemo(() => fibonacciSphere(count, 1.4), [count]);

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uHover: { value: 0 },
      uFocus: { value: 5.2 - (position?.[2] ?? 0) },
      uPixelRatio: { value: Math.min(window.devicePixelRatio, 2) },
      uColorA: { value: new THREE.Color("#007a7a") },
      uColorB: { value: new THREE.Color("#b8fffb") },
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  useFrame((state, delta) => {
    const t = state.clock.elapsedTime;
    uniforms.uTime.value = t;
    const px = pointer.current.x;
    const py = pointer.current.y;
    const dist = Math.min(1, Math.hypot(px, py));
    uniforms.uHover.value = THREE.MathUtils.damp(uniforms.uHover.value, 1 - dist, 3, delta);
    if (group.current) {
      group.current.rotation.y = THREE.MathUtils.damp(group.current.rotation.y, t * 0.08 + px * 0.6, 4, delta);
      group.current.rotation.x = THREE.MathUtils.damp(group.current.rotation.x, -py * 0.4, 4, delta);
    }
  });

  return (
    <group ref={group} position={position}>
      <points>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" count={count} array={positions} itemSize={3} />
          <bufferAttribute attach="attributes-aScale" count={count} array={scales} itemSize={1} />
        </bufferGeometry>
        <shaderMaterial
          ref={material}
          uniforms={uniforms}
          vertexShader={vertexShader}
          fragmentShader={fragmentShader}
          transparent
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </points>
      <Rings />
    </group>
  );
};

/** Drifting star-dust that fills the whole section, with a gentle mouse parallax. */
const Dust = ({ count, pointer }) => {
  const ref = useRef();
  const geometry = useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      arr[i * 3] = (Math.random() - 0.5) * 18;
      arr[i * 3 + 1] = (Math.random() - 0.5) * 10;
      arr[i * 3 + 2] = -6 + Math.random() * 7;
    }
    const g = new THREE.BufferGeometry();
    g.setAttribute("position", new THREE.BufferAttribute(arr, 3));
    return g;
  }, [count]);

  useFrame((state, delta) => {
    if (!ref.current) return;
    ref.current.rotation.z += delta * 0.01;
    ref.current.position.x = THREE.MathUtils.damp(ref.current.position.x, pointer.current.x * 0.35, 2, delta);
    ref.current.position.y = THREE.MathUtils.damp(ref.current.position.y, pointer.current.y * 0.25, 2, delta);
  });

  return (
    <points ref={ref} geometry={geometry}>
      <pointsMaterial
        size={0.025}
        color="#5ff2ec"
        transparent
        opacity={0.45}
        sizeAttenuation
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
};

const Rings = () => {
  const ref = useRef();
  const geometry = useMemo(() => {
    const count = 2200;
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const a = Math.random() * Math.PI * 2;
      const band = i % 3;
      const r = (band === 0 ? 2.3 : band === 1 ? 3.1 : 4.2) + Math.random() * 0.35;
      arr[i * 3] = Math.cos(a) * r;
      arr[i * 3 + 1] = (Math.random() - 0.5) * 0.06;
      arr[i * 3 + 2] = Math.sin(a) * r;
    }
    const g = new THREE.BufferGeometry();
    g.setAttribute("position", new THREE.BufferAttribute(arr, 3));
    return g;
  }, []);

  useFrame((_, delta) => {
    if (ref.current) ref.current.rotation.y += delta * 0.06;
  });

  return (
    <points ref={ref} geometry={geometry} rotation={[0.35, 0, 0.18]}>
      <pointsMaterial
        size={0.012}
        color="#00dddd"
        transparent
        opacity={0.55}
        sizeAttenuation
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
};

const HeroScene = ({ pointer, compact = false }) => (
  <Canvas
    dpr={[1, 2]}
    camera={{ position: [0, 0, 5.2], fov: 45 }}
    gl={{ antialias: false, alpha: true, powerPreference: "high-performance" }}
  >
    <Dust count={compact ? 600 : 1400} pointer={pointer} />
    <Orb count={compact ? 8000 : 16000} pointer={pointer} position={compact ? [0, 0.9, -3] : [1.5, 0, 0]} />
  </Canvas>
);

export default HeroScene;
