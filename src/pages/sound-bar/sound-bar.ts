import {
    Component, ViewChild, ChangeDetectorRef, OnInit, trigger, state, style, transition,
    animate, keyframes
} from '@angular/core';

import {Events, Content} from "ionic-angular";

import {LocalStorageService} from 'angular-2-local-storage';

@Component({
    selector: 'page-sound-bar',
    templateUrl: 'sound-bar.html',
    animations: [
        trigger('soundContent', [
            state('content-in', style({
                opacity: 1,
                transform: 'translateY(0)'
            })),
            state('content-leave', style({
                opacity: 0,
                transform: 'translateY(100%)'
            })),
            state('footer-in', style({
                opacity: 1,
                bottom: '*'
            })),
            state('footer-leave', style({
                opacity: 0,
                bottom: '-100px'
            })),
            transition('content-in <=> content-leave', animate('300ms ease-in-out')),
            transition('footer-in <=> footer-leave', animate('200ms ease-in-out'))

        ]),
        trigger('imgRotate', [
            state('in0', style({transform: 'rotate(0)'})),
            state('in1', style({transform: 'rotate(36deg)'})),
            state('in2', style({transform: 'rotate(72deg)'})),
            state('in3', style({transform: 'rotate(108deg)'})),
            state('in4', style({transform: 'rotate(144deg)'})),
            state('in5', style({transform: 'rotate(180deg)'})),
            state('in6', style({transform: 'rotate(216deg)'})),
            state('in7', style({transform: 'rotate(252deg)'})),
            state('in8', style({transform: 'rotate(288deg)'})),
            state('in9', style({transform: 'rotate(324deg)'})),
            state('in10', style({transform: 'rotate(360deg)'})),
            transition('in0 => in1', [
                style({transform: 'rotate(0)'}),
                animate('1s', keyframes([
                    style({transform: 'rotate(36deg)', offset: 1})
                ]))
            ]),
            transition('in1 => in2', [
                animate('1s', keyframes([
                    style({transform: 'rotate(72deg)', offset: 1})
                ]))
            ])
            ,
            transition('in2 => in3', [
                animate('1s', keyframes([
                    style({transform: 'rotate(108deg)', offset: 1})
                ]))
            ])
            ,
            transition('in3 => in4', [
                animate('1s', keyframes([
                    style({transform: 'rotate(144deg)', offset: 1})
                ]))
            ])
            ,
            transition('in4 => in5', [
                animate('1s', keyframes([
                    style({transform: 'rotate(180deg)', offset: 1})
                ]))
            ])
            ,
            transition('in5 => in6', [
                animate('1s', keyframes([
                    style({transform: 'rotate(216deg)', offset: 1})
                ]))
            ])
            ,
            transition('in6 => in7', [
                animate('1s', keyframes([
                    style({transform: 'rotate(252deg)', offset: 1})
                ]))
            ])
            ,
            transition('in7 => in8', [
                animate('1s', keyframes([
                    style({transform: 'rotate(288deg)', offset: 1})
                ]))
            ]),
            transition('in8 => in9', [
                animate('1s', keyframes([
                    style({transform: 'rotate(324deg)', offset: 1})
                ]))
            ]),
            transition('in9 => in10', [
                animate('1s', keyframes([
                    style({transform: 'rotate(360deg)', offset: 1})
                ]))
            ])
        ])
    ]
})
export class SoundBar implements OnInit {

    soundContentState: string = 'content-leave';
    soundFooterState: string = 'footer-in';
    soundImgState: string = 'in0';
    soundData: any = {};
    audioEle;
    isPlay: boolean = false;

    @ViewChild(Content) content: Content;

    ngOnInit(): void {
        const _this = this;
        _this.audioEle = _this.content.getNativeElement().parentNode.querySelector('audio');
        _this.audioEle.addEventListener('play', () => {
            _this.isPlay = true;
        });
        _this.audioEle.addEventListener('pause', () => {
            _this.isPlay = false;
        });
        this.events.subscribe('audio:start', (data) => {
            _this.localStorageService.set('soundData', data);
            _this.soundData = data;
            _this.chRef.detectChanges();

            _this.audioEle.play();
            _this.isPlay = true;
        });
    }

    constructor(public chRef: ChangeDetectorRef,
                public events: Events,
                public localStorageService: LocalStorageService) {
        this.soundData = this.localStorageService.get('soundData') || {};
    }

    openSoundBar() {
        this.soundContentState = 'content-in';
        this.soundFooterState = 'footer-leave'
    }

    closeSoundBar() {
        this.soundContentState = 'content-leave';
        this.soundFooterState = 'footer-in'
    }

    play($event, player) {
        $event.stopPropagation();
        if (player.paused) {
            player.play();
            this.isPlay = true;
            this.setSoundImageState();
        } else {
            player.pause();
            this.isPlay = false;
        }
    }

    setSoundImageState() {
        let num = parseInt(this.soundImgState.replace(/[^0-9]+/g, ''));
        if (num == 10) {
            num = 0;
        } else {
            num = num + 1;
        }
        this.soundImgState = 'in' + num;
    }

    animationDone($event) {
        console.log($event);
        if (this.isPlay) {
            this.setSoundImageState();
        }
    }
}
