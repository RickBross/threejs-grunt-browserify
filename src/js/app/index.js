var THREE = require('three');
var Stats = require('stats.js');
var stats = new Stats();

stats.setMode(0); // 0: fps, 1: ms
document.body.appendChild( stats.domElement );
stats.domElement.style.left = '0px';
stats.domElement.style.top = '0px';
stats.domElement.style.position = 'absolute';

var renderer = new THREE.WebGLRenderer();

var size = {
  w: window.innerWidth,
  h: window.innerHeight
};

var renderer	= new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

var scene	= new THREE.Scene();
var camera	= new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 1000 );
camera.position.z = 3;

THREEx.WindowResize(renderer, camera);

var geometry	= new THREE.CubeGeometry( 1, 1, 1);
var material	= new THREE.MeshNormalMaterial();
var mesh	= new THREE.Mesh( geometry, material );
scene.add( mesh );

(function animate(){


  	stats.begin();

    	mesh.rotation.x += 0.005;
    	mesh.rotation.y += 0.01;

    	renderer.render( scene, camera );

  	stats.end();

    requestAnimationFrame( animate );
})();
