let searchBarValue;
let filmList;

function searchFilms() {
    searchBarValue = document.getElementById("searchBar").value;
    let request = new XMLHttpRequest();
    let url = "http://www.omdbapi.com/?apikey=4d5b0373&s=" + searchBarValue.replaceAll(' ', '+');
    request.open("GET", url);
    request.send();
    request.onreadystatechange = () => {
        if (request.readyState === 4 && request.status === 200) {
            let filmsRequest = request.response;
            const data = JSON.parse(filmsRequest);
            getFilmDetails(data);
        }
    }
}

function getFilmDetails(films) {
    filmList = document.getElementById("filmList");
    filmList.innerHTML = "";
    for (let i = 0; i < films.Search.length; i++) {
        let request = new XMLHttpRequest();
        let filmDetails;
        let url = "http://www.omdbapi.com/?apikey=4d5b0373&i=" + films.Search[i].imdbID;
        request.open("GET", url);
        request.send();
        request.onreadystatechange = () => {
            if (request.readyState === 4 && request.status === 200) {
                let filmDetailsRequest = request.response;
                filmDetails = JSON.parse(filmDetailsRequest);
                displayFilms(filmDetails)
            }
        }
    }
}

function displayFilms(filmDetails) {
    filmList.innerHTML +=
        `
        <li>
            <p class="titleContainer">${filmDetails.Title} (${filmDetails.Year})</p>                
            <div class="tables">
                <div class="tableDiv detailsTable">
                    <table>
                        <tr>
                            <td rowspan="4" class="imageContainer">
                                <img src=${filmDetails.Poster}>
                                <!--<img src="https://www.sinrumbofijo.com/wp-content/uploads/2016/05/default-placeholder.png">-->
                            </td>
                            <td class="inTableTitle">
                                Director
                            </td>
                            <td class="inTableTitle">
                                Actors
                            </td>
                        </tr>
                        <tr>
                            <td class="directorContainer">
                                ${filmDetails.Director}
                            </td>
                            <td class="actoresContainer">
                                ${filmDetails.Actors}
                            </td>
                        </tr>
                        <tr>
                            <td class="inTableTitle">
                                Awards
                            </td>
                            <td class="inTableTitle">
                                Plot
                            </td>
                        </tr>
                        <tr>
                            <td rowspan="2" class="awardsContainer">
                                ${filmDetails.Awards}
                            </td>
                            <td rowspan="2" class="plotContainer">
                                ${filmDetails.Plot}
                            </td>
                        </tr>
                    </table>
                </div>
                <div class="tableDiv ratingsTable">
                    <table>
                        <tr>
                            <td class="inTableTitle">
                                Ratings
                            </td>            
                        </tr>
                        <tr>
                            <td class="firstRatingContainer rating">
                                <p>${filmDetails.Ratings[0].Source}</p>                               
                                <p class="scoreValue">${filmDetails.Ratings[0].Value}</p>
                            </td>            
                        </tr>
                        <tr>
                            <td class="secondRatingContainer rating">
                                <p>${filmDetails.Ratings[1].Source}</p>
                                <p class="scoreValue">${filmDetails.Ratings[1].Value}</p>
                            </td>            
                        </tr>
                        <tr>
                            <td class="thirdRatingContainer rating">
                                <p>${filmDetails.Ratings[2].Source}</p>
                                <p class="scoreValue">${filmDetails.Ratings[2].Value}</p>
                            </td>            
                        </tr>
                    </table>
                </div>
            </div>
        </li>`;
}