var audioArr = null
var audioNum = 3 //TODO: вставить количество вручную
fetch("data/json/audio.json")
.then(res => res.json())
.then(data => audioArr = data)
.then(() => shuffleArray(audioArr))

var characters = null
var characterNames = null
fetch("data/json/characters.json")
.then(res => res.json())
.then(data => characters = data)
.then(() => characterNames = [""].concat(characters.map(a => a.name)).sort())

function getImageByCharacterName(arr, name) {
  return arr.find(character => {
    return character.name === name;
  })?.image || 'no_photo.png';
}

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    audioNum = array.length
}


const textBlockClass = "text-block"
const fontBigClass = "font-big"
const fontNormalClass = "font-normal"
const quizQuestionNumberClass = "quiz-question-number"
const quizHeaderTextClass = "quiz-header-text"
const buttonClass = "start-button"
const bottomBarClass = "bottom-bar"
const backgroundClass = "background-center"

const audioDir = "data/audio/"
const characterImageDir = "data/images/characters/"
const albumCoverImageDir = "data/images/album_covers/"

var count = 1
var recordedAnswers = []

document.addEventListener("DOMContentLoaded", (event) => {
    const mainContentNode = document.getElementById("mainContentNode")
    const startQuizButton = document.getElementById("startQuizButton")
    const umaNumP = document.getElementById("umaNum")
    umaNumP.textContent = `There are currently ${audioNum} umamusume characters featured`

    var resultButtonFunc = function resultFunc() {
        const correctAnswerNum = recordedAnswers.filter((c) => c.correct == true).length;
        const percentage = (correctAnswerNum/audioNum*100).toFixed(2)

        const resultsNode = document.createElement("div")
        resultsNode.className = "main-content"
        const resultsText = document.createElement("p")
        resultsText.className = textBlockClass + " " + fontBigClass
        resultsText.textContent = `You answered ${correctAnswerNum} questions correct out of ${audioNum} (${percentage}%)`
        resultsNode.appendChild(resultsText)
    };

    var submitButtonFunc = function submitFunc() {
        var songName = audioArr[count-1].audio
        var audioLink = audioArr[count-1].link
        var audioName = audioArr[count-1].name
        var answer = $('#umaName').select2('data')[0];
        const answerName = answer.text
        const correctAnswer = audioName === answerName

        const answerNode = document.createElement("div")
        answerNode.className = "answer-content"
        const answerText = document.createElement("p")
        var answerTextContent = "Oops! Something went wrong!"
        var answerClassName = ""
        if (correctAnswer) {
            answerTextContent = "You are correct!"
            answerClassName = " answer-text-correct"
        }
        else {
            answerTextContent = "You are wrong!\nActual answer is"
            answerClassName = " answer-text-wrong"
        }
        recordedAnswers.push({
            correct: correctAnswer,
            recordedAnswer: answerName,
            actualAnswer: audioName
        })
        answerText.textContent = answerTextContent
        answerText.className = textBlockClass + " " + fontBigClass + " " + quizQuestionNumberClass + answerClassName
        answerNode.appendChild(answerText)
        const answerSongLink = document.createElement("a")
        answerSongLink.className = textBlockClass + " " + fontNormalClass + " " + quizHeaderTextClass
        answerSongLink.target = "_blank"
        answerSongLink.rel = "noopener noreferrer"
        answerSongLink.href = audioLink
        answerSongLink.textContent = songName.slice(0, -4)
        answerNode.appendChild(answerSongLink)
        const answerUmaName = document.createElement("p")
        answerUmaName.className = textBlockClass + " " + fontNormalClass + " " + quizHeaderTextClass
        answerUmaName.textContent = audioName
        answerNode.appendChild(answerUmaName)
        const albumImageBox = document.createElement("div")
        albumImageBox.className = textBlockClass + " answer-image-box"
        answerNode.appendChild(albumImageBox)
        const albumImage = new Image(256, 256)
        albumImage.src = albumCoverImageDir + getImageByCharacterName(audioArr, audioName)
        albumImageBox.appendChild(albumImage)
        const umaImageBox = document.createElement("div")
        umaImageBox.className = textBlockClass + " answer-image-box"
        answerNode.appendChild(umaImageBox)
        const umaImage = new Image(256, 256)
        umaImage.src = characterImageDir + getImageByCharacterName(characters, audioName)
        umaImageBox.appendChild(umaImage)
        const buttonBox = document.createElement("div")
        buttonBox.className = textBlockClass + " answer-submit-button"
        answerNode.appendChild(buttonBox)
        const nextButton = document.createElement("button")
        nextButton.id = "nextQuestion"
        nextButton.className = buttonClass

        if (count == audioNum) {
            nextButton.textContent = "See results"
            nextButton.addEventListener("click", resultButtonFunc);
        }
        else {
            nextButton.textContent = "Next question"
            count = count + 1
            nextButton.addEventListener("click", startButtonFunc);
        }

        buttonBox.appendChild(nextButton)

        mainContentNode.innerHTML = ""
        mainContentNode.appendChild(answerNode)

        const backgroundCenter = document.getElementById("backgroundCenter")
        backgroundCenter.className = backgroundClass + "-main"
        const bottomBar = document.getElementById("bottomBar")
        bottomBar.className = bottomBarClass + "-main"
    };

    var startButtonFunc = function startFunc() {
        const questionNode = document.createElement("div")
        questionNode.className = "quiz-content"
        const questionCounterText = document.createElement("p")
        questionCounterText.className = textBlockClass + " " + fontBigClass + " " + quizQuestionNumberClass
        questionCounterText.textContent = `Question ${count}/${audioNum}`
        questionNode.appendChild(questionCounterText)
        const questionLeftHeader = document.createElement("p")
        questionLeftHeader.className = textBlockClass + " " + fontNormalClass + " " + quizHeaderTextClass
        questionLeftHeader.textContent = "Listen to the music"
        questionNode.appendChild(questionLeftHeader)
        const questionRightHeader = document.createElement("p")
        questionRightHeader.className = textBlockClass + " " + fontNormalClass + " " + quizHeaderTextClass
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
        audioPlayer.volume = 0.5
        audioBox.appendChild(audioPlayer)
        const audioSource = document.createElement("source")
        audioSource.src = audioDir + audioArr[count-1].audio
        audioPlayer.appendChild(audioSource)
        const imageBox = document.createElement("div")
        imageBox.className = textBlockClass + " quiz-image-box"
        questionNode.appendChild(imageBox)
        const buttonBox = document.createElement("div")
        buttonBox.className = textBlockClass + " quiz-submit-button"
        questionNode.appendChild(buttonBox)
        const submitButton = document.createElement("button")
        submitButton.disabled = true
        submitButton.id = "submitQuizAnswer"
        submitButton.className = buttonClass
        submitButton.textContent = "Submit"

        submitButton.addEventListener("click", submitButtonFunc);

        buttonBox.appendChild(submitButton)

        mainContentNode.innerHTML = ""
        mainContentNode.appendChild(questionNode)

        const backgroundCenter = document.getElementById("backgroundCenter")
        backgroundCenter.className = backgroundClass + "-question"
        const bottomBar = document.getElementById("bottomBar")
        bottomBar.className = bottomBarClass + "-question"

        $('#umaName').select2({
            placeholder: '⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀',
            data: characterNames,
            width: 'max-content',
            dropdownAutoWidth: true
        });

        $('#umaName').on('select2:select', function (e) {
            var name = e.params.data.text
            imageBox.innerHTML = ""
            const img = new Image(256, 256)
            img.src = characterImageDir + getImageByCharacterName(characters, name)
            imageBox.appendChild(img)
            submitButton.disabled = false
        });
    };
    
    startQuizButton.addEventListener("click", startButtonFunc);
});