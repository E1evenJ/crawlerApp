import {Component, trigger, state, style, transition, animate} from "@angular/core";
import {NavController, NavParams, AlertController} from "ionic-angular";
import {SocketService} from "../../services/socket.service";
import {SoundModalService} from "../../services/sound-modal.service";
import {CrawlerId} from "../../pipes/crawlerId.pipe";

@Component({
    selector: 'page-sound-list',
    templateUrl: 'sound-list.html',
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
export class SoundList {
    album = {nextUrl: '', hasNext: false, soundArray:[]};
    crawlerId;

    constructor(public navCtrl: NavController,
                public params: NavParams,
                public socketService: SocketService,
                public soundModalService: SoundModalService,
                private alertCtrl: AlertController,
                private crawler: CrawlerId) {

        this.crawlerId = this.params.get('crawlerId');
        const that = this;
        this.getSoundList(this.params.get('url')).then((body: any) => {
            that.album.soundArray = that.album.soundArray.concat(body.soundArray);
            that.album.nextUrl = body.nextUrl;
            that.album.hasNext = body.hasNext;
            console.log(that.album);
        });
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
            }).then((body: any) => {
                console.log(body);
                that.soundModalService.setData(body);
            });
        }
    }

    doInfinite($event) {
        const that = this;
        this.getSoundList(that.album.nextUrl).then((body: any) => {
            console.log(body);
            that.album.soundArray = that.album.soundArray.concat(body.soundArray);
            that.album.nextUrl = body.nextUrl;
            that.album.hasNext = body.hasNext;
            $event.complete();
            $event.enable(that.album.hasNext);
        });
    }

    getSoundList(url) {
        return this.socketService.get('/cambio/Crawler/getSoundList', {
            url: url,
            crawlerId: this.crawlerId
        });
    }
}
