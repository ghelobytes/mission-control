export const request = {
    _: async (method, url, data) => {
        let resp;

        if(method == `POST`)
            resp = await fetch(url, {
                method: `POST`,
                headers: {
                    'Content-type': `application/json`
                },
                credentials: `same-origin`,
                body: JSON.stringify(data)
            });
        else {
            const query = [];
            for(const k in data)
                query.push(`${encodeURIComponent(key)}=${encodeURIComponent(data[k])}`);
            resp = await fetch(`${url}?${query.join(`&`)}`, { method: `GET` });
        }

        return resp.ok ? Promise.resolve(await resp.text()) : Promise.reject({
            status: resp.status,
            statusText: resp.statusText,
            message: resp.text()
        });
    },
    get: (url, data={}) => request._(`GET`, url, data),
    post: (url, data={}) => request._(`POST`, url, data)
}
