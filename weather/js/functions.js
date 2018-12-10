/* *************************************
 *  Weather Site JavaScript Functions
 ************************************* */



// Variables for Function Use
// const temp = 31;
// const speed = 5;
// buildWC(speed, temp);

// const direction = "N"; //Set your own value
// windDial(direction);

// const condition = "Sunny";
// let currentCondition = getCondition(condition);

// changeSummaryImage(currentCondition);

// changeBackgroundImage(currentCondition);


//Calculate wind chill temperature
function buildWC(speed, temp) {
    const feelTemp = document.getElementById('feelTemp');
    let wc = 35.74 + 0.6215 * temp - 35.75 * Math.pow(speed, 0.16) + 0.4275 * temp * Math.pow(speed, 0.16);
    console.log(wc);
    wc = Math.floor(wc);
    wc = (wc > temp) ? temp : wc;
    console.log(wc);
    feelTemp.innerHTML = wc;
}

// Wind Dial Function
function windDial(direction) {
    const dial = document.getElementById("dial");
    console.log(direction);
    switch (direction) {
        case "North":
        case "N":
            dial.setAttribute("class", "n"); //"n" is the CSS rule selector
            break;
        case "NE":
        case "NNE":
        case "ENE":
            dial.setAttribute("class", "ne");
            break;
        case "NW":
        case "NNW":
        case "WNW":
            dial.setAttribute("class", "nw");
            break;
        case "South":
        case "S":
            dial.setAttribute("class", "s");
            break;
        case "SE":
        case "SSE":
        case "ESE":
            dial.setAttribute("class", "se");
            break;
        case "SW":
        case "SSW":
        case "WSW":
            dial.setAttribute("class", "sw");
            break;
        case "East":
        case "E":
            dial.setAttribute("class", "e");
            break;
        case "West":
        case "W":
            dial.setAttribute("class", "w");
            break;
    }
}



//function to display weather keyword
function getCondition(condition) {
    const weatherCondition = document.getElementById("weatherCondition");
    if ((condition.includes("Clear")) || (condition.includes("Sunny")) || (condition.includes("clear")) || (condition.includes("sunny"))){
        condition="Clear";
    }
    else if ((condition.includes("Snow")) || (condition.includes("Flurries")) || (condition.includes("snow")) || (condition.includes("flurries"))){
        condition="Snow";
    }
    else if ((condition.includes("Rain")) || (condition.includes("Showers")) || (condition.includes("Sprinkle")) || (condition.includes("Thunderstorm")) || (condition.includes("rain")) || (condition.includes("showers")) || (condition.includes("sprinkle")) || (condition.includes("thunderstorm"))){
        condition= "Rain";
    }
    else if ((condition.includes("Fog")) || (condition.includes("Dew")) || (condition.includes("Mist")) || (condition.includes("fog")) || (condition.includes("dew")) || (condition.includes("mist"))){
        condition="Fog";
    }
    else if ((condition.includes("Partly Cloudy")) || (condition.includes("Overcast")) || (condition.includes("Partly Sunny")) || (condition.includes("partly cloudy")) || (condition.includes("overcast")) || (condition.includes("partly sunny"))){
        condition="Clouds";
    }
    console.log(condition);
    weatherCondition.innerHTML=condition; 
    return condition;
    
}





// change the summary image
function changeSummaryImage(condition) {
    const summaryPhoto = document.getElementById("summaryPhoto");
    console.log(condition);
    switch (condition) {
        case "Clear":
            summaryPhoto.setAttribute("class", "clear");
            break;
        case "Snow":
            summaryPhoto.setAttribute("class", "snow");
            break;
        case "Rain":
            summaryPhoto.setAttribute("class", "rain");
            break;
        case "Clouds":
            summaryPhoto.setAttribute("class", "clouds");
            break;
        case "Fog":
            summaryPhoto.setAttribute("class", "fog");
            break;
    }
}

    function changeBackgroundImage(condition) {
    const curWeather = document.getElementById("curWeather");
    console.log(condition);
    switch (condition) {
        case "Clear":
            curWeather.setAttribute("class", "clear");
            break;
        case "Snow":
            curWeather.setAttribute("class", "snow");
            break;
        case "Rain":
            curWeather.setAttribute("class", "rain");
            break;
        case "Clouds":
            curWeather.setAttribute("class", "clouds");
            break;
        case "Fog":
            curWeather.setAttribute("class", "fog");
            break;
    }
}

