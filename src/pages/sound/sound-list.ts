import {Component} from "@angular/core";
import {NavController, NavParams, AlertController} from "ionic-angular";
import {SocketService} from "../../services/socket.service";
import {SoundModalService} from "../../services/sound-modal.service";
import {CrawlerId} from "../../pipes/crawlerId.pipe";

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
                public soundModalService: SoundModalService,
                private alertCtrl: AlertController,
    private crawler: CrawlerId) {
        this.album = this.params.get('album');
        this.crawlerId = this.params.get('crawlerId');
    }

    getSoundTracks(sound) {
        let that = this;
        if (sound.isPaid && !sound.isFree) {
            let crawlerIdCH = this.crawler.transform(this.crawlerId);
            let alert = this.alertCtrl.create({
                title: '确认跳转',
                message: `这是一条来自[${crawlerIdCH}]收费语音，要跳转到[${crawlerIdCH}]么？`,
                buttons: [
                    {
                        text: '取消',
                        role: 'cancel',
                        handler: () => {
                            console.log('Cancel clicked');
                        }
                    },
                    {
                        text: '跳转',
                        handler: () => {
                            console.log(`go ${this.crawlerId} clicked`);
                        }
                    }
                ]
            });
            alert.present();
        } else {
            that.socketService.get('/cambio/Crawler/getSoundTracks', {
                soundId: sound.id,
                crawlerId: that.crawlerId
            }, function (body: any, jwr: any) {
                console.log(body);
                that.soundModalService.setData(body);
            });
        }
    }
}
