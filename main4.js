img = "";
objects = [];
status = "";

function preload(){
  img = loadImage('kitchen.jpg');
}


function setup() {
  canvas = createCanvas(540, 420);
  canvas.center();
  objectDetector = ml5.objectDetector('cocossd', modelLoaded);
  document.getElementById("status").innerHTML = "Status : Detecting Objects";
}

function modelLoaded() {
  console.log("Model Loaded!");
  status = true;
  objectDetector.detect(img, gotResult);
}

function gotResult(error, results) {
  if (error) {
    console.log(error);
  }
  console.log(results);
  objects = results;
}


function draw() {
  image(img, 0, 0, 640,420);

      if(status != "")
      {
        for (i = 0; i < objects.length; i++) {
          document.getElementById("status").innerHTML = "Status : Object Detected";
    
          fill("red");
          percent = floor(objects[i].confidence * 100);
          text(objects[i].label + " " + percent + "%", objects[i].x+15 , objects[i].y+20 );
          noFill();
          stroke("blue");
          strokeWeight(2);
          rect(objects[i].x-90, objects[i].y-30, objects[i].width, objects[i].height);
        }
      }
}
