import { ajax } from './ajax';

// updates the countdown timer based on launch time
export function updateCountdown() {
    // non-strict null check
    if(window.time == null || window.hold_scrub === true)
        return;

    const timer = document.getElementById('timer');

    const curTime = new Date();
    const diff = Math.abs(window.time - curTime);
    const sign = window.time > curTime ? '-' : '+';

    const days   = diff            / 86400000 | 0;
    const hours  = diff % 86400000 /  3600000 | 0;
    const mins   = diff %  3600000 /    60000 | 0;
    const secs   = diff %    60000 /     1000 | 0;
    const tenths = diff %     1000 /      100 | 0;

    if(diff < 61000 && window.countdown_interval !== 100) {  // <1 minute => 0.1 second
        clearInterval(window.countdown);
        window.countdown = setInterval(updateCountdown, 100);
        window.countdown_interval = 100;
    }
    else if(61000 <= diff && diff < 3660000 && window.countdown_interval !== 1000) {  // 1 minute to 1 hour => 1 second
        clearInterval(window.countdown);
        window.countdown = setInterval(updateCountdown, 1000);
        window.countdown_interval = 1000;
    }
    else if(3660000 <= diff && diff < 90000000 && window.countdown_interval !== 60000) {  // 1 hour to 1 day => 1 minute
        clearInterval(window.countdown);
        window.countdown = setInterval(updateCountdown, 60000);
        window.countdown_interval = 60000;
    }
    else if(diff >= 90000000 && window.countdown_interval !== 3600000) {  // >1 day => 1 hour
        clearInterval(window.countdown);
        window.countdown = setInterval(updateCountdown, 3600000);
        window.countdown_interval = 3600000;
    }

    let time;  // placed here for scope

    if(days > 0)
        time = `${days}d ${hours}h`;
    else if(hours > 0)
        time = `${hours}h ${mins}m`;
    else if(mins > 0)
        time = `${mins}:${secs.padStart(2, '0')}`;
    else
        time = `${secs}.${tenths}`;

    timer.innerHTML = `T${sign}${time}`;
}

// popup to ask for launch time (uses <dialog>)
export function setLaunchTime(launchTime) {
    // non-strict null check
    window.time = launchTime == null ? null : Date.parse(launchTime);
    window.hold_scrub = false;

    // non-strict null check
    if(window.time == null) {
        const timer = document.getElementById('timer');
        timer.innerHTML = 'Set launch time';
        timer.classList.add('unset');
    }
    else {
        document.getElementById('timer').classList.remove('unset');
        updateCountdown();
    }

    document.getElementById('launchTime').close();

    // not awaiting anything
    ajax.post('update', {
        id: 'time',
        value: window.time
    });
}

export function insertTime(obj) {
    // non-strict null check
    if(window.time != null) {
        const children = obj.parentElement.children;
        const time = document.getElementById('timer').innerHTML;

        children[2].innerHTML = time.slice(0, 2);
        children[3].value = time.includes('.') ? time.slice(2, -2) : time.slice(2);
    }
}