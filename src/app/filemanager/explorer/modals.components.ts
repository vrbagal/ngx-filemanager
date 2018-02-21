import { Component } from '@angular/core';
import { DialogComponent, DialogService } from "../ng-bs-modal";

export interface BaseDialogModel
{
    title:string;

}

export interface RenameModel extends BaseDialogModel{
  name:string;
}
@Component({  
    selector: 'rename',
    template: `<div class="modal-dialog">
                <div class="modal-content">
                   <div class="modal-header">
                     <button type="button" class="close" (click)="close()" >&times;</button>
                     <h4 class="modal-title">{{title || 'Confirm'}}</h4>
                   </div>
                   <div class="modal-body">
                   <form class="form-horizontal" role="form">
                   <div class="form-group">
                     <label  class="col-sm-2 control-label"
                               for="inputName">Name</label>
                     <div class="col-sm-10">
                         <input type="text" class="form-control"  [(ngModel)]="name" name="name"
                         id="inputName" placeholder="new name"/>
                     </div>
                   </div>                    
                 </form>
                   </div>
                   <div class="modal-footer">
                     <button type="button" class="btn btn-primary" (click)="rename()">OK</button>
                     <button type="button" class="btn btn-default" (click)="close()" >Cancel</button>
                   </div>
                 </div>
              </div>`
})
export class RenameComponent extends DialogComponent<RenameModel, string> implements RenameModel {
    name: string;
  title: string="Rename";
  
  constructor(dialogService: DialogService) {
    super(dialogService);
  }
  rename() {
      if (this.name==""   ) return ;
    this.result = this.name;
    this.close();
  }
}