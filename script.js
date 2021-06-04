// Canvas
const canvas = document.querySelector('canvas.webgl');
const textureLoader = new THREE.TextureLoader();

// Sizes
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight,
}

// Scene
const scene = new THREE.Scene()

// Object
const geometry = new THREE.ConeGeometry( 3, 4, 4 );
const material = new THREE.MeshBasicMaterial({
    map: textureLoader.load('./sanja.jpg')
});
const cone = new THREE.Mesh( geometry, material );
cone.position.set( 0, 0, -3)
scene.add( cone );

// Camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height)
camera.position.z = 3
scene.add(camera)

// Renderer
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)
renderer.render(scene, camera)



window.addEventListener('resize', () => {
    // Update sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    // Update camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    // Update renderer
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.render(scene, camera)
});

const clock = new THREE.Clock();
;(function tick() {
    cone.rotation.y = clock.getElapsedTime();

    renderer.render(scene, camera)
    window.requestAnimationFrame(tick)
})();