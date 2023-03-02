import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import gsap from "gsap";
import * as dat from "dat.gui";

// 目标：打造酷炫的三角形

// 创建场景
const scene = new THREE.Scene();

//创建相机
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);

// 设置相机位置
camera.position.set(0, 0, 10);
scene.add(camera);

// 导入纹理
const textureLoader = new THREE.TextureLoader();
const doorColorTexture = textureLoader.load("./textures/door/color.jpg");
const doorAplhaTexture = textureLoader.load("./textures/door/alpha.jpg");
const doorAoTexture = textureLoader.load(
  "./textures/door/ambientOcclusion.jpg"
);

// 导入置换贴图
const doorHeightTexture = textureLoader.load("./textures/door/height.jpg");

// const texture = textureLoader.load("./textures/minecraft.png");
// texture.minFilter = THREE.NearestFilter;
// texture.magFilter = THREE.NearestFilter;

// texture.minFilter = THREE.LinearFilter;
// texture.minFilter = THREE.LinearFilter;

// 纹理偏移设置
// doorColorTexture.offset.x = 0.5;
// doorColorTexture.offset.y = 0.5;
// doorColorTexture.offset.setX(0.5);

// 纹理旋转
// doorColorTexture.rotation = Math.PI / 4; // 旋转角度
// doorColorTexture.center.set(0.5, 0.5); // 旋转中心点

// 纹理重复
// doorColorTexture.repeat.set(2, 3);
// doorColorTexture.wrapS = THREE.MirroredRepeatWrapping;
// doorColorTexture.wrapT = THREE.RepeatWrapping;

// console.log(doorColorTexture);

// 创建物体
const cubeGeometry = new THREE.BoxGeometry(1, 1, 1, 200, 200, 200);

// 创建材质
const material = new THREE.MeshStandardMaterial({
  color: "#ffff00",
  map: doorColorTexture,
  alphaMap: doorAplhaTexture,
  aoMap: doorAoTexture,
  aoMapIntensity: 1,
  transparent: true,
  displacementMap: doorHeightTexture,
  displacementScale: 0.05,
  // opacity: 0.3,
  // map: texture,
});
material.side = THREE.DoubleSide;
const cube = new THREE.Mesh(cubeGeometry, material);
scene.add(cube);

cubeGeometry.setAttribute(
  "uv2",
  new THREE.BufferAttribute(cubeGeometry.attributes.uv.array, 2)
);

// 环境光
// const light = new THREE.AmbientLight(0xffffff, 0.8);
// scene.add(light);

// 直线光源
const directLight = new THREE.DirectionalLight(0xffffff);
directLight.position.set(10, 10, 10);
scene.add(directLight);

// 初始化渲染器
const renderer = new THREE.WebGL1Renderer();
renderer.setSize(window.innerWidth, window.innerHeight);

// 将webgl渲染的canvas内容添加到body
document.body.appendChild(renderer.domElement);

// 使用渲染器将场景相机渲染出来
// renderer.render(scene, camera);

// 创建轨道控制器
const controls = new OrbitControls(camera, renderer.domElement);
// 设置控制器阻尼，让控制器更有真实效果
controls.enableDamping = true;

const axesHelper = new THREE.AxesHelper(5);
scene.add(axesHelper);

// 设置时钟
const clock = new THREE.Clock();

function render(time) {
  controls.update();
  renderer.render(scene, camera);
  requestAnimationFrame(render);
}

render();

window.addEventListener("resize", () => {
  //更新摄像头
  camera.aspect = window.innerWidth / window.innerHeight;
  //更新摄像机的投影矩阵
  camera.updateProjectionMatrix();
  //更新渲染器
  renderer.setSize(window.innerWidth, window.innerHeight);
  //设置渲染器的像素比例
  renderer.setPixelRatio(window.devicePixelRatio);
});
