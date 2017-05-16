var APIkey = '?api_key=577e44ee9c54fb29e6c0e28882fc5f53';
var BaseUrl = 'https://api.themoviedb.org/3/movie/';
var PosterUrl = 'http://image.tmdb.org/t/p/original';

function randomMovies(){
    var randompage = Math.floor((Math.random() * 30) + 1).toString();
    var settings = {
      "async": true,
      "crossDomain": true,
      "url": BaseUrl + 'popular'  + APIkey  + '&page='+ randompage,
      "method": "GET",
      "headers": {},
      "data": "{}"
    }
    $.ajax(settings).done(function (response) {
        random = Math.floor((Math.random() * 19) + 1);
        console.log(response);
        var movieName = response.results[random].title;
        // var Poster = PosterUrl + response.results[random].poster_path;
        var movieid = response.results[random].id.toString();
        document.getElementById("movie").innerHTML = movieName;
        getBackground(movieid);
        // $('body').css("background-image", "url("+Poster+")");
        // $('#poster').css('visibility', 'visible').attr("src", Poster);
    });
}

function getBackground(id){
  var bg = {
    "async": true,
    "crossDomain": true,
    "url": BaseUrl + id + '/images' + APIkey,
    "method": "GET",
    "headers": {},
    "data": "{}"
  }
  $.ajax(bg).done(function (response) {
      console.log(response); 
      var Poster = PosterUrl + response.backdrops[0].file_path;
      console.log(Poster);
      $('.background').css("background-image", "url("+Poster+")");
      $('.background').css("opacity", "0.4");
  });
}


