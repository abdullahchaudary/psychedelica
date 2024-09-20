import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js';
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass.js';
import { BloomPass } from 'three/examples/jsm/postprocessing/BloomPass.js';
import { FilmPass } from 'three/examples/jsm/postprocessing/FilmPass.js';
import { VRButton } from 'three/examples/jsm/webxr/VRButton'
import spline from './spline.js';
import PsychedelicMusicGenerator from './PsychedelicMusic.js';


export default class Psychedelica {
    constructor(cnvs){
        this.canvas = cnvs
        this.scene = new THREE.Scene();
        this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        this.renderer = new THREE.WebGLRenderer({ canvas: this.canvas });
        this.controls = new OrbitControls(this.camera, this.renderer.domElement);
        this.controls.enableDamping = true;
        this.controls.dampingFactor = 0.03;
        this.controls.enabled = false;
        this.clock = new THREE.Clock();
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        // this.renderer.xr.enabled = true
        // document.body.appendChild(VRButton.createButton(this.renderer))
        this.animationId = [];
        this.intervalId = [];
        this.timeOuts = [];
        this.storyEnabled = true;
        this.musicGen = new PsychedelicMusicGenerator()
        this.storyTextEl = document.getElementById('storyTitle');
        this.storyTextEl.style.opacity = 0;
        this.storyTitle = [
            "The Dance of Chaos",
            "The Flow of Harmony",
            "Metamorphosis of the Self",
            "Fragments of Infinity",
            "The Portal of Becoming",
            "Order and Freedom",
            "Symphony of Existence",
            "Knots of Existence",
            "The Sphere of Eternity",
            "Fixed Points in a Moving Universe",
            "The Pulse of Infinity",
            "The Circle of Creation"
        ]
        // console.log(THREE.REVISION);
        // this.scene11()
        // this.scene2()
        // this.init
    }
    deconstruct = () => {
        this.stopStory();
        this.musicGen.deconstruct();
        this.stopAnimation();
        // delete this.musicGen;
    }
    init = () => {
        // document.body.appendChild(renderer.domElement);
    }

    resetScene = () => {
        if (this.scene) {
            this.scene.children.forEach(object => {
                if (object.isMesh) {
                    object.geometry.dispose();
                    if (Array.isArray(object.material)) {
                        object.material.forEach(material => {
                            if (material.map) material.map.dispose();
                            material.dispose();
                        });
                    } else {
                        if (object.material.map) object.material.map.dispose();
                        object.material.dispose();
                    }
                    this.scene.remove(object);
                }
            });
            this.scene.children = [];
            this.scene.clear();
        }
        this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        this.camera.position.z = 5;
        this.renderer.clear();
        this.scene.background = new THREE.Color(0x000000);
        this.renderer.setSize(window.innerWidth, window.innerHeight);
    };
    
    stopAnimation = () => {
        if (this.animationId) {
            this.animationId.forEach(id => {
                cancelAnimationFrame(id)
            });
            this.animationId = [];
        }
        if (this.intervalId) {
            this.intervalId.forEach(id => {
                clearInterval(id);
            });
            this.intervalId = [];
        }
    };
    
    stopStory = () => {
        this.storyEnabled = false;
        if (this.timeOuts) {
            this.timeOuts.forEach(id => {
                clearTimeout(id);
            });
            this.timeOuts = [];
        }
        
    };
    resetStory = () => {
        this.musicGen.sceneNarrations.forEach(narration => {
            narration.stop();
        });
    };
    
    scene1 = () => {
        this.musicGen.playVariation(2);
        if(this.storyEnabled){
            this.musicGen.sceneNarrations[0].start();
        };
        var animID1 = this.animationId.push(1)-1;
        var intervalID1 = this.intervalId.push(1)-1;
        var objects = [];
        let initObjects = () => {
            objects.forEach(obj => {
                this.scene.remove(obj);
                if (obj.geometry) obj.geometry.dispose();
                if (obj.material) obj.material.dispose();
            });
            objects = [];
            for (let i = 0; i < 50; i++) {
                let geometry = randomGeometry();
                let material = new THREE.MeshBasicMaterial({
                    color: randomColor(),
                    wireframe: true,
                });
                let mesh = new THREE.Mesh(geometry, material);
                mesh.position.set(randomPosition(), randomPosition(), randomPosition());
                mesh.rotation.set(randomRotation(), randomRotation(), randomRotation());
                objects.push(mesh);
                this.scene.add(mesh);
            }
        }
        initObjects()
        function randomGeometry() {
            const geometries = [
                new THREE.BoxGeometry(),
                new THREE.SphereGeometry(0.5, 32, 32),
                new THREE.ConeGeometry(0.5, 1, 32),
                new THREE.TorusGeometry(0.5, 0.2, 16, 100),
                new THREE.DodecahedronGeometry(0.5),
                new THREE.OctahedronGeometry(0.5)
            ];
            return geometries[Math.floor(Math.random() * geometries.length)];
        }
        function randomColor() {
            return Math.random() * 0xffffff;
        }
        function randomPosition() {
            return Math.random() * 10 - 5;
        }
        function randomRotation() {
            return Math.random() * Math.PI * 2;
        }
        let animation = () => {
            objects.forEach(obj => {
                obj.rotation.x += 0.01 * (Math.random() - 0.5);
                obj.rotation.y += 0.01 * (Math.random() - 0.5);
                obj.rotation.z += 0.01 * (Math.random() - 0.5);
                obj.position.x += 0.01 * (Math.random() - 0.5);
                obj.position.y += 0.01 * (Math.random() - 0.5);
                obj.position.z += 0.01 * (Math.random() - 0.5);
            });
            this.scene.background = new THREE.Color(randomColor());
            this.renderer.render(this.scene, this.camera);
        }
        const animate = () => {
            // requestAnimationFrame(animate)
            this.animationId[animID1] = requestAnimationFrame(animate);
            animation()
        }
        this.intervalId[intervalID1] = setInterval(initObjects, 3000);
        animate()
    }

