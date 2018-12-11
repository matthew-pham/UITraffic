# UITraffic 

------------


##  Goal
Help people plan around human dense areas for walking traffic purposes. Predict ahead of time if a location will be populated to help make plans.

## Minimum Viable Product
- Heat map / data points for engineering quad
- Collect and see data in a mobile app
- Website to show aggregated data
- Beta testers / fine tune aggregation

## Final Product
Currently, we have both a mobile app and a webapp. The mobile app will periodically and anonoumosuly send the users data to our data base.  Both the mobile app and web app can then display the data on a heatmap. Both have ways to view specific time ranges.

## Techonologies used
#### Mobile app
- React native was used as the mobile framwork *(version 30)*
- Expo was used to make testing the app easy *(version 31)*
- React native maps was used to render the mobile map *(version 0.22.1)*
- Additional reactnative libraries to construct a better UI

#### Backend
- mySQL was used as the main database
- phpMyAdmin was used to configure and view the database
- Php was used to write REST endpoints for querying and writing data
- Cloud9 was used to host the server

#### Website
- Google maps was used to display a map and a heatmap
- Javascript was used to send get and post requests to the backend and parse the results
- JQuery and AJAX  were used to handle user input through the slider

## Difficulties

- Many different libraries were used for the mobile app, and getting all the different libraries and versions wot work together took a long time
- Javascript is a questionable language
- Testing was inconvenient because in order to see how the website would interact with the database, Matthew had to host the website on a server every single time we wanted to test.


------------

## Group Members
- Kevin Palani
- Matthew Pham
- Jacqueline Chen
- Kshitij Gupta
- Elliot Segal

### Special Thanks To:
- Lam Tran
- Taojun (David) Wang

------------

## Mobile App Installation Instructions

- Download dependencies
	- This project needs expo and nodejs
- Download the source code
- Install libraries by running  `npm install` 
- Start the dev server using `expo start`
- Scan the QR code using expo



