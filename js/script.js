const scene = new THREE.Scene()

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)

const renderer = new THREE.WebGLRenderer()
renderer.setSize(window.innerWidth, window.innerHeight)

document.body.appendChild(renderer.domElement)

let geometry = new THREE.BoxGeometry(4, 60, 0.1)
let material = new THREE.MeshPhysicalMaterial({ color: 0xffff00 })
let lane = new THREE.Mesh(geometry, material)
lane.rotation.x = (Math.PI) / 2
scene.add(lane)




camera.position.z = 30
camera.position.y = 2



function animate() {
	requestAnimationFrame(animate)
	renderer.render(scene, camera)
}
animate()

console.log('test')