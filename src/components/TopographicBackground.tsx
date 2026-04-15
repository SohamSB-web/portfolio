import { useRef, useEffect, useCallback } from 'react'
import * as THREE from 'three'

// Vertex shader
const vertexShader = `
varying vec2 vUv;
void main() {
  vUv = uv;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
`

// Fragment shader
const fragmentShader = `
uniform float uTime;
uniform vec2 uMouse;
uniform vec2 uResolution;
varying vec2 vUv;

// Simplex 2D noise
//
vec3 permute(vec3 x) { return mod(((x*34.0)+1.0)*x, 289.0); }

float snoise(vec2 v){
  const vec4 C = vec4(0.211324865405187, 0.366025403784439,
           -0.577350269189626, 0.024390243902439);
  vec2 i  = floor(v + dot(v, C.yy));
  vec2 x0 = v - i + dot(i, C.xx);
  vec2 i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
  vec4 x12 = x0.xyxy + C.xxzz;
  x12.xy -= i1;
  i = mod(i, 289.0);
  vec3 p = permute(permute(i.y + vec3(0.0, i1.y, 1.0)) + i.x + vec3(0.0, i1.x, 1.0));
  vec3 m = max(0.5 - vec3(dot(x0,x0), dot(x12.xy,x12.xy), dot(x12.zw,x12.zw)), 0.0);
  m = m*m;
  m = m*m;
  vec3 x = 2.0 * fract(p * C.www) - 1.0;
  vec3 h = abs(x) - 0.5;
  vec3 ox = floor(x + 0.5);
  vec3 a0 = x - ox;
  m *= 1.79284291400159 - 0.85373472095314 * (a0*a0 + h*h);
  vec3 g;
  g.x  = a0.x  * x0.x  + h.x  * x0.y;
  g.yz = a0.yz * x12.xz + h.yz * x12.yw;
  return 130.0 * dot(m, g);
}

void main() {
  vec2 uv = vUv;
  float aspect = uResolution.x / uResolution.y;
  
  // Adjust UVs for aspect ratio so noise isn't stretched
  vec2 st = uv;
  st.x *= aspect;

  vec2 mouseUv = uMouse;
  mouseUv.x *= aspect;

  // Mouse interaction: push/pull the noise field
  float dist = distance(st, mouseUv);
  float influence = smoothstep(1.2, 0.0, dist);
  vec2 dir = st - mouseUv;
  st += dir * (influence * 0.7);

  // Slow down the base animation for a more relaxed feel
  float t = uTime * 0.03;

  // Generate layered noise for complex terrain (larger scale for wider gaps)
  float n = snoise(st * 0.4 + t);
  n += 0.5 * snoise(st * 0.8 - t * 0.7);
  n += 0.25 * snoise(st * 1.6 + t * 0.5);
  
  // Normalize noise to 0.0 - 1.0
  n = n * 0.5 + 0.5;

  // Topographic lines by taking the fractional part
  // Reduced density to drastically decrease the number of lines
  float contourDensity = 3.5;
  float val = n * contourDensity;
  float line = fract(val);
  
  // Anti-aliased thin lines based on derivative for uniform thickness
  float fw = fwidth(val); // change in value over pixels
  float thickness = 0.06; // Slightly thicker lines for a bolder look
  
  // Smooth line drawing
  float smoothLine = smoothstep(thickness + fw, thickness, line) + 
                     smoothstep(1.0 - thickness - fw, 1.0 - thickness, line);

  // Colors adapted for LIGHT theme
  vec3 bgColor = vec3(0.95, 0.95, 0.95);  // #F2F2F2
  vec3 lineColor = vec3(0.7, 0.7, 0.7);   // Softer gray lines

  // Mix based on the line intensity
  vec3 finalColor = mix(bgColor, lineColor, smoothLine * 0.6);

  gl_FragColor = vec4(finalColor, 1.0);
}
`

export const TopographicBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null)
  const materialRef = useRef<THREE.ShaderMaterial | null>(null)
  const animationFrameRef = useRef<number>(0)
  const clockRef = useRef(new THREE.Clock())

  // Smoothly interpolate mouse target
  const targetMouseRef = useRef({ x: 0.5, y: 0.5 })
  const currentMouseRef = useRef({ x: 0.5, y: 0.5 })

  const handleMouseMove = useCallback((e: MouseEvent) => {
    targetMouseRef.current.x = e.clientX / window.innerWidth
    // Invert Y for WebGL coordinates (0,0 is bottom left)
    targetMouseRef.current.y = 1.0 - (e.clientY / window.innerHeight)
  }, [])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    // Create renderer
    const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true })
    renderer.setSize(window.innerWidth, window.innerHeight)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    rendererRef.current = renderer

    // Camera
    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0.1, 10)
    camera.position.z = 1

    // Scene
    const scene = new THREE.Scene()

    // Material
    const material = new THREE.ShaderMaterial({
      vertexShader,
      fragmentShader,
      uniforms: {
        uTime: { value: 0 },
        uMouse: { value: new THREE.Vector2(0.5, 0.5) },
        uResolution: { value: new THREE.Vector2(window.innerWidth, window.innerHeight) }
      }
    })
    materialRef.current = material

    // Mesh
    const geometry = new THREE.PlaneGeometry(2, 2)
    const mesh = new THREE.Mesh(geometry, material)
    scene.add(mesh)

    // Animation loop
    const animate = () => {
      animationFrameRef.current = requestAnimationFrame(animate)

      // Very smooth mouse interpolation for elegant, delayed magnetic response
      currentMouseRef.current.x += (targetMouseRef.current.x - currentMouseRef.current.x) * 0.02
      currentMouseRef.current.y += (targetMouseRef.current.y - currentMouseRef.current.y) * 0.02

      material.uniforms.uTime.value = clockRef.current.getElapsedTime()
      material.uniforms.uMouse.value.set(currentMouseRef.current.x, currentMouseRef.current.y)

      renderer.render(scene, camera)
    }

    animate()

    // Resize handler
    const handleResize = () => {
      renderer.setSize(window.innerWidth, window.innerHeight)
      material.uniforms.uResolution.value.set(window.innerWidth, window.innerHeight)
    }

    window.addEventListener('resize', handleResize)
    window.addEventListener('mousemove', handleMouseMove)

    return () => {
      cancelAnimationFrame(animationFrameRef.current)
      window.removeEventListener('resize', handleResize)
      window.removeEventListener('mousemove', handleMouseMove)
      renderer.dispose()
      geometry.dispose()
      material.dispose()
    }
  }, [handleMouseMove])

  return (
    <canvas
      ref={canvasRef}
      className="fixed top-0 left-0 w-full h-full -z-10 bg-[#F2F2F2]"
      style={{ pointerEvents: 'none' }}
    />
  )
}
