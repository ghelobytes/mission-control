export function showTab(tab) {
    const events = document.querySelectorAll('.tab-events');
    const sections = document.querySelectorAll('.tab-section');

    document.querySelectorAll('#tabs > *').forEach(obj => obj.classList.remove('current'));
    tab.classList.add('current');

    const val = tab.innerHTML;

    const show = {
        events: ['Events', 'All'].includes(val) ? '' : 'none',
        sections: ['Sections', 'All'].includes(val) ? '' : 'none'
    };

    events.forEach(obj => obj.style['display'] = show.events);
    sections.forEach(obj => obj.style['display'] = show.sections);
}

export function createSortable() {
    // create reorderable events
    Sortable.create(document.getElementById('events'), {
        handle: '.sort-icon',
        ghostClass: 'ui-state-highlight',
        fallbackTolerance: 3
    });
}

export function datetimeSupport() {
    // remove format in popup if <input type=datetime-local> is supported
    const elem = document.createElement('input');
    elem.setAttribute('type', 'datetime-local');
    if(elem.type === 'datetime-local') {
        const removing = document.getElementById('datetime-format');
        removing.parentElement.removeChild(removing);
    }
}

export function removeLoadingModal() {
    const loader = document.getElementById('loader');
    loader.style['opacity'] = 0;
    setTimeout(() => loader.parentNode.removeChild(loader), 500);

    // show info dialog
    if(!window.noshow)
        document.getElementById('info').showModal();
}