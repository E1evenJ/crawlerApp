/**
 * Created by jiangyun on 2017/1/19.
 */
import {Component, ViewChild, Input, ElementRef, AfterViewInit, NgZone, Output} from '@angular/core';

@Component({
    selector: 'cm-audio',
    templateUrl: './audio.html',
})

export class AudioComponent implements AfterViewInit {

    private _audioEle: any;
    private _audioPlayerBarEl: any;
    private _src: string;
    private _time: number;
    private _loadedTime: number = 0;
    isTouch;
    eStart;
    eMove;
    eEnd;
    eCancel;
    theRealEvent;

    @ViewChild('audioElement') _audio: ElementRef;
    @ViewChild('audioPlayerBarElement') _audioPlayerBar: ElementRef;

    constructor(private zone: NgZone) {
        this.isTouch = 'ontouchstart' in window;
        this.eStart = this.isTouch ? 'touchstart' : 'mousedown';
        this.eMove = this.isTouch ? 'touchmove' : 'mousemove';
        this.eEnd = this.isTouch ? 'touchend' : 'mouseup';
        this.eCancel = this.isTouch ? 'touchcancel' : 'mouseup';
    }

    ngAfterViewInit() {

        this._audioEle = this._audio.nativeElement;
        this._audioPlayerBarEl = this._audioPlayerBar.nativeElement;

        this._audioEle.addEventListener('timeupdate', timeUpdateFun);

        this._audioEle.addEventListener('loadeddata', (event) => {
            this._loadedTime = 0;
            let timer = setInterval(() => {
                this.zone.run(() => {
                    this.updateLoaded(event, timer);
                });
            }, 300);
        });

        const that = this;
        this._audioPlayerBarEl.addEventListener(this.eStart, function (e) {
            that._audioEle.removeEventListener('timeupdate', timeUpdateFun);
            that.adjustCurrentTime(e);
            that._audioPlayerBarEl.addEventListener(that.eMove, eMoveFun);
        });
        this._audioPlayerBarEl.addEventListener(this.eEnd, function () {
            that._audioPlayerBarEl.removeEventListener(that.eMove, eMoveFun);
            that._audioEle.addEventListener('timeupdate', timeUpdateFun);
            that._audioEle.currentTime = that.time;
        });

        function eMoveFun(e) {
            that.adjustCurrentTime(e);
        }

        function timeUpdateFun(event) {
            that.zone.run(() => {
                that.updateTime(event);
            });
        }
    }


    @Input()
    get src(): string {
        return this._src;
    }

    set src(src: string) {
        this._src = src;
    }

    @Output()
    get paused(): string {
        return this._audioEle && this._audioEle.paused;
    }

    updateTime(event) {
        this.time = event.target.currentTime;
    }

    get time(): number {
        return this._time;
    }

    set time(time: number) {
        this._time = time;
    }

    updateLoaded(event, timer) {
        if (this.loadedTime < this._audioEle.duration) {
            this.loadedTime = AudioComponent.getEnd(event.target);
        } else {
            clearInterval(timer);
        }
    }

    get loadedTime(): number {
        return this._loadedTime;
    }

    set loadedTime(time: number) {
        this._loadedTime = time;
    }

    play() {
        if (this._audioEle) {
            this._audioEle.play();
        }
    }

    pause() {
        if (this._audioEle) {
            this._audioEle.pause();
        }
    }

    playPause() {
        if (this._audioEle) {
            if (this._audioEle.paused) {
                this.play();
            } else {
                this.pause();
            }
        }
    }

    /**
     * 获取视频已经下载的时长
     * @param audio
     * @returns {number}
     */
    private static getEnd(audio) {
        let end = 0;
        try {
            end = audio.buffered.end(0) || 0;
            end = (end * 1000 + 1) / 1000;
        }
        catch (e) {

        }
        return end;
    }

    adjustCurrentTime(e) {
        this.theRealEvent = this.isTouch ? e.targetTouches[0] : e;
        this.time = Math.round((
                this._audioEle.duration * ( this.theRealEvent.pageX - this._audioPlayerBarEl.offsetLeft )
            ) / this._audioPlayerBarEl.clientWidth
        );
    }
}
