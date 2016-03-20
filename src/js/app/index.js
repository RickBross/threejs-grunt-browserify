
var Stats = require('stats.js');
var stats = new Stats();
var dat = require('dat-gui');
//var gui = new dat.GUI();
/**
 * Provides requestAnimationFrame in a cross browser way.
 * http://paulirish.com/2011/requestanimationframe-for-smart-animating/
 */

    if ( !window.requestAnimationFrame ) {

    	window.requestAnimationFrame = ( function() {

    		return window.webkitRequestAnimationFrame ||
    		window.mozRequestAnimationFrame ||
    		window.oRequestAnimationFrame ||
    		window.msRequestAnimationFrame ||
    		function( /* function FrameRequestCallback */ callback, /* DOMElement Element */ element ) {

    			window.setTimeout( callback, 1000 / 60 );

    		};

    	} )();

    }

			var KEYCODE_SPACE = 32;
			var KEYCODE_UP = 38;
			var KEYCODE_LEFT = 37;
			var KEYCODE_RIGHT = 39;
			var KEYCODE_W = 87;
			var KEYCODE_A = 65;
			var KEYCODE_D = 68;
			var camera, scene, renderer, mouse2d, sun, sphere;
			var lfHeld = false;
			var rtHeld = false;

			var range = 400;
			var speed = 1;
			var sphereSize = 4;

			var cubes = [];
			var vy = 0;
			var vx = 0;
			var jumping = false;
			var inAir = true;
			var gravity = 0.3;

			function init(){

				container = document.createElement('div');
				document.body.appendChild(container);


				camera = new THREE.PerspectiveCamera( 40, window.innerWidth / window.innerHeight, 1, 10000 );
				camera.position.set( 300, 120, 0 );

				scene = new THREE.Scene();

				sphere = new THREE.Mesh( new THREE.SphereGeometry( sphereSize, 10, 10 ), new THREE.MeshLambertMaterial( { color: 0xff0000 } ) );
				sphere.position.y = 100;
				scene.add( sphere );

				renderer = new THREE.WebGLRenderer();
				renderer.setSize(window.innerWidth, window.innerHeight);
				container.appendChild(renderer.domElement);

				var ambientLight = new THREE.AmbientLight(0xdddddd);
				scene.add(ambientLight);

				sun = new THREE.DirectionalLight(0xffffff);
				sun.position = new THREE.Vector3(1, -1, 1).normalize();
				scene.add(sun);

				createPlatforms();

				document.onkeydown = handleKeyDown;
				document.onkeyup = handleKeyUp;
				animate();
			}

			function createPlatforms(){

				camera.target=createCube(100, 10, 200, new THREE.Vector3( 0, 0, 0), 0).position;
				createCube(100, 10, 100, new THREE.Vector3(0, 80, 170), 0);
				createCube(100, 10, 200, new THREE.Vector3( 0, 160, 0), 0);

			}

			function createCube(sx, sy, sz, p, ry){

				var cube = new THREE.Mesh( new THREE.CubeGeometry( sx, sy, sz ), new THREE.MeshLambertMaterial( { color: 0x003300 } ) );
				cube.position = p;
				cube.rotation.y = ry;
				scene.add(cube);

				THREE.Collisions.colliders.push( THREE.CollisionUtils.MeshOBB(cube) );
				cubes.push(cube);
				return cube;
			}

			function animate() {
				requestAnimationFrame( animate );
				camera.position.x = sphere.position.x+400;
				camera.position.y = sphere.position.y+200;
				camera.position.z = sphere.position.z+200;
				vy+=gravity;
				if (inAir){
					if (vy>5){
						vy=5;
					}
				}
				if (lfHeld){
					vx = 2;
				}
				if (rtHeld){
					vx = -2;
				}
				sphere.position.z+=vx;
				vx=vx*0.8;

				var ray = new THREE.Ray( sphere.position, new THREE.Vector3( 0, -1, 0 ) );


				var c = THREE.Collisions.rayCastNearest( ray );

				if ( !c || c.distance > vy+sphereSize ) {
					sphere.position.y -= vy;
					inAir = true;
				}else{
					inAir = false;
					vy=0; 		// switch gravity off
					jumping = false;
				}

				if (inAir === false && c.distance < sphereSize){
					sphere.position.y+=1;
				}


				camera.lookAt( camera.target );

				renderer.render( scene, camera );

			}

			function jump(){
				if (jumping === false){
					sphere.position.y += 5;
					vy = -8;
					jumping = true;
				}
			}

			function handleKeyDown(e) {
				if(!e){ e = window.event; }
				switch(e.keyCode) {
					case KEYCODE_A:
					case KEYCODE_LEFT:	lfHeld = true; break;
					case KEYCODE_D:
					case KEYCODE_RIGHT: rtHeld = true; break;
					case KEYCODE_W:
					case KEYCODE_UP:	jump(); break;
				}
			}

			function handleKeyUp(e) {
			if(!e){ e = window.event; }
				switch(e.keyCode) {
					case KEYCODE_A:
					case KEYCODE_LEFT:	lfHeld = false; break;
					case KEYCODE_D:
					case KEYCODE_RIGHT: rtHeld = false; break;
				}
			}

init();
