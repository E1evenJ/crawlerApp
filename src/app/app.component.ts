import {Component} from '@angular/core';
import {Platform} from 'ionic-angular';
import {StatusBar, Splashscreen} from 'ionic-native';

import {TabsPage} from '../pages/tabs/tabs';
import {SocketService} from "../common/socket.service";
import {HomePage} from "../pages/home/home";
import {SoundModalService} from "../common/sound-modal.service";


@Component({
    templateUrl: 'app.html',
    providers: [SocketService, SoundModalService]
})
export class MyApp {
    rootPage = HomePage;

    constructor(platform: Platform) {
        platform.ready().then(() => {
            // Okay, so the platform is ready and our plugins are available.
            // Here you can do any higher level native things you might need.
            StatusBar.styleDefault();
            Splashscreen.hide();
        });
    }
}
