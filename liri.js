// Grab the axios package...
var axios = require("axios");


require("dotenv").config();

var keys = require("./keys.js");

// var spotify = new Spotify(keys.spotify);


var command = process.argv[2];
var name = process.argv[3];


//------------------------------------------------------------------------------
// BANDS IN TOWN PORTION
//------------------------------------------------------------------------------
if (command === `concert-this`) {
   //...
}
//------------------------------------------------------------------------------
// SPOTIFY PORTION
//------------------------------------------------------------------------------
else if (command === `spotify-this-song`) {
   //...
}
//------------------------------------------------------------------------------
// IMDB PORTION
//------------------------------------------------------------------------------
else if (command === `movie-this`) {
   axios.get("http://www.omdbapi.com/?t=" + name + "&y=&plot=short&apikey=trilogy")
      .then(function (response) {
         console.log(`
         Title: ${response.data.Title}
         Year: ${response.data.Year}
         IMDB Rating: ${response.data.Ratings[0].Value}
         Rotten Tomatoes Rating: ${response.data.Ratings[1].Value}
         Country: ${response.data.Country}
         Language: ${response.data.Language}
         Plot: ${response.data.Plot}
         Actors: ${response.data.Actors}`);
         
      }
      );
}
//------------------------------------------------------------------------------
// READ FILE PORTION
//------------------------------------------------------------------------------
else if (command === `do-what-it-says`) {
   //...
} else {
   console.log(`Please make sure the liri command is one of the following:
   concert-this
   spotify-this-song
   movie-this
   do-what-it-says`);

}

