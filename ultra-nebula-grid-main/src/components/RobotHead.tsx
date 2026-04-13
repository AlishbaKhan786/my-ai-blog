import { useRef, useMemo, useState, useEffect, useCallback } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Float } from "@react-three/drei";
import * as THREE from "three";

/* ── Color palette ── */
const GUNMETAL = "#6a6a6e";
const GUNMETAL_LIGHT = "#8a8a90";
const GUNMETAL_DARK = "#4a4a4e";
const CYAN_GLOW = "#00e5ff";
const PURPLE_GLOW = "#b388ff";
const GLITCH_RED = "#ff1744";
const GLITCH_BLUE = "#2979ff";

/* ── Glitch audio (short static burst) ── */
let glitchAudioCtx: AudioContext | null = null;
function playGlitchSound() {
  try {
    if (!glitchAudioCtx) glitchAudioCtx = new AudioContext();
    const ctx = glitchAudioCtx;
    const buf = ctx.createBuffer(1, ctx.sampleRate * 0.08, ctx.sampleRate);
    const data = buf.getChannelData(0);
    for (let i = 0; i < data.length; i++) {
      data[i] = (Math.random() * 2 - 1) * 0.3;
    }
    const src = ctx.createBufferSource();
    src.buffer = buf;
    const gain = ctx.createGain();
    gain.gain.value = 0.15;
    src.connect(gain).connect(ctx.destination);
    src.start();
  } catch {
    /* audio not permitted */
  }
}

