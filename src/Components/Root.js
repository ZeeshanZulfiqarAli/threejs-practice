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

        // Scene
        const scene = new THREE.Scene()

        // Object
        const cubeGeometry = new THREE.BoxGeometry(1, 1, 1)
        const cubeMaterial = new THREE.MeshBasicMaterial({
            color: '#ff0000'
        })
        const cubeMesh = new THREE.Mesh(cubeGeometry, cubeMaterial)
        scene.add(cubeMesh)

        // Camera
        const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height)
        camera.position.z = 3
        scene.add(camera)

        // Renderer
        const renderer = new THREE.WebGLRenderer({
            canvas: canvas.current
        })
        renderer.setSize(sizes.width, sizes.height)
        renderer.render(scene, camera)

    }, [])

    return (
        <div>
            Hello
            <canvas className="webgl" ref={canvas}></canvas>
        </div>
    );
}

export default Root