import axios from 'axios';
import * as common from '../common';
function taskList(filter) {
    filter._ = Date.now();
    return new Promise((resolve, reject) => {
        axios.get('/taskList?' + common.param(filter))
            .then(response => {
                resolve(response.data);
            })
            .catch(err => {
                reject(err);
            });
    })
}
export {taskList};