/* ── Code-pattern texture ── */
function useCodeTexture(glitching: boolean) {
  return useMemo(() => {
    const canvas = document.createElement("canvas");
    canvas.width = 256;
    canvas.height = 256;
    const ctx = canvas.getContext("2d")!;
    ctx.fillStyle = "#0a0a0f";
    ctx.fillRect(0, 0, 256, 256);
    const lines = [
      "fn main() {",
      "  let x = init();",
      "  loop {",
      "    process(x);",
      "    if done { break }",
      "  }",
      "  emit(result);",
      "}",
      "// NEUROFEED v4.2",
      "async deploy() =>",
      "  await sync();",
      "  broadcast(all);",
    ];
    ctx.font = "11px monospace";
    lines.forEach((line, i) => {
      const normalColor = i % 3 === 0 ? CYAN_GLOW : i % 3 === 1 ? PURPLE_GLOW : "#4fc3f7";
      const glitchColor = i % 2 === 0 ? GLITCH_RED : GLITCH_BLUE;
      ctx.fillStyle = glitching ? glitchColor : normalColor;
      ctx.globalAlpha = 0.4 + Math.random() * 0.3;
      ctx.fillText(line, 8, 18 + i * 20);
    });
    ctx.globalAlpha = 1;
    const tex = new THREE.CanvasTexture(canvas);
    tex.needsUpdate = true;
    return tex;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [glitching]);
}

/* ── Eye with cursor tracking ── */
function Eye({
  position,
  mouseRef,
  glitching,
}: {
  position: [number, number, number];
  mouseRef: React.RefObject<{ x: number; y: number }>;
  glitching: boolean;
}) {
  const irisRef = useRef<THREE.Mesh>(null);

  useFrame(() => {
    if (!irisRef.current || !mouseRef.current) return;
    const tx = mouseRef.current.x * 0.08;
    const ty = mouseRef.current.y * 0.06;
    irisRef.current.position.x = position[0] + tx;
    irisRef.current.position.y = position[1] + ty;
    irisRef.current.position.z = position[2] + 0.06;
  });

  const normalColor = CYAN_GLOW;
  const glitchColor = glitching ? (Math.random() > 0.5 ? GLITCH_RED : GLITCH_BLUE) : normalColor;

  return (
    <group>
      <mesh position={position}>
        <boxGeometry args={[0.22, 0.22, 0.05]} />
        <meshStandardMaterial color="#080810" roughness={0.2} metalness={0.9} />
      </mesh>
      <mesh ref={irisRef} position={[position[0], position[1], position[2] + 0.06]}>
        <boxGeometry args={[0.14, 0.14, 0.04]} />
        <meshStandardMaterial
          color={glitchColor}
          emissive={glitchColor}
          emissiveIntensity={glitching ? 8 : 4}
          toneMapped={false}
        />
      </mesh>
      <pointLight
        position={[position[0], position[1], position[2] + 0.4]}
        color={glitchColor}
        intensity={glitching ? 2 : 0.8}
        distance={3}
      />
    </group>
  );
}

/* ── RGB shift meshes for glitch chromatic aberration ── */
function GlitchShiftLayers({ visible }: { visible: boolean }) {
  const redRef = useRef<THREE.Mesh>(null);
  const blueRef = useRef<THREE.Mesh>(null);

  useFrame(() => {
    if (!visible) return;
    if (redRef.current) {
      redRef.current.position.x = (Math.random() - 0.5) * 0.06;
      redRef.current.position.y = (Math.random() - 0.5) * 0.04;
    }
    if (blueRef.current) {
      blueRef.current.position.x = (Math.random() - 0.5) * 0.06;
      blueRef.current.position.y = (Math.random() - 0.5) * 0.04;
    }
  });

  if (!visible) return null;

  return (
    <>
      <mesh ref={redRef} position={[0, 0.25, 0.8]}>
        <sphereGeometry args={[0.76, 32, 32]} />
        <meshStandardMaterial color={GLITCH_RED} transparent opacity={0.08} wireframe />
      </mesh>
      <mesh ref={blueRef} position={[0, 0.25, 0.8]}>
        <sphereGeometry args={[0.76, 32, 32]} />
        <meshStandardMaterial color={GLITCH_BLUE} transparent opacity={0.08} wireframe />
      </mesh>
    </>
  );
}

/* ── Baby Cybernetic Bot mesh ── */
function BabyBotMesh({
  mouseRef,
  glitching,
}: {
  mouseRef: React.RefObject<{ x: number; y: number }>;
  glitching: boolean;
}) {
  const groupRef = useRef<THREE.Group>(null);
  const codeTexture = useCodeTexture(glitching);
  const { viewport } = useThree();

  useFrame((_, delta) => {
    if (!groupRef.current || !mouseRef.current) return;

    const targetRotY = mouseRef.current.x * 0.4;
    const targetRotX = -mouseRef.current.y * 0.2;
    groupRef.current.rotation.y += (targetRotY - groupRef.current.rotation.y) * delta * 4;
    groupRef.current.rotation.x += (targetRotX - groupRef.current.rotation.x) * delta * 4;

    const targetX = mouseRef.current.x * 0.12;
    const targetY = mouseRef.current.y * 0.08;
    groupRef.current.position.x += (targetX - groupRef.current.position.x) * delta * 3;
    groupRef.current.position.y += (0.1 + targetY - groupRef.current.position.y) * delta * 3;

    // Intense vibration during glitch
    if (glitching) {
      groupRef.current.position.x += (Math.random() - 0.5) * 0.05;
      groupRef.current.position.y += (Math.random() - 0.5) * 0.03;
      // Occasional big displacement (the "come and go")
      if (Math.random() > 0.92) {
        groupRef.current.position.z = (Math.random() - 0.5) * 0.15;
      } else {
        groupRef.current.position.z *= 0.9;
      }
    } else {
      groupRef.current.position.z *= 0.9;
    }
  });

  const s = viewport.width > 8 ? 1.5 : 1.1;

  return (
    <Float speed={1.5} rotationIntensity={0.05} floatIntensity={0.25}>
      <group ref={groupRef} position={[0, 0.1, 0]} scale={s}>
        {/* ── Head ── */}
        <mesh position={[0, 0.25, 0]} castShadow>
          <sphereGeometry args={[0.75, 64, 64]} />
          <meshStandardMaterial color={GUNMETAL} roughness={0.45} metalness={0.85} />
        </mesh>

        {/* Forehead accent ridge */}
        <mesh position={[0, 0.72, 0.15]}>
          <torusGeometry args={[0.32, 0.035, 8, 32]} />
          <meshStandardMaterial color={GUNMETAL_LIGHT} roughness={0.35} metalness={0.9} />
        </mesh>

        {/* ── Face screen ── */}
        <mesh position={[0, 0.1, 0.58]}>
          <planeGeometry args={[0.8, 0.55]} />
          <meshStandardMaterial map={codeTexture} roughness={0.4} metalness={0.3} transparent opacity={0.9} />
        </mesh>

        {/* Face bezel */}
        <mesh position={[0, 0.1, 0.55]} castShadow>
          <boxGeometry args={[0.9, 0.65, 0.06]} />
          <meshStandardMaterial color={GUNMETAL_DARK} roughness={0.4} metalness={0.85} />
        </mesh>

        {/* ── Eyes ── */}
        <Eye position={[-0.18, 0.12, 0.59]} mouseRef={mouseRef} glitching={glitching} />
        <Eye position={[0.18, 0.12, 0.59]} mouseRef={mouseRef} glitching={glitching} />

        {/* ── Ear modules ── */}
        {([-1, 1] as const).map((side) => (
          <group key={side}>
            <mesh position={[side * 0.78, 0.2, 0]} castShadow>
              <boxGeometry args={[0.14, 0.32, 0.24]} />
              <meshStandardMaterial color={GUNMETAL_DARK} roughness={0.4} metalness={0.9} />
            </mesh>
            <mesh position={[side * 0.78, 0.2, 0.13]}>
              <boxGeometry args={[0.03, 0.2, 0.03]} />
              <meshStandardMaterial
                color={glitching ? GLITCH_RED : CYAN_GLOW}
                emissive={glitching ? GLITCH_RED : CYAN_GLOW}
                emissiveIntensity={glitching ? 6 : 2}
                toneMapped={false}
              />
            </mesh>
          </group>
        ))}

        {/* ── Antenna nubbins ── */}
        {([-1, 1] as const).map((side) => (
          <group key={`ant-${side}`}>
            <mesh position={[side * 0.3, 0.92, 0]}>
              <cylinderGeometry args={[0.028, 0.028, 0.22, 8]} />
              <meshStandardMaterial color={GUNMETAL_LIGHT} roughness={0.3} metalness={0.9} />
            </mesh>
            <mesh position={[side * 0.3, 1.06, 0]}>
              <sphereGeometry args={[0.05, 16, 16]} />
              <meshStandardMaterial
                color={glitching ? GLITCH_BLUE : CYAN_GLOW}
                emissive={glitching ? GLITCH_BLUE : CYAN_GLOW}
                emissiveIntensity={glitching ? 5 : 2}
                toneMapped={false}
              />
            </mesh>
          </group>
        ))}

        {/* ── Body / torso ── */}
        <mesh position={[0, -0.65, 0]} castShadow>
          <capsuleGeometry args={[0.42, 0.35, 16, 32]} />
          <meshStandardMaterial color={GUNMETAL} roughness={0.45} metalness={0.85} />
        </mesh>

        {/* Chest plate */}
        <mesh position={[0, -0.55, 0.38]} castShadow>
          <boxGeometry args={[0.4, 0.22, 0.06]} />
          <meshStandardMaterial color={GUNMETAL_DARK} roughness={0.35} metalness={0.9} />
        </mesh>
        <mesh position={[0, -0.55, 0.42]}>
          <boxGeometry args={[0.3, 0.04, 0.02]} />
          <meshStandardMaterial
            color={glitching ? GLITCH_RED : CYAN_GLOW}
            emissive={glitching ? GLITCH_RED : CYAN_GLOW}
            emissiveIntensity={glitching ? 8 : 1.5}
            toneMapped={false}
          />
        </mesh>

        {/* ── Arms ── */}
        {([-1, 1] as const).map((side) => (
          <group key={`arm-${side}`}>
            <mesh position={[side * 0.55, -0.6, 0]} rotation={[0, 0, side * 0.35]} castShadow>
              <capsuleGeometry args={[0.09, 0.22, 8, 16]} />
              <meshStandardMaterial color={GUNMETAL_LIGHT} roughness={0.45} metalness={0.85} />
            </mesh>
            <mesh position={[side * 0.72, -0.82, 0]} castShadow>
              <sphereGeometry args={[0.08, 16, 16]} />
              <meshStandardMaterial color={GUNMETAL} roughness={0.4} metalness={0.85} />
            </mesh>
          </group>
        ))}

        {/* ── Legs ── */}
        {([-1, 1] as const).map((side) => (
          <group key={`leg-${side}`}>
            <mesh position={[side * 0.18, -1.08, 0]} castShadow>
              <capsuleGeometry args={[0.09, 0.12, 8, 16]} />
              <meshStandardMaterial color={GUNMETAL} roughness={0.45} metalness={0.85} />
            </mesh>
            <mesh position={[side * 0.18, -1.26, 0.04]} castShadow>
              <boxGeometry args={[0.13, 0.07, 0.18]} />
              <meshStandardMaterial color={GUNMETAL_DARK} roughness={0.4} metalness={0.9} />
            </mesh>
          </group>
        ))}

        {/* ── Pedestal ── */}
        <mesh position={[0, -1.45, 0]} receiveShadow>
          <boxGeometry args={[0.65, 0.12, 0.45]} />
          <meshStandardMaterial color="#2a2a30" roughness={0.5} metalness={0.7} />
        </mesh>

        {/* ── Chromatic aberration glitch layers ── */}
        <GlitchShiftLayers visible={glitching} />
      </group>
    </Float>
  );
}

function Scene({
  mouseRef,
  glitching,
}: {
  mouseRef: React.RefObject<{ x: number; y: number }>;
  glitching: boolean;
}) {
  return (
    <>
      <ambientLight intensity={0.5} />
      <directionalLight position={[5, 5, 5]} intensity={0.8} color="#f0f0f0" castShadow />
      <directionalLight position={[-4, 4, 3]} intensity={0.4} color={CYAN_GLOW} />
      <pointLight position={[0, 2, 4]} intensity={0.8} color={CYAN_GLOW} distance={12} />
      <pointLight position={[-2, -1, 3]} intensity={0.4} color={PURPLE_GLOW} distance={10} />
      {/* Rim light for separation from background */}
      <pointLight position={[0, 0, -3]} intensity={0.5} color="#ffffff" distance={8} />
      <spotLight position={[0, 3, 3]} angle={0.5} penumbra={0.5} intensity={0.6} color="#e0e8ff" castShadow />
      <BabyBotMesh mouseRef={mouseRef} glitching={glitching} />
    </>
  );
}

export function RobotHead() {
  const mouseRef = useRef({ x: 0, y: 0 });
  const [glitching, setGlitching] = useState(false);
  const glitchSoundPlayed = useRef(false);

  // SCREEN-WIDE cursor tracking via window mousemove
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = {
        x: (e.clientX / window.innerWidth - 0.5) * 2,
        y: -((e.clientY / window.innerHeight) - 0.5) * 2,
      };
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const handleEnter = useCallback(() => {
    setGlitching(true);
    if (!glitchSoundPlayed.current) {
      glitchSoundPlayed.current = true;
      playGlitchSound();
      // Allow replaying after a short delay
      setTimeout(() => { glitchSoundPlayed.current = false; }, 300);
    }
  }, []);

  const handleLeave = useCallback(() => {
    setGlitching(false);
  }, []);

  return (
    <div
      className="relative h-full w-full min-h-[500px]"
      onPointerEnter={handleEnter}
      onPointerLeave={handleLeave}
    >
      {/* Multi-layer glitch overlay */}
      {glitching && (
        <>
          {/* Scanline overlay */}
          <div
            className="pointer-events-none absolute inset-0 z-10 mix-blend-screen opacity-15"
            style={{
              background: `repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,23,68,0.12) 2px, rgba(255,23,68,0.12) 3px, transparent 3px, transparent 5px, rgba(41,121,255,0.10) 5px, rgba(41,121,255,0.10) 6px)`,
            }}
          />
          {/* RGB shift overlay */}
          <div
            className="pointer-events-none absolute inset-0 z-10 mix-blend-screen animate-pulse opacity-20"
            style={{
              background: `linear-gradient(90deg, rgba(255,23,68,0.15) 0%, transparent 30%, rgba(41,121,255,0.15) 70%, transparent 100%)`,
              transform: `translateX(${(Math.random() - 0.5) * 8}px)`,
            }}
          />
        </>
      )}
      <Canvas
        camera={{ position: [0, -0.2, 4.5], fov: 40 }}
        gl={{ antialias: true, alpha: true }}
        shadows
        style={{ background: "transparent" }}
      >
        <Scene mouseRef={mouseRef} glitching={glitching} />
      </Canvas>
    </div>
  );
}
