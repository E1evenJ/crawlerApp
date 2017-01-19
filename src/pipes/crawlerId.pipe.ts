/**
 * Created by jiangyun on 2017/1/18.
 */
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({name: 'crawlerId'})
export class CrawlerId implements PipeTransform {
    transform(value: string): string {
        switch (value){
            case 'www.ximalaya.com':
                return '喜马拉雅';
        }
    }
}
