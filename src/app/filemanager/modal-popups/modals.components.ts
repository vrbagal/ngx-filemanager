
import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'rename-modal',
  template:`
  <div class="modal-header">
  <button type="button" class="close" (click)="close()" >&times;</button>
  <h4 class="modal-title">{{title || 'Confirm'}}</h4>
</div>     
<div class="modal-body" >
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
<button type="button" class="btn btn-primary" (click)="bsModalRef.hide()">OK</button>
<button type="button" class="btn btn-default" (click)="fms.close()" >Cancel</button>
</div>        
  `
})
export class ModelPopupsComponent  {
  newName:string   
  constructor(private modalService: BsModalService) {}
 
  openModal(template: TemplateRef<any>) {
    return this.modalService.show(template);
  }
}