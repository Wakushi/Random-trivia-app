import React from "react";
import render from './Render.js'
import StartScreen from "./components/StartScreen.js";
import GameButtons from "./components/GameButtons";
import { getCorrectAnswers } from "./utils.js";

export default function App() {

  // ---- STATES ----

  // game is used to manage to call the API for a new set of random questions.
  const [game, setGame] = React.useState(0)

  // hasStarted handles the displaying of the starting screen and the main game screen.
  const [hasStarted, setHadStarted] = React.useState(false)

  // hasChecked handles the displaying of the 'check answers' button and the player's score + 'play again' button.
  const [hasChecked, setHasChecked] = React.useState(false)

  // questionnary holds the dom elements generated from the render() function.
  const [questionnary, setQuestionnary] = React.useState([])


  // ---- API ----

  // This useEffect controls when the fetch + render occurs, with the 'game' dependency.
  React.useEffect(()=>{
    fetch("https://opentdb.com/api.php?amount=5&difficulty=easy&type=multiple")
    .then(r => r.json())
    .then(data => {
      setQuestionnary(render(data.results))
    })
  },[game])


  // ---- GAME FUNCTIONS  ----

  // handleStart() updates the hadStarted state to display the game screen.
  function handleStart() {
    setHadStarted(true)
  }
  
  // handlePlayAgain() updates the 'game' state variable to cause a new fetch and render (check previous useEffect), which displays new questions.
  function handlePlayAgain() {
    const allAnswers = document.getElementsByClassName('answer')
    for(let answer of allAnswers){
      answer.classList.remove('unselectable')
    }
    window.scrollTo(0,0) 
    setGame(prevGame => prevGame + 1)
    setTimeout(()=>{
      setHasChecked(prevHasChecked => !prevHasChecked) // flips hasChecked to display the 'Check answers' button instead of the 'Play again' button.
    },50)
  }

  // displayResults() checks for all answers and applies style based on parameters which are stored within the answer div's id (check Render())
  function displayResults() {
    const allAnswers = document.getElementsByClassName('answer') // Gets all answers div.
    for(let answer of allAnswers){  // We iterate over this array of DOM elements
      if(answer.id.slice(0,5) === "right") { // If the id starts with "right"... 
        answer.classList.add('good')  // ... we apply the 'good' class.
      } else if (answer.id.slice(0,5) === "false" && answer.classList.contains('selected')) { // if the id starts with 'false' AND this answer was selected..
        answer.classList.add('bad') // ... we apply the 'bad' class.
      } else if (answer.id.slice(0,5) === "false") { // If it wasn't selected by the user we simply reduce the opacity with the 'grayed' class.
        answer.classList.add('grayed')
        answer.classList.add('unselectable')
      } 
    }
    setHasChecked(prevHasChecked => !prevHasChecked) // flips hasChecked to display the 'Play again' button instead of the 'Check answers' button.
  }
  
  return (
    <main>
      
      {!hasStarted && <StartScreen handleStart={handleStart} />}

      {hasStarted && <div className="game-screen">

        {questionnary}

        <GameButtons
          hasChecked={hasChecked}
          displayResults={displayResults}
          handlePlayAgain={handlePlayAgain}
          handleScore={getCorrectAnswers}
        />

      </div>}
      
    </main>
    
  )
}