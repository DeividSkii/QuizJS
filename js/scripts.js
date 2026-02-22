//Declarando variáveis
const question = document.querySelector("#question");
const answersBox = document.querySelector("#answers-box");
const quizzContainer = document.querySelector("#quizz-container");
const scoreContainer = document.querySelector("#score-container");
const letters = ['a', 'b', 'c','d'];
let point = 0;
let actualQuestion = 0;

//Perguntas
const questions = [
    {
        "question": "Qual o primeiro Zelda cronologicamente?",
        "answers": [
            {
                "answer":"Skyward Sword",
                "correct": true
            },
            {
                "answer": "Minish Cap",
                "correct": false
            },
            {
                "answer": "Foursword Adventures",
                "correct": false
            },
            {
                "answer": "The Legend of Zelda 1",
                "correct": false
            }
        ]
    },
    {
        "question": "Em que ano se passa Jojo's Bizarre Adventure Battle Tendency?",
        "answers": [
            {
                "answer": "1950",
                "correct": false
            },
            {
                "answer": "1930",
                "correct": true
            },
            {
                "answer": "1945",
                "correct": false
            },
            {
                "answer": "1970",
                "correct": false
            }
        ]
    },
    {
        "question": "Qual o nome do criador de Undertale e Deltarune?",
        "answers": [
            {
                "answer": "Johnny Wolf",
                "correct": false
            },
            {
                "answer": "Tonny Box",
                "correct": false
            },
            {
                "answer": "Tobias Raposa",
                "correct": false
            },
            {
                "answer": "Toby Fox",
                "correct": true
            }
        ]
    },
    {
        "question": "Qual o nome completo de quem criou este quiz?",
        "answers": [
            {
                "answer": "Darlan Deivid Santos Silva",
                "correct": true
            },
            {
                "answer": "Deivid Santos",
                "correct": false
            },
            {
                "answer": "Darlan Deivid Silva Santos",
                "correct": false
            },
            {
                "answer": "Tonikaku Kawai",
                "correct": false
            }
        ]
    }
]

// Substituiçao do quiz para a primeira pergunta

function init() {
    //Criar a primeira pergunta
    createQuestion(0);
}

// Cria uma pergunta
function createQuestion(i){

    //Limpar a questao anterior
    const oldButtons = answersBox.querySelectorAll("button");

    oldButtons.forEach(function (btn) {
        btn.remove();
    });

    // Alterar o texto da pergunta
    const questionText = question.querySelector("#question-text");
    const questionNumber = question.querySelector("#question-number");

    questionText.textContent = questions[i].question;
    questionNumber.textContent = i + 1;

    //Inserir alternativas
    questions[i].answers.forEach(function(answer, i) {

        //Cria o template do botao do quiz
        const answerTemplate = document.querySelector(".answer-template").cloneNode(true);

        const letterBtn = answerTemplate.querySelector(".btn-letter");
        const answerText = answerTemplate.querySelector(".question-answer");

        letterBtn.textContent = letters[i];
        answerText.textContent = answer['answer'];

        answerTemplate.setAttribute("correct-answer", answer["correct"]);

        // Removendo hide e template class
        answerTemplate.classList.remove("hide")
        answerTemplate.classList.remove("answer-template")

        //Inserir alternativa na tela
        answersBox.appendChild(answerTemplate);


        //Inserir evento de click
        answerTemplate.addEventListener("click", function (){

            checkAnswer(this)

        })

    });

    //incrementar numero da questao
    actualQuestion++;

}

//verificando resposta do usuario
function checkAnswer(btn){
    
    //seleciona todos os botoes
    const buttons = answersBox.querySelectorAll("button");


    //verifica se a resposta está correta e adiciona classes a botoes
    buttons.forEach(function(button) {
        
        if(button.getAttribute("correct-answer") === "true"){

            button.classList.add("correct-answer");

            //checa se acertou a pergunta
            if(btn === button){
                // incrementa os pontos
                point++
            }

        } else {

            button.classList.add("wrong-answer")

        }
    });

    //Exibir prócima pergunta
    nextQuestion();

}

//Exibe a proxima pergunta do quiz
function nextQuestion(){

    //timer para usuario ver as respsota
    setTimeout(function () {

        //verifica se ainda há perguntas
        if(actualQuestion >= questions.length) {
            //apresenta a msg de sucesso
            showSuccessMessage()
            return
        }

        createQuestion(actualQuestion)
    }, 800)

}

//Exibe a tela final\
function showSuccessMessage(){

    hideOrShowQuiz()

    //trocar dados da tela de sucesso

    //calcula o score

    const score = ((point/ questions.length) * 100).toFixed(2);

    const displayScore = document.querySelector('#display-score span');

    displayScore.textContent = score.toString();

    //alterar o numero de perguntas corretas
    const correctAnswers = document.querySelector("#correct-answers");
    correctAnswers.textContent = point

    //alterar o total de pergunta
    
    const totalQuestions = document.querySelector("#questions-qty")
    totalQuestions.textContent = questions.length;
}

//Mostra ou esconde o score
function hideOrShowQuiz(){
    quizzContainer.classList.toggle("hide");
    scoreContainer.classList.toggle("hide");
}

//reiniciar quizz 
const restartBtn = document.querySelector("#restart")

restartBtn.addEventListener("click", function(){

    //zerar o jogo
    actualQuestion = 0;
    point = 0;
    hideOrShowQuiz();
    init();

})
//inicializacao do quiz
init();