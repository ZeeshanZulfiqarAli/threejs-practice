import * as THREE from 'three';
import { useEffect, useRef } from 'react';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'

const Root = () => {
    const canvas = useRef();

    useEffect(() => {

        // Sizes
        const sizes = {
            width: window.innerWidth,
            height: window.innerHeight
        }

        // Scene
        const scene = new THREE.Scene()

        // Object
        const geometry = new THREE.BufferGeometry()
        const count = 50 // count of triangles
        const positionsArray = new Float32Array(count * 3 * 3) // each triangle has 3 vertices and each vertex has 3 coordinates
        for (let i = 0; i<count*3*3; i++) {
            positionsArray[i] = (Math.random() - 0.5) * 4
        }
        const positionAttribute = new THREE.BufferAttribute(positionsArray, 3)
        geometry.setAttribute("position", positionAttribute)
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