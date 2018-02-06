import { Component, OnInit } from '@angular/core';
import { FileManagerService } from './filemanager.service'
@Component({
    selector: 'base-compo',
    template: 'name.component.html'
})

export class BaseComponent   {
    constructor(public fms:FileManagerService ) { }

     
}