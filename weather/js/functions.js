/* *************************************
*  Weather Site JavaScript Functions
************************************* */

/* variables for function use*/
const temp = 31;
const speed = 5;
buildWC(speed,temp);

const direction = "N"; //Set your own value
windDial(direction);

/* calculate windchill*/

function buildWC(speed, temp) {
    const feelTemp = document.getElementById('feelTemp');

    /*compute Windchill*/
    let wc = 35.74 + 0.6215 * temp - 35.75 * Math.pow(speed, 0.16) + 0.4275 * temp * Math.pow(speed, 0.16);
console.log(wc);

    /*round down integer*/
    wc=Math.floor(wc);
    
/* If chill is greater than temp, return the temp*/
wc = (wc > temp)?temp:wc;

/*display windchill*/
console.log(wc);

/* wc='feels like ' + wc+'F';*/
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

function getCondition(condition) {
    const weatherCondition = document.getElementById("weatherCondition");
    console.log(condition);
    if ((condition.includes("Clear")) || (condition.includes("Sunny"))){
        return "Clear";
    }
    else if ((condition.includes("Snow")) || (condition.includes("Flurries"))){
        return "Snow";
    }
    else if ((condition.includes("Rain")) || (condition.includes("Showers")) || (condition.includes("Sprinkle")) || (condition.includes("Thunderstorm"))){
        return "Rain";
    }
    else if ((condition.includes("Fog")) || (condition.includes("Dew")) || (condition.includes("Mist"))){
        return "Fog"
    }
    else {
        return "Clouds"
    }
}



// function getCondition(condition) {
//     const weatherCondition = document.getElementById("weatherCondition");
//     console.log(condition);
//     switch (condition) {
//         case "Sunny":
//         case "Clear":
//             weatherCondition.setAttribute("class", "clear");
//             break;
//         case "Snow":
//         case "Sleet":
//         case "Flurries":
//         case "Freezing Rain":
//             weatherCondition.setAttribute("class", "snow");
//             break;
//         case "Rain":
//         case "Showers":
//         case "Thunderstorm":
//         case "Wet":
//             weatherCondition.setAttribute("class", "rain");
//             break;
//         case "Partly Cloudy":
//         case "Partly Sunny":
//         case "Cloudy":
//         case "Overcast":
//             weatherCondition.setAttribute("class", "clouds");
//             break;
//         case "Fog":
//         case "Mist":
//         case "Dew":
//             weatherCondition.setAttribute("class", "fog");
//             break;
//     }
// }


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