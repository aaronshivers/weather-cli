const request = require('request'),
			argv		= require('yargs'),
			apikeys = require('/home/user/Desktop/apikeys/apikeys')

var getWeather = (latitude, longitude, callback) => {

	request({
		url: `https://api.darksky.net/forecast/${apikeys.darkSkyApiKey}/${latitude},${longitude}`,
		json: true
	}, (error, response, body) => {
		if (!error && response.statusCode === 200) {
			callback(undefined, {
				temperature: `It is currently ${body.currently.temperature} degrees.`,
				feelsLike: `It feels like it's ${body.currently.apparentTemperature} degrees.`,
				currently: `It's currently ${body.currently.summary}.`,
				forecast: `Expect ${body.daily.summary}`
			})
		} else {
			callback('Unable to fetch weather.')
		}
	})
}

module.exports.getWeather = getWeather
