import { Injectable } from '@angular/core';
import { FileItem, ItemType } from './models/fileItem'
import { FileManagerApiService } from './filemanager.apiService';

@Injectable()
export class FileManagerService {

  constructor(private apiService:FileManagerApiService) 
  {
    this.setList("");
    this.selected = this.rootItem;
    this
  }

  keyPressed: any;

  tempSelection: FileItem[] = [];
  rootItem: FileItem;
  selected: FileItem;

  setList(path: string) {
    let fm = new FileItem();
    fm.name = "Root";
    fm.id = "qwqw";
    fm.path = "/";
    fm.subItems = [];
    fm.subItems.push({ name: "root folder1", type: ItemType.Folder })
    fm.subItems.push({ name: "root folder2", type: ItemType.Folder })
    fm.subItems.push({ name: "root folder3", type: ItemType.Folder })
    let nm = { name: "large files", type: ItemType.Folder, subItems: [] };
    nm.subItems = [
      {
        "id": "5a68b3c6b0207202f1ade32d",
        "name": "Sally",
        "type": 2,
        "subItems": [
          {
            "id": "5a68b3c6f161ab1a1c5fa9c7",
            "name": "Reed",
            "type": 2
          },
          {
            "id": "5a68b3c62858842082875484",
            "name": "Paulette",
            "type": 2
          },
          {
            "id": "5a68b3c6c54b90191b66d5bf",
            "name": "Ingrid",
            "type": 1
          }
        ]
      },
      {
        "id": "5a68b3c6ca51899b7e63c273",
        "name": "Abbott",
        "type": 1,
        "subItems": [
          {
            "id": "5a68b3c762aada0fd53f9990",
            "name": "Lindsay",
            "type": 2
          },
          {
            "id": "5a68b3c72c6caef063de1d9a",
            "name": "Ortega",
            "type": 1
          },
          {
            "id": "5a68b3c78f011a3ced6a20fc",
            "name": "Shelby",
            "type": 1
          }
        ]
      },
      {
        "id": "5a68b3c7ec6e688d2388f7bd",
        "name": "Marisa",
        "type": 2,
        "subItems": [
          {
            "id": "5a68b3c8e0065a0379223edf",
            "name": "Baker",
            "type": 1
          },
          {
            "id": "5a68b3c87d33cc7542b0b3f4",
            "name": "Malinda",
            "type": 1
          },
          {
            "id": "5a68b3c89bbfc8cef2f88682",
            "name": "Carla",
            "type": 1
          }
        ]
      },
      {
        "id": "5a68b3c82643aa85e7464cd7",
        "name": "Georgina",
        "type": 2,
        "subItems": [
          {
            "id": "5a68b3c876274f475357ffd1",
            "name": "Stevenson",
            "type": 1
          },
          {
            "id": "5a68b3c8fa55d3945bdd24d3",
            "name": "Walters",
            "type": 1
          },
          {
            "id": "5a68b3c8da072cef0efaf56d",
            "name": "Melisa",
            "type": 2
          }
        ]
      },
      {
        "id": "5a68b3c8cc817f8158a7bbc1",
        "name": "Hanson",
        "type": 2,
        "subItems": [
          {
            "id": "5a68b3c8f256c8628e1a0811",
            "name": "Adele",
            "type": 1
          },
          {
            "id": "5a68b3c86070378fa8c9c1be",
            "name": "Stanley",
            "type": 2
          },
          {
            "id": "5a68b3c8d0de68cdd72b1ae3",
            "name": "Stone",
            "type": 1
          }
        ]
      },
      {
        "id": "5a68b3c83f9b559153c43d07",
        "name": "Rosalind",
        "type": 2,
        "subItems": [
          {
            "id": "5a68b3c8a104b7273b0f8460",
            "name": "Dorothy",
            "type": 2
          },
          {
            "id": "5a68b3c8a52478c23b8b20e9",
            "name": "Nona",
            "type": 1
          },
          {
            "id": "5a68b3c8b1479757f0ad476e",
            "name": "Lessie",
            "type": 2
          }
        ]
      },
      {
        "id": "5a68b3c882e7961ec3dc6d47",
        "name": "Olivia",
        "type": 2,
        "subItems": [
          {
            "id": "5a68b3c896cb9b4b614622a8",
            "name": "Payne",
            "type": 1
          },
          {
            "id": "5a68b3c8e26dca08522b9491",
            "name": "Patsy",
            "type": 1
          },
          {
            "id": "5a68b3c81c5526b1f084c2ae",
            "name": "Hood",
            "type": 2
          }
        ]
      },
      {
        "id": "5a68b3c8259e691bab2cbb6e",
        "name": "Mccoy",
        "type": 2,
        "subItems": [
          {
            "id": "5a68b3c8b304249d9255db73",
            "name": "Kara",
            "type": 2
          },
          {
            "id": "5a68b3c8e27f3c7dc61b9cb9",
            "name": "Alyce",
            "type": 2
          },
          {
            "id": "5a68b3c8489aac47004bfeba",
            "name": "Beth",
            "type": 2
          }
        ]
      }
    ];
    fm.subItems.push(nm);

    this.rootItem = fm;
  }

  public setSelected(node: FileItem) {
    this.selected = node;
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
      node.isOpen=!node.isOpen;
  }

}