    scene2 = () => {
        this.musicGen.playVariation(1);
        if(this.storyEnabled){
            this.musicGen.sceneNarrations[1].start();
        };
        var animID1 = this.animationId.push(1)-1;
        var intervalID1 = this.intervalId.push(1)-1;
        var objects = [];
        var currentColor, targetColor, colorTransitionSpeed;
        currentColor = new THREE.Color(randomColor());
        targetColor = new THREE.Color(randomColor());
        colorTransitionSpeed = 0.01;
    
        let initObjects = () => {
            objects.forEach(obj => {
                this.scene.remove(obj);
                if (obj.geometry) obj.geometry.dispose();
                if (obj.material) obj.material.dispose();
            });
            objects = [];
            for (let i = 0; i < 50; i++) {
                let geometry = randomGeometry();
                let material = new THREE.MeshBasicMaterial({
                    color: randomColor(),
                    wireframe: true,
                });
                let mesh = new THREE.Mesh(geometry, material);
                mesh.position.set(randomPosition(), randomPosition(), randomPosition());
                mesh.rotation.set(randomRotation(), randomRotation(), randomRotation());
                objects.push(mesh);
                this.scene.add(mesh);
            }
        }
    
        function randomGeometry() {
            const geometries = [
                new THREE.BoxGeometry(),
                new THREE.SphereGeometry(0.5, 32, 32),
                new THREE.ConeGeometry(0.5, 1, 32),
                new THREE.TorusGeometry(0.5, 0.2, 16, 100),
                new THREE.DodecahedronGeometry(0.5),
                new THREE.OctahedronGeometry(0.5)
            ];
            return geometries[Math.floor(Math.random() * geometries.length)];
        }
    
        function randomColor() {
            return Math.random() * 0xffffff;
        }
    
        function randomPosition() {
            return Math.random() * 10 - 5;
        }
    
        function randomRotation() {
            return Math.random() * Math.PI * 2;
        }

        initObjects();
    
        let animation = () => {
            objects.forEach(obj => {
                obj.rotation.x += 0.01 * (Math.random() - 0.5);
                obj.rotation.y += 0.01 * (Math.random() - 0.5);
                obj.rotation.z += 0.01 * (Math.random() - 0.5);
                obj.position.x += 0.01 * (Math.random() - 0.5);
                obj.position.y += 0.01 * (Math.random() - 0.5);
                obj.position.z += 0.01 * (Math.random() - 0.5);
            });
            currentColor.lerp(targetColor, colorTransitionSpeed);
            this.scene.background = currentColor;
            if (Math.abs(currentColor.r - targetColor.r) < 0.01 &&
                Math.abs(currentColor.g - targetColor.g) < 0.01 &&
                Math.abs(currentColor.b - targetColor.b) < 0.01) {
                targetColor.set(randomColor());
            }
    
            this.renderer.render(this.scene, this.camera);
        }
        const animate = () => {
            // requestAnimationFrame(animate);
            this.animationId[animID1] = requestAnimationFrame(animate);
            animation();
        }
        this.intervalId[intervalID1] = setInterval(initObjects, 3000);
        animate()
    }

    scene3 = () => {
        this.musicGen.playVariation(3);
        if(this.storyEnabled){
            this.musicGen.sceneNarrations[2].start();
        };
        let animID1 = this.animationId.push(1)-1;
        let intervalID1 = this.intervalId.push(1)-1;
        let objects = [];
        let currentColor, targetColor, colorTransitionSpeed;
        currentColor = new THREE.Color(randomColor());
        targetColor = new THREE.Color(randomColor());
        colorTransitionSpeed = 0.01;

    
        function randomGeometry() {
            const geometries = [
                new THREE.BoxGeometry(),
                new THREE.SphereGeometry(0.5, 32, 32),
                new THREE.ConeGeometry(0.5, 1, 32),
                new THREE.TorusGeometry(0.5, 0.2, 16, 100),
                new THREE.DodecahedronGeometry(0.5),
                new THREE.OctahedronGeometry(0.5)
            ];
            return geometries[Math.floor(Math.random() * geometries.length)];
        }
    
        function randomColor() {
            return Math.random() * 0xffffff;
        }
    
        function randomPosition() {
            return Math.random() * 10 - 5;
        }
    
        function randomRotation() {
            return Math.random() * Math.PI * 2;
        }
    
        function randomScale() {
            return Math.random() * 2 + 0.5;
        }
    
        let animateObject = (obj) => {
            let animID = this.animationId.push(1)-1;
            let speedX = Math.random() * 0.02 - 0.01;
            let speedY = Math.random() * 0.02 - 0.01;
            let speedZ = Math.random() * 0.02 - 0.01;
    
            let scaleSpeed = Math.random() * 0.01;
            let scaleDir = 1;
    
            let animate = () => {
                this.animationId[animID] = requestAnimationFrame(animate);
                obj.rotation.x += speedX;
                obj.rotation.y += speedY;
                obj.rotation.z += speedZ;
                obj.scale.x += scaleSpeed * scaleDir;
                obj.scale.y += scaleSpeed * scaleDir;
                obj.scale.z += scaleSpeed * scaleDir;
                if (obj.scale.x > 3 || obj.scale.x < 0.5) {
                    scaleDir *= -1;
                }
                obj.position.y += Math.sin(Date.now() * 0.001) * 0.01;
                obj.position.x += Math.cos(Date.now() * 0.001) * 0.01;
            }
    
            animate();
        }

        let resetObjects = () => {
            objects.forEach(obj => this.scene.remove(obj));
            objects = [];
            for (let i = 0; i < 50; i++) {
                let geometry = randomGeometry();
                let material = new THREE.MeshBasicMaterial({
                    color: randomColor(),
                    wireframe: true,
                });
                let mesh = new THREE.Mesh(geometry, material);
                mesh.position.set(randomPosition(), randomPosition(), randomPosition());
                mesh.rotation.set(randomRotation(), randomRotation(), randomRotation());
                mesh.scale.set(randomScale(), randomScale(), randomScale());
                animateObject(mesh);
                objects.push(mesh);
                this.scene.add(mesh);
            }
        }
        
        let resetScene = () => {
            objects.forEach(obj => this.scene.remove(obj));
            objects = [];
            currentColor = new THREE.Color(randomColor());
            targetColor = new THREE.Color(randomColor());
            resetObjects();
        }
        resetScene();
    
        let animate = () => {
            this.animationId[animID1] = requestAnimationFrame(animate);
            currentColor.lerp(targetColor, colorTransitionSpeed);
            this.scene.background = currentColor;
            if (Math.abs(currentColor.r - targetColor.r) < 0.01 &&
                Math.abs(currentColor.g - targetColor.g) < 0.01 &&
                Math.abs(currentColor.b - targetColor.b) < 0.01) {
                targetColor.set(randomColor());
            }
    
            this.renderer.render(this.scene, this.camera);
        }
        this.intervalId[intervalID1] = setInterval(resetScene, 10000);
        animate()
    };

