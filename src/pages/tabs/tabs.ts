import {Component} from '@angular/core';

import {HomePage} from '../home/home';
import {ModalController} from "ionic-angular";
import {SoundModalPage} from "../home/sound.modal";

@Component({
    templateUrl: 'tabs.html'
})
export class TabsPage {
    // this tells the tabs component which Pages
    // should be each tab's root Page
    tab1Root: any = HomePage;

    constructor(public modalCtrl: ModalController) {

    }

    openSoundModal() {
        let modal = this.modalCtrl.create(SoundModalPage);
        modal.present();
    }
}
