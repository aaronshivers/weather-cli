require('dotenv').config()

const rp = require('request-promise-native')

const { DARKSKY_API_KEY } = process.env

module.exports = async (latitude, longitude) => {

	try {

		const options = {
			url: `https://api.darksky.net/forecast/${ DARKSKY_API_KEY }/${ latitude },${ longitude }`,
			json: true
		}

		const res = await rp(options)

    return weather = {
      temperature:         Math.round(res.currently.temperature),
      feelsLike:           Math.round(res.currently.apparentTemperature),
      temperatureHigh:     Math.round(res.daily.data[0].temperatureHigh),
      temperatureLow:      Math.round(res.daily.data[0].temperatureLow),
      temperatureHighTime: res.daily.data[0].temperatureHighTime,
      currently:           res.currently.summary,
      today:               res.daily.data[0].summary,
      tomorrow:            res.daily.data[1].summary,
      forecast:            res.daily.summary
		}

	} catch (err) {
		console.error('Unable to fetch weather.')
	}
}
