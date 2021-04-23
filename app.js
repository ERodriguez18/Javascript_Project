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