const argv 		= require('yargs'),
			request = require('request'),
			apikeys = require('/home/user/Desktop/apikeys/apikeys')

let geocodeAddress = (address, callback) => {
	let addressEncoded = (encodeURIComponent(address))

	request({
		url: `https://maps.googleapis.com/maps/api/geocode/json?address=${addressEncoded}&key=${apikeys.geocodeApiKey}`,
		json: true
	}, (error, response, body) => {
		if (error) {
			callback('Unable to connect to Google servers.')
		} else if (body.status === 'ZERO_RESULTS') {
			callback('Unable to find that address.')
		} else if (body.status === 'OK') {
			callback(undefined, {
				address: body.results[0].formatted_address,
				latitude: body.results[0].geometry.location.lat,
				longitude: body.results[0].geometry.location.lng
			})
		}
	})
}



module.exports.geocodeAddress = geocodeAddress