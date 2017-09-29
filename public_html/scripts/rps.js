/*
 Name:  Augusto Araujo Peres Goncalez
 Date:  06/06/17
 File Name: rps.js
 
 Page Description: this is the page that contains all the functionality for the
 game, due to the Javascript functions and constants contained on it
 Files: index.html - the page that contains the board for the game
 main.css - the page that contains the styles for the web site
 */

// array of moves/ids
var pics = ["rock", "paper", "scissors"];

// load the page elements
document.addEventListener("DOMContentLoaded", init);

// Array to get winning message
var results = ["You Win!", "You Lose!", "It's a Tie!"];

// Scores for computer and player
var compScore = 0;
var playerScore = 0;

function init() {

    // Grabs the img-container and store it in avariable
    var imgContainer = document.getElementById("img-container");

    // variable to be used for creating elements
    var elem;

    // Creates header tag
    elem = document.createElement("header");

    // Append the h1 to the header created
    elem.appendChild(document.createElement("h1"));

    // Insert the header with the empty h1 to the page
    document.body.insertBefore(elem, imgContainer);

    // Get the h1 and append text
    elem.firstElementChild.appendChild(document.
            createTextNode("Play Rock, Paper, Scissors!"));

    // Creates game-header div with a text node and its class name
    elem = document.createElement("div");
    elem.appendChild(document.createTextNode("Choose your method of \n\
        destruction:"));
    elem.className = "game-header";

    // Inside the body, insert elem before imgContainer
    document.body.insertBefore(elem, imgContainer);

    // Creates second game-header div
    elem = document.createElement("div");
    elem.appendChild(document.createTextNode("The computer chooses:"));
    elem.className = "game-header";
    document.body.appendChild(elem);

    // Creates table that will hold computer's choice
    elem = document.createElement("table");
    elem.appendChild(document.createElement("tr"));

    // insert table with row before the script element
    document.body.appendChild(elem);

    // select table's only row and appends new td elements
    elem = elem.firstElementChild;
    elem.appendChild(document.createElement("td"));
    elem.appendChild(document.createElement("td"));

    // Creates an img element on the first td and adds class and id name
    elem = elem.firstElementChild;
    elem.appendChild(document.createElement("img"));
    elem.firstElementChild.className = "rps-img";
    elem.firstElementChild.id = "comp-img";



    // Select the second td, adds a class name to it and insert a div inside it
    elem = elem.nextElementSibling;
    elem.className = "vert-center";
    elem.appendChild(document.createElement("div")).id = "output";

    /* Loop to add images (first insert scissors, then insert rock before
     * scissors and then paper before scissors but after rock)
     */
    for (i = 0; i < 3; i++) {
        elem = document.createElement("img"); // creates img
        elem.className = "rps-img no-img-border"; // add class
        elem.src = "images/" + pics[i] + ".png"; // points to correct img
        imgContainer.appendChild(elem); // place in order
        elem.id = pics[i]; // add id

        // Make each image clickable
        elem.addEventListener("click", move);
    }

    // Creates the div with id score and store it in a variable
    var score = document.createElement("div");
    score.id = "score";

    // Insert score div before script
    document.body.appendChild(score);

    // Insert first div inside of the div score
    score.appendChild(document.createElement("div")).
            appendChild(document.createTextNode("Score:"));

    // Insert second div inside of the div score
    score.appendChild(document.createElement("div")).
            appendChild(document.createTextNode("You: "));

    // To select the last div added to the page so far (the "You:")
    elem = score.lastElementChild;

    // Creates span inside div You and assigns its id
    elem.appendChild(document.createElement("span")).id = "user-score";

    // Insert third div inside div score with text
    score.appendChild(document.createElement("div")).
            appendChild(document.createTextNode("Computer: "));

    // To select the last div added to the page so far (the "Computer:")
    elem = score.lastElementChild;

    // Creates span inside div You and assigns its id
    elem.appendChild(document.createElement("span")).id = "comp-score";

    // Insert footer above script (bottom of the page)
    elem = document.createElement("footer");
    document.body.appendChild(elem);

    // Uses innerHTML so that it can display the copyright symbol
    elem.innerHTML = "Copyright &copy; 2017 Augusto Araujo Peres Goncalez";
}

// Generates a random computer move
function getComputerMove() {

    var rand = Math.floor(Math.random() * 3); // random num from 0 to 2

    // Modify picture source to match the random number
    document.getElementById("comp-img").src = "images/" + pics[rand] + ".png";

    return rand;
}

/* Function that triggers when user clicks an image. Compares user's choice with
 * the computer's and update the score accordingly */
function move() {

    var compMove = getComputerMove();

    // To take off the border of images previously selected
    // Gets the three children inside img-container
    var elem = document.getElementById("img-container").children;

    for (i = 0; i < 3; i++) {
        elem[i].className = "rps-img no-img-border";
    }

    // Add border to this element clicked
    this.className = "rps-img img-border";

    // Gets which picture the user chose based on the id of the clicked elem
    var userMove = pics.indexOf(this.id);

    // Var that corresponds to the index of the results (0 for user win, 1 for
    // user looses and 2 for tie
    var result;

    // In the case of a tie
    if (compMove === userMove)
        result = 2;

    // If it was not a tie
    else {
        switch (userMove) {
            case 0: // User picked rock

                // user wins if computer chooses scissors
                result = (compMove === 2) ? 0 : 1;
                break;

            case 1: // User picked paper

                // user wins if computer chooses rock
                result = (compMove === 0) ? 0 : 1;
                break;
 
            case 2: // User picked Scissor

                // user wins if computer chooses paper
                result = (compMove === 1) ? 0 : 1;
                break;
        }

        // If the result is 0s, add one point to the player
        if (result === 0)
            playerScore++;
        else
            compScore++;
    }

    // Update result message output
    document.getElementById("output").textContent = results[result];

    // Update score
    document.getElementById("user-score").textContent = playerScore;
    document.getElementById("comp-score").textContent = compScore;
}
