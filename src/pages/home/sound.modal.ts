import {Component} from "@angular/core";
import {Platform, NavParams, ViewController} from "ionic-angular";

@Component({
    selector: 'page-sound-modal',
    templateUrl: 'sound-modal-page.html'
})
export class SoundModalPage {
    sound;

    constructor(public platform: Platform,
                public params: NavParams,
                public viewCtrl: ViewController) {

        this.sound = this.params.data;
    }

    dismiss() {
        this.viewCtrl.dismiss();
    }
}
