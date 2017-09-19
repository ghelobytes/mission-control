// simple hash with values to swap out
// if modifying ─ keep in mind these do not get escaped before passing to regex
const hotSwapVals = {
    ':music:'     : '♫',
    ':tunes:'     : '♫',
    ':rocket:'    : '🚀',
    ':sat:'       : '🛰',
    ':satellite:' : '🛰',
    ':sun:'       : '☀️',
    ':sunny:'     : '☀️',
    ':cloud:'     : '☁️',
    ':cloudy:'    : '☁️',
    ':fog:'       : '🌫️',
    ':foggy:'     : '🌫️',
    ':rain:'      : '🌧️',
    ':rainy:'     : '🌧️',
    ':thunder:'   : '⛈️',
    ':lightning:' : '⛈️',
    ':yes:'       : '✔️',
    ':ok:'        : '️️️✔️',
    ':check:'     : '✔️',
    ':no:'        : '❌',
    ':x:'         : '❌'
};

// swap out text with emoji on an input
export function hotSwap(obj) {
    // prevent binding on non-inputs
    if(!(obj instanceof HTMLInputElement))
        throw 'Object must be HTMLInputElement';

    const regex = new RegExp(Object.keys(hotSwapVals).join('|'), 'g');  // nothing needs to be escaped here

    const val = obj.value.replace(regex, key => hotSwapVals[key]);
    if(obj.value !== val)
        // prevents moving cursor to end if not needed
        obj.value = val;
}