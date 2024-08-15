window.onload = function () {

    var choiceList = ['rock', 'paper', 'scissors'];

    //battle variables
    var choices = document.querySelectorAll('button')
    var cpuHand = document.querySelector('.cpu-hand')
    var playerHand = document.querySelector('.player-hand')
    var cpuTotal = document.querySelector('.cpuScore');
    var playerTotal = document.querySelector('.playerScore');
    var result = document.querySelector('.result-text')
    var resultStr = result.querySelector('.winlose');
    var cpuScore = 0;
    var winner;
    var playerScore = 0;

    //cat animation variables
    var cpuCatPosition = 0;
    var playerCatPosition = 0;


    // Player selects choices between rock paper and scissors
    choices.forEach(function (choice) {

        choice.addEventListener('click', function (choice) {
            var randomNum = Math.floor(Math.random() * 3);
            var cpuChoice = choiceList[randomNum];
            var playerChoice = choice.currentTarget.className;

            // Determines each round's winner based on the choices
            checkResult(playerChoice, cpuChoice);

            // Add Hand Animation to the hands
            animateHand();

            // Determines winner of the game
            checkWinner();

        });
    })




    // *** FUNCTION 1 : DETERMINE WINER BASED ON PLAYER CHOICE AND CPU CHOICE EACH INDIVIDUAL ROUND ***
    function checkResult(playerChoice, cpuChoice) {

        // Display hand images of the player and computers choices
        playerHand.src = `./Images/${playerChoice}.png`
        cpuHand.src = `./Images/${cpuChoice}.png`

        // Battle Combinations
        if (playerChoice === cpuChoice) {
            winner = 'tie';
        }

        else if (playerChoice === 'rock') {
            if (cpuChoice === 'paper') {
                cpuScore += 1;
                winner = 'cpu';
            } else if (cpuChoice === 'scissors') {
                playerScore += 1;
                winner = 'player';
            }

        } else if (playerChoice === 'paper') {
            if (cpuChoice === 'scissors') {
                cpuScore += 1;
                winner = 'cpu';
            } else if (cpuChoice === 'rock') {
                playerScore += 1;
                winner = 'player';
            }

        } else if (playerChoice === 'scissors') {
            if (cpuChoice === 'rock') {
                cpuScore += 1;
                winner = 'cpu';
            } else if (cpuChoice === 'paper') {
                playerScore += 1;
                winner = 'player';
            }
        }

        // calls function to animate the cat that wins to move forward
        moveCat(winner);

        // display score counts 
        cpuTotal.innerText = cpuScore;
        playerTotal.innerText = playerScore;
    }



    // *** FUNCTION 2 : ANIMATE CATS TO JUMP FORWARD ***
    function moveCat() {

        // declare variables for characters
        var cpuCat = document.querySelector('#cpu-cat');
        var cpuCatContainer = document.querySelector('.cpu-cat-container');
        var playerCat = document.querySelector('#player-cat');
        var playerCatContainer = document.querySelector('.player-cat-container');

        // move cat based on the winner of each round
        if (winner === 'cpu') {
            cpuCat.classList.add('move-sprite');
            cpuCatContainer.classList.add('cpu-jump');

            setTimeout(function () {
                cpuCat.classList.remove('move-sprite');
                cpuCatContainer.classList.remove('cpu-jump');
                cpuCatPosition += 140; // Move cat to the next position
                cpuCatContainer.style.left = `${cpuCatPosition}px`;
            }, 1000);

        } else if (winner === 'player') {
            playerCat.classList.add('move-sprite');
            playerCatContainer.classList.add('player-jump');

            setTimeout(function () {
                playerCat.classList.remove('move-sprite');
                playerCatContainer.classList.remove('player-jump');
                playerCatPosition += 140; // Move cat to the next position
                playerCatContainer.style.right = `${playerCatPosition}px`;
            }, 1000);
        }
    }




    // *** FUNCTION 3 : ANIMATE HANDS ***
    function animateHand() {
        cpuHand.classList.add('battle-left');
        playerHand.classList.add('battle-right');

        setTimeout(function () {
            cpuHand.classList.remove('battle-left');
            playerHand.classList.remove('battle-right');
        }, 500);
    }





    // *** FUNCTION 4 : DETERMINES THE WINNER OF THE GAME ***
    function checkWinner() {

        // Game ends once player or cpu wins 3 times
        if (playerScore == 3 || cpuScore == 3) {
            result.style.display = 'block';
            if (playerScore > cpuScore) {
                resultStr.innerText = "YOU WIN";
            } else {
                resultStr.innerText = "YOU LOSE";
            }

            // Disable buttons after game ends
            choices.forEach(function (choice) {
                choice.disabled = true;
                choice.classList.add('disabled');
            });
        }
    }


};






