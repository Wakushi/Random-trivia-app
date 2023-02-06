import React from "react";

export default function GameButtons(props) {

    function getComment() {
        let comment = ''
        switch(props.handleScore()){
            case 0:
                comment = "Oof !";
                break;
              case 1:
                comment = "Better luck next time !";
                break;
              case 2:
                 comment = "You can do better !";
                break;
              case 3:
                comment = "Good !";
                break;
              case 4:
                comment = "Fantastic !";
                break;
              case 5:
                comment = "You're a genius !";
                break;
        }
        return comment
    }

    return (
        <div className="game-bottom">
            {!props.hasChecked && <button className="results-btn" onClick={props.displayResults}>Check answers</button>}
            {props.hasChecked && <span className="score-display">
                <h4>Your score is {props.handleScore()}/5</h4>
                <h4>{getComment()}</h4>
                <button className="play-again-btn" onClick={props.handlePlayAgain}>Play Again</button>
            </span>}
        </div>
    )
}