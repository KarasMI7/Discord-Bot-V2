const config = require("../data/giphy.json");
const request = require("jsonrequest");

exports.run = (client, message, args) => {

		var url = createURL(args);
  		//////////////////////////////////////////
  		try{
  			request(url, function(err, data){
  				let gif_url = data["data"]["image_original_url"];
  				message.channel.send(embedPicture(gif_url));
  			});
  		} catch (error){
  			console.error(error);
  		}

}


var embedPicture = function(gif_url){
	return {
		"embed":{
			"image":{
				"url": gif_url
			}
		}
	};
};

var createURL = function(args){
	let urlString = config.giphy_link + "&tag=";

		if(args != undefined){
			for(arg in args){
				urlString += args[arg];
				if(arg < args.length - 1){
                    urlString += "+";
                }
			}
		}

		return urlString;
}