let body = document.body;

function requestPhotos(){
    console.log("Hola?");
    body.innerHTML="bruh";
    let request = new XMLHttpRequest();
    let url =  "https://jsonplaceholder.typicode.com/photos";
    request.open("GET", url);
    request.send();

    request.onreadystatechange = () => {
        if (request.readyState === 4 && request.status === 200) {
        let photosJson = request.response;
        const data = JSON.parse(photosJson);
        loadPhotos(data);
    }}
}

function loadPhotos(photosJson){
    body.innerHTML=`<table id="photoTable"></table>`
    let tabla = document.getElementById("photoTable");
    for(let i=0; i<20; i++){
        console.log(photosJson[i].id);
        tabla.innerHTML+=
            `<tr>
                <td>${photosJson[i].title}</td>
                <td><img src="${photosJson[i].url}"></td>
            </tr>`
    }
}