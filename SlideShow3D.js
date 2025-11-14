//await BABYLON.ImportMeshAsync("Meshes/TankPz.glb", scene, { meshNames: "" }).then((result)=> {
//		for(let i = 0; i < result.meshes.length; i++){
//			console.log(result.meshes[i].name);
//		}
//	});

const canvas = document.getElementById("renderCanvas"); // Get the canvas element
const engine = new BABYLON.Engine(canvas, true); // Generate the BABYLON 3D engine
var moveDistanceHorizontal = 4;
var moveDistanceVertical = 2;
var targetAlpha = 0;
var targetBeta = 0;
var alphaRotation = 0;
var alphaRotationSpeed = 0.000002;

var createScene = function () {
	// This creates a basic Babylon Scene object (non-mesh)
	var scene = new BABYLON.Scene(engine);
	

	var camera = new BABYLON.ArcRotateCamera("arcCamera", 0, Math.PI/3, 15, BABYLON.Vector3.Zero(), scene);
	
	

	// Async loading list
	var promises = [];
	promises.push(BABYLON.ImportMeshAsync("https://raw.githubusercontent.com/Rische/Rische.github.io/refs/heads/master/Meshes/Diorama.glb", scene, { meshNames: "" }));
	
	// Callback when assets are loaded
	Promise.all(promises).then(function(result) {
		/*
		console.log(result);
		for(let i = 0; i < result.length; i++){
			for(let j = 0; j < result[i].meshes.length; j++)
			{
				if(result[i].meshes[j].name === tank1bodyName)
					tank1body = result[i].meshes[j];
				else if(result[i].meshes[j].name === tank1turretName)
					tank1turret = result[i].meshes[j];
			}
		}
		*/
		
		// Finished loading.
		
		camera.setTarget( new BABYLON.Vector3(0, 0.5, 0) );
		camera.fov = 0.3;

		scene.activeCameras.push(camera);
		scene.clearColor = new BABYLON.Color4(0.21,0.28,0.35,1);
		//scene.fogMode = 2;
		//scene.fogDensity = 0.03;
		//scene.fogColor = new BABYLON.Color3(scene.clearColor.r, scene.clearColor.g, scene.clearColor.b);


		var light1 = new BABYLON.DirectionalLight("light", new BABYLON.Vector3(0, -1, 1), scene);
		light1.diffuse = new BABYLON.Color3(0.95,0.9,1);
		light1.intensity = 5;
		var light2 = new BABYLON.DirectionalLight("lightRed", new BABYLON.Vector3(0, -0.2, -2), scene);
		light2.diffuse = new BABYLON.Color3(1, 0.15, 0);
		light2.intensity = 3;
		//var light3 = new BABYLON.DirectionalLight("lightBlue", new BABYLON.Vector3(2, -0.1, -1), scene);
		//light3.diffuse = new BABYLON.Color3(0, 0, 1);
		//light3.intensity = 2;

		// Our built-in 'sphere' shape.
		//var sphere = BABYLON.MeshBuilder.CreateSphere("sphere", {diameter: 2, segments: 32}, scene);

		// Move the sphere upward 1/2 its height
		//sphere.position.y = 1;

		window.addEventListener('mousemove', function(event){
			 targetAlpha = event.clientX / screen.width * -moveDistanceHorizontal + 1.5;
			 targetBeta = 0.5+event.clientY / screen.height * (Math.PI-moveDistanceVertical);
		})
		
		window.addEventListener('touchmove', function(event){
			if(event.touches.length > 0){
				var touch = event.touches.item(0);
				targetAlpha = touch.clientX / screen.width * -moveDistanceHorizontal + 1.5;
				targetBeta = 0.5+touch.clientY / screen.height * (Math.PI-moveDistanceVertical)
			}
		})

		scene.onBeforeRenderObservable.add(() => {
			//alphaRotation = (alphaRotation + alphaRotationSpeed * scene.deltaTime) % (Math.PI * 2);
			camera.alpha = alphaRotation + BABYLON.Scalar.Lerp(camera.alpha, targetAlpha, scene.deltaTime/500 );
			camera.beta = BABYLON.Scalar.Lerp(camera.beta, targetBeta, scene.deltaTime/500 );
		});
		
	});
	
	return scene;
};

const scene = createScene(); //Call the createScene function
// Register a render loop to repeatedly render the scene
engine.runRenderLoop(function () {
		scene.render();
});
// Watch for browser/canvas resize events
window.addEventListener("resize", function () {
		engine.resize();
});

var slideIndex = [0,0,0,0,0,0,0,0,0,0,0];

function toggle3D(id3d, slideElement){
	var element3d = document.getElementById(id3d);
	if (element3d.style.display === "none") {
		element3d.style.display = "block";
		slideElement.style.display = "none";
		engine.resize();
	} else {
		element3d.style.display = "none";
		slideElement.style.display = "block";
		engine.resize();
	}
}

function plusSlides(offset, name, slide, images) {
	slideIndex[slide] = slideIndex[slide] + offset;
	if (slideIndex[slide] < 0) { slideIndex[slide] = images.length - 1; }
	if (slideIndex[slide] >= images.length) { slideIndex[slide] = 0; }
	showSlides(name, slideIndex[slide], images);
}

function plusSlidesWith3D(offset, name, slide, id3d, images) {
	var previousIndex = slideIndex[slide];
	plusSlides(offset, name, slide, images)
	if(previousIndex == 0 || slideIndex[slide] == 0){
		var x = document.getElementsByClassName("slideshow-container");
		for(let i = 0; i < x.length; i++){
			if(x[i].style.backgroundImage.includes(name)){
				toggle3D(id3d, x[i]);
				break;
			}
		}
	}
}

// Disable slide show for Khaligrad.
var x = document.getElementsByClassName("slideshow-container");
for(let i = 0; i < x.length; i++){
	if(x[i].style.backgroundImage.includes("Khaligrad")){
		x[i].style.display = "none";
		engine.resize();
		break;
	}
}

function showSlides(name, image, images) {
  var x = document.getElementsByClassName("slideshow-container");
  for(let i = 0; i < x.length; i++){
	if(x[i].style.backgroundImage.includes(name)){
		x[i].style.backgroundImage = "url("+images[image]+")";
		break;
	}
  }
}