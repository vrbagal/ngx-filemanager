import { NgModule } from '@angular/core';

 import {} from './explorer';
 import {FileManagerComponent} from './filemanager.component'
 import {FileManagerService} from './filemanager.service'
 import {FileManagerApiService} from './filemanager.apiService'
 import {TreeNodeComponent,TreeFolderFilterPipe} from './side/tree.component'
 import {FileManagerDirTreeComponent} from './side/side.component'
import { CommonModule } from '@angular/common';
import {ExplorerComponent} from './explorer/explorer.component'
import {ContextMenuModule} from 'ngx-contextmenu'
@NgModule({
    imports: [CommonModule,ContextMenuModule.forRoot() ],
    exports: [FileManagerComponent],
    declarations: [FileManagerComponent,TreeNodeComponent,FileManagerDirTreeComponent,TreeFolderFilterPipe,ExplorerComponent],
    providers: [FileManagerService,FileManagerApiService],
})
export class FileManagerModule { }
