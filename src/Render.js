import { dataFilter, handleSelect } from "./utils"

// render() creates an array of DOM elements by mapping on the filtered data array (see utils.js/dataFilter()).
// We pass the data obtained from the API as its parameter.

export default function render(data) {

    const questionnaryElements = dataFilter(data).map(quiz => {

      const answers = []  // answers will hold our own answer objects.
  
      answers.push({
        answer:quiz.correctAnswer,  // We store the answers as objects to keep their 'correct' / 'wrong' data. 
        id:`right-${quiz.id}` // We create a custom id for the correct answer : 'right-' + nanoid() generated id.
      })
  
      quiz.badAnswers.forEach((badAnswer, index) => { // We iterate over the badAnswers array which hold the 3 wrong answers strings.
        answers.push({  // We store the answers as objects to keep their 'correct' / 'wrong' data.
          answer:badAnswer.replace(/&quot;/g, '"').replace(/&amp;/g, "&").replace(/&#039;/g, "'").replace(/&eacute;/g, "é"),  // .replace fixes encoding issues
          id:`false-${quiz.id}-${index}` // We add the index to the custom id of wrong answers because we need to keep their id unique.
        })
      })
  
      const shuffledAnswers = answers.sort(() => 0.5 - Math.random()) // We shuffle the answers array so the good answer is then rendered randomly.
  
      const answerElements = shuffledAnswers.map(answer => {  // We iterate over our shuffled array to create our answer elements.
        const answerClasses = `answer ${quiz.id}` // Each answer has two classes : 'answer' is used to shape all answers. {quiz.id} is used to bind all answers together, so we can deal with the 'selection' of each answer (see utils.js/handleSelect())
  
        return (
          <div 
          className={answerClasses} 
          onClick={handleSelect} 
          key={answer.answer} 
          id={answer.id}
          >{answer.answer}</div>
        )
      })
  
      return (
        <div className="question-set" key={quiz.id}>
          <h3 className="question" id={quiz.id}>{quiz.question}</h3>
          <span className="answers">
            {answerElements}
          </span>
        </div>
      )
    })
    return questionnaryElements
  }
