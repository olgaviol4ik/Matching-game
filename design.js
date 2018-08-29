/*
 * Create a list that holds all of your cards
 */
//Global Scope
const deck = document.querySelector('.deck');
let toggledCards = []; //array to store open cards
let moves = 0;
let clockOff = true;
let time = 0;
let clockId;
let matched = 0;
/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */
function shuffleDeck() {
    const cardsToShuffle = Array.from(document.querySelectorAll('.deck li')); //Array.from is needed because we are using a node list not an array
    const shuffledCards = shuffle(cardsToShuffle); 
    for (card of shuffledCards) {
       deck.appendChild(card); //for each card in shuffledCards array append that card to the deck element
      }                        //using .appendChild instead of .innerHTML because items in array are a node
                               //and not an array       
    }
    shuffleDeck();
// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}


 /* set up the event listener for a card. If a card is clicked:*/
 /*<event-target>.addEventListener(<event-to-listen-for>, <function-to-run-when-an-event-happens>);*/
 deck.addEventListener('click', function () {
      const clickTarget = event.target
          if (isClickValid(clickTarget)) {
              if (clockOff) {
                  startClock();
                  clockOff = false;         //if the game started, then turn on the clock
              }
        }
         toggleCard(clickTarget);
         addToggleCard(clickTarget);        //if the card was clicked, then add it to toggledCards array and check for match
         if (toggledCards.length === 2) {
          checkForMatch(clickTarget);
          addMove(); 
          checkScore(); 
      }
      const TOTAL_PAIRS = 8;
      if (matched === TOTAL_PAIRS) {
        gameOver();
      }
     
  });

/*  - display the card's symbol (put this functionality in another function that you call from this one)*/
 function toggleCard(card) {
      card.classList.toggle('open');
      card.classList.toggle('show');
  }

  /*  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)*/
  function addToggleCard(clickTarget) {  //Pushes clickTargets(open cards) into the toggledCards array
      toggledCards.push(clickTarget);   //
  }
  
 /*  - if the list already has another card, check to see if the two cards match*/
 function checkForMatch() {
    if (toggledCards[0].firstElementChild.className === 
  
        toggledCards[1].firstElementChild.className)  {
        
          toggledCards[0].classList.toggle('match');
          toggledCards[1].classList.toggle('match');
          toggledCards = [];
          matched++;
  
      } else {
          setTimeout(function() {
          toggleCard(toggledCards[0]);
          toggleCard(toggledCards[1]);
          toggledCards = [];
      }, 1000);
  
        }
  
    }
  
 /*    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)*/
 /*    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)*/
 function isClickValid(clickTarget) {
    return (
        clickTarget.classList.contains('card') &&
        !clickTarget.classList.contains('match') &&
        toggledCards.length < 2 &&
        !toggledCards.includes(clickTarget)
     );
  }

  function addMove() {
    moves++;
    const movesText = document.querySelector('.moves');
    movesText.innerHTML = moves;
  }

 /*    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)*/
 function checkScore() {
      if (moves === 16 || moves === 24) { 
        hideStar();
       }
     }
  
    function hideStar() {
      const starList = document.querySelectorAll('.stars li');
      for (star of starList) {
          if (star.style.display !== 'none') {
              star.style.display = 'none';
              break;
          }
      }
    }
  
        function startClock() {
           clockId = setInterval(() => {
              time++;
            displayTime();
          }, 1000);
  }
 
 /*    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */
function stopClock() {
    clearInterval(clockId);
}

function displayTime() {
       const minutes = Math.floor(time / 60);
        const seconds = time % 60;
        const clock = document.querySelector(".clock");
        clock.innerHTML = time;
        if (seconds < 10) {
            clock.innerHTML = `${minutes}:0${seconds}`;
        }  else {
            clock.innerHTML = `${minutes}:${seconds}`;
     }  

}

function toggleModal() {
const modal = document.querySelector('.modal_background');
modal.classList.toggle('hide');
}

toggleModal() //Open modal
toggleModal() //Close modal

function writeModalStats() {
const timeStat = document.querySelector('.modal_time');
const clockTime = document.querySelector('.clock').innerHTML;
const movesStat = document.querySelector('.modal_moves');
const starsStat = document.querySelector('.modal_stars');
 const stars = getStars();

timeStat.innerHTML = `Time = ${clockTime}`;
 movesStat.innerHTML = `Moves = ${moves}`;
 starsStat.innerHTML = `Stars = ${stars}`;
}

function getStars() {
stars = document.querySelectorAll(".stars li");
starCount = 0;
for (star of stars) {
  if (star.style.display !== "none") {
    starCount++;
  }
}
return starCount;
}

document.querySelector('.modal_cancel').addEventListener('click', function() {
toggleModal();
});


document.querySelector('.modal_replay').addEventListener('click', replayGame);

document.querySelector('.restart').addEventListener('click', resetGame);

function resetGame() {
resetClockAndTime();
resetMoves();
resetStars();
resetCards();
shuffleDeck();

}

function resetClockAndTime() {
stopClock();
clockOff = true;
time = 0;
displayTime();

}

function resetMoves() {
moves = 0;
document.querySelector(".moves").innerHTML = moves;
}

function resetStars() {
stars = 0;
const starList = document.querySelectorAll(".stars li");
for (star of starList) {
  star.style.display = "inline";
}
}

function gameOver() {
stopClock();
writeModalStats();
toggleModal();
}

function replayGame() {
resetGame();
toggleModal();


}

function resetCards() {
const cards = document.querySelectorAll('.deck li');
for (let card of cards) {
  card.className = 'card';
}
}