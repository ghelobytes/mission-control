import { ajax } from './ajax';

// save a certain section to reddit
export async function save() {
    const elem = arguments[0].element;

    const data = await ajax.post('update', {
        id: elem.id,
        value: elem.value
    });

    document.querySelector(`#${elem.id} + .editor-toolbar > a.fa-upload`).classList.add('highlight');
    document.querySelector('.reddit').innerHTML = data;
}

// save events section
// handled differently because it needs parsing
export async function saveEvents() {
    const events = document.getElementById('events').children;

    let allEvents = [];
    for(const evnt of events) {
        const children = evnt.children;

        const posted = children[1].getAttribute('data-content') === 'Posted';
        const tPM = children[3].value === '' ? '' : children[2].innerHTML + children[3].value.trim();
        const message = children[6].value.trim();

        if(message === '')
            continue;

        allEvents.push([posted, tPM, message]);
    }

    document.querySelector('.reddit').innerHTML = await ajax.post('update', {
        id: 'events',
        value: allEvents
    });

    document.querySelector('.tab-events .fa-upload').classList.add('highlight');
}

// create empty post
export async function createPost() {
    await ajax.get('update/create');

    // blank post, let's show this
    document.querySelector('.reddit').innerHTML = '<div class=flex><span class=greyed-out>[empty post]</span></div>';
}

// gets status page and updates section
export async function updateStats() {
    document.getElementById('status-liveupdate').innerHTML = await ajax.get('status');
}