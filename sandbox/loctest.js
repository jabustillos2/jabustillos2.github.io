/*functions will work together to get weather info for current
location and populate a web pg with data*/

'use strict';
// Call the function to get our location
getGeoLocation();




// Gets longitude and latitude of current location
function getGeoLocation(){
    const STATUS = document.getElementById('status');
    STATUS.innerHTML = 'Getting Location...';
} //end getGeoLocation