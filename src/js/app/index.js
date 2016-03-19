var THREE = require('three');

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
	requestAnimationFrame( animate );

	mesh.rotation.x += 0.005;
	mesh.rotation.y += 0.01;

	renderer.render( scene, camera );
})();
