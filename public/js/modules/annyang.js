import { addEvent, removeEvent } from './events';
import { save, saveEvents, createPost, updateStats } from './reddit';

export function speechRecognition() {
    if(annyang === null) {
        const mic = document.getElementById('mic');
        mic.parentElement.removeChild(mic);
        return;
    }

    function _saveSection() {
        try {
            const elem = document.activeElement.parentNode.parentNode.previousElementSibling.children[0];
            if(elem.classList.contains('fa'))
                // markdown editor, click upload button
                elem.click();
            else if(elem.children[0].classList.contains('fa'))
                // events section, click upload button
                elem.children[0].click();
        }
        catch(err) {}
    }

    function _nextEvent() {
        const parent = document.activeElement.parentNode;
        if(!parent.classList.contains('reverse'))
            return;

        if(parent.previousElementSibling) {
            console.log(parent.previousElementSibling.children[3]);
            parent.previousElementSibling.children[3].focus();
        }
    }

    function _postEvent() {
        const elem = document.activeElement;
        if(!elem.parentNode.classList.contains('reverse'))
            return;

        // click on "Posted" if not already
        const posted = elem.parentNode.children[1];
        if(posted.getAttribute('data-content') !== 'Posted')
            posted.click();

        _nextEvent();
        saveEvents();
    }

    function _mic(slash=true) {
        document.getElementById('mic').classList.remove(slash ? 'fa-microphone' : 'fa-microphone-slash');
        document.getElementById('mic').classList.add(slash ? 'fa-microphone-slash' : 'fa-microphone');
    }

    annyang.addCallback('soundstart', () => _mic(false));
    annyang.addCallback('result', () => _mic(true));
    annyang.addCallback('error', () => _mic(true));
    annyang.addCallback('end', () => _mic(true));

    annyang.addCommands({
        'show all': () => document.getElementById('tabs').children[0].click(),
        'show events': () => document.getElementById('tabs').children[1].click(),
        'show section': () => document.getElementById('tabs').children[2].click(),
        'show sections': () => document.getElementById('tabs').children[2].click(),
        'save (this) (section)': _saveSection,
        'next (event)': _nextEvent,
        'post (event)': _postEvent,
        'create (a) (new) post': createPost,
        'update (the) stats': updateStats,
        '(add) (create) (a) new event': addEvent,
        'remove (the) (first) (top) event': removeEvent,
        '(set) (update) launch time': () => document.getElementById('launchTime').showModal(),
        '(set) (update) countdown': () => document.getElementById('launchTime').showModal(),
        '(change) (set) youtube (video)': () => document.getElementById('yt-dialog').showModal(),
        '(show) (display) info': () => document.getElementById('info').showModal(),
        'report (a) bug': () => window.open('https://github.com/r-spacex/mission-control/issues/new'),
        '(open) github': () => window.open('https://github.com/r-spacex/mission-control/'),
        '(show) source (code)': () => window.open('https://github.com/r-spacex/mission-control/'),
        'logout': () => window.location = '/logout',
        'sign out': () => window.location = '/logout',
        '(switch) (flip) interface': () => document.body.classList.toggle('interface-left')
    });
    annyang.start();
}