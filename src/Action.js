import {get} from './Service'

function getAllData(search) {
    let url = 'https://images-api.nasa.gov';
    url = search ? `${url}/search?q=${search}` : url;
    return get(url)
        .then(data => {
            const rs = JSON.stringify(data.collection && data.collection.items);
            localStorage.clear();
            localStorage.setItem('data', rs);
        })
        .catch(e => {
            localStorage.setItem('error', 'can not get data');
        })
}

export {
    getAllData
}