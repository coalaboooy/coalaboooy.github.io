document.addEventListener("DOMContentLoaded", (event) => {
    const mainContentNode = document.getElementById("mainContentNode");
    const startQuizButton = document.getElementById("startQuizButton");
    startQuizButton.addEventListener("click", function() {
        mainContentNode.textContent = ""
    });
});