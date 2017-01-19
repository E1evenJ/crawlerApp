/**
 * Created by jiangyun on 2017/1/18.
 */
import {Directive, ElementRef, Renderer} from '@angular/core';
@Directive({selector: '[cmHasFooter]'})
export class CmHasFooter {

    constructor(el: ElementRef,
                renderer: Renderer) {
        renderer.setElementClass(el.nativeElement, 'cambio-ion-content', true);
        // events.publish('footer:show');
        // console.log('footer:show')
    }
}
