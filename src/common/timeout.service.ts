import {Injectable}     from '@angular/core';

@Injectable()
export class Timeout {
    constructor() {

    }

    static create(timeout) {
        return new Promise((resolve, reject) => {
            let n = setTimeout(() => resolve(n),timeout)
        })
    }

    static clear(handle){
        clearTimeout(handle);
    }
}
