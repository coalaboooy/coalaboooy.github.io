document.addEventListener("DOMContentLoaded", (event) => {
    alert("Content loaded!")
    const startQuizButton = document.getElementById("startQuizButton");
    startQuizButton.addEventListener("click", function() {
        alert("Button clicked!");
    });
});