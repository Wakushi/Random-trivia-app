import { dataFilter, handleSelect } from "./utils";

// Function to decode HTML entities
function decodeHtmlEntities(text) {
  const textArea = document.createElement("textarea");
  textArea.innerHTML = text;
  return textArea.value;
}

// render() creates an array of DOM elements by mapping on the filtered data array (see utils.js/dataFilter()).
// We pass the data obtained from the API as its parameter.
export default function render(data) {
  const questionnaryElements = dataFilter(data).map(quiz => {
    const answers = []; // answers will hold our own answer objects.

    // We store the answers as objects to keep their 'correct' / 'wrong' data.
    answers.push({
      answer: decodeHtmlEntities(quiz.correctAnswer),
      id: `right-${quiz.id}` // We create a custom id for the correct answer : 'right-' + nanoid() generated id.
    });

    // We iterate over the badAnswers array which hold the 3 wrong answers strings.
    quiz.badAnswers.forEach((badAnswer, index) => {
      // We store the answers as objects to keep their 'correct' / 'wrong' data.
      answers.push({
        answer: decodeHtmlEntities(badAnswer),
        id: `false-${quiz.id}-${index}` // We add the index to the custom id of wrong answers because we need to keep their id unique.
      });
    });

    const shuffledAnswers = answers.sort(() => 0.5 - Math.random()); // We shuffle the answers array so the good answer is then rendered randomly.

    // We iterate over our shuffled array to create our answer elements.
    const answerElements = shuffledAnswers.map(answer => {
      const answerClasses = `answer ${quiz.id}`; // Each answer has two classes : 'answer' is used to shape all answers. {quiz.id} is used to bind all answers together, so we can deal with the 'selection' of each answer (see utils.js/handleSelect())

      return (
        <div
          className={answerClasses}
          onClick={handleSelect}
          key={answer.answer}
          id={answer.id}
        >
          {answer.answer}
        </div>
      );
    });

    const decodedQuestion = decodeHtmlEntities(quiz.question);

    return (
      <div className="question-set" key={quiz.id}>
        <h3 className="question" id={quiz.id}>{decodedQuestion}</h3>
        <span className="answers">
          {answerElements}
        </span>
      </div>
    );
  });
  return questionnaryElements;
}
