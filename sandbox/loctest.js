/*functions will work together to get weather info for current
location and populate a web pg with data*/

'use strict';
// Call the function to get our location
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



      //http://dataservice.accuweather.com/currentconditions/v1/332634?apikey=2gUfqbpCyXDXEIku467zvS4vMg0HHxeb&details=true"
      // Get Current Weather data from API
function getWeather(locData) {
    const API_KEY = '2gUfqbpCyXDXEIku467zvS4vMg0HHxeb';
    const CITY_CODE = locData['key']; // We're getting data out of the object
    const URL = "http://dataservice.accuweather.com/currentconditions/v1/="+CITY_CODE+"?apikey="+API_KEY+"&details=true";
    const TEMP = data[0].Temperature.Imperial.Value;
    // const TEMP = data[0]['Temperature']['Imperial']['Value'];
    fetch(URL)
     .then(response => response.json())
     .then(function (data) {
      console.log('Json object from getWeather function:');
      console.log(data); // Let's see what we got back
      // Start collecting data and storing it
      locData['currentTemp'] = data[0].Temperature.Imperial.Value;
      locData['summary'] = data[0].WeatherText;
      locData['windSpeed'] = data[0].Wind.Speed.Imperial.Value;
      locData['windUnit'] = data[0].Wind.Speed.Imperial.Unit;
      locData['windDirection'] = data[0].Wind.Direction.Localized;
      locData['windGust'] = data[0].WindGust.Speed.Imperial.Value;
      locData['pastLow'] = data[0].TemperatureSummary.Past12HourRange.Minimum.Imperial.Value;
      locData['pastHigh'] = data[0].TemperatureSummary.Past12HourRange.Maximum.Imperial.Value;
      getHourly(locData); // Send data to getHourly function
      })
     .catch(error => console.log('There was an error: ', error))
  } // end getWeather function