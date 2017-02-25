var request = require('request');
var cheerio = require('cheerio');
var songName = [];
var authors = [];
var total = [];
var fs = require('fs');

request("http://music.naver.com/listen/top100.nhn?domain=TOTAL", function(error, response, body) {
  if(error) {
    console.log("Error: " + error);
  }
  console.log("Status code: " + response.statusCode);

  var $ = cheerio.load(body);

  $('a._title.title').each(function( index ) {
    var title = $(this).attr("title");
    songName.push(title);
    console.log("Title: " + title);
  });


console.log("@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@");
  // $('a._artist').each(function( index ) {
  // 	var author = $(this).attr("title");
  // 	authors.push(author);
  // 	console.log("Author: " + author);
  // });

  $('._artist').each(function( index ) {
    var author = $(this).attr("title");

    $("a[href*='#']")
    {
      if($(this).text() != null)
      {
        var str = $(this).text();
        str=str.replace(/^\s+|\s+$/g,'');
        if(str.indexOf("..") != -1)
        {
          if(str.indexOf("("))
          {
            var index = str.indexOf("(");
            str = str.substring(0, index);
          }
        }
        authors.push(str);
        //console.log("Author: " + str);
      }
    }

    // if(author != null)
    // {
    //   authors.push(author);
    //   console.log("Author: " + author);
    // }
  });

for (var i = 0; i< authors.length; i++) {
      if(authors[i] == "{ARTIST}")
        authors.splice(i,1);

      if(i!=authors.length)
      {
        if(authors[i] == authors[i+1])
        {
          if(authors[i+1] == authors[i+2])
          {
            if(authors[i+2] == authors[i+3])
            {
              authors.splice(i,2);
            }
          }
          else
            authors.splice(i, 1);
        }
      }
    }

for (var i = 0; i< authors.length; i++) {
  console.log(authors[i]);
}

console.log("songName.length = " + songName.length);
console.log("authors.length = " + authors.length);

for (var i = 0; i < authors.length; i++) {
	total.push(authors[i] + " - " + songName[i]);
}

var file = fs.createWriteStream('music.txt');
file.on('error', function(err) { /* error handling */ });
total.forEach(function(v) { file.write(v + '\n'); });
file.end();
});