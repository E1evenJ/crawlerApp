import {Component} from "@angular/core";
import {NavController, NavParams} from "ionic-angular";
import {SocketService} from "../../services/socket.service";
import {SoundModalService} from "../../services/sound-modal.service";

@Component({
    selector: 'page-sound-list',
    templateUrl: 'sound-list.html'
})
export class SoundList {
    album;
    crawlerId;

    constructor(public navCtrl: NavController,
                public params: NavParams,
                public socketService: SocketService,
                public soundModalService: SoundModalService) {
        this.album = this.params.get('album');
        this.crawlerId = this.params.get('crawlerId');
    }

    getSoundTracks(sound) {
        let _this = this;
        _this.socketService.get('/cambio/Crawler/getSoundTracks', {
            soundId: sound.id,
            crawlerId: this.crawlerId
        }, function (body: any, jwr: any) {
            console.log(body);
            _this.soundModalService.setData(body);
        });
    }
}
