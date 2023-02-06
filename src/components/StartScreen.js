import React from "react";

export default function StartScreen(props) {
    return (
        <div className="start-screen">
            <h1>Random Trivia Quiz</h1>
            <p className="game-info">5 random questions to challenge yourself !</p>

            <h2>Trivia theme</h2>
            <select className="select" onChange={props.handleTheme}>
                <option value="9">General Knowledge</option>
                <option value="10">Books</option>
                <option value="11">Film</option>
                <option value="12">Music</option>
                <option value="13">Musicals & Theatres</option>
                <option value="14">Television</option>
                <option value="15">Video Games</option>
                <option value="16">Board Games</option>
                <option value="17">Science & Nature</option>
                <option value="18">Science: Computers</option>
                <option value="19">Science: Mathematics</option>
                <option value="20">Mythology</option>
                <option value="21">Sports</option>
                <option value="22">Geography</option>
                <option value="23">History</option>
                <option value="24">Politics</option>
                <option value="25">Art</option>
                <option value="26">Celebrities</option>
                <option value="27">Animals</option>
                <option value="28">Vehicles</option>
                <option value="29">Comics</option>
                <option value="30">Gadgets</option>
                <option value="31">Japanese Anime & Manga</option>
                <option value="32">Cartoon & Animations</option>
            </select>

            <h2>Difficulty</h2>
            <select className="select" onChange={props.handleDifficulty}>
                <option value="">Easy</option>
                <option value="">Medium</option>
                <option value="">Hard</option>
            </select>

            <button className="start-btn" onClick={props.handleStart}>Start Quiz</button>
            <p className="details">This project was made on my own using React and the opentdb API</p>

      </div>
    )
}