import React from "react";

export default function StartScreen(props) {
    return (
        <div className="start-screen">
            <h1>Random Trivia Quiz</h1>
            <p className="game-info">5 random questions to challenge yourself !</p>
            <button className="start-btn" onClick={props.handleStart}>Start Quiz</button>
            <p className="details">This project was made on my own using React and the opentdb API</p>
      </div>
    )
}