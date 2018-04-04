const questionSet = [
  {
      number: 1,
      text: `What year was Beyonce born?`,
      ans1: `December 4, 1981`, 
      ans2: `April 4, 1981`, 
      ans3: `January 4, 1981`, 
      ans4: `September 4, 1981`
    }, 
  {
      number: 2,
      text: `As a child, Beyonce appeared on Star Search with her girl group called?`,
      ans1: `Destiny’s Child`, 
      ans2: `Girl’s Tyme`, 
      ans3: `En Vogue`, 
      ans4: `3LW`
    }, 
  {
      number: 3,
      text: `On April 4, 2008, Beyonce married this Hip-Hop artist.`,
      ans1: `P. Diddy`, 
      ans2: `Kanye West`, 
      ans3: `Jay-Z`, 
      ans4: `Dr. Dre`
    }, 
  {
      number: 4,
      text: `Beyonce has won how many Grammy awards?`,
      ans1: `31`, 
      ans2: `13`, 
      ans3: `20`, 
      ans4: `7`
    }, 
  {
      number: 5,
      text: `Beyonce claims that this fast food chain is her favorite food to eat while on the road.`,
      ans1: `McDonalds`, 
      ans2: `Popeyes`, 
      ans3: `Panda Express`, 
      ans4: `Kentucky Fried Chicken`
    }, 
  {
      number: 6,
      text: `What is the title of Beyonce's most recent album?`,
      ans1: `Beyonce`, 
      ans2: `I Am… Sasha Fierce!`, 
      ans3: `B’ Day`, 
      ans4: `Lemonade`
    }, 
  {
      number: 7,
      text: `Beyonce now has 3 children named?`,
      ans1: `Blue, Sir, Rumi`, 
      ans2: `North, Saint, Chicago`, 
      ans3: `Kim, Kourtney, Khloe`, 
      ans4: `Justin, Quicy, Christian`
    }, 
  {
      number: 8,
      text: `Beyonce’s younger sister is Grammy award winning singer/songwriter?`,
      ans1: `Ciara`, 
      ans2: `Solange`, 
      ans3: `Keri Hilson`, 
      ans4: `Rihanna`
    }, 
  {
      number: 9,
      text: `Beyonce has performed at the Super Bowl how many times?`,
      ans1: `1`, 
      ans2: `2`, 
      ans3: `3`, 
      ans4: `4`
    }, 
  {
      number: 10,
      text: `In 2007 Beyonce received a Golden Globe nomination for Best Actress in which film?`,
      ans1: `Obsessed`, 
      ans2: `Cadillac Records`, 
      ans3: `The Pink Panther`, 
      ans4: `Dreamgirls`
    }, 
  ];

const ANSWERS = [ 
  `September 4, 1981`, 
  `Girl’s Tyme`, 
  `Jay-Z`,
  `20`, 
  `Popeyes`,
  `Lemonade`,
  `Blue, Sir, Rumi`,  
  `Solange`,
  `2`, 
  `Dreamgirls`
];


let questionNum = 1;
let correctAnswers = 0;


function questionPage(correctAnswers, question, questionsAnswered) {
   $('.next-btn').hide();
  return `
   <div class='question-page' role='main'>
      <div class='transbox'> 
        <h1 class='question'>${question.text}</h1>
        <form id="question-form">
          <fieldset>
            <legend>Answer Options</legend>
              <label>
                <input class="answer" type="radio" name="option" checked>
                  <span>${question.ans1}</span>
              </label> 
              
              <label>
                <input class="answer" type="radio" name="option">
                  <span>${question.ans2}</span>
              </label> 
              
              <label>
                <input class="answer" type="radio" name="option">
                  <span>${question.ans3}</span>
              </label>
              
              <label>
                <input class="answer" type="radio" name="option">
                  <span>${question.ans4}</span>
              </label>
          </fieldset>
            <button class='submit-btn' id='sub-btn'>Submit</button>
        </form>
          <div class='current-status'>
            <span class='score'>Score: ${correctAnswers}</span>
            <span class='question-number'>Question: ${question.number}/10</span>
          </div>
      </div>
    </div>
  `;
}

function nextQuestion() {
  const question = questionSet[questionNum - 1];
  const questionsAnswered = questionNum - 1;
  $('.container').html(questionPage(correctAnswers, question, questionsAnswered));
  handleSubmitButton();
}

function handleStartButton() {
  $('.js-start-button').click(function(event){
    nextQuestion();
  });
}

function handleSubmitButton() {
  $('.submit-btn').click( function(event) {
    event.preventDefault();
    
    const answer = $('input:checked').siblings('span');
    const answerIsCorrect = checkAnswer(answer);
    
      if (answerIsCorrect === true) {
        giveResponse('correct');
      }
      else {
        giveResponse('incorrect');
      }
  });
}

function checkAnswer(answer) {
  if (answer.text() === ANSWERS[questionNum - 1]) {
    correctAnswers++;
    return true;
  }  
  else {
    return false;
  }
}

function giveResponse(responseType) {
  if (responseType === 'correct') {
    $('.container').html(`<div class="feedback-page" role="main">
    <h1>Yes! You're one step closer to the hive!</h1>
  </div>`);
  } else {
    $('.container').html(`<div class="feedback-page" role="main">
    <h1>Incorrect! The correct answer is "${ANSWERS[questionNum - 1]}"</h1>
  </div>`);
  //handleQuizButtons();
  }
  $('.next-btn').show();
}



function handleNextButton() {
  
  $('.next-btn').on('click', function(event) {
    event.preventDefault();
    if (questionNum < 10) {
      questionNum++;
      nextQuestion();
    } else {
        showResults();
    }
  });
    $('.next-btn').hide();
}

function showResults() {
  $('.container').html(`
    <div class='results-page' role='main'>
      <h1>Total Score: ${correctAnswers}/10
    </div>
    <div role='navigation'><button class='restart-btn'>Restart Quiz</button></div>`); 
  $('.next-btn').hide();
  handleRestartButton();
}

function handleRestartButton() {
  $('.restart-btn').on('click', function(event) {

    questionNum = 1;

    correctAnswers = 0;

    nextQuestion();
    
  });
}


function handleQuizButtons() {
  handleStartButton();
  handleSubmitButton();
  handleNextButton();
  handleRestartButton();
}

handleQuizButtons();