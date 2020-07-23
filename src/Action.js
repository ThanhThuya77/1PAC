import {get} from './Service'

function getAllData(search) {
    let url = 'https://images-api.nasa.gov';
    url = `${url}/search?q=${search || 'cat'}`;
    return get(url)
        .then(data => {
            const rs = data.collection && data.collection.items;
            localStorage.clear();
            localStorage.setItem('data', JSON.stringify(rs));
            return rs;
        })
        .catch(e => {
            localStorage.setItem('error', 'can not get data');
        })
}

export {
    getAllData
}