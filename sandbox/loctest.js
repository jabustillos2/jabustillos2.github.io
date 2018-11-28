/*functions will work together to get weather info for current
location and populate a web pg with data*/

'use strict';
// Call the function to get our location
getGeoLocation();




// Gets longitude and latitude of current location
function getGeoLocation(){
    const STATUS = document.getElementById('status');
    STATUS.innerHTML = 'Getting Location...';
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function (position) {
         const LAT = position.coords.latitude;
         const LONG = position.coords.longitude;
      
         // Combine the values
         const LOCALE = LAT + "," + LONG;
         console.log(`Lat and Long are: ${LOCALE}.`);
         // Call getCode function, send locale
         getCode(LOCALE);
      
        })
       } else {
        STATUS.innerHTML = "Your browser doesn't support Geolocation or it is not enabled!";
       } // end else
      } //end getGeoLocation

// Get location code from API
function getCode(LOCALE) {
    const API_KEY = '2gUfqbpCyXDXEIku467zvS4vMg0HHxeb';
    const URL = 'http:dataservice.accuweather.com/locations/v1/cities/geoposition/search?apikey='+API_KEY+'&q='+LOCALE;
    fetch(URL)
     .then(response => response.json())
     .then(function (data) {
      console.log('Json object from getCode function:');
      console.log(data);
      const locData = {}; // Create an empty object
      locData['key'] = data.Key; // Add the value to the object
      locData['name'] = data.LocalizedName;
      locData['postal'] = data.PrimaryPostalCode;
      locData['state'] = data.AdministrativeArea.LocalizedName;
      locData['stateAbbr'] = data.AdministrativeArea.ID;
      locData['geoposition'] = LOCALE;
      locData['elevation'] = data.GeoPosition.Elevation.Imperial.Value;
      getWeather(locData);
      })
     .catch(error => console.log('There was a getCode error: ', error))
  } // end getCode function
      // URL to request city data using latitude and longitude
      // http://dataservice.accuweather.com/locations/v1/cities/geoposition/search?apikey=2gUfqbpCyXDXEIku467zvS4vMg0HHxeb&q=43.816667%2C-111.783333&details=false&toplevel=false"