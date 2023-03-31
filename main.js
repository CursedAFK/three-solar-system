import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import starsTexture from '/img/stars.jpg'
import sunTexture from '/img/sun.jpg'
import mercuryTexture from '/img/mercury.jpg'
import venusTexture from '/img/venus.jpg'
import earthTexture from '/img/earth.jpg'
import marsTexture from '/img/mars.jpg'
import jupiterTexture from '/img/jupiter.jpg'
import saturnTexture from '/img/saturn.jpg'
import saturnRingTexture from '/img/saturn ring.png'
import uranusTexture from '/img/uranus.jpg'
import uranusRingTexture from '/img/uranus ring.png'
import neptuneTexture from '/img/neptune.jpg'
import plutoTexture from '/img/pluto.jpg'
import {
  AmbientLight,
  CubeTextureLoader,
  DoubleSide,
  Mesh,
  MeshBasicMaterial,
  MeshStandardMaterial,
  Object3D,
  PerspectiveCamera,
  PointLight,
  RingGeometry,
  Scene,
  SphereGeometry,
  TextureLoader,
  WebGLRenderer
} from 'three'

const renderer = new WebGLRenderer()
renderer.setSize(innerWidth, innerHeight)

document.body.appendChild(renderer.domElement)

const scene = new Scene()

const camera = new PerspectiveCamera(45, innerWidth / innerHeight, 0.1, 1000)

const orbit = new OrbitControls(camera, renderer.domElement)

camera.position.set(-90, 140, 140)
orbit.update()

const ambientLight = new AmbientLight(0x333333)
scene.add(ambientLight)

const cubeTextureLoader = new CubeTextureLoader()
scene.background = cubeTextureLoader.load([
  starsTexture,
  starsTexture,
  starsTexture,
  starsTexture,
  starsTexture,
  starsTexture
])

const textureLoader = new TextureLoader()

const sunGeo = new SphereGeometry(16, 30, 30)
const sunMat = new MeshBasicMaterial({
  map: textureLoader.load(sunTexture)
})
const sun = new Mesh(sunGeo, sunMat)
scene.add(sun)

const createPlanet = (size, texture, position, ring) => {
  const geo = new SphereGeometry(size, 30, 30)
  const mat = new MeshStandardMaterial({
    map: textureLoader.load(texture)
  })
  const mesh = new Mesh(geo, mat)
  const obj = new Object3D()
  obj.add(mesh)

  if (ring) {
    const ringGeo = new RingGeometry(ring.innerRadius, ring.outerRadius, 32)
    const ringMat = new MeshBasicMaterial({
      map: textureLoader.load(ring.texture),
      side: DoubleSide
    })
    const ringMesh = new Mesh(ringGeo, ringMat)
    obj.add(ringMesh)
    ringMesh.position.x = position
    ringMesh.rotation.x = -0.5 * Math.PI
  }

  scene.add(obj)
  mesh.position.x = position

  return {
    mesh,
    obj
  }
}

const mercury = createPlanet(3.2, mercuryTexture, 28)
const venus = createPlanet(5.8, venusTexture, 44)
const earth = createPlanet(6, earthTexture, 62)
const mars = createPlanet(4, marsTexture, 78)
const jupiter = createPlanet(12, jupiterTexture, 100)
const saturn = createPlanet(10, saturnTexture, 138, {
  innerRadius: 10,
  outerRadius: 20,
  texture: saturnRingTexture
})
const uranus = createPlanet(7, uranusTexture, 176, {
  innerRadius: 7,
  outerRadius: 12,
  texture: uranusRingTexture
})
const neptune = createPlanet(7, neptuneTexture, 200)
const pluto = createPlanet(2.8, neptuneTexture, 216)

const pointLight = new PointLight(0xffffff, 2, 300)
scene.add(pointLight)

const animate = () => {
  sun.rotateY(0.004)

  mercury.mesh.rotateY(0.004)
  venus.mesh.rotateY(0.002)
  earth.mesh.rotateY(0.02)
  mars.mesh.rotateY(0.018)
  jupiter.mesh.rotateY(0.04)
  saturn.mesh.rotateY(0.034)
  uranus.mesh.rotateY(0.03)
  neptune.mesh.rotateY(0.032)
  pluto.mesh.rotateY(0.008)

  mercury.obj.rotateY(0.04)
  venus.obj.rotateY(0.015)
  earth.obj.rotateY(0.01)
  mars.obj.rotateY(0.008)
  jupiter.obj.rotateY(0.002)
  saturn.obj.rotateY(0.0009)
  uranus.obj.rotateY(0.0004)
  neptune.obj.rotateY(0.0001)
  pluto.obj.rotateY(0.00007)

  renderer.render(scene, camera)
}

renderer.setAnimationLoop(animate)

addEventListener('resize', () => {
  camera.aspect = innerWidth / innerHeight
  camera.updateProjectionMatrix()
  renderer.setSize(innerWidth, innerHeight)
})
