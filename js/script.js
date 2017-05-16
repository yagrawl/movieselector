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
        var PosterX = PosterUrl + response.results[random].poster_path;
        var movieid = response.results[random].id.toString();
        document.getElementById("movie").innerHTML = movieName;
        $('#explain').css('visibility', 'hidden')
        $('#poster').css('visibility', 'visible').attr("src", PosterX);
        $('#poster').css('width', '300px');
        getBackground(movieid);
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

  var cast = {
    "async": true,
    "crossDomain": true,
    "url": BaseUrl + id + '/credits' + APIkey,
    "method": "GET",
    "headers": {},
    "data": "{}"
  }

  var details = {
    "async": true,
    "crossDomain": true,
    "url": BaseUrl + id + APIkey,
    "method": "GET",
    "headers": {},
    "data": "{}"
  }

  $.ajax(bg).done(function (response) {
      console.log(response); 
      var Poster = PosterUrl + response.backdrops[0].file_path;
      console.log(Poster);
      $('.wrapper').css("background-image", "url("+Poster+")");
      $('#morebutton').css('visibility', 'visible')
      $('#carr').css('visibility', 'visible')
      $('#bd1').attr("src", PosterUrl + response.backdrops[1].file_path);
      $('#bd2').attr("src", PosterUrl + response.backdrops[2].file_path);
      $('#bd3').attr("src", PosterUrl + response.backdrops[3].file_path);
      $('#bd4').attr("src", PosterUrl + response.backdrops[4].file_path);
      $('#bd5').attr("src", PosterUrl + response.backdrops[5].file_path);
      //$('.wrapper').css("filter", "opacity('80%')");
      //$('.wrapper').css("opacity", "0.4");
  });

  $.ajax(cast).done(function (response) {
      console.log(response); 
      var cast1 = PosterUrl + response.cast[0].profile_path;
      var cast2 = PosterUrl + response.cast[1].profile_path;
      var cast3 = PosterUrl + response.cast[2].profile_path;
      var cast4 = PosterUrl + response.cast[3].profile_path;
      var cast5 = PosterUrl + response.cast[4].profile_path;
      var cast6 = PosterUrl + response.cast[5].profile_path;
      console.log(cast1);
      $('#cast1').css('visibility', 'visible').attr("src", cast1);
      $('#cast1').css('width', '150px');
      document.getElementById("cast1Name").innerHTML = response.cast[0].name;
      $('#cast2').css('visibility', 'visible').attr("src", cast2);
      $('#cast2').css('width', '150px');
      document.getElementById("cast2Name").innerHTML = response.cast[1].name;
      $('#cast3').css('visibility', 'visible').attr("src", cast3);
      $('#cast3').css('width', '150px');
      document.getElementById("cast3Name").innerHTML = response.cast[2].name;
      $('#cast4').css('visibility', 'visible').attr("src", cast4);
      $('#cast4').css('width', '150px');
      document.getElementById("cast4Name").innerHTML = response.cast[3].name;
      $('#cast5').css('visibility', 'visible').attr("src", cast5);
      $('#cast5').css('width', '150px');
      document.getElementById("cast5Name").innerHTML = response.cast[4].name;
      $('#cast6').css('visibility', 'visible').attr("src", cast6);
      $('#cast6').css('width', '150px');
      document.getElementById("cast6Name").innerHTML = response.cast[5].name;
  });

  $.ajax(details).done(function (response) {
      console.log(response); 
      document.getElementById("Overview").innerHTML = response.overview;
      document.getElementById("Genre").innerHTML = 'Genre(s): ' + response.genres[0].name;
      document.getElementById("Release").innerHTML = 'Release Date: ' + response.release_date;
      document.getElementById("Runtime").innerHTML = 'Runtime: ' + response.runtime + ' mins';
      var imdb = document.getElementById('imdb');
      $('#imdb').css('visibility', 'visible')
      imdb.setAttribute('href', 'https://www.imdb.com/title/' + response.imdb_id);


  });
}

