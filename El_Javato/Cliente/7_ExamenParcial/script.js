let searchBarValue;
let menuValue;
let searchBlank;
let dataData;

function search() {
    searchBarValue = document.getElementById("searchBar").value;
    menuValue = document.getElementById("selectMenu").value;
    if (menuValue === "Artista")
        menuValue = "artist";
    else if (menuValue === "Lanzamiento")
        menuValue = "release-group";
    searchBlank = document.getElementById("searchBlank");
    searchBlank.innerHTML = "";

    let request = new XMLHttpRequest();
    let url = "https://musicbrainz.org/ws/2/" + menuValue + "?query=" + searchBarValue.replaceAll(' ', '+') + "&offset=1&fmt=json";
    console.log(url);
    request.open("GET", url);
    request.send();
    request.onreadystatechange = () => {
        if (request.readyState === 4 && request.status === 200) {
            let musicRequest = request.response;
            const data = JSON.parse(musicRequest);
            dataData = data;
            showData(data);
        }
    }
}

function showData(data) {
    searchBlank = document.getElementById("searchBlank");
    switch (menuValue) {
        case 'artist':
            for (let i = 0; i < 10; i++) {
                searchBlank.innerHTML += `<tr id="artist${i}" class="elemento" onclick="artistDetailView(${i})"><td>Name: ${data.artists[i].name}</td></tr>`;
                let currentRow = document.getElementById(`artist${i}`);
                if (data.artists[i].disambiguation !== undefined)
                    currentRow.innerHTML += `<td>Disambiguation: ${data.artists[i].disambiguation}</td>`;
            }
            break;
        case 'release-group':
            for (let i = 0; i < 10; i++) {
                searchBlank.innerHTML += `<tr id="group${i}" class="elemento" onclick="groupDetailView(${i})"><td>Name: ${data["release-groups"][i].title}</td><td>Type: ${data["release-groups"][i]["primary-type"]}</td></tr>`;
                let currentRow = document.getElementById(`group${i}`);
                if (data["release-groups"][i]["artist-credit"][0].name !== undefined) {
                    currentRow.innerHTML += `<td id="groupArtist${i}">Artists: </td>`;
                    let currentRowIn = document.getElementById(`groupArtist${i}`);
                    for (let j = 0; j < data["release-groups"][i]["artist-credit"].length; j++) {
                        currentRowIn.innerHTML += `${data["release-groups"][i]["artist-credit"][j].name}`;
                    }
                }
            }
            break;
    }
}

function artistDetailView(i) {
    let body = document.body;
    body.innerHTML = "";
    body.innerHTML += `
    <table>
        <th>
            ${dataData.artists[i].name} (${dataData.artists[i].country})
        </th>
        <tr>
            <td><img src="https://www.kenyons.com/wp-content/uploads/2017/04/default-image-620x600.jpg"></td>
            <td></td>
        </tr>
    </table>`;
}

function groupDetailView(i) {
    let body = document.body;
    body.innerHTML = "";
    body.innerHTML += `
    <table>
        <th>
            ${dataData["release-groups"][i].title} (${dataData["release-groups"][i].country})
        </th>
        <tr>
            <td><img src="https://www.kenyons.com/wp-content/uploads/2017/04/default-image-620x600.jpg"></td>
            <td id="group${i}Releases"></td>
        </tr>
    </table>`;
    let releases = document.getElementById(`group${i}Releases`);
    for (let j = 0; j < dataData["release-groups"][i].length; j++) {
        releases.innerHTML += `${dataData["release-groups"][i].releases[j].title}`;
        console.log(dataData["release-groups"][i].releases[j].title);
    }
}


/*
El la vista de detalle de un artista, mostrará el nombre del artista, país de
procedencia y una tabla con los elementos del tipo “Album” que aparezcan entre los
25 release-groups del artista que nos proporciona la API, mostrando de cada uno su
título, fecha de lanzamiento y el thumbnail de la carátula

 En la vista de detalle de un release-group:
• Mostraremos el título del release-group, su carátula, fecha de lanzamiento y
una tabla que muestre la lista de canciones de su primer release
*/