// Get location code from API
function getCode(LOCALE) {
    const API_KEY = '2gUfqbpCyXDXEIku467zvS4vMg0HHxeb';
    const URL = 'https://dataservice.accuweather.com/locations/v1/cities/geoposition/search?apikey='+API_KEY+'&q='+LOCALE;
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


  // Get Current Weather data from API
function getWeather(locData) {
    const API_KEY = '2gUfqbpCyXDXEIku467zvS4vMg0HHxeb';
    const CITY_CODE = locData['key']; // We're getting data out of the object
    const URL = "https://dataservice.accuweather.com/currentconditions/v1/"+CITY_CODE+"?apikey="+API_KEY+"&details=true";
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

  // Get next 12 hours of forecast data from API
function getHourly(locData) {
    const API_KEY = '2gUfqbpCyXDXEIku467zvS4vMg0HHxeb';
    const CITY_CODE = locData['key'];
    const URL = "https://dataservice.accuweather.com/forecasts/v1/hourly/12hour/"+CITY_CODE+"?apikey="+API_KEY;
    fetch(URL)
      .then(response => response.json())
      .then(function (data) {
      console.log('Json object from getHourly function:');
      console.log(data); // See what we got back
      // Get the first hour in the returned data
      let date_obj = new Date(data[0].DateTime);
      let nextHour = date_obj.getHours(); // returns 0 to 23
      // Store into the object
      locData["nextHour"] = nextHour;
      // Counter for the forecast hourly temps
      var i = 1;
      // Get the temps for the next 12 hours
      data.forEach(function (element) {
        let temp = element.Temperature.Value;
        let hour = 'hourTemp' + i;
        locData[hour] = temp; // Store hour and temp to object
        // New hiTemp variable, assign value from previous 12 hours
        let hiTemp = locData.pastHigh;
        // New lowTemp variable, assign value from previous 12 hours
        let lowTemp = locData.pastLow;
        // Check current forecast temp to see if it is 
        // higher or lower than previous hi or low
        if(temp > hiTemp){
          hiTemp = temp;
        } else if (temp < lowTemp){
          lowTemp = temp;
        }
        // Replace stored low hi and low temps if they changed
        if(hiTemp != locData.pastHigh){
          locData["pastHigh"] = hiTemp; // When done, this is today's high temp
        }
        if(lowTemp != locData.pastLow){
          locData["pastLow"] = lowTemp; // When done, this is today's low temp
        }
        i++; // Increase the counter by 1
      }); // ends the foreach method
      console.log('Finished locData object and data:');
      console.log(locData);
      buildPage(locData); // Send data to buildPage function
      })
      .catch(error => console.log('There was an error: ', error))
  } // end getHourly function

  function buildPage(locData)
  {
    // Task 1 - Feed data to WC, Dial and Image functions
    //variables
    const temp = locData.currentTemp;
    const speed = locData.windSpeed;
    const condition=locData.summary;
    const direction= locData.windDirection; 
    console.log(locData.windDirection);
    //call functions
    buildWC(speed, temp);
    windDial(direction);
    getCondition(condition);
    let currentCondition = getCondition(condition); 
    console.log(currentCondition);
    changeSummaryImage(currentCondition);
    changeBackgroundImage(currentCondition);
    
    // Task 2 - Populate location information
    document.getElementById('zip').innerHTML = locData.postal
    document.getElementById('elevation').innerHTML = locData.elevation;
    document.getElementById('location').innerHTML = locData.geoposition;
    document.getElementById('locName').innerHTML = locData.name + ", " + locData.stateAbbr;
    document.getElementById('titleElement').innerHTML = locData.name + ", " + locData.stateAbbr + " | Weather Temp.";

    // Task 3 - Populate weather information
    document.getElementById('dailyTemp').innerHTML = temp + "°F";
    document.getElementById('redFont').innerHTML = locData.pastHigh + "F";
    document.getElementById('blueFont').innerHTML = locData.pastLow + "F";
    document.getElementById('mph').innerHTML = speed + " mph";
    document.getElementById('direction').innerHTML = locData.windDirection;
    document.getElementById('gusts').innerHTML = locData.windGust;
    document.getElementById('weatherCondition').innerHTML = condition;

    // Task 4 - Hide status and show main
    document.getElementById('main').addEventListener('load', changeHiddenClass());
    function changeHiddenClass() {
        document.getElementById('status').classList.add('hidden');
        document.getElementById('main').classList.remove('hidden');
  }
}

/* formats a value into a 12h AM/PM time string
function format_time(hour) {
    if (hour > 23) {
       hour -= 24;
    }
    let amPM = (hour > 11) ? "pm" : "am";
    if (hour > 12) {
       hour -= 12;
    } else if (hour == 0) {
       hour = "12";
    }
    return hour + amPM;
 } // end format_time function
 
 function buildHourly(locData) {
    //const hourlyTime = document.getElementById("forecast").children[1];
    const hourlyTime = document.createElement("ul");
    console.log(hourlyTime);
 
    const currentHour = new Date().getHours();
    console.log(currentHour);
 
    for (let i = 0; i < 12; i++) {
       const newHour = document.createElement('li');
       newHour.innerHTML = `${format_time(currentHour - i)}: ${locData["hourTemp" + (i + 1)]}&deg;F`;
       hourlyTime.appendChild(newHour);
    }
    console.log(hourlyTime);
    const forecast = document.getElementById("hourly");
    forecast.replaceChild(hourlyTime, forecast.children[1]);
 }*/

 // Get location info, based on city key, from API
function getLocationByKey(cityKey) {
    const API_KEY = '2gUfqbpCyXDXEIku467zvS4vMg0HHxeb';
    const URL = 'https://dataservice.accuweather.com/locations/v1/'+cityKey+'?apikey='+API_KEY;
    fetch(URL)
     .then(response => response.json())
     .then(function (data) {
      console.log('Json object from getLocationByKey function:');
      console.log(data);
      const locData = {}; // Create an empty object
      locData['key'] = data.Key; // Add the value to the object
      locData['name'] = data.LocalizedName;
      locData['postal'] = data.PrimaryPostalCode;
      locData['state'] = data.AdministrativeArea.LocalizedName;
      locData['stateAbbr'] = data.AdministrativeArea.ID;
      let lat = data.GeoPosition.Latitude;
      let long = data.GeoPosition.Longitude;
      const LOCALE = lat+', '+long;
      locData['geoposition'] = LOCALE;
      locData['elevation'] = data.GeoPosition.Elevation.Imperial.Value;
      getWeather(locData);
      })
     .catch(error => console.log('There was a getLocationByKey error: ', error))
    } // end getLocationByKey function
 