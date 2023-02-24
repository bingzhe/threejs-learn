import * as THREE from "three";
// 导入轨道控制器
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
// 导入动画库
import gsap from "gsap";
import * as dat from "dat.gui";

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

// 创建几何体和材质
const cubeGeometry = new THREE.BoxGeometry(1, 1, 1);
const cubeMaterial = new THREE.MeshBasicMaterial({ color: 0xffff00 });
// 根据几何体和材质创建物体
const cube = new THREE.Mesh(cubeGeometry, cubeMaterial);

const params = {
  color: "#ffff00",
  fn: () => {
    gsap.to(cube.position, { x: 5, duration: 2, yoyo: true });
  },
};
const gui = new dat.GUI();
gui
  .add(cube.position, "x")
  .min(0)
  .max(5)
  .step(0.01)
  .name("移动x轴")
  .onChange((value) => {
    console.log("修改的值：", value);
  })
  .onFinishChange((value) => {
    console.log("完全停止时候的值：", value);
  });
gui.add(cube.position, "y").min(0).max(5).step(0.01).name("移动y轴");
gui.add(cube.position, "z").min(0).max(5).step(0.01).name("移动z轴");
gui.add(cube.scale, "x").min(0).max(5).name("缩放x轴");
gui.add(cube.scale, "y").min(0).max(5).name("缩放y轴");
gui.add(cube.scale, "z").min(0).max(5).name("缩放z轴");
gui
  .add(cube.rotation, "x")
  .min(0)
  .max(Math.PI * 2)
  .step(Math.PI / 180)
  .name("旋转x轴");

//设置选项框
gui.add(cube, "visible").name("是否显示");
//设置颜色
gui.addColor(params, "color").onChange((value) => {
  cube.material.color.set(value);
});
//设置按钮点击事件
gui.add(params, "fn").name("立方体运动");

//设置目录
const folder = gui.addFolder("设置立方体");
folder.add(cube.material, "wireframe");

// 设置缩放
// cube.scale.set(3, 2, 1);
// cube.scale.x = 5

// 设置旋转
// cube.rotation.set(Math.PI / 4, 0, 0);

// 几何体添加到场景
scene.add(cube);

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

// //设置动画
// gsap.to(cube.position, {
//   x: 5,
//   duration: 5,
//   ease: "back.inOut",
//   repeat: -1, //重复次数 -1无限次数
//   yoyo: true, //往返运动
//   delay: 2, //延时
//   onComplete: () => {
//     console.log("动画完成");
//   },
//   onStart: () => {
//     console.log("动画开始");
//   },
// });
// gsap.to(cube.rotation, { x: 2 * Math.PI, duration: 5 });

function render(time) {
  // cube.position.x += 0.01;
  // cube.rotation.x += 0.01;
  // if (cube.position.x > 5) {
  //   cube.position.x = 0;
  // }
  // const t = (time / 1000) % 5;
  // cube.position.x = t * 1;
  // if (cube.position.x > 5) {
  //   cube.position.x = 0;
  // }

  // const c = clock.getElapsedTime();
  // const c = clock.getDelta();
  // console.log(c);

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

// // 双击屏幕退出全屏和进入全屏
// window.addEventListener("dblclick", () => {
//   const fullscreenElement = document.fullscreenElement;
//   if (!fullscreenElement) {
//     renderer.domElement.requestFullscreen();
//   } else {
//     document.exitFullscreen();
//   }
// });
