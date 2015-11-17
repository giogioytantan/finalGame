//http://speckyboy.com/demo/windmill-demo/index.html
require(
    [],
    function () {
            
        console.log("yo, I'm alive!");

        var paper = new Raphael(document.getElementById("centerDiv"));

        var pWidth = paper.canvas.offsetWidth; //width of the canvas
        var pHeight = paper.canvas.offsetHeight; //height of the canvas
        console.log("pWidth is " + pWidth + ", and pHeight is " + pHeight); //printing on the console the dimensions of the canvas

        //created a rectangle to hold the background image for game
        var bgRect = paper.rect(0,0,pWidth,pHeight).attr({
            //dimensions of the box will be the width and height stated above, coordinate of where the box starts is at (0,0)
            'fill': "url(http://www.wallpaperup.com/uploads/wallpapers/2013/02/12/39814/big_thumb_36acd4829a5cf3c274b3f209e9c0a267.jpg)" //background image
        });

        //created circle and text to form the start button for game 1
        var startButton1 = paper.circle(pWidth/3,pHeight/2,40); //radius of the circle: 40, coordinates of the circle: (pWidth/3, pHeight/2)
        var startText1 = paper.text(pWidth/3,pHeight/2,'GAME 1'); //coordinates of the text: (pWidth/3, pHeight/2)
        //attributes of the start button
        startButton1.attr({
            stroke: "black",
            fill: "red",
            "stroke-width":5
        });
        //attributes of the text within the start button
        startText1.attr({
            "fill":"white",
            "font-family":"Impact",
            "font-size":20
        });

        //created circle and text to form the start button for game 2
        var startButton2 = paper.circle(2*pWidth/3,pHeight/2,40); //radius of the circle: 40, coordinates of the circle: (2*pWidth/3, pHeight/2)
        var startText2 = paper.text(2*pWidth/3,pHeight/2,'GAME 2'); //coordinates of the text: (2*pWidth/3, pHeight/2)
        //attributes of the start button
        startButton2.attr({
            stroke: "black",
            fill: "blue",
            "stroke-width":5
        });
        //attributes of the text within the start button
        startText2.attr({
            "fill":"white",
            "font-family":"Impact",
            "font-size":20
        });
 
        //variables for the loop and array
        var numDots=40; //40 dots present in the array
        var emitDot1 = []; //initialize array for red dots
        var emitDot2 = []; //initialize  array for blue dots
        var i=0; //holds the number of dots in the array when it is accessed
        var count=0; //counting calls on the draw routine
        var nextDot1 = 0; //first dot is 0, and it will be re-position (red dot)
        var nextDot2 = 0; //first dot is 0, and it will be re-position (blue dot)
        var emitter; //to be defined as a function later on to emit the dots
        var redcounter = 0; //count the number of red dots as they are being clicked

        //when ready function is called, the start button and text will show up
        var ready = function(){
            startButton1.show();
            startText1.show();

            startButton2.show();
            startText2.show();
        }

        //function, map(x,a,b,m,n) which takes a variable (x) in the range [a,b] and returns a value mapped into the range [m,n]
        var randInt = function (m,n) {
            var range = n-m+1;
            var frand = Math.random()*range;
            return m+Math.floor(frand);
        }

        //variable 'dot' or the alien target created off the paper so it doesn't show up until the game starts
        var dot = paper.circle(-200,-200,32);
        dot.attr({
            fill: "url(https://s3-us-west-2.amazonaws.com/liftagram/emoji_all/1f47d.png)",
            'stroke-width': 0,
            opacity: 1
        });

        //'moveAlien' function created to manually "animate" the 'dot' or the alien
        var moveAlien = function(){
            //dot.xpos is the x coordinate of the alien, and it increases by dot.xrate (defined later when the game starts) everytime this function is called
            dot.xpos = dot.xpos + dot.xrate;
            //dot.ypos is the y coordinate of the alien, and it increases by dot.yrate (defined later when the game starts) everytime this function is called
            dot.ypos = dot.ypos + dot.yrate;
            //x and y coordinates of the alien change everytime this function is called
            dot.attr({
                'cx': dot.xpos,
                'cy': dot.ypos
            });
            //'if' conditionals to prevent the alien from moving off the paper by reversing the xrate and yrate accordingly
            if (dot.xpos > pWidth) {
                dot.xrate = -1*dot.xrate}

            if (dot.xpos < 0) {
                dot.xrate = -1*dot.xrate}

            if (dot.ypos > pHeight) {
                dot.yrate = -1*dot.yrate}

            if (dot.ypos < 0) {
                dot.yrate = -1*dot.yrate}}

        var start1 = function(){
            //variable 'difficulty' defined as a prompt box stating game instructions, which also allows user to input a difficulty level ranging from 1-3
            var difficulty = prompt("You have 10 seconds to hit the red dot as many times as you can! Now enter your level of difficulty from 1-3:", "1");
            console.log("game is starting"); //print console log to test if function is successfully called

            //start button is hidden once the game starts
            startButton1.hide();
            startText1.hide();

            startButton2.hide();
            startText2.hide();

            while(i<numDots){
            //starting position of the array of dots are defined
            //accessing array, sets the ith value of the array of red and blue dots
            //apart from their color, blue and red dots have the same properties as blue dots are supposed to serve as distractors in the game. They do so by mimicking the properties of the red dots
            emitDot1[i]=paper.circle(pWidth/2, pHeight/2, 10); //array of the red dots defined
            emitDot2[i]=paper.circle(pWidth/2, pHeight/2, 10); //array of the blue dots defined

            emitDot1[i].attr({"fill": "red", "fill-opacity" : 1}); //attributes of the array for red dots
            emitDot2[i].attr({"fill": "blue", "fill-opacity" : 1}); //attributes of the array for blue dots

            //Add some properties to dot just to keep track of it's "state"
            emitDot1[i].xpos=pWidth/2; //red dot
            emitDot1[i].ypos=pHeight/2; //red dot

            emitDot2[i].xpos=pWidth/2; //blue dot
            emitDot2[i].ypos=pHeight/2; //blue dot

            //Add properties to keep track of the rate the dot is moving
            //Mapping of ranges (here, [0,1] -> [-5,5])
            emitDot1[i].xrate= -5+10*Math.random(); //properties of red dot
            emitDot1[i].yrate= -7+14*Math.random();

            emitDot2[i].xrate= -5+10*Math.random(); //properties of blue dot
            emitDot2[i].yrate= -7+14*Math.random();

            //event listener that listens for click events on the red dot, accumulating points whenever a red dot is clicked
            emitDot1[i].node.addEventListener('click', function(ev){
            redcounter++; //red counter uses incremental operator, increases whenever a red dot is clicked
            click.play(); //'catch' sound will play when a red dot is clicked
            //print console log to test if the clicks on the red dot are being counted
            console.log("Your click count is " + redcounter + ".");

            });

            //i uses an incremental operator and increases till 40 dots
            i++;}

            //Make the midpoint of the paper an "emitter" that shoots out a dot
            var emitter = setInterval(function(){ //new interval timer with a function that "emits" by just setting one dot's position back to the center of the page
                console.log("emitter set") //print console log to test if the function is working
                //"nextDot" counter that you update in that function, so you know what dot is "next in line" to be recentered
                emitDot1[nextDot1].xpos = pWidth/2, //"nextDot" counter for the x-position of the red dots, recentering them to the middle of the canvas
                emitDot1[nextDot1].ypos = pHeight/2; //"nextDot" counter for the y-position of the red dots, recentering them to the middle of the canvas

                emitDot2[nextDot2].xpos = pWidth/2, //"nextDot" counter for the x-position of the blue dots, recentering them to the middle of the canvas
                emitDot2[nextDot2].ypos = pHeight/2; //"nextDot" counter for the y-position of the blue dots, recentering them to the middle of the canvas

                nextDot1++;
                nextDot2++;

                //"mod" operator, "%" to loop the "next to emit" counter so that it doesn't reference dots beyond the length of the dot array
                nextDot1 = nextDot1 % numDots; //"mod" operator for the red dots
                nextDot2 = nextDot2 % numDots; //"mod" operator for the blue dots
                console.log(nextDot1 + ", " + emitDot1[nextDot1]) //print console log message to see if the "nextDot" counter and the emitter function is working
            },100);

            var draw = function(){

                // Count and keep track of the number of times this function is called
                count++;

                i=0;

                while(i<numDots){

                    //addition assignment operator adds value to the arrays to ensure the dots keep moving smoothly
                    emitDot1[i].xpos += emitDot1[i].xrate; //addition assignment operator adds value to the x-position of the red dot 
                    emitDot1[i].ypos += emitDot1[i].yrate; //addition assignment operator adds value to the y-position of the red dot

                    emitDot2[i].xpos += emitDot2[i].xrate; //addition assignment operator adds value to the x-position of the blue dot
                    emitDot2[i].ypos += emitDot2[i].yrate; //addition assignment operator adds value to the y-position of the blue dot

                    //move the dot using our 'state' variables
                    emitDot1[i].attr({'cx': emitDot1[i].xpos, 'cy': emitDot1[i].ypos}); //moving the red dots 
                    emitDot2[i].attr({'cx': emitDot2[i].xpos, 'cy': emitDot2[i].ypos}); //moving the blue dots

                    i++;}}

            var alien1 = paper.rect(420,10,150,150).attr({ //alien1 will have the position (420,10) on the canvas with width and height of 150px
                "fill" : "url(http://www.rggraphix.com/products/silly_stuff/SS102-T.gif)",
                //stroke-width set to 0 for all the aliens to remove the default 1px black stroke around the fill image
                'stroke-width': 0
            });

            var alien2 = paper.rect(220,180,265,265).attr({ //alien2 will have the position (220,180) on the canvas with width and height of 265px
                "fill" : "url(http://static.tumblr.com/a7b33d9acf6d225dddd73e37881c1f68/bdtqcv6/45xn7crnj/tumblr_static_3zle6i3hrxa8wk84wkocg4okg.png)",
                'stroke-width': 0
            });
            var alien3 = paper.rect(10,10,256,256).attr({ //alien3 will have the position (10,10) on the canvas with width and height of 256px
                "fill" : "url(http://cdn.mysitemyway.com/etc-mysitemyway/icons/legacy-previews/icons-256/pink-jelly-icons-culture/031849-pink-jelly-icon-culture-space-alien1-sc37.png)",
                'stroke-width': 0
            });

            //all aliens will be hidden until they are called when difficulty is inputted
            alien1.hide();
            alien2.hide();
            alien3.hide();

            var myMover;

            //code under each 'if' conditional is executed when the corresponding strings "1", "2", or "3" is keyed in the prompt box (defined as variable 'difficulty')
            if (difficulty==="1") {
                //difficulty level printed to the console to test if the correct 'if' conditional is called
                console.log("Difficulty level " + difficulty + " selected.");
                //'myMover' variable defined as a function to change the x and y position of the alien as defined in the draw function every 80ms
                myMover = setInterval(draw, 80);
                //only 1 alien as obstruction at level 1, and more are shown as difficulty level increases
                alien1.show();
            };

            if (difficulty==="2"){
                console.log("Difficulty level " + difficulty + " selected.");
                //'myMover' variable defined as a function to change the x and y position of the alien as defined in the draw function every 40ms (faster than 1st level)
                myMover = setInterval(draw, 30);
                //2 aliens as obstructions (more than the 1st level)
                alien1.show();
                alien2.show();
            };

            if (difficulty==="3"){
                console.log("Difficulty level " + difficulty + " selected.")
                //'myMover' variable defined as a function to change the x and y position of the alien as defined in the draw function every 10ms (faster than 2nd level)
                myMover = setInterval(draw, 10);
                //3 aliens as obstructions (more than the 2nd level)
                alien1.show();
                alien2.show();
                alien3.show(); 
            };

            //sets the game to start at default difficulty level 1 (and with an alert box to alert the user) when user input in the difficulty prompt box is not string "1", "2", or "3"
            if ((difficulty!=="1") && (difficulty!=="2") && (difficulty!=="3")) {
                alert("Invalid difficulty input! Default difficulty level 1 selected.");
               setInterval(draw, 80);
               alien1.show();
            }
            
            tcounter = 0; //time counter will start from 0, and count up to 10 seconds - time duration for each round
            //emitcounter = 0;
            console.log("gameover")

            //'myTicker' is a periodic timer functon created to limit each round of the game to 10 seconds
            var myTicker = setInterval ( function() {
                tcounter++; //referring to the '1000'(ms) line of code below, tcounter clocks 1 count every 1s when 'myTicker' is called
                console.log("Ticker count is " + tcounter); //print console log to test the following 'if' conditional (if the game stops accordingly after tcounter===10 or when 10 seconds is up)
            
                if (tcounter===10) { //when tcounter===10, the game will end
                    clearInterval(myTicker); //'myTicker' is cleared so that tcounter will start from 0 at the beginning of next round
                    //clearInterval(myMover); //'myMover' is cleared to reset the movement (speed) of the ladybug to follow that of the difficulty level selected in the next round
                    clearTimeout(emitter);

                    confirm("10 seconds is up! Your click count is " + redcounter + "."); //pop-up box to indicate end of the round and the score

                    //all aliens are removed to start afresh the next round
                    alien1.remove();
                    alien2.remove();
                    alien3.remove();

                    ready(); //ready function called to show the start button
                }

            }, 1000); //myTicker called every 1000ms(1s)
        }

        dot.node.addEventListener('click', function(ev){
            counter++; //counter uses an incremental operator, increasing the score each time an alien is clicked
            click.play(); //'catch' sound will be played when an alien is clicked
            //print console log to test if the clicks on the ladybug are being counted
            console.log("Your click count is " + counter + ".");
        });

        //start function for when game 2 starts
        var start2 = function(){
            console.log("game is starting"); //print console log to test if function is successfully called

            //start button is hidden once the game starts
            startButton1.hide();
            startText1.hide();

            startButton2.hide();
            startText2.hide();

            //variable 'difficulty' defined as a prompt box stating game instructions, which also allows user to input a difficulty level ranging from 1-3
            var difficulty = prompt("You have 10 seconds to hit the alien as many times as you can! Now enter your level of difficulty from 1-3:", "1");

            //variable created here to be defined later on
            var myMover;

            //planets will be created to serve as distractions
            var planet1 = paper.rect(400,10,128,128).attr({ //planet1 will have the position (400,10) on the canvas with width and height of 128px
                "fill" : "url(http://www.clker.com/cliparts/b/1/f/d/1312526680346611727planet.png)",
                //stroke-width set to 0 for all the planets to remove the default 1px black stroke around the fill image
                'stroke-width': 0
            });

            var planet2 = paper.rect(300,180,256,256).attr({ //planet2 will have the position (300,180) on the canvas with width and height of 256px
                "fill" : "url(http://vignette3.wikia.nocookie.net/onverse/images/5/59/Planet.png/revision/latest?cb=20091222223749)",
                'stroke-width': 0
            });
            var planet3 = paper.rect(10,10,256,256).attr({ //planet3 will have the position (10,10) on the canvas with width and height of 256px
                "fill" : "url(http://icons.iconarchive.com/icons/zairaam/bumpy-planets/256/07-jupiter-icon.png)",
                'stroke-width': 0
            });

            //all planets will be hidden and only appeared when it is called
            planet1.hide();
            planet2.hide();
            planet3.hide();

            //code under each 'if' conditional is executed when the corresponding strings "1", "2", or "3" is keyed in the prompt box (defined as variable 'difficulty')
            if (difficulty==="1") {
                //difficulty level printed to the console to test if the correct 'if' conditional is called
                console.log("Difficulty level " + difficulty + " selected.");
                //'myMover' variable defined as a function to change the x and y position of the alien as defined in the moveAlien function every 8ms
                myMover = setInterval(moveAlien,8);
                //only 1 planet as obstruction at level 1, and more are shown as difficulty level increases
                planet1.show();
            };

            if (difficulty==="2"){
                console.log("Difficulty level " + difficulty + " selected.");
                //'myMover' variable defined as a function to change the x and y position of the alien as defined in the moveAlien function every 4ms (faster than 1st level)
                myMover = setInterval(moveAlien,4);
                //2 planets as obstructions at level 2 (more than 1st level)
                planet1.show();
                planet2.show();
            };

            if (difficulty==="3"){
                console.log("Difficulty level " + difficulty + " selected.")
                //'myMover' variable defined as a function to change the x and y position of the alien as defined in the moveAlien function every 1ms (faster than 2nd level)
                myMover = setInterval(moveAlien,1);
                //3 planets as obstructions at level 3 (more than 2nd level)
                planet1.show();
                planet2.show();
                planet3.show();
            };

            //sets the game to start at default difficulty level 1 (and with an alert box to alert the user) when user input in the difficulty prompt box is not string "1", "2", or "3"
            if ((difficulty!=="1") && (difficulty!=="2") && (difficulty!=="3")) {
                alert("Invalid difficulty input! Default difficulty level 1 selected.");
                myMover = setInterval(moveAlien,8); 
                planet1.show();               
            }


            counter = 0; //click counter will start from 0 when each round of the game starts, and counts the number of successful clicks within 10 seconds
            tcounter = 0; //time counter will start from 0, and count up to 10 seconds - time duration for each round

            //'myTicker' is a periodic timer functon created to limit each round of the game to 10 seconds
            var myTicker = setInterval ( function() {
                tcounter++; //referring to the '1000'(ms) line of code below, tcounter clocks 1 count every 1s when 'myTicker' is called
                console.log("Ticker count is " + tcounter); //print console log to test the following 'if' conditional (if the game stops accordingly after tcounter===10 or when 10 seconds is up)
            
                if (tcounter===10) { //when tcounter===10, the game will end
                    clearInterval(myTicker); //'myTicker' is cleared so that tcounter will start from 0 at the beginning of next round
                    clearInterval(myMover); //'myMover' is cleared to reset the movement (speed) of the alien to follow that of the difficulty level selected in the next round
                    dot.attr({ //alien is moved off the paper until the game starts again
                        'cx': -200,
                        'cy': -200                    
                    });
                    confirm("10 seconds is up! Your click count is " + counter + "."); //pop-up box to indicate end of the round and the score

                    //all planets are removed to start afresh the next round
                    planet1.remove();
                    planet2.remove();
                    planet3.remove();
                    ready(); //ready function called to show the start button
                }

            }, 1000); //myTicker called every 1000ms(1s)

            //dot.xrate and dot.yrate defined so the x and y corrdinates of the bug move by 1px each time
            dot.xrate = 1;
            dot.yrate = 1;
            //randInt called here to randomize the starting position of the alien when the game starts, with x coordinate starting anywhere between 0-500 and y coordinate between 0-300.
            dot.xpos = randInt(0,5)*100;
            dot.ypos = randInt(0,3)*100;
        }

        //'click' event on the start button calls the start function
        startButton1.node.addEventListener('click', start1);
        startButton2.node.addEventListener('click', start2);

        var audio = new Audio("resources/start.wav"); //background music for the game
        audio.play();
        audio.loop=true; //music is looped and will constantly play when the site is accessed
        

        var click = new Audio("resources/catch.wav"); //music played when an object is clicked, suggesting that a point is made
        click.pause(); //music is paused and will only be played when an object is clicked
});