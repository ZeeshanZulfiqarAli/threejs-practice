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

        // Textures
        const loadingManager = new THREE.LoadingManager()
        loadingManager.onStart = () => {}
        loadingManager.onProgress = () => {}
        loadingManager.onLoad = () => {}
        loadingManager.onError = () => {}

        const textureLoader = new THREE.TextureLoader(loadingManager)
        // const colorTexture = textureLoader.load("../../assets/textures/door/color.jpg")
        const colorTexture = textureLoader.load("../../assets/textures/checkerboard-1024x1024.png")
        // colorTexture.wrapS = THREE.MirroredRepeatWrapping
        // colorTexture.wrapT = THREE.MirroredRepeatWrapping
        // colorTexture.repeat.x = 2
        // colorTexture.repeat.y = 3
        // colorTexture.offset.x = 0.5
        // colorTexture.offset.y = 0.5
        // colorTexture.rotation = Math.PI * 0.25
        // colorTexture.center.x = 0.5
        // colorTexture.center.y = 0.5
        // colorTexture.generateMipmaps = false
        // colorTexture.minFilter = THREE.NearestFilter
        // colorTexture.magFilter = THREE.NearestFilter

        // Object
        const geometry = new THREE.BoxBufferGeometry(1,1,1)
        const mesh = new THREE.Mesh(
            geometry,
            new THREE.MeshBasicMaterial({map: colorTexture})
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