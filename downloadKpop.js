var casper = require('casper').create({
    clientScripts: ["/opt/vagrant/embedded/lib/ruby/2.2.0/rdoc/generator/template/darkfish/js/jquery.js"]
});

var x = require('casper').selectXPath;
var fs = require('fs');
var arr = [];
var arr2 = [ ];
var finalUrl = "";
var url;
var elements;

casper.userAgent("Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/28.0.1500.72 Safari/537.36");

casper.start('https://www.youtube.com/');

casper.then(function () {

	var stream = fs.open('music.txt', 'r');
	while(!stream.atEnd()) {
	    var line = stream.readLine();
	    arr.push(line);
	}
	stream.close();

	for(var i = 0; i<2; i++)
	{
		
		casper.sendKeys("#masthead-search-term", arr[i], { reset: true});
		casper.click(x('//*[@id="search-btn"]'));
		//casper.capture("image" + i + ".png");

		casper.waitForSelector('.yt-uix-tile-link', function() {
			//casper.capture("image" + i + ".png");

			elements = casper.getElementsInfo(".yt-uix-tile-link");
			elements.forEach(function(element){
				//console.log(element.attributes["title"]);
			    if (element.attributes["title"].indexOf("M/V") != -1 || element.attributes["title"].indexOf("Audio") != -1) 
			    {
			        url = element.attributes['href'];
			        arr2.push(url);
			    }
			});
		});
	}
});

casper.then(function() {
	for(var i =0; i<arr2.length;i++)
	{
		console.log(arr2[i]);
	}
});



casper.then(function () {
	for(var i = 0; i <arr2.length; i++)
	{
		finalUrl += "https://www.youtube.com/" + arr2[i] + '\n';
	}
	fs.write("url.txt", finalUrl);
});

casper.then(function () {
	casper.exit();
});

casper.run();