const submit = document.querySelector('#form');
const questionContainer = document.querySelector('.questionContainer');
const quizControls = document.querySelector('#quizControls');
const totalQuestions = document.querySelector('.score--total');
let   scoreChange = document.querySelector('.score--change');
const winner = document.querySelector('.winner');
const replayBtn = document.querySelector('.btn--yes');
const playerName = document.querySelector('.player'); 

submit.addEventListener('submit', function(e) {
    e.preventDefault();

    getMeSomeQuestions();
    quizControls.style.display = 'none';

    playerPrompt();
    
});

function getMeSomeQuestions() {
    const url = 'https://opentdb.com/api.php?amount=10&category=11&difficulty=medium&type=multiple';

    const fetchQuestionsAwait = async () => {
        const response = await fetch(url)
        const data = await response.json();
        createQuestions(data.results);
    
    }
    fetchQuestionsAwait();
}
function playerPrompt() {
    let person = prompt('Please Enter Your Name');
    let personCapitalize = person.charAt(0).toUpperCase() + person.substr(1);

    person ? playerName.innerText = `${personCapitalize}'s`: (alert('You Must Enter A Name'), playerPrompt());
}

function createQuestions(questions) {
    questionContainer.innerHTML = null;
    questions.forEach((question, index) => {
        var answers = createAnswers(question);
        questionContainer.innerHTML += 
        `<div class='question question${index + 1}'>
            <h3>${question.question}</h3>
            <div class='answers ${index + 1}'>
                <p class='answer'>${answers[0]}</p>
                <p class='answer'>${answers[1]}</p>
                <p class='answer'>${answers[2]}</p>
                <p class='answer'>${answers[3]}</p>
            </div>
        </div>`;
        
    });

    selectAnswer(questions);

    document.querySelector('.question1').style.display = 'block';
    
};

function createAnswers(answers) {
    var answer = [];
    answer.push(answers.correct_answer);
    answer.push(...answers.incorrect_answers);
    answer = randomizeArray(answer);
    return answer;
}

function randomizeArray(array) {
    for (let i = array.length-1; i >=0; i--) {
     
        let randomIndex = Math.floor(Math.random()*(i+1)); 
        let itemAtIndex = array[randomIndex]; 
         
        array[randomIndex] = array[i]; 
        array[i] = itemAtIndex;
    }
    return array;
}
function selectAnswer(questions) {
    var selector = document.querySelectorAll('.answer');
    let yourScore = 0; 
    initializeScore(questions, yourScore);
    for(let i = 0; i < selector.length; i++) {
        selector[i].addEventListener('mousedown', function(e) {
        let correctAnswer = questions[e.target.parentNode.classList[1] - 1].correct_answer;

        if(e.target.innerText === correctAnswer) {
            e.target.style.backgroundColor = '#66ff63';
            yourScore += 1;
            scoreChange.innerText = yourScore.toString();

            setTimeout(function() {
                if(e.target.parentElement.parentElement.nextElementSibling !== null) {
                    e.target.parentElement.parentElement.style.display = 'none';
                    e.target.parentElement.parentElement.nextElementSibling.style.display = 'block'; 
                } else{
                    e.target.parentElement.parentElement.style.display = 'none';
                    winner.style.display = 'block';
                } 
            
            }, 1000);
        } else {
            e.target.style.backgroundColor = '#ff6666'; 
            
            selector.forEach(function(selection){
                if(selection.innerText === correctAnswer){
                    selection.style.backgroundColor = '#66ff63';
                }
            });
            setTimeout(function() {
                if(e.target.parentElement.parentElement.nextElementSibling !== null){
                    e.target.parentElement.parentElement.style.display = 'none';
                    e.target.parentElement.parentElement.nextElementSibling.style.display = 'block'; 
                } else{
                    e.target.parentElement.parentElement.style.display = 'none';
                    winner.style.display = 'block';
                } 
            
            }, 1000);
        };
    
});
}
}
