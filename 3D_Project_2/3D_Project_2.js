//3个基本对象:scene,camera,renderer
window.onload = function() {
    //构建场景
    const scene = new THREE.Scene();
    scene.fog = new THREE.Fog(0xffffff, 0.005, 100); //打开雾化效果，(颜色，近处属性值，远处属性值)
    //创建摄像机

    const camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 1.0, 1000);
    //构建渲染器
    const renderer = new THREE.WebGLRenderer();
    renderer.setClearColor(0xeeeeee);
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.shadowMap.enabled = true; //此处是告诉renderer我们需要阴影。
    document.body.appendChild(renderer.domElement);

    //创建一个平面
    const planeGeometry = new THREE.PlaneGeometry(60, 60);
    //平面使用颜色为0xcccccc的基本材质
    const planeMaterial = new THREE.MeshLambertMaterial({ color: 0xffffff, side: THREE.DoubleSide });
    const plane = new THREE.Mesh(planeGeometry, planeMaterial);
    scene.add(plane);
    plane.rotation.x = -0.5 * Math.PI;
    plane.position.y = -8;

    //添加四个长方体
    const geometryA = new THREE.BoxGeometry(0.6, 3, 20);
    const materialA = new THREE.MeshPhongMaterial({ color: 0xd2691e, wireframe: false });
    const cubeA = new THREE.Mesh(geometryA, materialA);
    scene.add(cubeA);
    cubeA.position.x = -5.3;

    const geometryB = new THREE.BoxGeometry(20, 0.6, 3);
    const materialB = new THREE.MeshPhongMaterial({ color: 0xf00000, wireframe: false });
    const cubeB = new THREE.Mesh(geometryB, materialB);
    scene.add(cubeB);
    cubeB.position.y = -5.3;

    const geometryC = new THREE.BoxGeometry(20, 0.6, 3);
    const materialC = new THREE.MeshPhongMaterial({ color: 0xd2691e, wireframe: false });
    const cubeC = new THREE.Mesh(geometryC, materialC);
    scene.add(cubeC);
    cubeC.position.y = 5.3;

    const geometryD = new THREE.BoxGeometry(0.6, 3, 20);
    const materialD = new THREE.MeshPhongMaterial({ color: 0xd2691e, wireframe: false });
    const cubeD = new THREE.Mesh(geometryD, materialD);
    scene.add(cubeD);
    cubeD.position.x = 5.3;

    //设置相机的位置
    camera.position.z = 15;
    camera.position.x = 10;
    camera.position.y = 7;
    camera.lookAt(scene.position);


    //添加点光源
    //注意：基础材质（MeshBasicMaterial()方法）不会对场景中的光源产生反应，而只会以指定的颜色渲染。所以不得不更改材质
    const spotLight = new THREE.SpotLight(0xffffff, 1);
    spotLight.position.set(0, 20, 20); //设置位置
    spotLight.castShadow = true;
    spotLight.shadow.mapSize.width = 4096;
    spotLight.shadow.mapSize.height = 4096;
    scene.add(spotLight);

    //添加环境光
    const ambientLight = new THREE.AmbientLight(0x0c0c0c);
    scene.add(ambientLight);

    //此处添加一个球
    const sphereGeometry = new THREE.SphereGeometry(5, 40, 40);
    const sphereMaterial = new THREE.MeshLambertMaterial({ color: 0x3333ff, wireframe: false });
    const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
    scene.add(sphere);

    //添加阴影
    //注意：我们需要明确定义哪个物体投射阴影，哪个物体接受阴影。
    plane.receiveShadow = true;
    cubeA.receiveShadow = true;
    cubeB.receiveShadow = true;
    cubeC.receiveShadow = true;
    cubeD.receiveShadow = true;
    sphere.receiveShadow = true;
    cubeA.castShadow = true;
    cubeB.castShadow = true;
    cubeC.castShadow = true;
    cubeD.castShadow = true;
    sphere.castShadow = true;

    function render() {
        requestAnimationFrame(render); //在render()函数里，我们又调了一次requestAnimationFrame,目的是让这个动画持续运行。          
        sphere.rotation.x += 0.05;
        sphere.rotation.y += 0.03;
        sphere.rotation.z += 0.04;
        cubeA.rotation.x += 0.05;
        cubeB.rotation.y += -0.05;
        cubeC.rotation.y += 0.05;
        cubeD.rotation.x += -0.05;

        renderer.render(scene, camera);
    }
    render();
}