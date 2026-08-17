/* AeroVision Signal / Silence: aerospace instrumentation, asymmetry, graphite depth, and restrained motion. */
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Environment, Float, Line, OrbitControls, PerspectiveCamera } from "@react-three/drei";
import { useEffect, useMemo, useRef, useState } from "react";
import * as THREE from "three";
import { ArrowDownRight, BatteryCharging, Gauge, Headphones, Lightbulb, Maximize2, Move3D, Power, RotateCcw, Zap } from "lucide-react";

const COLORS = {
  pink: "#e74887",
  cyan: "#72d7e6",
  black: "#34383d",
} as const;

type ColorKey = keyof typeof COLORS;
type HotspotKey = "engine" | "wheel" | null;

function Vehicle({ color, exploded, wireframe, pointer }: { color: string; exploded: boolean; wireframe: boolean; pointer: { x: number; y: number } }) {
  const root = useRef<THREE.Group>(null);
  const { viewport } = useThree();
  useFrame((state, delta) => {
    if (!root.current) return;
    const targetRotY = pointer.x * 0.22 + state.clock.elapsedTime * 0.11;
    const targetRotX = pointer.y * -0.12;
    root.current.rotation.y = THREE.MathUtils.damp(root.current.rotation.y, targetRotY, 3, delta);
    root.current.rotation.x = THREE.MathUtils.damp(root.current.rotation.x, targetRotX, 3, delta);
    root.current.position.y = THREE.MathUtils.damp(root.current.position.y, Math.sin(state.clock.elapsedTime * 1.1) * 0.08, 3, delta);
    root.current.scale.setScalar(1.05);
  });

  const partY = exploded ? 0.62 : 0;
  const wheelLift = exploded ? 0.34 : 0;
  const doorSpread = exploded ? 0.52 : 0;
  const wheel = (x: number, z: number) => <mesh position={[x, -0.13 - wheelLift, z]} rotation={[Math.PI / 2, 0, 0]} castShadow><cylinderGeometry args={[0.27, 0.27, 0.14, 32]} /><meshStandardMaterial color="#10151a" metalness={0.9} roughness={0.26} wireframe={wireframe} /></mesh>;

  return (
    <group ref={root}>
      <Float speed={1.25} rotationIntensity={0.08} floatIntensity={0.18}>
        <group>
          <mesh position={[0, partY * 0.22, 0]} scale={[1, 0.34, 0.66]} castShadow receiveShadow>
            <boxGeometry args={[2.8, 0.62, 1.4]} />
            <meshBasicMaterial color={color} wireframe={wireframe} />
          </mesh>
          <mesh position={[0.02, 0.34 + partY, 0]} scale={[1.0, 0.38, 0.75]} castShadow>
            <boxGeometry args={[1.45, 0.42, 0.94]} />
            <meshBasicMaterial color="#8be6ef" transparent opacity={0.78} wireframe={wireframe} />
          </mesh>
          <mesh position={[0, -0.03, 0]}>
            <boxGeometry args={[1.26, 0.08, 3.08]} />
            <meshStandardMaterial color="#10151a" metalness={0.9} roughness={0.26} wireframe={wireframe} />
          </mesh>
          <mesh position={[0, -0.17 - (exploded ? 0.24 : 0), 0]}>
            <boxGeometry args={[0.84, 0.18, 1.4]} />
            <meshStandardMaterial color="#ff6a3d" emissive="#ff3517" emissiveIntensity={2.5} wireframe={wireframe} />
          </mesh>
          <mesh position={[0, 0.02 + partY, 0.88 + doorSpread]} rotation={[0, 0, Math.PI / 2]}>
            <boxGeometry args={[0.02, 0.62, 0.88]} />
            <meshPhysicalMaterial color={color} metalness={0.66} roughness={0.18} clearcoat={1} emissive={color} emissiveIntensity={wireframe ? 0.85 : 0.18} wireframe={wireframe} />
          </mesh>
          <mesh position={[0, 0.02 + partY, -0.88 - doorSpread]} rotation={[0, 0, Math.PI / 2]}>
            <boxGeometry args={[0.02, 0.62, 0.88]} />
            <meshPhysicalMaterial color={color} metalness={0.66} roughness={0.18} clearcoat={1} emissive={color} emissiveIntensity={wireframe ? 0.85 : 0.18} wireframe={wireframe} />
          </mesh>
          {wheel(-0.64 - doorSpread * 0.2, 0.87)}{wheel(0.64 + doorSpread * 0.2, 0.87)}{wheel(-0.64 - doorSpread * 0.2, -0.87)}{wheel(0.64 + doorSpread * 0.2, -0.87)}
          <mesh position={[0, 0.6 + partY * 1.6, 0]} rotation={[0, 0, Math.PI / 2]}>
            <torusGeometry args={[0.52, 0.018, 10, 50]} />
            <meshStandardMaterial color="#ff6a3d" emissive="#ff3517" emissiveIntensity={2.5} wireframe={wireframe} />
          </mesh>
        </group>
      </Float>
    </group>
  );
}

