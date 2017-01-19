import {Component, ViewChild, ChangeDetectorRef, OnInit} from '@angular/core';

import {Events, Content} from "ionic-angular";

@Component({
    selector: 'page-sound-bar',
    templateUrl: 'sound-bar.html'
})
export class SoundBar implements OnInit{

    isShow: boolean = false;
    soundData: any = {};
    audioEle;
    isPlay:boolean = false;

    @ViewChild(Content) content: Content;

    ngOnInit(): void {
        const _this = this;
        _this.audioEle = _this.content.getNativeElement().parentNode.querySelector('audio');
        _this.audioEle.addEventListener('play',()=>{
            _this.isPlay = true;
        });
        _this.audioEle.addEventListener('pause',()=>{
            _this.isPlay = false;
        });
        this.events.subscribe('audio:start', (data) => {
            _this.soundData = data;
            _this.chRef.detectChanges();

            _this.audioEle.play();
            _this.isPlay = true;
        });
    }

    constructor(public chRef: ChangeDetectorRef,
                public events: Events) {

    }

    openSoundBar() {
        this.isShow = true;
    }

    closeSoundBar() {
        this.isShow = false;
    }

    play($event, player){
        $event.stopPropagation();
        if(player.paused){
            player.play();
            this.isPlay = true;
        }else{
            player.pause();
            this.isPlay = false;
        }
    }
}
