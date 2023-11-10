const quizDB = [
    {
        question: "Q1: Who is the prime minister of Bharat?",
        a: "Narendra Modi",
        b: "Yogi Aadityanath",
        c: "Rahul Gandhi",
        d: "Siddaramaiah",
        ans: "a"
    },
    {
        question: "Q2: Who is the president of Bharat?",
        a: "Narendra Modi",
        b: "Yogi Aadityanath",
        c: "Draupadi Murmu",
        d: "Ram Nath Kovind",
        ans: "c"
    },
    {
        question: "Q3: Capital of Karnataka?",
        a: "Mysuru",
        b: "Mumbai",
        c: "Shivamogga",
        d: "Bengaluru",
        ans: "d"
    },
    {
        question: "Q4: Which is the ruling party of Bharat?",
        a: "INC",
        b: "JDS",
        c: "BJP",
        d: "DMK",
        ans: "c"
    }
];

const question = document.querySelector('.question');
const option1 = document.querySelector('#ans1');
const option2 = document.querySelector('#ans2');
const option3 = document.querySelector('#ans3');
const option4 = document.querySelector('#ans4');
const submit = document.querySelector('#submit');
const scoreArea = document.getElementById('showscore');
const mainDiv = document.querySelector('.main-div');
const welcomeScreen = document.querySelector('.welcome-screen');

let questionCount = 0;
let score = 0;

const loadQuestion = () => {
    const questionList = quizDB[questionCount];
    question.innerText = questionList.question;
    option1.nextElementSibling.innerText = questionList.a;
    option2.nextElementSibling.innerText = questionList.b;
    option3.nextElementSibling.innerText = questionList.c;
    option4.nextElementSibling.innerText = questionList.d;
};

const getCheckAnswer = () => {
    let answer;

    document.querySelectorAll('.answer').forEach((currentElement) => {
        if (currentElement.checked) {
            answer = currentElement.id;
        }
    });

    return answer;
};

const deselectAll = () => {
    document.querySelectorAll('.answer').forEach((currentElement) => {
        currentElement.checked = false;
    });
};

submit.addEventListener('click', () => {
    const checkedAnswer = getCheckAnswer();

    if (checkedAnswer === quizDB[questionCount].ans) {
        score++;
    }

    // Show correct answer
    const correctOptionId = quizDB[questionCount].ans;
    
    document.getElementById(correctOptionId).classList.add('correct-answer');
    sleep(3000).then(()=>{
        document.getElementById(correctOptionId).classList.remove('correct-answer');

        questionCount++;

        deselectAll();
    
        if (questionCount < quizDB.length) {
            loadQuestion();
        } else {
            scoreArea.style.display = 'block';
            scoreArea.innerHTML = `
                <h2>Your Score: ${score}/${quizDB.length}</h2>
                <button class="btn" onclick="resetQuiz()">Restart Quiz</button>
            `;
            mainDiv.style.display = 'none';
        }
    })
    
});

function resetQuiz() {
    questionCount = 0;
    score = 0;
    scoreArea.style.display = 'none';
    mainDiv.style.display = 'flex';
    loadQuestion();
    document.querySelectorAll('.correct-answer').forEach((el) => {
        el.classList.remove('correct-answer');
    });
}

// Add event listener to the "Start Quiz" button
document.getElementById('startQuiz').addEventListener('click', function() {
    welcomeScreen.style.display = 'none'; // Hide welcome screen
    mainDiv.style.display = 'flex'; // Show main div
    loadQuestion(); // Start loading questions
});

// Add event listener to the "Scroll to Top" button
document.getElementById('scrollToTop').addEventListener('click', function() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

function sleep(ms){
    return new Promise(resolve=>setTimeout(resolve,ms));
}