function Scene({ color, exploded, wireframe, pointer, night }: { color: string; exploded: boolean; wireframe: boolean; pointer: { x: number; y: number }; night: boolean }) {
  return <Canvas shadows dpr={[1, 1.8]} gl={{ antialias: true }} onCreated={({ camera }) => camera.lookAt(0, 0, 0)}>
    <PerspectiveCamera makeDefault position={[0, 0.1, 5.4]} fov={34} />
    <ambientLight intensity={night ? 0.3 : 0.65} />
    <directionalLight position={[3, 4, 4]} intensity={night ? 1.4 : 2.8} color={night ? "#84d8ff" : "#fff5e5"} castShadow />
    <pointLight position={[-3, 1, 2]} intensity={night ? 20 : 8} color="#ff6a3d" distance={8} />
    <pointLight position={[2, 0, -2]} intensity={night ? 13 : 5} color="#73d9e8" distance={7} />
    <Vehicle color={color} exploded={exploded} wireframe={wireframe} pointer={pointer} />
    <Environment preset={night ? "night" : "city"} background={false} />
    <OrbitControls enableZoom={false} enablePan={false} autoRotate={false} minPolarAngle={1.1} maxPolarAngle={2.1} />
  </Canvas>;
}

function Telemetry({ label, value, detail, accent = false }: { label: string; value: string; detail: string; accent?: boolean }) {
  return <div className={`telemetry ${accent ? "telemetry-accent" : ""}`}><span>{label}</span><strong>{value}</strong><small>{detail}</small></div>;
}

function AppMark() { return <img className="app-mark" src="/manus-storage/aerovision-av-mark_ec911584.png" alt="AeroVision AV mark" />; }

