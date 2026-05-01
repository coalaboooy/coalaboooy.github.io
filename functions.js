const textBlockClass = "text-block"
const fontBigClass = "font-big"
const fontNormalClass = "font-normal"
const quizQuestionNumber = "quiz-question-number"
const quizHeaderText = "quiz-header-text"

document.addEventListener("DOMContentLoaded", (event) => {
    $('#umaName').select2({
        placeholder: '',
        data: ["", "Maruzensky", "Nice Nature", "Biwa Hayahide"],
        width: 'stretch',
        dropdownAutoWidth: true
    });
    const mainContentNode = document.getElementById("mainContentNode");
    const startQuizButton = document.getElementById("startQuizButton");
    startQuizButton.addEventListener("click", function() {
        const questionNode = document.createElement("div")
        questionNode.className = "quiz-content"
        const questionCounterText = document.createElement("p")
        questionCounterText.className = textBlockClass + " " + fontBigClass + " " + quizQuestionNumber
        questionCounterText.textContent = "Question 67/80"
        questionNode.appendChild(questionCounterText)
        const questionLeftHeader = document.createElement("p")
        questionLeftHeader.className = textBlockClass + " " + fontNormalClass + " " + quizHeaderText
        questionLeftHeader.textContent = "Listen to the music"
        questionNode.appendChild(questionLeftHeader)
        const questionRightHeader = document.createElement("p")
        questionRightHeader.className = textBlockClass + " " + fontNormalClass + " " + quizHeaderText
        questionRightHeader.textContent = "Guess the character"
        questionNode.appendChild(questionRightHeader)

        mainContentNode.innerHTML = ""
        mainContentNode.appendChild(questionNode)
    });
});