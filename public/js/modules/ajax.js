export const ajax = {
    // config for timeout
    timeout: 3000,

    _request: (method, url, data) => {
        return new Promise((resolve, reject) => {
            const req = new XMLHttpRequest();
            req.timeout = ajax.timeout;
            req.open(method, url);

            if(method === 'post' && data instanceof Object)
                req.setRequestHeader('Content-type', 'application/json;charset=UTF-8');

            req.onload = function() {
                if(this.status === 200)
                    resolve(req.response);
                else
                    reject({
                        status: this.status,
                        statusText: req.statusText
                    });
            };

            req.onerror = function() {
                reject({
                    status: this.status,
                    statusText: req.statusText
                });
            };

            req.ontimeout = req.onerror;

            const query = [];
            for(const key in data)
                query.push(`${encodeURIComponent(key)}=${encodeURIComponent(data[key])}`);

            if(method.toLowerCase() === 'post')
                req.send(JSON.stringify(data));
            else
                req.send(`'?${query.join('&')}`);
        });
    },

    get: (url, data={}) => ajax._request('get', url, data),
    post: (url, data={}) => ajax._request('post', url, data)
};