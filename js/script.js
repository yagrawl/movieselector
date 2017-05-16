var APIkey = '?api_key=577e44ee9c54fb29e6c0e28882fc5f53';
var BaseUrl = 'https://api.themoviedb.org/3/movie/';
var PosterUrl = 'http://image.tmdb.org/t/p/original';
var randompage = Math.floor((Math.random() * 30) + 1).toString();
var settings = {
  "async": true,
  "crossDomain": true,
  "url": BaseUrl + 'popular'  + APIkey  + '&page='+ randompage,
  "method": "GET",
  "headers": {},
  "data": "{}"
}

function randomMovies(){
    $.ajax(settings).done(function (response) {
        random = Math.floor((Math.random() * 19) + 1);
        console.log(response);
        var movieName = response.results[random].title;
        var Poster = PosterUrl + response.results[random].poster_path;
        console.log(Poster);
        document.getElementById("movie").innerHTML = movieName;
        $('#poster').css('visibility', 'visible').attr("src", Poster);
    });
}
