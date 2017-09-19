import { addEvent } from './events';
import { saveEvents } from './reddit';

const messages = {
    'RUD':   'RUD',
    'Hold':  'Hold',
    'Scrub': 'Scrub'
};

// messages from emergency panel
export function emergency(obj) {
    const children = addEvent().children;
    const type = obj.innerHTML;
    let time = document.getElementById('timer').innerHTML;  // from countdown timer

    if(['Hold', 'Scrub'].includes(type))
        window.hold_scrub = true;

    if(time.substr(-2, 1) === '.')
        time = time.slice(0, -2);

    // non-strict null check
    if(window.time != null) {
        children[3].innerHTML = time.slice(0, 2);
        children[4].value = time.substr(-2, 1) === '.' ? time.slice(2, -2) : time.slice(2);
    }

    children[1].setAttribute('data-content', 'Posted');
    children[6].value = messages[type];
    saveEvents();
}

// messages from standard panel
export function std_message() {
    const child = addEvent().children[6];
    child.value = document.getElementById('events-dropdown').value;
}
