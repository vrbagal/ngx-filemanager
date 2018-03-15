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
 
import {ModalModule} from 'ngx-bootstrap/modal'
import { ModelPopupsComponent } from './modal-popups/modals.components';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { ToastrModule } from 'ngx-toastr';

import {FileSizePipe} from './pipes/file-size.pipe'
import { NgUploaderModule } from 'ngx-uploader';
import { FileUploadModalComponent } from './upload/fileUpload.component';


@NgModule({
    imports: [CommonModule,ContextMenuModule.forRoot(),HttpModule ,FormsModule,
        ModalModule.forRoot(),BrowserAnimationsModule,ToastrModule.forRoot() ,NgUploaderModule       
    ],
    exports: [FileManagerComponent],
    declarations: [FileManagerComponent,
        TreeNodeComponent,
        FileManagerDirTreeComponent,
        TreeFolderFilterPipe,
        ExplorerComponent,
        FilemanagerHeaderComponent,ModelPopupsComponent,FileSizePipe,FileUploadModalComponent
    ],
    providers: [FileManagerService,FileManagerApiService]   ,
    entryComponents:[FileUploadModalComponent] 
})
export class FileManagerModule { }
