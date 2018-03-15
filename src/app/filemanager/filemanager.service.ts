import { Injectable, ViewChild, EventEmitter } from '@angular/core';
import { FileItem, ItemType } from './models/fileItem'
import { FileManagerApiService } from './filemanager.apiService';
import { FilemanagerConfig } from './filemanager.config';
import { DialogService } from './ng-bs-modal';
import 'rxjs/add/operator/catch';
import { ModelPopupsComponent } from './modal-popups/modals.components';
import { BsModalService, ModalOptions } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { Response } from '@angular/http';
import 'rxjs/Rx' ;

import { UploadOutput, UploadInput, UploadFile, humanizeBytes, UploaderOptions } from 'ngx-uploader';
import { FileUploadModalComponent } from './upload/fileUpload.component';

@Injectable()
export class FileManagerService {

  
  constructor(private apiService: FileManagerApiService, private modalService: BsModalService, private toast: ToastrService) {
    this.selected = new FileItem();

    this.setRoot();
  }

  _config = FilemanagerConfig.getConfig();

  keyPressed: any;

  currentPath:string;
  tempSelection: FileItem[] = [];
  rootItem: FileItem = new FileItem();
  selected: FileItem
  headerData: any = [];
  public IsListMode=false;

//upload 
options: UploaderOptions;
formData: FormData;
files: UploadFile[];
uploadInput: EventEmitter<UploadInput>;
humanizeBytes: Function;
dragOver: boolean;

  setRoot() {

    let fm = new FileItem();
    fm.name = this._config.rootPath;
    fm.id = "qwqw";
    fm.path = "";
    this.rootItem = fm;
    this.setSelected(this.rootItem)

  }
public toggleView(){
  this.IsListMode=!this.IsListMode;
}

  private getUUID() {
    return Math.random().toString(36).substring(2) + (new Date()).getTime().toString(36);
  }

  private mapSubItems(data: any, node: FileItem) {
    return data.map(x => { return { 
      id: this.getUUID(),
      name: x.name,
      type: x.type, 
      path: node.path + '\\' + x.name, 
      subItems: [], 
      parent: node,
      size:x.size,
      dtCreated:x.dtCreated
     } });
  }

  public setSelected(node: FileItem) {
    
 
    if(node.type=='file')
    return this.handleFileDblClick(node);
    
    this.currentPath=node.path;

    this.selected = node;
    node.isOpen = true;
    this.getSubItems(node);
    this.setHeader(node);
  }

  handleFileDblClick(node: FileItem) {
    throw new Error("Method not implemented.");
  }

  private setHeader(node: FileItem) {
    this.headerData = [];
    let tempHeaders = []
    let currentNode = node;

    while (currentNode) {
      tempHeaders.push({ name: (currentNode.parent ? currentNode.name : "Root"), isActive: (node == currentNode), node: currentNode })
      currentNode = currentNode.parent;
    }

    while (tempHeaders.length) this.headerData.push(tempHeaders.pop());
  }

  public setExSelected(e, item) {
    let event = e;

    if (e.event) {
      event = e.event;
      item = e.item;
    }

    if (this.tempSelection.length && event.button == 2 && this.isExSelected(item))
      return;

    if (!event.ctrlKey && !event.shiftKey)
      this.tempSelection = [];

    if (event.shiftKey) {

    }

    if (this.isExSelected(item))
      this.tempSelection.splice(this.tempSelection.indexOf(item), 1);
    else
      this.tempSelection.push(item);
  }

  public isExSelected(item) {
    if (this.tempSelection)
      return this.tempSelection.indexOf(item) > -1;
    else
      return false;
  }

  public toggleExpand(node) {
    node.isOpen = !node.isOpen;
    if (node != this.selected)
      this.setSelected(node);
  }

  private getSubItems(node: FileItem) {
    node.isLoadingsubItems = true;
    this.apiService.getList(node.path).subscribe((data: any) => {
      node.subItems = this.mapSubItems(data.result, node)
      node.isLoadingsubItems = false;
    }, () => {
      node.isLoadingsubItems = false;
    });
  }

