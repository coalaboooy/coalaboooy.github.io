const textBlockClass = "text-block"
const fontBigClass = "font-big"
const fontNormalClass = "font-normal"

document.addEventListener("DOMContentLoaded", (event) => {
    const mainContentNode = document.getElementById("mainContentNode");
    const startQuizButton = document.getElementById("startQuizButton");
    startQuizButton.addEventListener("click", function() {
        const questionNode = document.createElement("div")
        questionNode.className = "quiz-content"
        const questionCounterText = document.createElement("p")
        questionCounterText.className = textBlockClass + " " + fontBigClass
        questionCounterText.textContent = "Question 67/80"
        questionNode.appendChild(questionCounterText)
        mainContentNode.innerHTML = ""
        mainContentNode.appendChild(questionNode)
    });
});