import { useRef, useEffect, useCallback } from 'react'
import * as THREE from 'three'

// Simplex noise GLSL
const vertexShader = `
varying vec2 vUv;
void main() {
  vUv = uv;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
`

const fragmentShader = `
uniform float uTime;
uniform vec2 uMouse;
uniform vec2 uResolution;
varying vec2 vUv;

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
  uv.x *= aspect;

  vec2 mouseUv = uMouse;
  mouseUv.x *= aspect;

  float dist = distance(uv, mouseUv);
  float ripple = smoothstep(0.25, 0.0, dist) * 0.18;

  float t = uTime * 0.02;

  // Broader, smoother noise for elegant contours
  float n = snoise(uv * 0.8 + t + ripple);
  n += 0.5 * snoise(uv * 1.6 - t * 0.3);
  n += 0.25 * snoise(uv * 3.2 + t * 0.15);
  n = n * 0.5 + 0.5;

  // Moderate density, thin lines
  float density = 15.0;
  float val = n * density;
  float line = fract(val);

  float thickness = 0.12;
  float smoothLine = smoothstep(thickness, 0.0, line) + smoothstep(1.0 - thickness, 1.0, line);

  vec3 bgColor = vec3(0.91, 0.85, 0.77); // #E8D8C4
  vec3 lineColor = vec3(0.78, 0.72, 0.64); // #C7B7A3

  vec3 color = mix(bgColor, lineColor, smoothLine * 0.7);

  gl_FragColor = vec4(color, 1.0);
}
`

export const TopographicBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null)
  const materialRef = useRef<THREE.ShaderMaterial | null>(null)
  const animationFrameRef = useRef<number>(0)
  const mouseRef = useRef({ x: 0.5, y: 0.5 })
  const clockRef = useRef(new THREE.Clock())

  const handleMouseMove = useCallback((e: MouseEvent) => {
    mouseRef.current.x = e.clientX / window.innerWidth
    mouseRef.current.y = 1.0 - e.clientY / window.innerHeight
  }, [])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    // Create renderer
    const renderer = new THREE.WebGLRenderer({ canvas, antialias: true })
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

      material.uniforms.uTime.value = clockRef.current.getElapsedTime()
      material.uniforms.uMouse.value.set(mouseRef.current.x, mouseRef.current.y)

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
      className="absolute inset-0 z-0 w-full h-full"
    />
  )
}
