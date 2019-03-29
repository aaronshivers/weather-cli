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

const runApplication = async address => {

	try {

		// get location from provided address
		const location = await geocodeAddress(address)

		// throw error if address is not found
		if (!location) throw Error()

		// get weather for the location
		const weather = await getWeather(location.latitude, location.longitude)

		// log address and weather
		console.log(location.address)
		console.log(JSON.stringify(weather, undefined, 2))

	} catch (error) {

		console.log(error.message)
	}
}

runApplication(argv.address)
