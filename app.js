require('dotenv').config()

const yargs = require('yargs')

const { GEOCODE_API_KEY, DARKSKY_API_KEY } = process.env

const geocodeAddress = require('./geocode/geocode')
const getWeather = require('./weather/weather')

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

geocodeAddress(argv.address).then(location => {
	if (!location) throw new Error()
	return getWeather(location.latitude, location.longitude)
}).then(weatherResults => {
	if (!weatherResults) throw new Error()
	console.log(location.address)
	return console.log(JSON.stringify(weatherResults, undefined, 2))
}).catch(err => console.log(err.message))
