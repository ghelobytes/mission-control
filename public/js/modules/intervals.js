import { updateCountdown } from './countdown';
import { updateStats } from './reddit';

window.addEventListener('load', () => {
    // update post stats every 5 minutes
    setInterval(updateStats, 5*60*1000);

    // update countdown every second
    window.countdown = setInterval(updateCountdown, 1000);
    window.countdown_interval = 1000;
});