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
      getImageLightness(Poster,function(brightness){
        console.log(brightness);
      });
      $('body').css("background-image", "url("+Poster+")");
  });
}

function getImageLightness(imageSrc,callback) {
    var img = document.createElement("img");
    img.src = imageSrc;
    img.style.display = "none";
    document.body.appendChild(img);

    var colorSum = 0;

    img.onload = function() {
        // create canvas
        var canvas = document.createElement("canvas");
        canvas.width = this.width;
        canvas.height = this.height;

        var ctx = canvas.getContext("2d");
        ctx.drawImage(this,0,0);

        var imageData = ctx.getImageData(0,0,canvas.width,canvas.height);
        var data = imageData.data;
        var r,g,b,avg;

        for(var x = 0, len = data.length; x < len; x+=4) {
            r = data[x];
            g = data[x+1];
            b = data[x+2];

            avg = Math.floor((r+g+b)/3);
            colorSum += avg;
        }

        var brightness = Math.floor(colorSum / (this.width*this.height));
        callback(brightness);
    }
}
