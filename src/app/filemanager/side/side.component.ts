import { Component, OnInit } from '@angular/core';
import { FileManagerService } from '../filemanager.service'
import {FileItem,ItemType} from '../models/fileItem'
import { BaseComponent } from '../baseComponent';


@Component({
    selector: 'filemanager-dir-tree',
    templateUrl: 'side.html',
    styleUrls:['tree.css']
})

export class FileManagerDirTreeComponent  implements OnInit {
    constructor(public fms:FileManagerService ) { }
   
    
    ngOnInit() { }
}