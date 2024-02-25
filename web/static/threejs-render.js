import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

var canvasOfDesk = document.getElementById("rudeus-desk")

const scene = new THREE.Scene();
scene.position.y = -13
scene.add(new THREE.AxesHelper(0))

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.01, 1000);
const initialCameraPosition = new THREE.Vector3(
    -20, 15, 27)
camera.position.x = initialCameraPosition.x
camera.position.y = initialCameraPosition.y
camera.position.z = initialCameraPosition.z

const renderer = new THREE.WebGLRenderer({ canvas: canvasOfDesk, alpha: true });
renderer.shadowMap.enabled = true
renderer.setPixelRatio(10 * window.devicePixelRatio)

const controls = new OrbitControls(camera, renderer.domElement)
controls.enableDamping = true

const loader = new GLTFLoader();

const lightCandle = new THREE.SpotLight(0xffffff, 2000)
lightCandle.position.set(8, 40, -15)
scene.add(lightCandle)

const lightLaptop = new THREE.SpotLight(0xffffff, 2000)
lightLaptop.position.set(-10, 40, -15)
scene.add(lightLaptop)

loader.load(
    '/desk.glb',
    function(gltf) {
        var obj = gltf.scene
        scene.add(obj)
        obj.castShadow = true
        obj.receiveShadow = true
        obj.traverse(function(child) {
            if (child.isMesh) {
                child.castShadow = true
                child.receiveShadow = true
            }
        })
    },
    (xhr) => {
        console.log((xhr.loaded / xhr.total) * 100 + '% loaded')
    },
    (error) => {
        console.log(error)
    }
)

window.addEventListener('resize', onWindowResize, false)
function onWindowResize() {
    camera.updateProjectionMatrix()
    render()
}

let frame = 0
const target = new THREE.Vector3(-0.5, 1.2, 0)
function easeOutCirc(x) {
    return Math.sqrt(1 - Math.pow(x - 1, 4))
}
function animate() {

    requestAnimationFrame(animate)

    frame = frame <= 100 ? frame + 1 : frame

    if (frame <= 100) {
        const p = initialCameraPosition
        const rotSpeed = -easeOutCirc(frame / 120) * Math.PI * 20
        console.log(rotSpeed)

        camera.position.y = p.y
        camera.position.x =
            p.x * Math.cos(rotSpeed) + p.z * Math.sin(rotSpeed)
        camera.position.z =
            p.z * Math.cos(rotSpeed) - p.x * Math.sin(rotSpeed)
        camera.lookAt(target)
    } else {
        controls.update()
    }

    render()

}

function render() {
    renderer.render(scene, camera)
}

animate()

