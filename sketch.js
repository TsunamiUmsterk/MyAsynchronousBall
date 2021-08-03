var ball;
var database, ballPosition;
var value1, value2;

function setup(){
    createCanvas(1200, 900);
    background(color(0, 0, 255));
    ball = createSprite(600,450,20,20);
    ball.shapeColor = "green";
    

    database = firebase.database();
    // ref() - reference to the location in the database
    ballPosition = database.ref("ball/position");
    // on() - listener
    ballPosition.on("value", readPosition, showError);

    backtoMid = createButton("Reset to Middle");
    backtoMid.position(ball.x + 400, ball.y + 400);
    backtoMid.style('font-size','20px');
    backtoMid.style('background-color','Cyan');
    backtoMid.size(200,50);
    backtoMid.mousePressed(pressButton);

    var inp = createButton("Change Zoom to 1x and 2x");
    inp.position(ball.x + 200, ball.y + 400);
    inp.style('font-size','21px');
    inp.style('background-color','green');
    inp.size(200,50);
    inp.mousePressed(updateZoom);

      }
      
    

function readPosition(data) {
    var position = data.val() //val()
    ball.x = position.x;
    ball.y = position.y;
}

function showError(error) {
    console.log(error);
}


function draw(){
    background(230)
    camera.position = ball;
    if(keyDown(LEFT_ARROW)){
        changePosition(-3,0);
    }
    else if(keyDown(RIGHT_ARROW)){
        changePosition(+3,0);
    }
    else if(keyDown(UP_ARROW)){
        changePosition(0,-3);
    }
    else if(keyDown(DOWN_ARROW)){
        changePosition(0,+3);
    }



    fill("blue");
    textSize(45);
    text("x:"+ ball.x + ", y: " + ball.y, ball.x - 585, ball.y - 400);

    fill("black")
    textSize(50);
    text("My Asynchronous Moving Ball", 530, 40);

    fill("orange")
    textSize(30);
    text("Made by Umar Bashir, Age: 13", 790, 70);


    fill("red")
    textSize(30);
    text("Press ↑ to move up", 10, 80);
    text("Press ↓ to move down", 10, 110);
    text("Press ← to move left", 10, 140);
    text("Press → to move right", 10, 170);
    text("Press the Button to go back to the middle", 10, 200);
    
    

    drawSprites();
}

function changePosition(changeInX,changeInY){
    // set() - writes data
    ballPosition.set({
        x : ball.x + changeInX,
        y : ball.y + changeInY
       })
   
}

function pressButton() {
    var ballRef = database.ref("ball/position");
        ballRef.set({
            x : 600,
            y : 450
       });
}

function updateZoom() {
    if(camera.zoom === 1) {
        camera.zoom = 2;
    } else {
        camera.zoom = 1;
    }
}

 

