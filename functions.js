var audioArr = null
fetch("data/json/audio.json")
.then(res => res.json())
.then(data => audioArr = data)

var characters = null
fetch("data/json/characters.json")
.then(res => res.json())
.then(data => characters = data)

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
    console.log("shuffled")
}


const textBlockClass = "text-block"
const fontBigClass = "font-big"
const fontNormalClass = "font-normal"
const quizQuestionNumberClass = "quiz-question-number"
const quizHeaderTextClass = "quiz-header-text"

const audioDir = "data/audio/"
const characterImageDir = "data/images/characters/"
const albumCoverImageDir = "data/images/album_covers/"

document.addEventListener("DOMContentLoaded", (event) => {
    const mainContentNode = document.getElementById("mainContentNode");
    const startQuizButton = document.getElementById("startQuizButton");
    const characterNames = [""].concat(characters.map(a => a.name)).sort()
    shuffleArray(audioArr)
        
    startQuizButton.addEventListener("click", function() {
        const questionNode = document.createElement("div")
        questionNode.className = "quiz-content"
        const questionCounterText = document.createElement("p")
        questionCounterText.className = textBlockClass + " " + fontBigClass + " " + quizQuestionNumberClass
        questionCounterText.textContent = "Question 67/80"
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
        audioBox.appendChild(audioPlayer)
        const audioSource = document.createElement("source");
        audioSource.src = audioDir + audioArr[0].audio
        audioPlayer.appendChild(audioSource)
        const imageBox = document.createElement("div")
        imageBox.className = textBlockClass + " quiz-image-box"
        questionNode.appendChild(imageBox)
        

        mainContentNode.innerHTML = ""
        mainContentNode.appendChild(questionNode)

        $('#umaName').select2({
            placeholder: '⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀',
            data: characterNames,
            width: 'max-content',
            dropdownAutoWidth: true
        });

        $('#umaName').on('select2:select', function (e) {
            var name = e.params.data.text;
            imageBox.innerHTML = ""
            const img = new Image(256, 256);
            img.src = characterImageDir + getImageByCharacterName(characters, name)
            imageBox.appendChild(img)
        });
    });
});