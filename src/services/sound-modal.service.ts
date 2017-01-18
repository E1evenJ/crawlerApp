import {Injectable}     from '@angular/core';
import {Events} from "ionic-angular";

@Injectable()
export class SoundModalService {
    private _soundData: any = {
        data: {}
    };

    constructor(public events: Events) {

    }

    setData(data) {
        this._soundData.data = data;
        this.start();
    }

    start(){
        this.events.publish('audio:start', this._soundData.data);
    }

    stop(){
        this.events.publish('audio:stop');
    }

    getData() {
        return this._soundData;
    }
}
