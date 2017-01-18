import {Component} from '@angular/core';

import {HomePage} from '../home/home';
import {AboutPage} from '../about/about';
import {ContactPage} from '../contact/contact';
import {ModalController} from "ionic-angular";
import {SoundModalPage} from "../home/sound.modal";

@Component({
    templateUrl: 'tabs.html'
})
export class TabsPage {
    // this tells the tabs component which Pages
    // should be each tab's root Page
    tab1Root: any = HomePage;
    tab2Root: any = AboutPage;
    tab3Root: any = ContactPage;

    constructor(public modalCtrl: ModalController) {

    }

    openSoundModal() {
        let modal = this.modalCtrl.create(SoundModalPage);
        modal.present();
    }
}
