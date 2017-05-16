var APIkey = '?api_key=577e44ee9c54fb29e6c0e28882fc5f53';
var BaseUrl = 'https://api.themoviedb.org/3/movie/';
var settings = {
  "async": true,
  "crossDomain": true,
  "url": BaseUrl + 'popular'  + APIkey  + '&page='+'1',
  "method": "GET",
  "headers": {},
  "data": "{}"
}

function randomMovies(){
    $.ajax(settings).done(function (response) {
        var movieName = response.results[Math.floor((Math.random() * 10) + 1)].title;
        document.getElementById("movie").innerHTML = movieName;
    });
}
