const yargs 	= require('yargs'),
			axios		= require('axios')

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

const addressEncoded = (encodeURIComponent(argv.address))
const	geocodeUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${addressEncoded}&key=AIzaSyC9cyoMQEZeXaC7XSzPGpCm5JgR_qkMHEA`

axios.get(geocodeUrl).then((response) => {
	if (response.data.status === 'ZERO_RESULTS') {
		throw new Error('Unable to find that address.')
	}

	const latitude = response.data.results[0].geometry.location.lat
	const longitude = response.data.results[0].geometry.location.lng
	const weatherUrl = `https://api.darksky.net/forecast/33609c87a4519df4bb1de0f046b31a2b/${latitude},${longitude}`
	console.log('--')
	console.log('Address:')
	console.log(response.data.results[0].formatted_address)
	return axios.get(weatherUrl)
}).then((response) => {
	const temperatureHigh = response.data.daily.data[0].temperatureHigh
	const temperatureLow = response.data.daily.data[0].temperatureLow
	const temperature = response.data.currently.temperature
	const apparentTemperature = response.data.currently.apparentTemperature
	const currentSummary = response.data.currently.summary
	const dailySummary = response.data.daily.summary
	console.log('--')
	console.log('Weather:')
	console.log('--')
	console.log(`Today's High: ${temperatureHigh}`)
	console.log(`Today's Low: ${temperatureLow}`)
	console.log('--')
	console.log(`It's currently ${temperature} degrees, it feels like it's ${apparentTemperature} degrees, and the current condition is ${currentSummary}. You can expect ${dailySummary}`)
}).catch((error) => {
	if (error.code === 'ENOTFOUND') {
		console.log('Unable to connect to API servers')
	} else {
		console.log(error.message)
	}
})