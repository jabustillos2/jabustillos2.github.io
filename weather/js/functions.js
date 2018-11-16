/* *************************************
*  Weather Site JavaScript Functions
************************************* */

console.log('My javascript is being read.');


/* calculate windchill*/

function buildWC(speed, temp) {
    const dailyTemp = document.getElementById('feelTemp');

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
dailyTemp.innerHTML = wc;
}