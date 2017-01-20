import {Component, trigger, state, style, transition, animate, ChangeDetectorRef} from '@angular/core';

import {NavController} from 'ionic-angular';
import {SoundList} from "../sound/sound-list";
import {SocketService} from "../../services/socket.service";
import {SoundModalService} from "../../services/sound-modal.service";

@Component({
    selector: 'page-home',
    templateUrl: 'home.html',
    animations: [
        trigger('flyInOut', [
            state('in', style({opacity: 1, transform: 'translateX(0)'})),
            transition('void => *', [
                style({
                    opacity: 0,
                    transform: 'translateX(-100%)'
                }),
                animate('0.5s 100 ease-in')
            ]),
            transition('* => void', [
                animate('0.5s 100 ease-out', style({
                    opacity: 0,
                    transform: 'translateX(100%)'
                }))
            ])
        ])
    ]
})
export class HomePage {
    albumArray: any;
    keyword: string = '';

    timeoutValue: any;
    segment: string = 'all';

    constructor(public navCtrl: NavController,
                public socketService: SocketService,
                public soundModalService: SoundModalService,
                public chRef: ChangeDetectorRef) {

    }

    search() {
        if (this.keyword == '') {
            return;
        }
        const that = this;
        clearTimeout(this.timeoutValue);
        this.timeoutValue = setTimeout(() => {
            console.log('search');
            this.socketService.get('/cambio/Crawler/search', {
                keyword: this.keyword
            }).then((body: any) => {
                console.log(body);
                that.albumArray = body && body.albumArray;
            });
        }, 2000);

        // this.http.get('http://localhost:1338/cambio/Crawler/search' + '?keyword=' + this.keyword)
        //     .subscribe((res: Response) => {
        //         this.result = res.json();
        //         console.log(this.result);
        //     })
    }

    getSoundTracks(album) {
        let _this = this;
        _this.socketService.socket.get('/cambio/Crawler/getSoundTracks', {
            soundId: album.soundArray[0].id,
            crawlerId: album.crawlerId
        }, function (body: any, jwr: any) {
            console.log(body);
            // let modal = _this.modalCtrl.create(SoundModalPage, body);
            // modal.present();
            _this.soundModalService.setData(body);
        });
    }

    goToSoundList(album, crawlerId) {
        this.navCtrl.push(SoundList, {
            url: album.targetUrl,
            crawlerId: crawlerId
        });
    }

}
