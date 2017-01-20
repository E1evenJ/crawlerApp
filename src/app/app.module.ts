import {NgModule, ErrorHandler} from '@angular/core';
import {IonicApp, IonicModule, IonicErrorHandler} from 'ionic-angular';
import {MyApp} from './app.component';
import {HomePage} from '../pages/home/home';
import {TabsPage} from '../pages/tabs/tabs';
import {SoundModalPage} from "../pages/home/sound.modal";
import {SoundList} from "../pages/sound/sound-list";
import {SoundBar} from "../pages/sound-bar/sound-bar";
import {CmHasFooter} from "../directives/has-footer.directive";
import {CrawlerId} from "../pipes/crawlerId.pipe";
import {AudioComponent} from "../pages/audio/audio.component";
import {LocalStorageModule} from 'angular-2-local-storage';
import {TimeMinSec} from "../pipes/time-minutes-seconds.pipe";
import {Percentage} from "../pipes/percentage.pipe";

@NgModule({
    declarations: [
        MyApp,
        HomePage,
        TabsPage,
        SoundModalPage,
        SoundList,
        SoundBar,
        CmHasFooter,
        CrawlerId,
        AudioComponent,
        TimeMinSec,
        Percentage
    ],
    imports: [
        IonicModule.forRoot(MyApp),
        LocalStorageModule.withConfig({
            prefix: 'my-app',
            storageType: 'localStorage'
        })
    ],
    bootstrap: [IonicApp],
    entryComponents: [
        MyApp,
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
