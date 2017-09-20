import { request } from './fetch';

export async function setYoutube() {
    const dialog = document.getElementById('yt-dialog');
    dialog.showModal();

    const id = await new Promise(resolve => {
        dialog.querySelector('button.update').onclick = () => {
            const url = dialog.querySelector('input').value;
            const id = url.match(/(?:https?:\/\/)?(?:www\.)?youtu(?:\.be|be\.com)\/(?:watch\?v=)?([\w-]{11,})/);
            if(id)
                resolve(id[1]);
        };
        dialog.querySelector('button.clear').onclick = () => resolve('');
    });

    document.querySelector('.youtube').setAttribute('src', id ? `https://youtube.com/embed/${id}?autoplay=0` : '');

    await request.post('update', {
        id: 'video',
        value: id
    });
    dialog.close();
}
