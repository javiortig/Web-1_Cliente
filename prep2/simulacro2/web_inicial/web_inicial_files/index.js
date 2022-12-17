function scrollElement(element) {
    var el = document.getElementById(element);
    var contenido = document.getElementById("contenido-scrollable");
    contenido.scroll({
        behavior: 'smooth',
        left: 0,
        top: el.offsetTop
    });
}

function toggleCodigo(element) {
    var bloquePre = document.getElementsByClassName("codeblock")[0];
    var bloqueCode = document.getElementsByTagName("code")[0];

    if (bloquePre.style.display == '' || bloquePre.style.display == "none") {
        bloquePre.style.display = "inline-block";
        bloqueCode.style.display = "block";
        element.innerHTML = "Ocultar codigo de ejemplo";
    } else {
        bloquePre.style.display = "none";
        bloqueCode.style.display = "none";
        element.innerHTML = "Mostrar codigo de ejemplo";
    }
}