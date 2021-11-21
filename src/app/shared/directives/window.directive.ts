import { Directive, ViewContainerRef, Input, ComponentFactoryResolver, OnInit } from '@angular/core';
import { WindowData } from '../interfaces';
import { WindowDataInjector } from '../services/window.service';

@Directive({
    selector: '[appWindow]'
})
export class WindowDirective implements OnInit {
    @Input() appWindow!: WindowData;

    constructor(
        public viewContainerRef: ViewContainerRef,
        private componentFactoryResolver: ComponentFactoryResolver
    ) { }

    ngOnInit(): void {
        const componentFactory = this.componentFactoryResolver.resolveComponentFactory(this.appWindow.componente);
        const viewContainerRef = this.viewContainerRef;
        viewContainerRef.clear();
        const componentRef = viewContainerRef.createComponent(componentFactory);
        componentRef.instance.windowData = this.appWindow;
    }
}
