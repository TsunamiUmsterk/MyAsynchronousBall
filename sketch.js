var ball;
var database, ballPosition;

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
    backtoMid.position(1100, 50);
    backtoMid.style('font-size','20px');
    backtoMid.style('background-color','Cyan');
    backtoMid.size(100,50);
    backtoMid.mousePressed(pressButton);

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
    
    if(keyDown(LEFT_ARROW)){
        changePosition(-3,0);
    }
    else if(keyDown(RIGHT_ARROW)){
        changePosition(3,0);
    }
    else if(keyDown(UP_ARROW)){
        changePosition(0,-3);
    }
    else if(keyDown(DOWN_ARROW)){
        changePosition(0,+3);
    }

    

    fill("blue");
    textSize(45);
    text("x:"+ ball.x + ", y: " + ball.y, 10, 50);

    fill("black")
    textSize(50);
    text("My Asynchronous Moving Ball", 530, 40);

    fill("orange")
    textSize(30);
    text("Made by Umar Bashir, Age: 13", 790, 890);


    fill("red")
    textSize(30);
    text("Press ↑ to move up", 10, 770);
    text("Press ↓ to move down", 10, 800);
    text("Press ← to move left", 10, 830);
    text("Press → to move right", 10, 860);
    text("Press the Button to go back to the middle", 10, 890);

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

