import {Injectable, ChangeDetectorRef}     from '@angular/core';
import {Socket} from "sails.io.js";
import {Client} from "sails.io.js";
import * as sailsIOJS from 'sails.io.js'
import * as io from 'socket.io-client'

@Injectable()
export class SocketService {
    client: Client;
    socket: Socket;

    constructor(public chRef: ChangeDetectorRef) {
        this.connect()
    }

    connect() {
        this.client = sailsIOJS(io);
        this.client.sails.reconnection = true;
        this.client.sails.autoConnect = false;
        this.socket = this.client.sails.connect('http://localhost:1337');
    }

    get(url, data?) {
        const that = this;
        return new Promise((resolve, reject) => {
            this.socket.get(url, data, (body: any, jwr: any) => {
                if (jwr.statusCode == 200) {
                    resolve(body);
                    that.chRef.detectChanges();
                } else {
                    console.error(jwr);
                    // reject(jwr.message);
                }
            });
        });


    }
}