    scene4 = () => {
        this.musicGen.playVariation(4);
        if(this.storyEnabled){
            this.musicGen.sceneNarrations[3].start();
        };
        var animID1 = this.animationId.push(1)-1;
        this.clock = new THREE.Clock();
        let objects = [];
        let pathSpline, time = 0;
        
        let createFixedBackground = () => {
            const radius = 5000;
            const backgroundGeometry = new THREE.SphereGeometry(radius, 32, 32);
            backgroundGeometry.scale(-1, 1, 1);
    
            const vertexShader = `
                varying vec2 vUv;
                void main() {
                    vUv = uv;
                    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
                }
            `;
    
            const fragmentShader = `
                uniform float time;
                void main() {
                    vec3 color = vec3(
                        0.5 + 0.5 * sin(time * 0.1 + 0.0),
                        0.5 + 0.5 * sin(time * 0.1 + 2.0),
                        0.5 + 0.5 * sin(time * 0.1 + 4.0)
                    );
                    gl_FragColor = vec4(color, 1.0);
                }
            `;
    
            const backgroundMaterial = new THREE.ShaderMaterial({
                uniforms: { time: { value: 0.0 } },
                vertexShader: vertexShader,
                fragmentShader: fragmentShader,
                side: THREE.BackSide
            });
    
            const backgroundMesh = new THREE.Mesh(backgroundGeometry, backgroundMaterial);
            this.scene.add(backgroundMesh);
        }

        createFixedBackground();
    
        let addLights = () =>{
            const ambientLight = new THREE.AmbientLight(0xffffff, 1.5);
            this.scene.add(ambientLight);
            const pointLight1 = new THREE.PointLight(0xff0000, 2, 1000);
            pointLight1.position.set(500, 500, 500);
            this.scene.add(pointLight1);
            const pointLight2 = new THREE.PointLight(0x00ff00, 2, 1000);
            pointLight2.position.set(-500, 500, -500);
            this.scene.add(pointLight2);
            const pointLight3 = new THREE.PointLight(0x0000ff, 2, 1000);
            pointLight3.position.set(0, -500, 500);
            this.scene.add(pointLight3);
        }
    
        let createProceduralObjects = () => {
            const numObjects = 600;
            const spread = 2000;
    
            for (let i = 0; i < numObjects; i++) {
                let geometry, material, object;
    
                const randomChoice = Math.floor(Math.random() * 8);
                const sizeFactor = Math.random() * 3 + 1;
                switch (randomChoice) {
                    case 0: geometry = new THREE.TorusGeometry(sizeFactor * 3, sizeFactor * 1.5, 16, 100); break;
                    case 1: geometry = new THREE.IcosahedronGeometry(sizeFactor * 3, 1); break;
                    case 2: geometry = new THREE.BoxGeometry(sizeFactor * 3, sizeFactor * 3, sizeFactor * 3); break;
                    case 3: geometry = new THREE.SphereGeometry(sizeFactor * 3, 32, 32); break;
                    case 4: geometry = new THREE.CylinderGeometry(sizeFactor * 1.5, sizeFactor * 1.5, sizeFactor * 5, 32); break;
                    case 5: geometry = new THREE.OctahedronGeometry(sizeFactor * 3, 0); break;
                    case 6: geometry = new THREE.DodecahedronGeometry(sizeFactor * 3, 0); break;
                    case 7: geometry = new THREE.TorusKnotGeometry(sizeFactor * 3, sizeFactor * 0.75, 100, 16); break;
                }
    
                material = new THREE.MeshStandardMaterial({
                    color: new THREE.Color(Math.random(), Math.random(), Math.random()).multiplyScalar(2.0),
                    metalness: Math.random() * 0.5 + 0.5,
                    roughness: Math.random() * 0.2
                });
    
                object = new THREE.Mesh(geometry, material);
                object.position.set(
                    Math.random() * spread - spread / 2,
                    Math.random() * spread - spread / 2,
                    Math.random() * spread - spread / 2
                );
    
                object.rotation.set(
                    Math.random() * Math.PI,
                    Math.random() * Math.PI,
                    Math.random() * Math.PI
                );
    
                object.scale.set(
                    Math.random() * sizeFactor + 0.5,
                    Math.random() * sizeFactor + 0.5,
                    Math.random() * sizeFactor + 0.5
                );
    
                objects.push(object);
                this.scene.add(object);
            }
        }
    
        function generateRandomPath() {
            const numPoints = 500;
            let points = [];
            for (let i = 0; i < numPoints; i++) {
                points.push(new THREE.Vector3(
                    Math.random() * 1000 - 500,
                    Math.random() * 1000 - 500,
                    Math.random() * 1000 - 500
                ));
            }
    
            pathSpline = new THREE.CatmullRomCurve3(points);
        }
        
        addLights();
        createProceduralObjects();
        generateRandomPath();
    
        let animation = () => {
            time += this.clock.getDelta() * 0.0980;
            const t = (time % pathSpline.points.length) / pathSpline.points.length;
            const position = pathSpline.getPointAt(t);
            this.camera.position.copy(position);
    
            const lookAtPos = pathSpline.getPointAt((t + 0.01) % 1.0);
            this.camera.lookAt(lookAtPos);
    
            objects.forEach(object => {
                object.rotation.x += 0.02 * Math.random();
                object.rotation.y += 0.02 * Math.random();
                object.rotation.z += 0.02 * Math.random();
    
                const scale = 1 + 0.5 * Math.sin(time * Math.random());
                object.scale.set(scale, scale, scale);
    
                object.material.color.setHSL(
                    Math.abs(Math.sin(time * Math.random())),
                    0.7,
                    0.7
                );
            });
            const backgroundMaterial = this.scene.children.find(child => child instanceof THREE.Mesh && child.geometry instanceof THREE.SphereGeometry).material;
            backgroundMaterial.uniforms.time.value = time;
            backgroundMaterial.needsUpdate = true;
    
            this.renderer.render(this.scene, this.camera);
        }


        let animate = () => {
            this.animationId[animID1] = requestAnimationFrame(animate);
            animation()
        }

        animate()

    };

