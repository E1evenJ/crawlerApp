import {Component, ViewChild, ChangeDetectorRef} from '@angular/core';

import {Events, Content} from "ionic-angular";

@Component({
    selector: 'page-sound-bar',
    templateUrl: 'sound-bar.html'
})
export class SoundBar {
    isShow: boolean = false;
    soundData: any = {};

    @ViewChild(Content) content: Content;

    constructor(public chRef: ChangeDetectorRef,
                public events: Events) {
        const _this = this;
        this.events.subscribe('audio:start', (data) => {
            _this.soundData = data;
            chRef.detectChanges();
                _this.content.getNativeElement().parentNode.querySelector('audio').play();
        });
    }

    openSoundBar() {
        this.isShow = true;
    }

    closeSoundBar() {
        this.isShow = false;
    }


}

// import {Directive, Input, ViewContainerRef, TemplateRef} from '@angular/core';
//
// @Directive({ selector: '[sound-bar]' })
// export class SoundBar {
//     constructor(private templateRef: TemplateRef<any>,
//                 private viewContainer: ViewContainerRef){
//
//     }
// }
