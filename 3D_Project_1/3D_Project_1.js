window.onload = function() {
    //构建渲染器
    const renderer = new THREE.WebGLRenderer();
    renderer.setClearColor(0xeeeeee);
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.shadowMap.enabled = true; //此处是告诉renderer我们需要阴影。
    // var canvas = document.createElement("canvas");
    // document.body.appendChild(canvas); 
    document.body.appendChild(renderer.domElement); //添加了canvas
    // console.log(renderer.domElement);

    //创建场景
    const scene = new THREE.Scene();

    //添加光源
    let ambientLight = new THREE.AmbientLight(0x404040); // soft white light
    let light = new THREE.SpotLight(0xf6f6e9, 0.8);
    light.position.set(25, 35, 25);
    light.castShadow = true;
    light.shadow.mapSize.height = 4096;
    light.shadow.mapSize.width = 4096;
    //light.castShadow = true ;
    scene.add(ambientLight);
    scene.add(light);

    //添加相机
    const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 2000);
    camera.position.set(60, 25, 0);
    camera.lookAt(scene.position);
    scene.add(camera);

    //添加立方体
    const geometry = new THREE.BoxGeometry(15, 15, 15);
    const material = new THREE.MeshLambertMaterial({ color: 0xff0000 });
    const mesh = new THREE.Mesh(geometry, material);
    mesh.position.set(0, 12, 0);
    /*
    mesh.rotation.x=Math.PI/3;
    mesh.rotation.y=Math.PI/3;
    mesh.rotation.z=Math.PI/3;
    */
    mesh.castShadow = true;
    scene.add(mesh);

    //添加球体
    const sphereGeometry = new THREE.SphereGeometry(4, 40, 40);
    const sphereMaterial = new THREE.MeshLambertMaterial({ color: 0x4040ff });
    const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
    sphere.position.set(15, 4, 5);
    sphere.castShadow = true;
    scene.add(sphere);

    //添加平面
    const planeGeometry = new THREE.PlaneGeometry(1000, 1000);
    const planeMaterial = new THREE.MeshPhongMaterial({ color: 0xffffff, side: THREE.DoubleSide });
    const plane = new THREE.Mesh(planeGeometry, planeMaterial);
    plane.rotation.x = Math.PI * 0.5;
    plane.position.set(0, 0, 0);
    plane.receiveShadow = true;
    scene.add(plane);

    var jump = false;
    var speed = 0;
    g = -0.06;
    //监听器
    document.addEventListener(
        "click",
        function(event) {
            if (speed == 0) {
                jump = true;
                speed = 1.2;
            }
        }
    );



    //添加动画
    let time = 0;
    let angle = 0;

    function animate() {
        renderer.setSize(window.innerWidth, window.innerHeight);
        //重复渲染
        time += 0.01;
        angle = time * (Math.PI);
        //camera.position.set(40*cos(angle),25,40*sin(angle);
        mesh.rotateX(0.02);
        mesh.rotateY(0.03);
        mesh.rotateZ(0.04);
        sphere.position.z = 10 * (Math.sin(angle));

        camera.position.set(sphere.position.x + 50, sphere.position.y + 30, sphere.position.z);

        if (speed != 0 || jump == true) {
            speed += g;
            sphere.translateY(speed);
        }
        if (sphere.position.y <= 4) {
            speed = 0;
            sphere.position.y = 4;
        }

        //controller.update();
        requestAnimationFrame(animate);
        renderer.render(scene, camera);
    }
    animate();
}