  //confirmation dialog

  public msg="";

   


  // rename 
  public bsModalRef: any;
  public newName: string;
  nodePath: string;

  public rename(node, template) {
    this.newName = node.name;
    this.nodePath = node.path;
    this.bsModalRef = this.modalService.show(template);
  }

  public doRename() {
    if (this.bsModalRef && this.newName) {
      this.apiService.rename(this.nodePath, this.newName).subscribe(res => {
        if (res.result.success) {
          this.setSelected(this.selected);
          this.bsModalRef.hide();
          this.toast.success("Rename successfull");
        }}, (error) => {this.toast.error(error);});
    }

  }

  public download()
  {
    let itemsToDownLaod= this.tempSelection.map(x=> x.path);
    this.apiService.download(itemsToDownLaod).subscribe((data:Response)=> {
      this.downLoadFile(data);
    })
  }

  private downLoadFile(data)
  { 
    var a = document.createElement("a");
    var fo= new Blob([data._body]);
    a.href = URL.createObjectURL(fo)
    a.download = "downLoaded";    
    a.click();    
  }

  public deleteNode(template)
  {
    
    let itemsToDelete= this.tempSelection.map(x=> x.path);
    if(this.tempSelection.length==1)  
    this.msg=`Do you want delete ${this.tempSelection[0].name} ?` ;
    else
    this.msg="Do you want to delete selected items ?"
   this.bsModalRef= this.modalService.show(template);
  }

  public deleteConfirmed()
  {
    let itemsToDelete= this.tempSelection.map(x=> x.path);

    this.apiService.delete(itemsToDelete).subscribe(res => {
      if (res.result.success) {
        this.setSelected(this.selected);
        this.bsModalRef.hide();
        this.toast.success("file(s) Deleted successfully");
      }}, (error) => {this.toast.error(error);});
  }

  //upload methods 
  public uploadPopup(template){
    this.files = []; 
    this.uploadInput = new EventEmitter<UploadInput>(); 
    this.humanizeBytes = humanizeBytes;
   let initialState= {
      options:this.options,
      onUploadOutput:this.onUploadOutput,
      uploadInput:this.uploadInput,
      currentpath:this.currentPath,
      startUpload:this.startUpload,
      files:this.files
    }
    this.bsModalRef = this.modalService.show(FileUploadModalComponent,{initialState });
  }

  public onUploadOutput(output: UploadOutput): void {
    if (output.type === 'allAddedToQueue') { // when all files added in queue
      // uncomment this if you want to auto upload files when added
      // const event: UploadInput = {
      //   type: 'uploadAll',
      //   url: '/upload',
      //   method: 'POST',
      //   data: { foo: 'bar' }
      // };
      // this.uploadInput.emit(event);
    } else if (output.type === 'addedToQueue'  && typeof output.file !== 'undefined') { // add file to array when added
      this.files.push(output.file);
    } else if (output.type === 'uploading' && typeof output.file !== 'undefined') {
      // update current data in files array for uploading file
      const index = this.files.findIndex(file => typeof output.file !== 'undefined' && file.id === output.file.id);
      this.files[index] = output.file;
    } else if (output.type === 'removed') {
      // remove file from array when removed
      this.files = this.files.filter((file: UploadFile) => file !== output.file);
    } else if (output.type === 'dragOver') {
      this.dragOver = true;
    } else if (output.type === 'dragOut') {
      this.dragOver = false;
    } else if (output.type === 'drop') {
      this.dragOver = false;
    }
  }

  public startUpload(): void {
    const event: UploadInput = {
      type: 'uploadAll',
      url: '/upload',
      method: 'POST',
      data: { foo: 'bar' }
    };

    this.uploadInput.emit(event);
  }

  cancelUpload(id: string): void {
    this.uploadInput.emit({ type: 'cancel', id: id });
  }

  removeFile(id: string): void {
    this.uploadInput.emit({ type: 'remove', id: id });
  }

  removeAllFiles(): void {
    this.uploadInput.emit({ type: 'removeAll' });
  }

}