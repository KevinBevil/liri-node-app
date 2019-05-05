// Grab the axios package...
var axios = require("axios");

var moment = require('moment');

var Spotify = require('node-spotify-api');

require("dotenv").config();

var keys = require("./keys.js");

var spotify = new Spotify(keys.spotify);

var fs = require("fs");

var command = process.argv[2];
var name = process.argv[3];

/*------------------------------------------------------------------------------
*********************      FUNCTIONS     ***************************************
------------------------------------------------------------------------------*/

//Function to be executed upon 'concert-this' user command
var concertThis = function () {
   axios.get("https://rest.bandsintown.com/artists/" + name + "/events?app_id=codingbootcamp")
      .then(function (response) {
         debugger;
         //          if (response.status == 404) {
         //             console.log(`
         // Artist data not found.
         // Please try a different artist.`);
         //             return;
         //          }
         // console.log(JSON.stringify(response.data, null, 2));

         for (i = 0; i < response.data.length; i++) {
            console.log(`
         Location: ${response.data[i].venue.city}
         Venue: ${response.data[i].venue.name}
         Date: ${moment(response.data[i].datetime).format("MM/DD/YYYY")}`);
         }
      }).catch(function (error) {
         if (error) {
            console.log(error);
         }
      })
}
//Function to be executed upon 'spotify-this-song' user command
var spotifyThisSong = function () {
   if (!name) {
      console.log(`
         Artist(s): Ace of Base
         Name: The Sign
         Preview Link: https://p.scdn.co/mp3-preview/4c463359f67dd3546db7294d236dd0ae991882ff?cid=dc9d465a8bb541fb96ea39bfb737bde7
         Album: The Sign`);
      return
   }
   spotify
      .search({ type: "track", query: name, limit: 15 }, function (error, data) {
         if (error) {
            return console.log('Error occurred: ' + error);
         }
         // console.log(JSON.stringify(data.tracks.items[0].album.artists[0].name, null, 2));
         debugger;
         console.log(`
         Artist(s): ${data.tracks.items[0].album.artists[0].name}
         Name: ${data.tracks.items[0].name}
         Preview Link: ${data.tracks.items[0].preview_url}
         Album: ${data.tracks.items[0].album.name}`);
      })
}
//Function to be executed upon 'movie-this' user command
var movieThis = function () {
   if (!name) {
      console.log(`
      Title: Mr. Nobody
      Year: 2009
      IMDB Rating: 7.8/10
      Rotten Tomatoes Rating: 67%
      Country: Belgium, Germany, Canada, France, USA, UK
      Language: English, Mohawk
      Plot: A boy stands on a station platform as a train is about to leave. Should he go with his mother or stay with his father? Infinite possibilities arise from this decision. As long as he doesn't choose, anything is possible.
      Actors: Jared Leto, Sarah Polley, Diane Kruger, Linh Dan Pham`);
      return
   }
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
      ).catch(function (error) {
         if (error) {
            console.log(error);
         }
      });
}
var doWhatItSays = function () {
   fs.readFile("./random.txt", "utf8", function (error, data) {
      if (error) {
         return console.log(err);
      }
      var output = data.split(",");
      command = output[0];
      name = output[1];

      if (command === `concert-this`) {
         debugger;
         concertThis();
      }
      else if (command === `spotify-this-song`) {
         spotifyThisSong();
      }
      else if (command === `movie-this`) {
         movieThis();
      } else {
         console.log(`Please make sure the liri command is one of the following:
         concert-this
         spotify-this-song
         movie-this
         do-what-it-says`);

      }
   });
}


//------------------------------------------------------------------------------
// BANDS IN TOWN PORTION
//------------------------------------------------------------------------------
if (command === `concert-this`) {
   concertThis();
}
//------------------------------------------------------------------------------
// SPOTIFY PORTION
//------------------------------------------------------------------------------
else if (command === `spotify-this-song`) {
   spotifyThisSong();
}
//------------------------------------------------------------------------------
// IMDB PORTION
//------------------------------------------------------------------------------
else if (command === `movie-this`) {
   movieThis();
}
//------------------------------------------------------------------------------
// READ FILE PORTION
//------------------------------------------------------------------------------
else if (command === `do-what-it-says`) {
   doWhatItSays();
} else {
   console.log(`Please make sure the liri command is one of the following:
   concert-this
   spotify-this-song
   movie-this
   do-what-it-says`);

}