    scene5 = () => {
        this.musicGen.playVariation(5);
        if(this.storyEnabled){
            this.musicGen.sceneNarrations[4].start();
        };
        var animID1 = this.animationId.push(1)-1;
        this.camera.position.z = 15;
        this.scene.background = new THREE.Color(0x000022);
        const portalMaterial = new THREE.MeshBasicMaterial({ color: 0x6611ff, side: THREE.DoubleSide });
        const portalGeometry = new THREE.TorusGeometry(5, 0.3, 16, 100);
        const portal = new THREE.Mesh(portalGeometry, portalMaterial);
        this.scene.add(portal);
        const particlesGeometry = new THREE.BufferGeometry();
        const particlesCount = 1000;
        const posArray = new Float32Array(particlesCount * 3);
        for (let i = 0; i < particlesCount * 3; i++) {
            posArray[i] = (Math.random() - 0.5) * 50;
        }
        particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
        const particlesMaterial = new THREE.PointsMaterial({ size: 0.05, color: 0xffffff });
        const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
        this.scene.add(particlesMesh);
        const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
        const pointLight = new THREE.PointLight(0xff00ff, 1);
        pointLight.position.set(5, 5, 5);
        this.scene.add(ambientLight.clone(), pointLight.clone());
        let animate = () => {
            this.animationId[animID1] = requestAnimationFrame(animate);
            portal.rotation.y += 0.01;
            particlesMesh.rotation.y += 0.005;
            this.renderer.render(this.scene, this.camera);
        }
        animate();
    }

    scene6 = () => {
        this.musicGen.playVariation(6);
        if(this.storyEnabled){
            this.musicGen.sceneNarrations[5].start();
        };
        var animID1 = this.animationId.push(1) - 1;
        this.camera.position.z = 15;
        this.scene.background = new THREE.Color(0x220000);
        const geometries = [
            new THREE.BoxGeometry(1, 1, 1),
            new THREE.SphereGeometry(1, 32, 32),
            new THREE.ConeGeometry(1, 2, 32),
            new THREE.TorusGeometry(1, 0.4, 16, 100),
            new THREE.DodecahedronGeometry(1),
            new THREE.OctahedronGeometry(1),
            new THREE.TetrahedronGeometry(1),
            new THREE.IcosahedronGeometry(1),
            new THREE.CylinderGeometry(1, 1, 2, 32),
            new THREE.PlaneGeometry(1, 1),
            new THREE.CircleGeometry(1, 32),
            new THREE.TorusKnotGeometry(1, 0.4, 100, 16)
        ];
        const materials = [
            new THREE.MeshStandardMaterial({ color: 0xff2200, emissive: 0xff2200, wireframe: true }),
            new THREE.MeshStandardMaterial({ color: 0x22ff00, emissive: 0x22ff00, wireframe: true }),
            new THREE.MeshStandardMaterial({ color: 0x00aaff, emissive: 0x00aaff, wireframe: true }),
            new THREE.MeshStandardMaterial({ color: 0xff00ff, emissive: 0xff00ff, wireframe: true }),
            new THREE.MeshStandardMaterial({ color: 0xffff00, emissive: 0xffff00, wireframe: true })
        ];
        const gridSize = 4;
        const spacing = 5;
        const totalSize = gridSize * spacing;
        const rotatingEntities = [];
        const numGeometries = Math.min(geometries.length, gridSize * gridSize);
        for (let i = 0; i < numGeometries; i++) {
            const geometry = geometries[i];
            const material = materials[i % materials.length];
            const mesh = new THREE.Mesh(geometry, material);
            const row = Math.floor(i / gridSize);
            const col = i % gridSize;
            mesh.position.set(
                (col - gridSize / 2 + 0.5) * spacing,
                (row - gridSize / 2 + 0.5) * spacing,
                0 
            );
            const maxSize = spacing * 0.4;
            const scale = maxSize / Math.max(geometry.parameters.width || 1, geometry.parameters.height || 1);
            mesh.scale.set(scale, scale, scale);
            rotatingEntities.push(mesh);
            this.scene.add(mesh);
        }
        let rotateEntities = (entities) => {
            entities.forEach(entity => {
                entity.rotation.x += 0.01;
                entity.rotation.y += 0.02;
            });
        };
        const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
        const pointLight = new THREE.PointLight(0xff00ff, 1);
        pointLight.position.set(5, 5, 5);
        this.scene.add(ambientLight, pointLight);
        
        let animate = () => {
            this.animationId[animID1] = requestAnimationFrame(animate);
            rotateEntities(rotatingEntities);
            this.renderer.render(this.scene, this.camera);
        };
    
        animate();
    };
    
