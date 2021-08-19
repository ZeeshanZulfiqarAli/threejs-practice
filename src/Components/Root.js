import * as THREE from 'three';
import { useEffect, useRef } from 'react';

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

        scene.add(camera)

        // Renderer
        const renderer = new THREE.WebGLRenderer({
            canvas: canvas.current
        })
        renderer.setSize(sizes.width, sizes.height)
        // renderer.render(scene, camera)

        // Animate
        const clock = new THREE.Clock()

        const tick = () =>
        {
            // const elapsedTime = clock.getElapsedTime()

            // Update controls
            // mesh.rotation.y = elapsedTime
            // controls.update()

            // Update camera
            camera.position.x = Math.sin(cursor.x * Math.PI * 2) * 3
            camera.position.z = Math.cos(cursor.x * Math.PI * 2) * 3
            camera.position.y = cursor.y * 3
            camera.lookAt(mesh.position)
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