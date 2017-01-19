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
    private _src: string;
    private _time: number;

    @ViewChild('audioElement') _audio: ElementRef;

    constructor(private zone: NgZone) {
    }

    ngAfterViewInit() {

        this._audioEle = this._audio.nativeElement;

        this._audioEle.addEventListener('timeupdate', (event) => {
            this.zone.run(() => {
                this.updateTime(event);
            });
        });

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
        return (this._audioEle && this._audioEle.paused) || true;
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

    play() {
        if (this._audioEle) {
            console.log('audio', this._audio);
            this._audioEle.play();
        }
    }

    pause() {
        if (this._audioEle) {
            this._audioEle.pause();
        }
    }
}
