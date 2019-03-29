const { GEOCODE_API_KEY } = process.env

const rp = require('request-promise-native')

module.exports = async address => {

	try {

		const addressEncoded = (encodeURIComponent(address))

		const options = {
			url: `https://maps.googleapis.com/maps/api/geocode/json?address=${ addressEncoded }&key=${ GEOCODE_API_KEY }`,
			json: true
		}

		const res = await rp(options)

		if (res.status === 'ZERO_RESULTS') throw new Error('Address Not Found')

		return location = {
			address: res.results[0].formatted_address,
			latitude: res.results[0].geometry.location.lat,
			longitude: res.results[0].geometry.location.lng
		}

	} catch (error) {
		console.error(error.message)
	}
}
