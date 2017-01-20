/**
 * Created by jiangyun on 2017/1/20.
 */
/**
 * Created by jiangyun on 2017/1/20.
 */
import {Pipe, PipeTransform} from '@angular/core';

@Pipe({name: 'percentage'})
export class Percentage implements PipeTransform {
    transform(value: number, isFixed: boolean = true, fixedNumber: number = 2): string {
        if(isNaN(value)){
            return '0';
        }
        if(value<1 && value>0){
            const percentageValue = value * 100;

            if (isFixed) {
                return percentageValue.toFixed(fixedNumber) + '%';
            }else{
                return percentageValue + '%';
            }
        }else{
            return '100%';
        }
    }
}
