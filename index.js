var Avanza = require('avanza')
var GoogleSpreadsheet = require('google-spreadsheet')

const avanza = new Avanza.default()
const doc = new GoogleSpreadsheet(process.env.SHEET)

var creds = require('./Creds.json')

function filterAccounts(val) {
	return true
//	return val.name == 'ISK'
}

function reduceOwnCapital(acc, val) {
	return acc + val.ownCapital
}

exports.handler = function(event, context, callback) {
	doc.useServiceAccountAuth(creds, function() {
		doc.getInfo(function(err, info) {
			console.log('Loaded doc: '+info.title+' by '+info.author.email)
      sheet = info.worksheets[0]

			avanza.authenticate({
		    username: process.env.AVANZA_USERNAME,
				password: process.env.AVANZA_PASSWORD
			}).then(() => {
				avanza.getOverview().then(positions => {
					var positions = positions.accounts.filter(filterAccounts)
					var total = positions.reduce(reduceOwnCapital, 0)
		 
					console.log(positions)
					console.log(total)

		 			var date = new Date()
					var dateString = date.toString()

					sheet.addRow({'date': dateString, 'value':total}, function(error) {
						context.done(null)
					})
				})
			})
		})	
	})
}

