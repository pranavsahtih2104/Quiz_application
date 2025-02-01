let questions = []; // Store quiz questions
let correctAnswers = 0; // Track correct answers
let totalQuestions = 0; // Total number of questions
let currentQuestionIndex = 0; // To track the current question
let timerInterval; // Timer interval for each question
let isQuizCompleted = false; // Flag to check if quiz is completed

const API_ENDPOINT = "https://api.allorigins.win/get?url=https://api.jsonserve.com/Uw5CrX"; // Replace with actual API endpoint

document.getElementById("startQuiz").addEventListener("click", fetchQuizData);
document.getElementById("submitQuiz").addEventListener("click", submitQuiz);
document.getElementById("themeToggle").addEventListener("click", toggleTheme);
document.getElementById("nextQuestion").addEventListener("click", nextQuestion);
document.getElementById("previousQuestion").addEventListener("click", previousQuestion);

function fetchQuizData() {
    fetch(API_ENDPOINT)
        .then(response => response.json())
        .then(data => {
            const parsedData = JSON.parse(data.contents);
            questions = parsedData.questions || [];
            totalQuestions = questions.length;

            if (questions.length > 0) {
                displayQuestion(currentQuestionIndex);
                document.getElementById("quiz-container").style.display = "block";
                document.getElementById("submitQuiz").style.display = "block";
                document.getElementById("navigation-buttons").style.display = "block";
                startTimer();
            }
        })
        .catch(error => console.error("Error fetching quiz data:", error));
}

function displayQuestion(index) {
    const question = questions[index];
    const quizContainer = document.getElementById("quiz-container");

    quizContainer.innerHTML = `
        <div class="question">
            <p>${index + 1}. ${question.description}</p>
            <p id="timeLeft">Time Remaining: 15 seconds</p>
            <div class="time-bar">
                <div id="progress-bar" class="progress-bar"></div>
            </div>
            <ul class="options">
                ${shuffleArray(question.options).map(option => ` 
                    <li>
                        <label>
                            <input type="radio" name="question${index}" value="${option.description}" class="option" data-question-index="${index}" data-option-id="${option.id}">
                            ${option.description}
                        </label>
                    </li>
                `).join('')}
            </ul>
        </div>
    `;

    const allOptions = document.querySelectorAll(".option");
    allOptions.forEach(option => {
        option.addEventListener("change", updateScore);
    });

    updateProgressBar();
    toggleNavigationButtons();
}

function shuffleArray(arr) {
    for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
}

function updateScore(event) {
    const questionIndex = event.target.getAttribute("data-question-index");
    const optionId = event.target.getAttribute("data-option-id");

    const selectedOption = questions[questionIndex].options.find(option => option.id == optionId);
    
    if (selectedOption && selectedOption.is_correct) {
        correctAnswers++;
    }
}

function startTimer() {
    let timeLeft = 15;
    const timeDisplay = document.getElementById("timeLeft");
    
    timerInterval = setInterval(() => {
        timeLeft--;
        timeDisplay.textContent = `Time Remaining: ${timeLeft} seconds`;
        updateProgressBar(timeLeft);

        if (timeLeft <= 0) {
            clearInterval(timerInterval);
            // Automatically move to the next question when time runs out
            if (currentQuestionIndex < totalQuestions - 1) {
                currentQuestionIndex++;
                displayQuestion(currentQuestionIndex);
                resetTimer();
            }
        }
    }, 1000);
}

function resetTimer() {
    clearInterval(timerInterval);
    startTimer();
}

function updateProgressBar(timeLeft = 15) {
    const progressBar = document.getElementById("progress-bar");
    const progress = ((15 - timeLeft) / 15) * 100;
    progressBar.style.width = `${progress}%`;
}

function toggleNavigationButtons() {
    if (currentQuestionIndex === totalQuestions - 1) {
        document.getElementById("nextQuestion").style.display = "none"; 
    } else {
        document.getElementById("nextQuestion").style.display = "inline-block";
    }

    if (currentQuestionIndex === 0 || isQuizCompleted) {
        document.getElementById("previousQuestion").style.display = "none"; 
    } else {
        document.getElementById("previousQuestion").style.display = "inline-block";
    }
}

function nextQuestion() {
    if (currentQuestionIndex < totalQuestions - 1) {
        currentQuestionIndex++;
        displayQuestion(currentQuestionIndex);
        resetTimer();
    }
}

function previousQuestion() {
    if (currentQuestionIndex > 0) {
        currentQuestionIndex--;
        displayQuestion(currentQuestionIndex);
        resetTimer();
    }
}

function submitQuiz() {
    clearInterval(timerInterval);
    isQuizCompleted = true;

    let resultText = `
        <h3>Your Final Score: ${correctAnswers} / ${totalQuestions}</h3>
        <p><strong>Quiz Breakdown:</strong></p>
    `;
    questions.forEach((q, index) => {
        const userAnswer = document.querySelector(`input[name="question${index}"]:checked`);
        const userAnswerText = userAnswer ? userAnswer.value : "No Answer";
        const correctAnswer = q.options.find(option => option.is_correct).description;
        const explanation = q.detailed_solution || "No explanation available";

        resultText += `
            <div class="question-breakdown">
                <div class="question-header">
                    <p><strong>Question ${index + 1}: </strong>${q.description}</p>
                </div>
                <div class="answer">
                    <p><strong>Your Answer:</strong> <span class="${userAnswerText === correctAnswer ? 'correct' : 'incorrect'}">${userAnswerText}</span></p>
                    <p><strong>Correct Answer:</strong> ${correctAnswer}</p>
                </div>
                <div class="explanation">
                    <p><strong>Explanation:</strong></p>
                    <pre>${explanation}</pre>
                </div>
            </div>
        `;
    });

    document.getElementById("result").innerHTML = resultText;
    document.getElementById("submitQuiz").style.display = "none"; 
    document.getElementById("timeLeft").style.display = "none"; 
    document.getElementById("progress-container").style.display = "none"; 
}

function toggleTheme() {
    document.body.classList.toggle("dark-mode");
    document.getElementById("themeToggle").textContent = document.body.classList.contains("dark-mode") ? "Switch to Light Mode" : "Switch to Dark Mode";
}
