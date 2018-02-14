import { Injectable } from '@angular/core';
import { FileItem, ItemType } from './models/fileItem'
import { FileManagerApiService } from './filemanager.apiService';
import { FilemanagerConfig } from './filemanager.config';

@Injectable()
export class FileManagerService {

  constructor(private apiService:FileManagerApiService) 
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
    
    this.apiService.getList("").subscribe((data:any)=>{      
      let fm = new FileItem();
      fm.name =this._config.rootPath;
      fm.id = "qwqw";
      fm.path =  this._config.rootPath ;
      this.rootItem = fm;
      this.setSelected(this.rootItem)
       
    });
  }

  private mapSubItems(data:any,path:string)
  {
    return  data.map(x=> {return{ name:x.name,type:x.type,path:path+'\\'+x.name,subItems:[]}});
  }

  public setSelected(node: FileItem) {
    this.selected = node;
    node.isOpen=true;
    this.getSubItems(node);
    this.setHeader(node.path);
  }

  private setHeader(path:string)
  { 
    var pathStrings=path.replace(this._config.rootPath,"").trim().split("\\").map(x=> {
      if(x)
      return x;
    });
    var paths =pathStrings.map((val,index)=>{       
      return {fullPath:path.substring(0,path.indexOf(val)),name:val,isActive:(index==pathStrings.length-1)}
    });

    this.headerData=paths;
  }

  public setExSelected(event, item) {
    if (event.event && event.event.button == 2)
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

  public toggleExpand(node)
  {
     //
     this.setSelected(node);
  }
  private getSubItems(node)
  {
    this.apiService.getList(node.path).subscribe((data:any)=>{
      node.subItems=this.mapSubItems(data.result,node.path)
    });
  }

}