export function millitominsec(millis) {
    const minutes = Math.floor( millis / 60000 );
    //toFixed takes (params) no. of decimals after the decimal point in this case we want seconds in natural no.s not deciamls so 0.
    const seconds = ((millis % 60000) / 1000 ).toFixed(0);
    return seconds == 60
     ? minutes + 1 + ':00'
     : minutes + ':' + (seconds < 10 ? '0' : '') + seconds;


}