    scene7 = () => {
        this.musicGen.playVariation(7);
        if(this.storyEnabled){
            this.musicGen.sceneNarrations[6].start();
        };
        var animID1 = this.animationId.push(1) - 1;
        this.camera.position.set(0, 0, 20);
        const renderScene = new RenderPass(this.scene, this.camera);
        const bloomPass = new UnrealBloomPass(new THREE.Vector2(window.innerWidth, window.innerHeight), 1.5, 0.4, 100);
        bloomPass.threshold = 0.002;
        bloomPass.strength = 0.2;
        bloomPass.radius = 0;
        const composer = new EffectComposer(this.renderer);
        composer.addPass(renderScene);
        composer.addPass(bloomPass);
        const speed = 0.19;
        const rotationSpeed = 0.02;
        const scalingSpeed = 0.39;
        const colorChangeSpeed = 0.3;

        this.clock = new THREE.Clock();

        let addLights = (scene) => {
            const ambientLight = new THREE.AmbientLight(0xffffff, 1.5);
            scene.add(ambientLight);
          
            const pointLight1 = new THREE.PointLight(0xff0000, 2, 1000);
            pointLight1.position.set(500, 500, 500);
            scene.add(pointLight1);
          
            const pointLight2 = new THREE.PointLight(0x00ff00, 2, 1000);
            pointLight2.position.set(-500, 500, -500);
            scene.add(pointLight2);
          
            const pointLight3 = new THREE.PointLight(0x0000ff, 2, 1000);
            pointLight3.position.set(0, -500, 500);
            scene.add(pointLight3);
        }
        let createProceduralObjects = (scene) => {
            const numObjects = 800;
            const spread = 1500;
            for (let i = 0; i < numObjects; i++) {
              let geometry, material, object;
              const randomChoice = Math.floor(Math.random() * 12);
              const sizeFactor = Math.random() * 3 + 1;
              switch (randomChoice) {
                case 0: geometry = new THREE.TorusGeometry(sizeFactor * 3, sizeFactor * 1.5, 16, 100); break;
                case 1: geometry = new THREE.IcosahedronGeometry(sizeFactor * 3, 1); break;
                case 2: geometry = new THREE.BoxGeometry(sizeFactor * 3, sizeFactor * 3, sizeFactor * 3); break;
                case 3: geometry = new THREE.SphereGeometry(sizeFactor * 3, 32, 32); break;
                case 4: geometry = new THREE.CylinderGeometry(sizeFactor * 1.5, sizeFactor * 1.5, sizeFactor * 5, 32); break;
                case 5: geometry = new THREE.OctahedronGeometry(sizeFactor * 3, 0); break;
                case 6: geometry = new THREE.DodecahedronGeometry(sizeFactor * 3, 0); break;
                case 7: geometry = new THREE.TorusKnotGeometry(sizeFactor * 3, sizeFactor * 0.75, 100, 16); break;
                case 8: geometry = new THREE.TetrahedronGeometry(sizeFactor * 3, 0); break;
                case 9: geometry = new THREE.CapsuleGeometry(sizeFactor * 2, sizeFactor * 6, 16, 16); break;
                case 10: geometry = new THREE.ConeGeometry(sizeFactor * 2, sizeFactor * 6, 32); break;
                case 11: geometry = new THREE.RingGeometry(sizeFactor * 1.5, sizeFactor * 3, 32); break;
              }
              const wireframe = Math.random() > 0.5;
              const color = new THREE.Color(Math.random(), Math.random(), Math.random());
              material = wireframe
                ? new THREE.MeshBasicMaterial({ color, wireframe: true })
                : new THREE.MeshStandardMaterial({
                  color,
                  metalness: Math.random() * 0.5 + 0.5,
                  roughness: Math.random() * 2.2
                });
              object = new THREE.Mesh(geometry, material);
              object.position.set(
                Math.random() * spread - spread / 2,
                Math.random() * spread - spread / 2,
                Math.random() * spread - spread / 2
              );
              object.rotation.set(
                Math.random() * Math.PI,
                Math.random() * Math.PI,
                Math.random() * Math.PI
              );
              object.scale.set(
                Math.random() * sizeFactor + 0.5,
                Math.random() * sizeFactor + 0.5,
                Math.random() * sizeFactor + 0.5
              );
              scene.add(object);
            }
          }
        let updateObjects = (scene, time) => {
            scene.children.forEach(object => {
              if (object.isMesh) {
                object.rotation.x += rotationSpeed * Math.random();
                object.rotation.y += rotationSpeed * Math.random();
                object.rotation.z += rotationSpeed * Math.random();
                const scale = 1 + scalingSpeed * Math.sin(time * Math.random());
                object.scale.set(scale, scale, scale);
                if (object.material && !object.material.wireframe && object.material.color && typeof object.material.color.setHSL === 'function') {
                  object.material.color.setHSL(
                    Math.abs(Math.sin(time * colorChangeSpeed * Math.random())),
                    0.7,
                    0.7
                  );
                }
              }
            });
        }

        addLights(this.scene);
        createProceduralObjects(this.scene);

        let animate = () => {
            this.animationId[animID1] = requestAnimationFrame(animate);
            const time = this.clock.getElapsedTime() * speed;
            const loopTime = 30;
            const t = (time % loopTime) / loopTime;
            const point = spline.getPointAt(t);
            const tangent = spline.getTangentAt(t).normalize();
            this.camera.position.copy(point);
            const lookAtPoint = point.clone().add(tangent);
            this.camera.lookAt(lookAtPoint);
            updateObjects(this.scene, this.clock.getElapsedTime());
            composer.render();
          }
          
          animate();
    }

