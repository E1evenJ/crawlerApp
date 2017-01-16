import {Component} from '@angular/core';

import {NavController, ModalController} from 'ionic-angular';
import {SoundModalPage} from './sound.modal';
import {Http} from '@angular/http';
import * as sailsIOJS from 'sails.io.js'
// import * as $ from 'jquery'
import * as io from 'socket.io-client'
import {Client} from "sails.io.js";
import {Socket} from "sails.io.js";

@Component({
    selector: 'page-home',
    templateUrl: 'home.html'
})
export class HomePage {

    result: any;
    keyword: string = '';
    client: Client;
    socket: Socket;
    timeoutValue: any;
    segment: string = 'all';

    constructor(public navCtrl: NavController,
                private http: Http,
                public modalCtrl: ModalController) {
        this.client = sailsIOJS(io);
        this.client.sails.reconnection = true;
        this.client.sails.autoConnect = false;
        this.socket = this.client.sails.connect('http://localhost:1338');

    }

    search() {
        let _this = this;
        clearTimeout(_this.timeoutValue);
        _this.timeoutValue = setTimeout(() => {
            console.log('search');
            _this.socket.get('/cambio/Crawler/search', {
                keyword: _this.keyword
            }, function (body: any, jwr: any) {
                console.log(body);
                _this.result = body.results;
            });
        }, 2000);

        // this.http.get('http://localhost:1338/cambio/Crawler/search' + '?keyword=' + this.keyword)
        //     .subscribe((res: Response) => {
        //         this.result = res.json();
        //         console.log(this.result);
        //     })
    }

    getSoundTracks(sound, crawlerId) {
        const _this = this;
        _this.socket.get('/cambio/Crawler/getSoundTracks', {
            soundId: sound.id,
            crawlerId: crawlerId
        }, function (body: any, jwr: any) {
            console.log(body);
            let modal = _this.modalCtrl.create(SoundModalPage, body);
            modal.present();
        });
    }

}
