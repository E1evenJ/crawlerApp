/**
 * Created by jiangyun on 2017/1/20.
 */
import {Pipe, PipeTransform} from '@angular/core';

@Pipe({name: 'timeMinSec'})
export class TimeMinSec implements PipeTransform {
    transform(time: number): string {
        if(isNaN(time)){
            return '00:00';
        }
        const integerTime = Math.round(time);
        const minutes = parseInt(integerTime / 60 + '');
        const seconds = integerTime % 60;
        let minutesPart;
        if (minutes < 10) {
            minutesPart = '0' + minutes;
        } else {
            minutesPart = '' + minutes;
        }
        let secondsPart;
        if (seconds < 10) {
            secondsPart = '0' + seconds;
        } else {
            secondsPart = '' + seconds;
        }
        return minutesPart + ':' + secondsPart;
    }
}
