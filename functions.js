function addVariant() {
    let form = document.forms.vars.variantInputs;

    let div = document.createElement("DIV");
    div.classList.add("deletable-text-input");
    
    let input = document.createElement("input");
    input.setAttribute("type", "text");

    let button = document.createElement("button");
    button.setAttribute("onclick", "deleteVariant(this); event.preventDefault();");

    let img = document.createElement("img");
    img.setAttribute("src", "res/crossdark.png");

    button.appendChild(img);
    div.appendChild(input);
    div.appendChild(button);
    form.appendChild(div);
}

function deleteVariant(button) {
    button.parentElement.remove();
}

function choose(form) {
    let loader = document.getElementById("loader");
    loader.classList.remove("loaded");
    document.getElementById("result-block").style.display = "none";
    document.getElementById("typed-text").classList.remove("typing");
    let submit = form.elements[document.forms.vars.elements.length - 1];
    submit.disabled = true;
    let variants = [];
    for (const elem of form.variantInputs.elements) {
        elem.style.borderColor = "lightblue";
        if (elem.value.trim() != '') {
            variants.push(elem.value.trim());
        }
    }
    if (variants.length == 0) {
        for (const elem of form.variantInputs.elements) {
            elem.style.borderColor = "#ff5555";
        }
        submit.disabled = false;
        return;
    }
    loader.style.display = "flex";
    document.getElementById("typed-text").classList.add("typing");
    let result = variants[Math.floor(Math.random() * variants.length)];
    document.getElementById("result").innerHTML = result;
    setTimeout(hide, 4000);
}

function hide() {
    document.getElementById("loader").classList.add("loaded");
    setTimeout(show, 300);
}

function show() {
    document.getElementById("loader").style.display = "none";
    document.getElementById("result-block").style.display = "flex";
    console.log(document.forms.vars.elements[document.forms.vars.elements.length - 1]);
    document.forms.vars.elements[document.forms.vars.elements.length - 1].disabled = false;
}