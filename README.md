# Interactive_Quiz_Application (https://github.com/pranavsahtih2104/Quiz_application/blob/main/index.html)
Overview:

The Interactive Quiz application is a web-based quiz platform that tests users' knowledge on the subject of Genetics and Evolution. The application features a timer for each question, a progress bar to indicate time remaining, and a dynamic scoring system. The quiz data, including questions, options, correct answers, and detailed solutions, is fetched from an external API.

The application also includes a theme toggle to switch between dark mode and light mode for user convenience. The quiz consists of multiple-choice questions with a time limit for each question. After completing the quiz, users can see their results along with the correct answers and explanations for each question.

# Features

1. Quiz Functionality:
Dynamic Question Display: The quiz displays one question at a time with multiple choice answers. The user selects an answer by clicking on a radio button.
Timer: A countdown timer (15 seconds) for each question is displayed along with a progress bar showing how much time remains. If the timer runs out, the application automatically moves to the next question.
Navigation: The user can navigate between questions using "Next" and "Previous" buttons. The navigation is hidden when the user is on the first or last question.
Score Calculation: After completing the quiz, the user's score is displayed, showing both the number of correct answers and the total number of questions.
Explanation: For each question, the correct answer is shown along with a detailed explanation, helping users understand the reasoning behind the correct choice.
Theme Toggle: The user can switch between dark mode and light mode for a better user experience. A button toggles between the two themes.
2. API Integration:
The quiz data is fetched from an external API that returns a set of questions, options, and correct answers. The API also provides detailed explanations for the answers.
The data is parsed and displayed dynamically in the UI. The API used is jsonserve.com, which returns quiz data in a JSON format.
3. Responsive UI:
The layout of the application is responsive, ensuring it works well on different screen sizes. The styling of the page adjusts accordingly for a smooth user experience on both desktop and mobile devices.
4. Timer and Progress Bar:
Each question has a 15-second timer that decreases with time. The progress bar visually represents the remaining time for each question.
If the timer runs out, the quiz automatically moves to the next question without user intervention.
5. Detailed Results Page:
After submitting the quiz, the results page is displayed. This page includes:
A breakdown of each question with the user's selected answer, the correct answer, and an explanation of the correct answer.
The final score showing the number of correct answers out of the total questions.
Tools and Technologies Used
1. HTML (HyperText Markup Language):
HTML is used to structure the content of the web page, including headers, buttons, forms, and other elements that make up the user interface.
2. CSS (Cascading Style Sheets):
CSS is used to style the HTML elements, including defining the layout, colors, fonts, and the appearance of buttons, questions, and the progress bar.
The application supports both dark and light themes, which can be toggled using a button.
3. JavaScript (JS):
JavaScript is used to add interactivity to the page, such as fetching quiz data, handling user interactions (e.g., selecting answers, switching questions), updating the timer, and calculating the score.
Event listeners are added for buttons like "Start Quiz", "Submit Quiz", "Next", and "Previous".
4. API (JSON):
The quiz data is fetched from an API endpoint, which returns the quiz questions and answers in JSON format.
The endpoint used in this project is https://api.allorigins.win/get?url=https://api.jsonserve.com/Uw5CrX, which provides a JSON object containing the quiz data.


# How the Code Works

1. HTML Structure:
The HTML contains several key sections:
quiz-context: Displays the instructions for the quiz.
quiz-container: The area where the quiz questions and options are dynamically inserted.
navigation-buttons: Includes "Previous" and "Next" buttons for navigation between questions.
submitQuiz: Button to submit the quiz at the end.
progress-container: Contains the progress bar that shows the timer for each question.
result: Displays the results of the quiz, including the user's score and explanations for each question.
2. CSS Styling:
The CSS defines styles for both light and dark themes. The .dark-mode class is applied when the user switches to dark mode, and .light-mode is the default style.
The .question-breakdown class is used to style each question's result, including the user's answer, the correct answer, and the explanation.
3. JavaScript Functionality:
Event Listeners:

When the user clicks "Start Quiz", the fetchQuizData function is called to fetch the quiz data from the API.
The submitQuiz function handles the final submission of the quiz and displays the results.
The themeToggle function switches between dark and light mode.
The nextQuestion and previousQuestion functions handle the navigation between questions.
Fetching Data:

The fetchQuizData function uses the fetch API to retrieve quiz data from the provided API endpoint. The response is parsed as JSON and the quiz questions are dynamically inserted into the quiz-container.
Timer Functionality:

The timer for each question starts at 15 seconds and decreases by 1 second every second. When the timer reaches 0, the startTimer function automatically moves to the next question and resets the timer.
Question Display:

Each question is displayed with multiple-choice options. When an option is selected, the score is updated, and the correct/incorrect status is visually displayed.
Result Calculation:

After the quiz is completed, the results are displayed with a breakdown of each question, including the user's answer, the correct answer, and a detailed explanation.

4. API Details:
The API endpoint used in this project is https://api.allorigins.win/get?url=https://api.jsonserve.com/Uw5CrX.
This API fetches quiz data from a JSON file hosted on jsonserve.com.
The JSON response from the API contains an array of quiz questions, each having:
description: The question text.
options: An array of options (each option contains an id, description, and a boolean is_correct).
detailed_solution: A detailed explanation for the correct answer.
The data fetched from the API is parsed and used to populate the quiz questions dynamically.
