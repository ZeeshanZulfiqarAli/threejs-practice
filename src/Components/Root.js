import * as THREE from 'three';
import { useEffect, useRef } from 'react';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'

const Root = () => {
    const canvas = useRef();

    useEffect(() => {

        // Sizes
        const sizes = {
            width: 800,
            height: 600
        }

        // Cursor
        const cursor = {
            x: 0,
            y: 0
        }

        window.addEventListener('mousemove', (event) =>
        {
            cursor.x = event.clientX / sizes.width - 0.5
            cursor.y = - (event.clientY / sizes.height - 0.5)
        })

        // Scene
        const scene = new THREE.Scene()

        // Object
        const mesh = new THREE.Mesh(
            new THREE.BoxGeometry(1,1,1,5,5,5),
            new THREE.MeshBasicMaterial({color: 0xff0000})
        )
        scene.add(mesh)

        // Camera
        const camera = new THREE.PerspectiveCamera(55, sizes.width / sizes.height, 0.1, 100)
        camera.position.z = 3
        scene.add(camera)

        // Controls
        const controls = new OrbitControls(camera, canvas.current)
        controls.enableDamping = true
        // Can change the camera target in controls
        // controls.target.y = 2
        // controls.update()

        // Renderer
        const renderer = new THREE.WebGLRenderer({
            canvas: canvas.current
        })
        renderer.setSize(sizes.width, sizes.height)
        // renderer.render(scene, camera)

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
            Hello
            <canvas className="webgl" ref={canvas}></canvas>
        </div>
    );
}

export default Root