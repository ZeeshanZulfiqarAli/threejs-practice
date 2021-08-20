import * as THREE from 'three';
import { useEffect, useRef } from 'react';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import gsap from 'gsap'
import * as dat from 'dat.gui'

const Root = () => {
    const canvas = useRef();

    useEffect(() => {

        const parameters = {
            color: 0xff0000,
            spin: () => {
                gsap.to(mesh.rotation, 1, { y: mesh.rotation.y + Math.PI * 2})
            }
        }

        // Sizes
        const sizes = {
            width: window.innerWidth,
            height: window.innerHeight
        }

        // Scene
        const scene = new THREE.Scene()

        // Object
        const geometry = new THREE.BoxBufferGeometry(1,1,1)
        const mesh = new THREE.Mesh(
            geometry,
            new THREE.MeshBasicMaterial({color: 0xff0000, wireframe: true})
        )
        scene.add(mesh)

        // Adapt to screen resize
        window.addEventListener('resize', () =>
        {
            sizes.width = window.innerWidth
            sizes.height = window.innerHeight

            camera.aspect = sizes.width/sizes.height
            camera.updateProjectionMatrix()

            renderer.setSize(sizes.width, sizes.height)
            renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
        })

        // Fullscreen
        window.addEventListener("dblclick", () => {

            // Making it work with safari
            const fullscreenElement = document.fullscreenElement || document.webkitFullscreenElement

            if(!fullscreenElement) {
                // going fullscreen
                if(canvas.current.requestFullscreen) {
                    canvas.current.requestFullscreen()
                } else if (canvas.current.webkitRequestFullscreen) {
                    canvas.current.webkitRequestFullscreen()
                }
            }
            else {
                // exiting fullscreen
                if(document.exitFullscreen) {
                    document.exitFullscreen()
                } else if (document.webkitExitFullscreen) {
                    document.webkitExitFullscreen()
                }
            }
        })

        // Camera
        const camera = new THREE.PerspectiveCamera(55, sizes.width / sizes.height, 0.1, 100)
        camera.position.z = 3
        scene.add(camera)

        // Controls
        const controls = new OrbitControls(camera, canvas.current)
        controls.enableDamping = true

        // Renderer
        const renderer = new THREE.WebGLRenderer({
            canvas: canvas.current
        })
        renderer.setSize(sizes.width, sizes.height)
        // Prevents ragged edges and other artifacts in higher pixel ratio devices
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

        // Debug
        const gui = new dat.GUI({
            width: 400,
            // closed: true,
        })

        // programatically hide the debug window
        // gui.hide()
        gui.add(mesh.position, "y").min(-3).max(3).step(0.01).name("elevation")
        gui.add(mesh, "visible")
        gui.add(mesh.material, "wireframe")
        gui .addColor(parameters, "color")
            .onChange(()=>{
                mesh.material.color.set(parameters.color)
            })
        
        gui .add(parameters, "spin")
        // Animate
        // const clock = new THREE.Clock()

        const tick = () =>
        {
            // const elapsedTime = clock.getElapsedTime()

            // Update controls
            controls.update()

            // Render
            renderer.render(scene, camera)

            // Call tick again on the next frame
            window.requestAnimationFrame(tick)
        }
        tick()
    }, [])

    return (
        <div>
            <canvas className="webgl" ref={canvas}></canvas>
        </div>
    );
}

export default Root