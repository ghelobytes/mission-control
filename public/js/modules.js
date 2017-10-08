import { speechRecognition } from './modules/annyang';
import './modules/auto-register';
import { saveIfEnter, _tabEvent, setSign } from './modules/captures';
import { updateCountdown, setLaunchTime, insertTime } from './modules/countdown';
import { addEvent, removeEvent, addEventIfNeeded } from './modules/events';
import { hotSwap } from './modules/hotswap';
import './modules/intervals';
import './modules/mde';
import { emergency, std_message } from './modules/messages';
import { save, saveEvents, createPost, updateStats } from './modules/reddit';
import { showTab, createSortable, datetimeSupport, removeLoadingModal } from './modules/ui';
import { setYoutube } from './modules/youtube';

window.onload = () => {
    createSortable();
    datetimeSupport();
};

document.onreadystatechange = () => {
    if(document.readyState === 'complete') {
        speechRecognition();
        removeLoadingModal();
    }
};
