import { Injectable } from '@angular/core';
import { FileItem, ItemType } from './models/fileItem'
import { FileManagerApiService } from './filemanager.apiService';
import { FilemanagerConfig } from './filemanager.config';
import { DialogService } from './ng-bs-modal';
import { RenameComponent } from './explorer/modals.components';

@Injectable()
export class FileManagerService {

  constructor(private apiService:FileManagerApiService,private dialogService:DialogService) 
  {
    this.selected=new FileItem();
    
    this.setRoot();     
  }

  _config=FilemanagerConfig.getConfig();

  keyPressed: any;

  tempSelection: FileItem[] = [];
  rootItem: FileItem=new FileItem();
  selected: FileItem
  headerData:any=[];
  
  setRoot() {

      let fm = new FileItem();
      fm.name =this._config.rootPath;
      fm.id = "qwqw";
      fm.path =  "" ;
      this.rootItem = fm;
      this.setSelected(this.rootItem)
    
  }

  private getUUID()
  {
    return Math.random().toString(36).substring(2) + (new Date()).getTime().toString(36);               
  }

  private mapSubItems(data:any,node:FileItem)
  {
    return  data.map(x=> {return{ id:this.getUUID(), name:x.name,type:x.type,path:node.path+'\\'+x.name,subItems:[],parent:node}});
  }

  public setSelected(node: FileItem) {
    this.selected = node;
    node.isOpen=true;
    this.getSubItems(node);
    this.setHeader(node );
  }

  private setHeader(node:FileItem)
  {      
    this.headerData =[];
    let tempHeaders=[]
    let currentNode=node;
    
    while(currentNode)
    {      
      tempHeaders.push({name:(currentNode.parent?currentNode.name:"Root"),isActive:(node==currentNode),node:currentNode})
      currentNode=currentNode.parent;
    }    

    while(tempHeaders.length) this.headerData.push(tempHeaders.pop());    
  }

  public setExSelected(e, item) {
    let event =e;

    if (e.event)
    {
      event=e.event;
      item=e.item;
    }
    
    if(this.tempSelection.length &&  event.button==2 && this.isExSelected(item))
    return;

    if (!event.ctrlKey && !event.shiftKey )
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

  public toggleExpand(node)
  {
     //
     this.setSelected(node);
  }

  private getSubItems(node)
  {
    this.apiService.getList(node.path).subscribe((data:any)=>{
      node.subItems=this.mapSubItems(data.result,node)
    });
  }

  public rename(node)
  {    
     this.dialogService.addDialog(RenameComponent, {name:node.name})
      .subscribe((newName)=>{          
          this.apiService.rename(node.path,newName).subscribe(res=>{
            if(res.result.success)
            {
              this.setSelected(this.selected);
            }
          });
      });
  
  }

}