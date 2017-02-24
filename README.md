# Avanza Export

A lambda function to export the total own capital from Avanza to Google Spreadsheet. This can be triggered every day and then easily graphed in Google Spreadsheets.

## Usage

* Create a Google Spreadseet with 2 row headers named `date` and `value`
* Create a Google Service User, save the json credentials-file and add it as a collaborator to the sheet
* Create a new Node Lambda function and add the following Environment variables:
  * `SHEET`: The spreadsheet ID
  * `AVANZA_USERNAME`: Username on Avanza
  * `AVANZA_PASSWORD`: Password on Avanza
* Clone this repo, run `npm install`, add the credentials-file as `Creds.json`
* Zip the content and upload to Amazon Lambda
