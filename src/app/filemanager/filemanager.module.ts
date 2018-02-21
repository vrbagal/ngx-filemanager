import { NgModule } from '@angular/core';

 import {FormsModule} from '@angular/forms'
 import {FileManagerComponent} from './filemanager.component'
 import {FileManagerService} from './filemanager.service'
 import {FileManagerApiService} from './filemanager.apiService'
 import {TreeNodeComponent,TreeFolderFilterPipe} from './side/tree.component'
 import {FileManagerDirTreeComponent} from './side/side.component'
import { CommonModule } from '@angular/common';
import {ExplorerComponent} from './explorer/explorer.component'
import {ContextMenuModule} from 'ngx-contextmenu'
import { HttpModule } from '@angular/http';
import {FilemanagerHeaderComponent} from './header/header.component'
import {BootstrapModalModule} from './ng-bs-modal'
import { getHostElement } from '@angular/core/src/render3';
import { RenameComponent } from './explorer/modals.components';

@NgModule({
    imports: [CommonModule,ContextMenuModule.forRoot(),HttpModule ,FormsModule,
        BootstrapModalModule
    ],
    exports: [FileManagerComponent],
    declarations: [FileManagerComponent,
        TreeNodeComponent,
        FileManagerDirTreeComponent,
        TreeFolderFilterPipe,
        ExplorerComponent,
        FilemanagerHeaderComponent,RenameComponent
    ],
    providers: [FileManagerService,FileManagerApiService],
    entryComponents :[
        RenameComponent
    ]
})
export class FileManagerModule { }
