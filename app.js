const submit = document.querySelector('#form');
const questionContainer = document.querySelector('.questionContainer');
const quizControls = document.querySelector('#quizControls');
const totalQuestions = document.querySelector('.score--total');
let   scoreChange = document.querySelector('.score--change');
const winner = document.querySelector('.winner');
const replayBtn = document.querySelector('.btn--yes');
const playerName = document.querySelector('.player'); 

submit.addEventListener('submit', function(e){
    e.preventDefault();

    getMeSomeQuestions();
    quizControls.style.display = 'none';

    playerPrompt();
    
});

function getMeSomeQuestions(){
    const url = 'https://opentdb.com/api.php?amount=10&category=11&difficulty=medium&type=multiple';

    const fetchQuestionsAwait = async () => {
        const response = await fetch(url)
        const data = await response.json();
        createQuestions(data.results);
    
    }
    fetchQuestionsAwait();
}
function playerPrompt(){
    let person = prompt('Please Enter Your Name');
    let personCapitalize = person.charAt(0).toUpperCase() + person.substr(1);

    person ? playerName.innerText = `${personCapitalize}'s`: (alert('You Must Enter A Name'), playerPrompt());
}

function createQuestions(questions){
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