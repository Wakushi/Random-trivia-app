import { nanoid } from "nanoid";

// Note : need to find a better way for encoded characters.

// dataFilter() filters the informations required for our quiz, stores it in our own-made objects, and pushes them to an array.
function dataFilter(data) {
  const questionArray = [];
  data.forEach((quiz) => {
    questionArray.unshift({
      id: nanoid(),
      question: quiz.question,
      correctAnswer: quiz.correct_answer,
      badAnswers: quiz.incorrect_answers,
    });
  });
  return questionArray;
}

// handleSelect() is used to make the answers div act as radio inputs : Only one can be 'selected'.
function handleSelect(e) {
  const targetedId = e.target.id.slice(6, 27); // Stores only the nanoid() generated id which is common to a question and its 4 answers.
  const targetedAnswers = document.getElementsByClassName(targetedId); // We store all the answers who have this same id as their class.
  for (let answer of targetedAnswers) {
    // We iterate over the DOM elements array to remove the 'selected' class to all elements.
    answer.classList.remove("selected");
  }
  document.getElementById(e.target.id).classList.add("selected"); // Then we add the 'selected' class to the element that was clicked.
}

// getCorrectAnswer() iterates over all the answers who have the 'selected' class and checks if their id contains 'right' (see Render() for id details).
function getCorrectAnswers() {
  let goodAnswers = 0;
  const SelectedAnswers = document.getElementsByClassName("selected");
  for (let answer of SelectedAnswers) {
    if (answer.id.slice(0, 5) === "right") {
      goodAnswers++; // if the answer 'selected' was 'right' then it increments the player's score.
    }
  }
  return goodAnswers;
}

export { dataFilter, handleSelect, getCorrectAnswers };
