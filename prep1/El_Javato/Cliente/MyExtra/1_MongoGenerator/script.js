function getNames() {
    let body = document.body;
    body.innerHTML += `db.cliente.insertMany([ `;
    const xhr = new XMLHttpRequest();
    xhr.responseType = 'json';
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            body.innerHTML = '';
            let userJson = xhr.response;
            insertToMain(userJson);
        }
    };
    xhr.open("GET", "https://randomuser.me/api/?results=15");
    xhr.send();
    body.innerHTML += ` ])`;
}

function insertToMain(randomPerson) {
    let content = document.body;
    for (let i = 0; i < 15; i++) {
        content.innerHTML += `
        {
           Nombre: "${capitalizeFirstLetter(randomPerson.results[i].name.first) + " " + capitalizeFirstLetter(randomPerson.results[i].name.last)}",
           direccionesDeFacturacion: "${randomPerson.results[i].location.street.name}, ${randomPerson.results[i].location.street.number}",
           direccionesDeEnvio: "${randomPerson.results[i].location.street.name}, ${randomPerson.results[i].location.street.number}",
           tarjetasDePago: "${randomPerson.results[i].login.md5}",
           fechaDeAlta: "${randomPerson.results[i].dob.date}",
           fechaUltimoAcceso: "${randomPerson.results[i].registered.date}"
        },
        `;
    }
}

function readTextFile(file, callback) {
    let rawFile = new XMLHttpRequest();
    rawFile.overrideMimeType("application/json");
    rawFile.open("GET", file, true);
    rawFile.onreadystatechange = function () {
        if (rawFile.readyState === 4 && rawFile.status == "200") {
            callback(rawFile.responseText);
        }
    }
    rawFile.send(null);
}

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}