    scene8 = () => {
        this.musicGen.playVariation(8);
        if(this.storyEnabled){
            this.musicGen.sceneNarrations[7].start();
        };
        var animID1 = this.animationId.push(1) - 1;
        this.camera.position.z = 5;
        // const composer = new EffectComposer(this.renderer);
        // const bloomPass = new BloomPass(1.5);
        // composer.addPass(bloomPass);
        // const filmPass = new FilmPass(0.35, 0.025, 648, false);
        // composer.addPass(filmPass);

        const danceEntities = [];
        for (let i = 0; i < 40; i++) {
            const geometry = new THREE.TorusKnotGeometry(0.5, 0.2, 100, 16);
            const material = new THREE.MeshStandardMaterial({ color: Math.random() * 0xffffff, emissive: Math.random() * 0xffffff, roughness: 1, metalness: 0.3 });
            const danceEntity = new THREE.Mesh(geometry, material);
            danceEntity.position.set(Math.random() * 10 - 5, Math.random() * 10 - 5, Math.random() * 10 - 5);
            danceEntities.push(danceEntity);
            this.scene.add(danceEntity);
        }

        let animate = () => {
            this.animationId[animID1] = requestAnimationFrame(animate);
            danceEntities.forEach(child => {
                child.rotation.x += 0.025;
                child.rotation.y += 0.026;
            });
            this.renderer.render(this.scene, this.camera);
        }
        animate()
    }

    scene9 = () => {
        this.musicGen.playVariation(9);
        if(this.storyEnabled){
            this.musicGen.sceneNarrations[8].start();
        };
        var animID1 = this.animationId.push(1) - 1;
        this.camera.position.z = 5;

        const galaxyGeometry = new THREE.SphereGeometry(5, 32, 32);
        const galaxyMaterial = new THREE.MeshStandardMaterial({ color: 0x0000ff, emissive: 0x5500ff, wireframe: true });
        const galaxy = new THREE.Mesh(galaxyGeometry, galaxyMaterial);
        this.scene.add(galaxy);

        const nodesGeometry = new THREE.BufferGeometry();
        const nodeCount = 1000;
        const nodePositions = new Float32Array(nodeCount * 3);
        for (let i = 0; i < nodeCount * 3; i++) {
            nodePositions[i] = (Math.random() - 0.5) * 50;
        }
        nodesGeometry.setAttribute('position', new THREE.BufferAttribute(nodePositions, 3));

        const nodesMaterial = new THREE.PointsMaterial({ color: 0xffffff, size: 0.1 });
        const nodes = new THREE.Points(nodesGeometry, nodesMaterial);
        this.scene.add(nodes);

        let animate = () => {
            this.animationId[animID1] = requestAnimationFrame(animate);
            this.scene.children.forEach(child => {
                child.rotation.x += 0.0066;
                child.rotation.y += 0.0068;
            });
            this.renderer.render(this.scene, this.camera);
        }
        animate()

    }
    
    scene10 = () => {
        this.musicGen.playVariation(10);
        if(this.storyEnabled){
            this.musicGen.sceneNarrations[9].start();
        };
        var animID1 = this.animationId.push(1) - 1;
        this.camera.position.z = 5;
        
        const metamorphosisParticlesGeometry = new THREE.BufferGeometry();
        const metamorphosisParticlesCount = 1000;
        const metamorphosisPositions = new Float32Array(metamorphosisParticlesCount * 3);
        for (let i = 0; i < metamorphosisParticlesCount * 3; i++) {
            metamorphosisPositions[i] = (Math.random() - 0.5) * 20;
        }
        metamorphosisParticlesGeometry.setAttribute('position', new THREE.BufferAttribute(metamorphosisPositions, 3));

        const metamorphosisParticlesMaterial = new THREE.PointsMaterial({ color: 0xffffff, size: 0.05 });
        const metamorphosisParticles = new THREE.Points(metamorphosisParticlesGeometry, metamorphosisParticlesMaterial);
        this.scene.add(metamorphosisParticles);

        const morphObjects = [];
        for (let i = 0; i < 20; i++) {
            const geometry = new THREE.IcosahedronGeometry(0.5, 2);
            const material = new THREE.MeshStandardMaterial({ color: Math.random() * 0xffffff, emissive: Math.random() * 0xffffff });
            const morphObject = new THREE.Mesh(geometry, material);
            morphObject.position.set(Math.random() * 10 - 5, Math.random() * 10 - 5, Math.random() * 10 - 5);
            morphObjects.push(morphObject);
            this.scene.add(morphObject);
        }

        let animate = () => {
            this.animationId[animID1] = requestAnimationFrame(animate);
            this.scene.children.forEach(child => {
                if (child.isPoints) {
                  child.rotation.x += 0.0063;
                } else if (child.isMesh) {
                  child.rotation.x += 0.0062;
                  child.rotation.y += 0.0063;
                }
            });
            this.renderer.render(this.scene, this.camera);
        }
        animate();
    }

