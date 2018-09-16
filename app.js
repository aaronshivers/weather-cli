const yargs 	= require('yargs')

const geocode = require('./geocode/geocode')
const weather = require('./weather/weather')

const argv = yargs
	.options({
		a: {
			demand: true,
			alias: 'address',
			describe: 'Address for which to fetch weather',
			string: true
		}
	})
	.help()
	.alias('help', 'h')
	.argv

geocode.geocodeAddress(argv.address, (error, results) => {
	if (error) {
		console.log(error)
	} else {
		console.log(results.address)
		weather.getWeather(results.latitude, results.longitude, (error, weatherResults) => {
			if (error) {
				console.log(error)
			} else {
				console.log(JSON.stringify(weatherResults, undefined, 2))
			}
		})		
	}
})

// lat, lng, callback
