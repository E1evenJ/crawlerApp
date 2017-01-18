import {NgModule, ErrorHandler} from '@angular/core';
import {IonicApp, IonicModule, IonicErrorHandler} from 'ionic-angular';
import {MyApp} from './app.component';
import {AboutPage} from '../pages/about/about';
import {ContactPage} from '../pages/contact/contact';
import {HomePage} from '../pages/home/home';
import {TabsPage} from '../pages/tabs/tabs';
import {SoundModalPage} from "../pages/home/sound.modal";
import {SoundList} from "../pages/sound/sound-list";
import {SoundBar} from "../pages/sound-bar/sound-bar";

@NgModule({
    declarations: [
        MyApp,
        AboutPage,
        ContactPage,
        HomePage,
        TabsPage,
        SoundModalPage,
        SoundList,
        SoundBar
    ],
    imports: [
        IonicModule.forRoot(MyApp)
    ],
    bootstrap: [IonicApp],
    entryComponents: [
        MyApp,
        AboutPage,
        ContactPage,
        HomePage,
        TabsPage,
        SoundModalPage,
        SoundList,
        SoundBar
    ],
    providers: [{provide: ErrorHandler, useClass: IonicErrorHandler}]
})
export class AppModule {
}