    scene11 = () => {
        this.musicGen.playVariation(11);
        if(this.storyEnabled){
            this.musicGen.sceneNarrations[10].start();
        };
        var animID1 = this.animationId.push(1) - 1;
        this.camera.position.z = 5;

        const renderScene = new RenderPass(this.scene, this.camera);
        const bloomPass = new UnrealBloomPass(new THREE.Vector2(window.innerWidth, window.innerHeight), 1.5, 0.4, 100);
        bloomPass.threshold = 0.002;
        bloomPass.strength = 0.7;
        bloomPass.radius = 0;
        const composer = new EffectComposer(this.renderer);
        composer.addPass(renderScene);
        composer.addPass(bloomPass);

        const speed = 0.19;
        const rotationSpeed = 0.02;
        const scalingSpeed = 0.5;
        const colorChangeSpeed = 0.1;
        
        let clock = new THREE.Clock();

        let addLights = (scene) => {
            const ambientLight = new THREE.AmbientLight(0xffffff, 1.5);
            scene.add(ambientLight);
            const pointLight1 = new THREE.PointLight(0xff0000, 2, 1000);
            pointLight1.position.set(500, 500, 500);
            scene.add(pointLight1);
            const pointLight2 = new THREE.PointLight(0x00ff00, 2, 1000);
            pointLight2.position.set(-500, 500, -500);
            scene.add(pointLight2);
            const pointLight3 = new THREE.PointLight(0x0000ff, 2, 1000);
            pointLight3.position.set(0, -500, 500);
            scene.add(pointLight3);
        }
        addLights(this.scene);
        
        let createProceduralObjects = (scene) => {
            const numObjects = 800;
            const spread = 2500;
          
            for (let i = 0; i < numObjects; i++) {
              let geometry, material, object;
          
              const randomChoice = Math.floor(Math.random() * 12);
              const sizeFactor = Math.random() * 3 + 1;
          
              switch (randomChoice) {
                case 0: geometry = new THREE.TorusGeometry(sizeFactor * 3, sizeFactor * 1.5, 16, 100); break;
                case 1: geometry = new THREE.IcosahedronGeometry(sizeFactor * 3, 1); break;
                case 2: geometry = new THREE.BoxGeometry(sizeFactor * 3, sizeFactor * 3, sizeFactor * 3); break;
                case 3: geometry = new THREE.SphereGeometry(sizeFactor * 3, 32, 32); break;
                case 4: geometry = new THREE.CylinderGeometry(sizeFactor * 1.5, sizeFactor * 1.5, sizeFactor * 5, 32); break;
                case 5: geometry = new THREE.OctahedronGeometry(sizeFactor * 3, 0); break;
                case 6: geometry = new THREE.DodecahedronGeometry(sizeFactor * 3, 0); break;
                case 7: geometry = new THREE.TorusKnotGeometry(sizeFactor * 3, sizeFactor * 0.75, 100, 16); break;
                case 8: geometry = new THREE.TetrahedronGeometry(sizeFactor * 3, 0); break;
                case 9: geometry = new THREE.CapsuleGeometry(sizeFactor * 2, sizeFactor * 6, 16, 16); break;
                case 10: geometry = new THREE.ConeGeometry(sizeFactor * 2, sizeFactor * 6, 32); break;
                case 11: geometry = new THREE.RingGeometry(sizeFactor * 1.5, sizeFactor * 3, 32); break;
              }
              const wireframe = Math.random() > 0.5;
              material = wireframe
                ? new THREE.MeshBasicMaterial({ color: new THREE.Color(Math.random(), Math.random(), Math.random()), wireframe: true })
                : new THREE.MeshStandardMaterial({
                  color: new THREE.Color(Math.random(), Math.random(), Math.random()).multiplyScalar(2.0),
                  metalness: Math.random() * 0.5 + 0.5,
                  roughness: Math.random() * 0.2
                });
              object = new THREE.Mesh(geometry, material);
              object.position.set(
                Math.random() * spread - spread / 2,
                Math.random() * spread - spread / 2,
                Math.random() * spread - spread / 2
              );
              object.rotation.set(
                Math.random() * Math.PI,
                Math.random() * Math.PI,
                Math.random() * Math.PI
              );
              object.scale.set(
                Math.random() * sizeFactor + 0.5,
                Math.random() * sizeFactor + 0.5,
                Math.random() * sizeFactor + 0.5
              );
              scene.add(object);
            }
        }
        createProceduralObjects(this.scene);
        
        function updateObjects(scene, time) {
            scene.children.forEach(object => {
              if (object.isMesh) {
                object.rotation.x += rotationSpeed * Math.random();
                object.rotation.y += rotationSpeed * Math.random();
                object.rotation.z += rotationSpeed * Math.random();
                const scale = 1 + scalingSpeed * Math.sin(time * Math.random());
                object.scale.set(scale, scale, scale);
                if (object.material && object.material.color && typeof object.material.color.setHSL === 'function') {
                  object.material.color.setHSL(
                    Math.abs(Math.sin(time * colorChangeSpeed * Math.random())),
                    0.7,
                    0.7
                  );
                }
              }
            });
        }

        let animate = () => {
            this.animationId[animID1] = requestAnimationFrame(animate);
            const time = clock.getElapsedTime() * speed;
            const loopTime = 20;
            const t = (time % loopTime) / loopTime;
            const point = spline.getPointAt(t);
            const tangent = spline.getTangentAt(t).normalize();
            this.camera.position.copy(point);
            const lookAtPoint = point.clone().add(tangent);
            this.camera.lookAt(lookAtPoint);
            updateObjects(this.scene, clock.getElapsedTime());
            composer.render();
        }
        animate()
    }

    scene12 = () => {
        this.musicGen.playVariation(12);
        if(this.storyEnabled){
            this.musicGen.sceneNarrations[11].start();
        };
        var animID1 = this.animationId.push(1) - 1;
        this.camera.position.z = 15;
        const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
        this.scene.add(ambientLight.clone());
        
        this.scene.background = new THREE.Color(0xdddddd);
        const sphere_geometry = new THREE.SphereGeometry(3, 32, 32);
        const sphere_material = new THREE.MeshStandardMaterial({ color: 0xffffe0, emissive: 0xffd700 });
        const sphere = new THREE.Mesh(sphere_geometry, sphere_material);
        this.scene.add(sphere);

        const symmetryMaterial = new THREE.MeshStandardMaterial({ color: 0xffc0cb, wireframe: true });
        const symmetryGeometry = new THREE.OctahedronGeometry(2, 0);
        const symmetryMesh = new THREE.Mesh(symmetryGeometry, symmetryMaterial);

        const symmetryGroup = new THREE.Group();
        for (let i = 0; i < 8; i++) {
        const symmetryClone = symmetryMesh.clone();
        symmetryClone.position.set(
            Math.cos((i / 8) * 2 * Math.PI) * 5,
            Math.sin((i / 8) * 2 * Math.PI) * 5,
            0
        );
        symmetryGroup.add(symmetryClone);
        }
        this.scene.add(symmetryGroup);
        const symmetryEntities = symmetryGroup.children;

        let time = 0;
        let animateEntities = (entities) => {
            time += 0.01;
            entities.forEach((entity, index) => {
                entity.rotation.x += 0.01;
                entity.rotation.y += 0.01;
                entity.position.x = Math.sin(time + index) * 5;
                entity.position.y = Math.cos(time + index) * 5;
                entity.position.z = Math.sin(time + index) * 5;

                entity.material.color.setHSL((time + index) % 1, 0.5, 0.5);
            });
        }
        let animate = () => {
            this.animationId[animID1] = requestAnimationFrame(animate);
            animateEntities(symmetryEntities);
            sphere.rotation.y += 0.01;
            this.renderer.render(this.scene, this.camera);
          
            // controls.update();
        }
        animate();
    }

