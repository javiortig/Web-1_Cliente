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
                <div class="container">
                    <div class="row">
                        <div class="col-lg-1 imageContainer">
                            <img src=${filmDetails.Poster}>
                            <!--<img src="https://www.sinrumbofijo.com/wp-content/uploads/2016/05/default-placeholder.png">-->
                        </div>
                        <div class="col-lg-1 inTableTitle">
                            Director
                        </div>
                        <div class="col-lg-2 inTableTitle">
                            Actors
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-lg-1 directorContainer">
                            ${filmDetails.Director}
                        </div>
                        <div class="col-lg-1 actoresContainer">
                            ${filmDetails.Actors}
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-lg-1 inTableTitle">
                            Awards
                        </div>
                        <div class="col-lg-1 inTableTitle">
                            Plot
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-lg-1 awardsContainer">
                            ${filmDetails.Awards}
                        </div>
                        <div class="col-lg-2 plotContainer">
                            ${filmDetails.Plot}
                        </div>
                    </div>   
                    <div class="row inTableTitle">
                        <div class="col-lg-1">Ratings</div>                             
                    </div>
                    <div class="row">
                        <div class="col-lg-1 firstRatingContainer rating">
                            <p>${filmDetails.Ratings[0].Source}</p>                               
                            <p class="scoreValue">${filmDetails.Ratings[0].Value}</p>
                        </div>
                        <div class="col-lg-1 secondRatingContainer rating">
                            <p>${filmDetails.Ratings[1].Source}</p>
                            <p class="scoreValue">${filmDetails.Ratings[1].Value}</p>
                        </div>
                        <div class="col-lg-1 thirdRatingContainer rating">
                            <p>${filmDetails.Ratings[2].Source}</p>
                            <p class="scoreValue">${filmDetails.Ratings[2].Value}</p>
                        </div>            
                    </div>
                </div>
            </div>
        </li>`;
}