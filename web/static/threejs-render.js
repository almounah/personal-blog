import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

var canvasOfDesk = document.getElementById("rudeus-desk")

const scene = new THREE.Scene();
scene.position.y = -13
scene.add(new THREE.AxesHelper(0))

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.01, 1000);
camera.position.x = 14;
camera.position.y = 33;
camera.position.z = 9;

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
    camera.aspect = window.innerWidth / window.innerHeight
    camera.updateProjectionMatrix()
    renderer.setSize(window.innerWidth, window.innerHeight)
    render()
}


function animate() {
    requestAnimationFrame(animate)

    controls.update()

    render()

}

function render() {
    renderer.render(scene, camera)
}

animate()