export default function Home() {
  const [colorKey, setColorKey] = useState<ColorKey>("cyan");
  const [wireframe, setWireframe] = useState(false);
  const [night, setNight] = useState(false);
  const [soundOn, setSoundOn] = useState(false);
  const [exploded, setExploded] = useState(false);
  const [hotspot, setHotspot] = useState<HotspotKey>(null);
  const [pointer, setPointer] = useState({ x: 0, y: 0 });
  const [showReserve, setShowReserve] = useState(false);
  const audioRef = useRef<{ ctx: AudioContext; gain: GainNode; osc: OscillatorNode } | null>(null);

  useEffect(() => {
    const onMove = (event: MouseEvent) => setPointer({ x: (event.clientX / window.innerWidth - 0.5) * 2, y: (event.clientY / window.innerHeight - 0.5) * 2 });
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  useEffect(() => {
    const onScroll = () => setExploded(window.scrollY > window.innerHeight * 0.38);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const toggleSound = () => {
    if (!audioRef.current) {
      const ctx = new AudioContext(); const gain = ctx.createGain(); const osc = ctx.createOscillator();
      osc.type = "sine"; osc.frequency.value = 72; gain.gain.value = 0.035; osc.connect(gain).connect(ctx.destination); osc.start(); audioRef.current = { ctx, gain, osc };
    }
    const next = !soundOn; setSoundOn(next);
    if (next) { audioRef.current.ctx.resume(); audioRef.current.gain.gain.setTargetAtTime(0.04, audioRef.current.ctx.currentTime, 0.2); }
    else { audioRef.current.gain.gain.setTargetAtTime(0, audioRef.current.ctx.currentTime, 0.15); }
  };

  const scrollToSpecs = () => document.getElementById("specs")?.scrollIntoView({ behavior: "smooth" });
  const color = COLORS[colorKey];

  return <main className={`aero-app ${night ? "night-mode" : ""}`}>
    <div className="atmosphere" />
    <header className="topbar">
      <a className="brand" href="#top"><AppMark /><span>AEROVISION <em>V—1</em></span></a>
      <nav><a href="#system">SYSTEM</a><a href="#specs">SPECS</a><a href="#reserve">RESERVE</a></nav>
      <button className={`sound-toggle ${soundOn ? "is-on" : ""}`} onClick={toggleSound} aria-label="Toggle ambient sound"><Headphones size={14} /> {soundOn ? "SOUND ON" : "SOUND OFF"}</button>
    </header>

    <section id="top" className="hero-section">
      <div className="hero-copy">
        <p className="eyebrow"><span className="signal-dot" /> AV / FLIGHT 001 / 2026</p>
        <h1>AEROVISION<br /><span>V—1</span></h1>
        <p className="hero-deck">The air is not empty.<br />It is part of the machine.</p>
        <button className="line-cta" onClick={scrollToSpecs}><span>ENTER THE MACHINE</span><ArrowDownRight size={17} /></button>
      </div>
      <div className="hero-meta"><span>HYPER ELECTRIC PLATFORM</span><span>01 / 04</span></div>
      <div className="scene-stage"><Scene color={color} exploded={exploded} wireframe={wireframe} pointer={pointer} night={night} /><div className={`vehicle-fallback ${exploded ? "is-exploded" : ""} ${wireframe ? "is-wireframe" : ""}`} style={{ "--vehicle-color": color, "--tilt-x": `${pointer.y * -3}deg`, "--tilt-y": `${pointer.x * 5}deg` } as React.CSSProperties}><div className="fallback-body"><div className="fallback-cabin" /><div className="fallback-stripe" /><span className="fallback-wheel wheel-a" /><span className="fallback-wheel wheel-b" /><span className="fallback-wheel wheel-c" /><span className="fallback-wheel wheel-d" /></div></div><div className="scene-crosshair" /><div className="scene-caption">LIVE RENDER / POINTER TRACKING ENABLED</div></div>
      <div className="hero-right-rail"><Telemetry label="POWERTRAIN" value="QUAD / EV" detail="TORQUE VECTORING" /><Telemetry label="AIRFRAME" value="0.31 Cd" detail="ACTIVE AERO" accent /><Telemetry label="STATUS" value="FLIGHT READY" detail="SYSTEMS NOMINAL" /></div>
      <button className="scroll-cue" onClick={scrollToSpecs}><span>SCROLL TO DECONSTRUCT</span><span className="scroll-line" /></button>
    </section>

    <section id="system" className="exploded-section">
      <div className="section-index">02 <span>/</span> DECONSTRUCT</div>
      <div className="exploded-copy"><p className="eyebrow">THE MACHINE, OPEN</p><h2>Every layer<br /><i>reveals intent.</i></h2><p>Scroll to separate the architecture. Four motors. One carbon spine. Zero compromise between velocity and control.</p></div>
      <div className="hotspot-stack"><button onClick={() => setHotspot("engine")} className={`hotspot-card ${hotspot === "engine" ? "active" : ""}`}><span className="hotspot-symbol">+</span><span><b>01 / CORE</b><strong>Quad Motor Array</strong><small>Instant torque / 2,400 Nm</small></span></button><button onClick={() => setHotspot("wheel")} className={`hotspot-card ${hotspot === "wheel" ? "active" : ""}`}><span className="hotspot-symbol">+</span><span><b>02 / CONTACT</b><strong>Carbon Aero Wheel</strong><small>Regenerative ceramic brake</small></span></button></div>
      {hotspot && <div className="hotspot-popover"><button onClick={() => setHotspot(null)} aria-label="Close hotspot">×</button><span className="eyebrow">{hotspot === "engine" ? "01 / CORE" : "02 / CONTACT"}</span><h3>{hotspot === "engine" ? "Quad Motor Array" : "Carbon Aero Wheel"}</h3><p>{hotspot === "engine" ? "Four independent motors distribute torque in 4ms. The result is 320 MPH of quiet, controlled force." : "Forged carbon fiber meets a ceramic regenerative braking system built to shed speed with the same precision as it creates it."}</p><div className="popover-stat"><strong>{hotspot === "engine" ? "320" : "1.4"}</strong><span>{hotspot === "engine" ? "MPH / TOP SPEED" : "G / BRAKE LOAD"}</span></div></div>}
      <div className="exploded-footer"><span>SCROLL POSITION</span><div className="progress-bar"><i /></div><span>42.6 M / 100 M</span></div>
    </section>

    <section className="control-section">
      <div className="section-index">03 <span>/</span> CONFIGURE</div>
      <div className="control-intro"><p className="eyebrow">CONTROL DECK</p><h2>Make it<br /><i>yours.</i></h2><p>Change the surface, reveal the system, tune the light. The live render updates in place.</p></div>
      <div className="control-deck">
        <div className="deck-heading"><span>LIVE CONFIGURATION</span><b><span className="signal-dot" /> CONNECTED</b></div>
        <div className="deck-row"><div><label>PAINT / SURFACE</label><div className="swatches">{(Object.keys(COLORS) as ColorKey[]).map((key) => <button key={key} aria-label={`Set ${key} paint`} className={`swatch ${colorKey === key ? "selected" : ""}`} style={{ backgroundColor: COLORS[key] }} onClick={() => setColorKey(key)} />)}</div></div><span className="deck-readout">{colorKey.toUpperCase()}<small>ACTIVE FINISH</small></span></div>
        <div className="deck-divider" />
        <button className={`deck-toggle ${wireframe ? "selected" : ""}`} onClick={() => setWireframe(!wireframe)}><Move3D size={17} /><span><b>X-RAY / WIREFRAME</b><small>REVEAL THE FRAMEWORK</small></span><span className="toggle-state">{wireframe ? "ON" : "OFF"}</span></button>
        <button className={`deck-toggle ${night ? "selected" : ""}`} onClick={() => setNight(!night)}><Lightbulb size={17} /><span><b>NEON CITY LIGHTING</b><small>STUDIO / NIGHT MODE</small></span><span className="toggle-state">{night ? "ON" : "OFF"}</span></button>
        <div className="deck-foot"><span><Maximize2 size={13} /> DRAG TO ROTATE</span><span><RotateCcw size={13} /> RESET VIEW</span></div>
      </div>
    </section>

    <section id="specs" className="specs-section"><div className="section-index">04 <span>/</span> SPEC SHEET</div><div className="specs-heading"><p className="eyebrow">PERFORMANCE / WITHOUT THE NOISE</p><h2>Numbers that<br /><i>move air.</i></h2></div><div className="spec-grid"><div className="spec-lead"><span className="spec-kicker">V—1 / FLIGHT DATA</span><strong>320</strong><span>MPH TOP SPEED</span><p>Built for the straight line. Engineered for every corner after it.</p></div><div className="spec-tile"><Gauge size={19} /><span>0—60 MPH</span><strong>1.9 sec</strong><small>launch control enabled</small></div><div className="spec-tile"><BatteryCharging size={19} /><span>BATTERY CAPACITY</span><strong>118 kWh</strong><small>800V architecture</small></div><div className="spec-tile"><Zap size={19} /><span>PEAK POWER</span><strong>1,420 hp</strong><small>quad motor array</small></div></div></section>

    <section id="reserve" className="reserve-section"><div className="reserve-orbit" /><div className="section-index">05 <span>/</span> FIRST FLIGHT</div><div className="reserve-copy"><p className="eyebrow"><span className="signal-dot" /> LIMITED PRODUCTION / 001—100</p><h2>Reserve a position<br />in the <i>first flight.</i></h2><p>AeroVision V—1 is a limited run of 100 vehicles. Join the private release list for build slots, studio previews, and the first invitation to drive.</p><button className="reserve-button" onClick={() => setShowReserve(true)}>REQUEST A BUILD SLOT <ArrowDownRight size={18} /></button></div><div className="reserve-footer"><AppMark /><span>AEROVISION / THE FUTURE IS IN MOTION</span><span>© 2026 AEROVISION MOTOR CO.</span></div></section>
    {showReserve && <div className="reserve-modal" role="dialog" aria-modal="true"><div className="modal-card"><button className="modal-close" onClick={() => setShowReserve(false)}>×</button><span className="eyebrow">BUILD SLOT REQUEST</span><h3>Signal received.</h3><p>Leave your details and the AeroVision studio will follow up with your private configuration window.</p><input placeholder="YOUR NAME" /><input placeholder="EMAIL / PHONE" /><button className="reserve-button" onClick={() => setShowReserve(false)}>TRANSMIT REQUEST <Power size={15} /></button></div></div>}
  </main>;
}
