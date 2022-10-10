import { useContext, useEffect, useState } from "react";
import * as THREE from 'three'
import { Context } from "../App";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls"

function ThreeScene() {
    const state = useContext(Context)
    let controls;
    const [scene] = useState(new THREE.Scene())
    const [camera] = useState(new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 1000))
    const [renderer] = useState(new THREE.WebGLRenderer({ antialias: true }))
    const [firstCountry] = useState(new THREE.Mesh(new THREE.BoxGeometry(1, 1, 1), new THREE.MeshLambertMaterial({color: 0xf4142e})))
    const [secondCountry] = useState(new THREE.Mesh(new THREE.BoxGeometry(1, 1, 1), new THREE.MeshLambertMaterial({color: 0x0040ff})))
    const [ground] = useState(new THREE.Mesh(new THREE.PlaneGeometry(2000, 2000), new THREE.MeshLambertMaterial({color: 0xffffff})))

    useEffect(() => {
        renderer.shadowMap.enabled = true;
        renderer.shadowMap.type = THREE.PCFSoftShadowMap;
        renderer.setSize(window.innerWidth, window.innerHeight);
        document.body.appendChild(renderer.domElement);
    
        camera.position.set(6, 8, 10);
    
        controls = new OrbitControls(camera, renderer.domElement)
        controls.enableDamping = true

        controls.addEventListener('change', render);
        controls.dampingFactor = 0.05;
        controls.enablePan = false;
        controls.minDistance = 2;
        controls.maxDistance = 200;
        controls.maxPolarAngle = (Math.PI / 2) - 0.0304;

        // Adding Objects
        ground.rotation.x = Math.PI / -2;
        ground.receiveShadow = true;
        
        firstCountry.position.x = -1
        secondCountry.position.x = 1
    
        firstCountry.castShadow = true;
        secondCountry.castShadow = true;
        firstCountry.receiveShadow = true;
        secondCountry.receiveShadow = true;
    
        firstCountry.position.y = 0.5
        secondCountry.position.y = 0.5

        // Adding Lighting
        const light = new THREE.DirectionalLight( 0xffffff, 1 );
        light.position.set(10, 10, 5);
        light.castShadow = true;
        
        const ambient = new THREE.AmbientLight(0xffffff, 0.5);
    
        // Adding everything to the scene
        scene.add(ground)
        scene.add(firstCountry);
        scene.add(secondCountry);
        scene.add(light);
        scene.add(ambient);
    
        window.addEventListener('resize', onWindowResize);

        renderer.render(scene, camera);
    }, [])
    
    let numb = 0

    useEffect(() => {
        animate()
    }, [state.height.firstHeight, state.height.secondHeight])

    useEffect(() => {
        if (state.darkmode) setDarkmode()
        if (!state.darkmode) setLightmode()
    }, [state.darkmode])

    const animate = () => {
        if (numb < 1) requestAnimationFrame(animate)
        firstCountry.scale.lerp(new THREE.Vector3(1, state.height.firstHeight, 1), numb)
        firstCountry.position.lerp(new THREE.Vector3(-1, state.height.firstHeight / 2, 0), numb)
        secondCountry.scale.lerp(new THREE.Vector3(1, state.height.secondHeight, 1), numb)
        secondCountry.position.lerp(new THREE.Vector3(1, state.height.secondHeight / 2, 0), numb)
        numb += 0.01
        render()
    }

    const setDarkmode = () => {
        scene.background = new THREE.Color(0x1c1c2e)
        ground.material.color.setHex(0x181829)
        render()
    }
    const setLightmode = () => {
        scene.background = new THREE.Color(0xffffff);
        ground.material.color.setHex(0xffffff)
        render()
    }

    const onWindowResize = () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
        render()
    }
    const render = () => {
        renderer.render(scene, camera);
    }
}

export default ThreeScene