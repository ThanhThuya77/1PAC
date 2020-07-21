import {get} from './Service'

function getAllData(search) {
    let url = 'https://images-api.nasa.gov/search';
    url = search ? `${url}?q=${search}` : url;
    return get(url)
        .then(data => {
            debugger;
            localStorage.setItem('data', JSON.stringify(data.collection && data.collection.items));
        })
        .catch(e => {
            localStorage.setItem('error', 'can not get data');
        })
}

export {
    getAllData
}