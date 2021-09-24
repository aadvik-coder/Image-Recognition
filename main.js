Waddles = "";
Controller = "";
Watch = "";
Rubiks = "";
Mouse = "";
object = [];
colour = "";
objectDetector = "";
selected_img = "";
mode = false;

function preload() {
    Waddles = loadImage("Waddles.jpeg");
    Controller = loadImage("Controller.jpeg");
    Watch = loadImage("Watch.jpeg");
    Rubiks = loadImage("Rubik_s.jpeg");
    Mouse = loadImage("Mouse.jpeg");
    selected_img = Waddles;
    
}

function setup() {
    canvas = createCanvas(480, 380);
    canvas.position(1000, 800);

    objectDetector = ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("status").innerHTML = "Status : Detecting Objects";
    document.getElementById("status").style.background = "linear-gradient(#6e63ff 0%, #7930ff)";

}

function draw() {
    if (mode = true) {
        image(selected_img, 0, 0, 480, 380);

        objectDetector.detect(selected_img, gotResult);
        document.getElementById("obj_detected").innerHTML = "Number of objects detected are: " + object.length;
        if (object.length <= 0) {
            document.getElementById("obj_detected").style.background = "linear-gradient(#6e63ff 0%, #7930ff)";
        } else {
            document.getElementById("obj_detected").style.background = "linear-gradient(#ff5454 0%, #ff8754 50%, #fcff54 100%)";
        }
        for (i = 0; i < object.length; i++) {

            percent = floor(object[i].confidence * 100);
            document.getElementById("status").innerHTML = "Status : Object Detected";
            document.getElementById("status").style.background = "linear-gradient(#ff5454 0%, #ff8754 50%, #fcff54 100%)";
            document.getElementById("obj_detected").innerHTML = "Number of objects detected are: " + object.length;

            if (percent < 50) {
                colour = "#ff3030";
            } else if (percent > 50 && percent <= 70) {
                colour = "#ff8730";
            } else if (percent > 70 && percent <= 90) {
                colour = "#fff830";
            } else if (percent > 90 && percent <= 100) {
                colour = "#30ff34";
            }

            fill(colour);

            text(object[i].label + " " + percent + "%", object[i].x, object[i].y + 10);
            noFill();
            stroke(colour);
            rect(object[i].x, object[i].y, object[i].width, object[i].height);
        }
    }
}

function waddles() {
    selected_img = Waddles;
    mode = true;
}

function watch() {
    selected_img = Watch;
    mode = true;
}

function controller() {
    selected_img = Controller;
    mode = true;
}

function rubik() {
    selected_img = Rubiks;
    mode = true;
}

function mouse() {
    selected_img = Mouse;
    mode = true;
}

function modelLoaded() {
    console.log("Model Loaded1!!!");
}

function gotResult(error, results) {
    if (error) {
        console.error(error);
    }
    console.log(results);
    object = results;
}