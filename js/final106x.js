/*
    final106x.js
*/

/* ************************************************************* */
//When the page has fully loaded, execute the eventWindowLoaded function

window.addEventListener("load", eventWindowLoaded, false);

/* ************************************************************* */
//eventWindowLoaded()
//Called when the window has been loaded it then calls the canvasapp()
function eventWindowLoaded() {
    canvasApp();
} // eventWindowLoaded()

/* ************************************************************* */
//canvasSupport() 
//Check for Canvas Support using modernizr.js
function canvasSupport() {
    return Modernizr.canvas;
} // canvasSupport()


/* ************************************************************* */
//canvasApp() 
//The function where ALL our canvas code will go
function canvasApp() {
    /* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
    /* Canvas Support */
    /* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */

    // -----------------------------------------------------------
    //Check to see if the canvas has a context 
    if (!canvasSupport()) {
        return;
    }

    /* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
    /* Utility Functions */
    /* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */

    // -----------------------------------------------------------
    //function for getting a random number with in a range	
    function getRandom(min, max) {
        return Math.floor(Math.random() * (max - min) + min);
    } //getRandom

    // -----------------------------------------------------------
    //function randomize the color
    function getRandomColor() {
        //do not be complete completely transparent
        var opacity = getRandom(3, 10) / 10;
        return "rgba(" + getRandom(0, 255) + "," + getRandom(0, 255) + "," + getRandom(0, 255) + "," + opacity + ")";
    } //randomColor()

    /* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
    /* Image Loading Setup Variables and Functions */
    /* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */

    // -----------------------------------------------------
    // Setup Images
    // declare an array for image objects 

    var images = [];

    // assign our image sources
    var imageSources = [
        "images/space.jpg",
        "images/portal1.gif",
        "images/spaceship.png",
        "images/r&m.png",
        "images/cacti.png",
        "images/cacti2.png",
        "images/portalGif.gif",
        "images/snowball.png",
        "images/base.png",
        "images/meteroid.png",
        "images/r&m2.png",
        "images/rick.png",
        "images/space2.jpg"

    ]; //imageSources 

    //image index helpers
    var spaceIm = 0;
    var portalIm = 1;
    var spaceshipIm = 2;
    var rAndmIM = 3;
    var cactiIm = 4;
    var cacti2Im = 5;
    var portalGifIm = 6;
    var spaceGifIm = 7;
    var baseIm = 8;
    var meteroidIm = 9;
    var rAndm2IM = 10;
    var rickIm = 11;
    var space2Im = 12;

    // -----------------------------------------------------    
    // loadImages()
    // load all the images
    function loadImages(images, imageSources, callback) {
        var loadedImages = 0;

        // for each imageSource
        for (var src = 0; src < imageSources.length; src++) {
            //create a new image object
            images[src] = new Image();

            //load the image 
            images[src].onload = function () {
                if (++loadedImages >= imageSources.length) {
                    callback(images);
                } //if 
            } //onload

            //set the image source
            images[src].src = imageSources[src];
        } //for

    } //loadimages()

    /* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
    /* Canvas Variables */
    /* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */

    //-----------------------------------------------------------
    //Setup the canvas object 
    var theCanvas = document.getElementById("myCanvas"); //get the canvas element
    var context = theCanvas.getContext("2d"); //get the context
    var canvasHeight = theCanvas.height; //get the heigth of the canvas
    var canvasWidth = theCanvas.width; //get the width of the canvas
    var canvasColor = "black";

    /* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
    /* Global Variables */
    /* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */

    //-----------------------------------------------------------
    // Start Game 
    var gap = 50;

    var score = 0;

    var frameCounter = 0;

    var addInterval = 100;

    var gameOn = false;
    var gameOver = false;

    var bgMusic = new Audio("audio/r&m.mp3");

    /*- - - - - - - - - - - - - - - - - - - - - - - - - - - -*/
    // The spaceship Variables and Functions
    /*- - - - - - - - - - - - - - - - - - - - - - - - - - - -*/

    //-----------------------------------------------------------    
    // The spaceship
    //spaceship control variables
    var spaceshipX = 10;
    var spaceshipY = 150;

    var gravity = 1.2;

    var spaceShipWidth = 1216 * .05;
    var spaceShipHeight = 1273 * .05;
    var spaceShipLevel = canvasHeight - (spaceShipHeight * 1.1);

    //spaceship
    var spaceship = {
        x: (canvasWidth / 2) - (spaceShipWidth / 2),
        y: spaceShipLevel,
        h: spaceShipHeight,
        w: spaceShipWidth,
        index: spaceshipIm
    }; //spaceship {}

    //-----------------------------------------------------------
    //draw a spaceship
    function drawSpaceship() {
        context.drawImage(images[spaceshipIm], spaceshipX, spaceshipY, 120, 90);

        spaceshipY += gravity;
    }

    //-----------------------------------------------------------
    //move space ship with keys 

    window.addEventListener("keypress", moveSpaceship);

    function moveSpaceship(keyboardkey) {

        if (keyboardkey.key == "a") {
            // move spaceship
            spaceshipY -= 35;

        }
    } //moveSpaceship()

    /*- - - - - - - - - - - - - - - - - - - - - - - - - - - -*/
    // The meteroids Variables and Functions
    /*- - - - - - - - - - - - - - - - - - - - - - - - - - - -*/

    //-----------------------------------------------------------    
    // The meteroids 

    var meteroids = [];

    var oscillateDistance = 5;

    //-----------------------------------------------------------
    function genMeteroid() {

        var meteroidMinSize = 30;
        var meteroidMaxSize = 50;
        var meteroidSize = getRandom(meteroidMinSize, meteroidMaxSize);

        //starting position
        var meteroidX = getRandom(0, canvasWidth - meteroidSize);
        var meteroidY = (0 - meteroidSize);

        var meteroidMinSpeed = 5;
        var meteroidMaxSpeed = 9;
        var meteroidSpeed = getRandom(meteroidMinSpeed, meteroidMaxSpeed);

        //asteroid
        var meteroid = {
            x: meteroidX,
            y: meteroidY,
            w: meteroidSize,
            h: meteroidSize,
            speed: meteroidSpeed,
            index: meteroidIm,
            moveX: 1,
            distanceX: 0
        }; //asteroid {}    

        //add the asteroid to the array
        meteroids.push(meteroid);
    }

    //-----------------------------------------------------------
    function drawMeteroid() {

        for (var i = 0; i < meteroids.length; i++) {
            context.drawImage(images[9], meteroids[i].x, meteroids[i].y, meteroids[i].w, meteroids[i].h);
        }
    } //drawMeteroid()

    //-----------------------------------------------------------
    //move Meteroids
    function moveMeteroid() {

        for (var i = 0; i < meteroids.length; i++) {

            //move the Meteroid down
            meteroids[i].y += meteroids[i].speed;

            //ossillate the Meteroid side to side
            meteroids[i].x += meteroids[i].moveX;
            ++meteroids[i].distanceX;

            //change oscillation direction
            if (meteroids[i].distanceX > oscillateDistance) {
                meteroids[i].moveX *= -1;
                meteroids[i].distanceX = 0;
            }

            //check the top of the Meteroid for the bottom of the canvas
            if (meteroids[i].y > canvasHeight) {

                //re-set X to a random location
                meteroids[i].x = getRandom(meteroids[i].w, canvasWidth - meteroids[i].w);

                //re-set Y to above the canvas
                meteroids[i].y = 0 - meteroids[i].h;
            } //if

        } //for

    } //moveMeteroids()

    //-----------------------------------------------------------
    function addMeteroid() {
        //add new Meteroid based on a change inverval
        if ((frameCounter % addInterval) == 0) {
            //add a new Meteroid
            genMeteroid();
        } //if
    }

    /*- - - - - - - - - - - - - - - - - - - - - - - - - - - -*/
    // The cacti Variables and Functions
    /*- - - - - - - - - - - - - - - - - - - - - - - - - - - -*/

    //-----------------------------------------------------------    
    // The cacti 
    var cacti = [];

    cacti[0] = {
        x: theCanvas.width - 190,
        y: 0
    }

    //NEED THIS VALUE for W AND H TODO COLLISION DETECTION
    var cactiSize = 0;

    //-----------------------------------------------------------
    function genCacti() {

        //size of the Meteroids[i]
        var cactiMinSize = 20;
        var cactiMaxSize = 90;
        cactiSize = getRandom(cactiMinSize, cactiMaxSize);

        //starting position
        var cactiX = getRandom(0, canvasWidth - cactiSize);
        var cactiY = (0 - cactiSize);

        // ----------------------------------------------
        //cactus
        var cactus = {
            x: cactiX,
            y: cactiY,
            w: cactiSize,
            h: cactiSize,
            index: cactiIm,
            index1: cacti2Im,
            moveX: 1,
            distanceX: 0
        }; //cactus {} 

        for (var i = 0; i < cacti.length; i++) {
            context.drawImage(images[cacti2Im], cacti[i].x, cacti[i].y, 110, 240);
            context.drawImage(images[cactiIm], cacti[i].x - 20, cacti[i].y + canvasHeight - 80, 110, 260);

            cacti[i].x = cacti[i].x - 5;

            if (cacti[i].x == 125) {
                cacti.push({
                    x: theCanvas.width,
                    y: Math.floor(Math.random() * cactiSize) - cactiSize
                });
                score++;

            }
        } //for
    }

    //-----------------------------------------------------------
    function addCacti() {

        //add new cacti based on a change inverval
        if ((frameCounter % addInterval) == 0) {

            genCacti();

        } //if
    } //addCacti()

    /*- - - - - - - - - - - - - - - - - - - - - - - - - - - -*/
    // Collision Functions
    /*- - - - - - - - - - - - - - - - - - - - - - - - - - - -*/

    //-----------------------------------------------------------
    //check collisions between spaceship and cacti
    function checkCollisionShip2Cati() {

        var object1X = spaceshipX;
        var object1Y = spaceshipY;
        var object1W = 110;
        var object1H = 80;

        // for each circle
        for (var i = 0; i < cacti.length; i++) {

            //-------------------------------------------------------
            //setup object2 dimensions
            var object2X = cacti[i].x;
            var object2Y = cacti[i].y;
            var object2W = 90;
            var object2H = 200;

            //DRAW COLLISION BOXES TO SEE WHAT IS GOING ON
            context.strokeStyle = "transparent";
            context.rect(spaceshipX, spaceshipY, spaceship.w, spaceship.h);
            context.rect(cacti[i].x, cacti[i].y, cactiSize, cactiSize);
            context.stroke();

            if (object1X < object2X + object2W &&
                object1X + object1W > object2X &&
                object1Y < object2Y + object2H &&
                object1Y + object1H > object2Y) {

                console.log("collision");

                gameOver = true;
            }
        }
    } //checkCollision()

    /* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
    /* Canvas Functions */
    /* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */

    //-----------------------------------------------------------
    //write the Start Screen
    function writeStartGame() {

        //clear the canvas
        clearCanvas();

        // draw the background image to cover the entire canvas
        context.drawImage(images[spaceGifIm], 0, 0, canvasWidth, canvasHeight);

        context.drawImage(images[portalIm], 0, 0, canvasWidth, canvasHeight);

        context.drawImage(images[rAndmIM], 150, 10, 480, 390);


        //build the message
        var message = "Click to Start";

        //write the frame counter on the canvas
        context.fillStyle = "white";
        context.font = "70px Orbitron";
        context.fillText(message, 140, 360);

    } //writeStartGame()

    //-----------------------------------------------------------
    //write the End Screen
    function writeGameOver() {

        //to build message strings
        var message;

        //clear the canvas
        clearCanvas();

        //draw the background image
        context.drawImage(images[space2Im], 0, 0, canvasWidth, canvasHeight);

        //font color
        context.fillStyle = "white";

        //message
        if (score > 8) {
            message = "Your score is 9.";
            context.font = "32px Orbitron";
            context.fillText(message, 245, 200);

            message = "Great job! You won the game.";
            context.font = "32px Orbitron";
            context.fillText(message, 145, 140);

            message = "Refresh the page to Play Again";
            context.font = "22px Orbitron";
            context.fillText(message, 215, 270);

        } else {
            message = "Game Over";
            context.font = "60px Orbitron";
            context.fillText(message, 215, 120);

            context.drawImage(images[rickIm], 320, 280, 150, 150);
            message = "You lost the game"
            context.font = "32px Orbitron";
            context.fillText(message, 250, 180);

            message = "You crashed with cacti";
            context.font = "22px Orbitron";
            context.fillText(message, 260, 220);

            message = "Refresh the page to Play Again";
            context.font = "22px Orbitron";
            context.fillText(message, 215, 270);
        } //else
    } //writeGameOver()

    //-----------------------------------------------------------
    //write the frame counter to the canvas and HTML page
    function writeCounters() {
        context.fillStyle = "white";
        context.font = "20px Orbitron";
        context.fillText("Score: " + score, 10, canvasHeight - 420);
    } //writeCounters()

    //-----------------------------------------------------------
    // CANVAS FUCTIONS
    //-----------------------------------------------------------
    //-----------------------------------------------------------
    // clear canvas
    function clearCanvas() {

        // fill the while canvas with the fill style
        context.fillRect(0, 0, canvasWidth, canvasHeight);

    } //clearCanvas()

    //-----------------------------------------------------------
    function drawBgImg() {
        context.drawImage(images[spaceIm], 0, 0, canvasWidth + 100, canvasHeight + 100);
    } //drawCanvas()


    //-----------------------------------------------------------
    //DRAW CANVAS AND GAMELOOP
    //-----------------------------------------------------------

    //-----------------------------------------------------------
    function drawCanvas() {

        //1. clear the canvas
        drawBgImg();

        //2. move objects
        genCacti();
        moveMeteroid();

        //3. draw objects
        drawMeteroid();
        drawSpaceship();

        //4. check for collisions
        checkCollisionShip2Cati();

        //5. write the counters
        writeCounters();
    }



    //-----------------------------------------------------------
    // Start the Game on Click
    theCanvas.addEventListener("click", eventMouseClickCanvas);

    //-----------------------------------------------------------
    //start the game when the mouse is clicked
    function eventMouseClickCanvas(e) {

        startGame();

    } //eventMouseClick()


    //-----------------------------------------------------------
    // start game setup function

    function startGame() {

        console.log("startGame");
        //reset the gameOn and gameOver flags
        gameOn = true;
        gameOver = false;

        //reset the counters
        score = 0;
        frameCounter = 0;

        genMeteroid();

        bgMusic.loop = true;
        bgMusic.play();
    } // startGame()


    //-----------------------------------------------------------
    // check if the game is over
    function checkGameOver() {
        //if they crash with the cacti they loose 
        if (score >= 9) {
            // game is over
            gameOver = true;
            // and game on is false
            gameOn = false;

        } //if
        return gameOver;
    } // startGame()


    //-----------------------------------------------------------
    function gameLoop() {

        //get a new animation frame
        requestAnimationFrame(gameLoop);

        frameCounter++;

        //when the user clicks on the canvas -> begin
        if (gameOn) {

            addCacti();

            //check if the game is over
            checkGameOver();

            //if the game is on
            if (!gameOver) {
                //then draw the canvas
                drawCanvas();
            } else {
                //otherwise write the game over screen
                writeGameOver();
            }
        } //if gameOn
    } // gameLoop()

    //-----------------------------------------------------------
    loadImages(images, imageSources, function (images) {
        //setup
        writeStartGame();
        //start the game loop
        gameLoop();
    });
}
