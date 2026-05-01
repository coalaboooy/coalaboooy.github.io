const textBlockClass = "text-block"
const fontBigClass = "font-big"
const fontNormalClass = "font-normal"
const quizQuestionNumber = "quiz-question-number"
const quizHeaderText = "quiz-header-text"

document.addEventListener("DOMContentLoaded", (event) => {
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
        const nameSelectorBox = document.createElement("div")
        nameSelectorBox.className = textBlockClass + " quiz-name-selector"
        questionNode.appendChild(nameSelectorBox)
        const nameSelector = document.createElement("select")
        nameSelector.id = "umaName"
        nameSelector.name = "umaName"
        nameSelectorBox.appendChild(nameSelector)

        const audioBox = document.createElement("div")
        audioBox.className = textBlockClass + " quiz-audio-player"
        questionNode.appendChild(audioBox)
        const audioPlayer = document.createElement("audio")
        audioPlayer.id = "songPlayer"
        audioPlayer.controls = true
        audioBox.appendChild(audioPlayer)
        var audioSource = document.createElement("source");
        audioSource.src="data/audio/Sutekimeppou end note.mp3"
        audioPlayer.appendChild(audioSource)
        

        mainContentNode.innerHTML = ""
        mainContentNode.appendChild(questionNode)

        $('#umaName').select2({
            placeholder: '⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀',
            data: ["", "Maruzensky", "Nice Nature", "Biwa Hayahide"],
            width: 'max-content',
            dropdownAutoWidth: true
        });
    });
});