    storyMode = () => {
        this.storyEnabled = true;
        let timeoutMS = 0;
        let timeoutMSArr = [0, 36000, 37000, 36000, 34000, 36000, 35000, 35000, 38000, 40000, 34000, 37000];
        for(let i = 1; i <= 12; i++) {
            timeoutMS += timeoutMSArr[i - 1];
            let mode = 'mode' + i;
            if(i === 1) {
                this.modeSelectStory(mode);
            } else {
                this.timeOuts[i - 1] = setTimeout(() => {
                    this.modeSelectStory(mode);
                }, timeoutMS);
            }
        }
    }
    
    
    

    modeSelect = (mode) => {
        this.storyTextEl.style.opacity = 0;
        this.stopAnimation();
        this.resetScene();
        this.stopStory();
        this.resetStory();
        switch(mode){
            case 'mode1':
                this.scene1();
                break;
            case 'mode2':
                this.scene2();
                break;
            case 'mode3':
                this.scene3();
                break;
            case 'mode4':
                this.scene4();
                break;
            case 'mode5':
                this.scene5();
                break;
            case 'mode6':
                this.scene6();
                break;
            case 'mode7':
                this.scene7();
                break;
            case 'mode8':
                this.scene8();
                break;
            case 'mode9':
                this.scene9();
                break;
            case 'mode10':
                this.scene10();
                break;
            case 'mode11':
                this.scene11();
                break;
            case 'mode12':
                this.scene12();
                break;
            case 'story':
                this.resetStory();
                this.storyMode();
                break;
            default:
                //
        }
    }

    modeSelectStory = (mode) => {
        this.stopAnimation();
        this.resetScene();
        switch(mode){
            case 'mode1':
                this.scene1();
                this.storyTextEl.innerText = this.storyTitle[0];
                this.storyTextEl.style.webkitTextStrokeColor = "white";
                this.storyTextEl.style.opacity = 1;
                setTimeout(()=>{
                    this.storyTextEl.style.opacity = 0;
                }, 4000);
                break;
            case 'mode2':
                this.scene2();
                this.storyTextEl.innerText = this.storyTitle[1];
                this.storyTextEl.style.opacity = 1;
                setTimeout(()=>{
                    this.storyTextEl.style.opacity = 0;
                }, 4000);
                break;
            case 'mode3':
                this.scene3();
                this.storyTextEl.innerText = this.storyTitle[2];
                this.storyTextEl.style.opacity = 1;
                setTimeout(()=>{
                    this.storyTextEl.style.opacity = 0;
                }, 4000);
                break;
            case 'mode4':
                this.scene4();
                this.storyTextEl.innerText = this.storyTitle[3];
                this.storyTextEl.style.opacity = 1;
                setTimeout(()=>{
                    this.storyTextEl.style.opacity = 0;
                }, 4000);
                break;
            case 'mode5':
                this.scene5();
                this.storyTextEl.innerText = this.storyTitle[4];
                this.storyTextEl.style.opacity = 1;
                setTimeout(()=>{
                    this.storyTextEl.style.opacity = 0;
                }, 4000);
                break;
            case 'mode6':
                this.scene6();
                this.storyTextEl.innerText = this.storyTitle[5];
                this.storyTextEl.style.opacity = 1;
                setTimeout(()=>{
                    this.storyTextEl.style.opacity = 0;
                }, 4000);
                break;
            case 'mode7':
                this.scene7();
                this.storyTextEl.innerText = this.storyTitle[6];
                this.storyTextEl.style.opacity = 1;
                setTimeout(()=>{
                    this.storyTextEl.style.opacity = 0;
                }, 4000);
                break;
            case 'mode8':
                this.scene8();
                this.storyTextEl.innerText = this.storyTitle[7];
                this.storyTextEl.style.opacity = 1;
                setTimeout(()=>{
                    this.storyTextEl.style.opacity = 0;
                }, 4000);
                break;
            case 'mode9':
                this.scene9();
                this.storyTextEl.innerText = this.storyTitle[8];
                this.storyTextEl.style.opacity = 1;
                setTimeout(()=>{
                    this.storyTextEl.style.opacity = 0;
                }, 4000);
                break;
            case 'mode10':
                this.scene10();
                this.storyTextEl.innerText = this.storyTitle[9];
                this.storyTextEl.style.opacity = 1;
                setTimeout(()=>{
                    this.storyTextEl.style.opacity = 0;
                }, 4000);
                break;
            case 'mode11':
                this.scene11();
                this.storyTextEl.innerText = this.storyTitle[10];
                this.storyTextEl.style.opacity = 1;
                setTimeout(()=>{
                    this.storyTextEl.style.opacity = 0;
                }, 4000);
                break;
            case 'mode12':
                this.scene12();
                this.storyTextEl.innerText = this.storyTitle[11];
                this.storyTextEl.style.opacity = 1;
                this.storyTextEl.style.webkitTextStrokeColor = "black";
                setTimeout(()=>{
                    this.storyTextEl.style.opacity = 0;
                }, 4000);
                setTimeout(()=>{
                    this.storyTextEl.innerText = "The end";
                    this.storyTextEl.style.webkitTextStrokeColor = "black";
                    this.storyTextEl.style.opacity = 1;
                }, 49000);
                break;
            default:
                //
        }
    }
}



