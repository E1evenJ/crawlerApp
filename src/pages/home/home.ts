import {Component} from '@angular/core';

import {NavController} from 'ionic-angular';
import {SoundList} from "../sound/sound-list";
import {SocketService} from "../../services/socket.service";
import {SoundModalService} from "../../services/sound-modal.service";

@Component({
    selector: 'page-home',
    templateUrl: 'home.html'
})
export class HomePage {
    result: any;
    keyword: string = '';

    timeoutValue: any;
    segment: string = 'all';

    constructor(public navCtrl: NavController,
                public socketService: SocketService,
                public soundModalService: SoundModalService) {

    }

    search() {
        if(this.keyword == ''){
            return ;
        }
        const that = this;
        clearTimeout(this.timeoutValue);
        this.timeoutValue = setTimeout(() => {
            console.log('search');
            this.socketService.get('/cambio/Crawler/search', {
                keyword: this.keyword
            }, searchResultFun);
        }, 2000);

        function searchResultFun(body: any, jwr: any) {
            console.log(body);
            that.result = body && body.results;
        }

        // this.http.get('http://localhost:1338/cambio/Crawler/search' + '?keyword=' + this.keyword)
        //     .subscribe((res: Response) => {
        //         this.result = res.json();
        //         console.log(this.result);
        //     })
    }

    getSoundTracks(sound, crawlerId) {
        let _this = this;
        _this.socketService.socket.get('/cambio/Crawler/getSoundTracks', {
            soundId: sound.id,
            crawlerId: crawlerId
        }, function (body: any, jwr: any) {
            console.log(body);
            // let modal = _this.modalCtrl.create(SoundModalPage, body);
            // modal.present();
            _this.soundModalService.setData(body);
        });
    }

    goToSoundList(album, crawlerId) {
        this.navCtrl.push(SoundList, {
            album: album,
            crawlerId: crawlerId
        });
    }

}
