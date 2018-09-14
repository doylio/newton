//Size
const WIDTH = window.innerWidth
const HEIGHT = window.innerHeight

//Camera Attributes
const VIEW_ANGLE = 45
const ASPECT = WIDTH / HEIGHT
const NEAR = 0.1
const FAR = 10000

//Set Scene, Camera and Renderer
const scene = new THREE.Scene()

const camera = new THREE.PerspectiveCamera(VIEW_ANGLE, ASPECT, NEAR, FAR)
scene.add(camera)
camera.rotation.x += -0.3

const renderer = new THREE.WebGLRenderer()
renderer.setSize(WIDTH, HEIGHT)
renderer.setClearColor(0x0000cc, 1)
document.body.appendChild(renderer.domElement)

//Global Variables
const DISTANCE = 3000

//Controls
let up = false
let down = false
let left = false
let right = false
window.addEventListener('keydown', (e) => {
	if(e.key === 'ArrowUp') {
		up = true
	}
	if(e.key === 'ArrowDown') {
		down = true
	}
	if(e.key === 'ArrowLeft') {
		left = true
	}
	if(e.key === 'ArrowRight') {
		right = true
	}
})

//Main function
init()
animate()


function init() {
	//Lights
	const light1 = new THREE.PointLight(0xFFFFFF, 1)
	light1.position.x = 10
	light1.position.y = 40
	light1.position.z = 100
	const light2 = new THREE.PointLight(0xFFFFFF, 1)
	light2.position.x = 10
	light2.position.y = 40
	light2.position.z = 4000
	const light3 = new THREE.AmbientLight(0x991100)
	scene.add(light1, light2, light3)
	//Scenery
	createSpheres()

}

function animate() {
	requestAnimationFrame(animate)
	renderer.render(scene, camera)
	updateCamera()
}



function createLane() {
	//Lane
	const LANE_LENGTH = 600
	const LANE_WIDTH = 40

	let laneGeo = new THREE.PlaneGeometry(LANE_WIDTH, LANE_LENGTH)
	let laneMat = new THREE.MeshLambertMaterial({ color: 0xcc9900 })
	let lane = new THREE.Mesh(laneGeo, laneMat)
	lane.rotation.x = -Math.PI / 2
	lane.position.z = -330
	lane.position.y = -20
	scene.add(lane)

	const NofLines = 8
	let laneLines = []
	let lineMat = new THREE.LineBasicMaterial({color: 0x000000})
	let lineGeo
	for(let i = 0; i < NofLines; i++) {
		lineGeo = new THREE.Geometry()
		lineGeo.vertices.push(new THREE.Vector3(-20 + (i * 40 / NofLines), -20, -30))
		lineGeo.vertices.push(new THREE.Vector3(-20 + (i * 40 / NofLines), -20, -630))
		laneLines[i] = new THREE.Line(lineGeo, lineMat)
		scene.add(laneLines[i])
	}
}

// function createPins() {
// 	let loader = new THREE.JSONLoader()
// 	loader.load('/models/BowlingPin/scene.gltf', (gltf) => {
// 		console.log(gltf)
// 	})
// }

function createSpheres() {
	let spheres = new THREE.Object3D()
	for(let i = 0; i < 800; i++) {
		let sphere = new THREE.SphereGeometry(4, Math.random() * 12, Math.random() * 12)
		let material = new THREE.MeshPhongMaterial({
			color: Math.random() * 0xFF0000 - 0xFF0000,
			flatShading: true
		})
		let particle = new THREE.Mesh(sphere, material)
		particle.position.x = (DISTANCE / 2) - Math.random() * DISTANCE
		particle.position.y = (DISTANCE / 2) - Math.random() * DISTANCE
		particle.position.z = (DISTANCE / 2) - Math.random() * DISTANCE
		spheres.add(particle)
	}
	spheres.position.z = -200
	scene.add(spheres)
}

function updateCamera() {
	if(up) {
		camera.rotation.x += 0.01
	}
	if(down) {
		camera.rotation.x -= 0.01
	}
	if(left) {
		camera.rotation.y += 0.01
	}
	if(right) {
		camera.rotation.y -= 0.01
	}
	up = down = right = left = false
	let forward = new THREE.Vector3
	camera.getWorldDirection(forward)
	camera.position.z += Math.sin(forward.z)
	camera.position.y += Math.sin(forward.y)
	camera.position.x += Math.sin(forward.x)
	console.log(forward)
}