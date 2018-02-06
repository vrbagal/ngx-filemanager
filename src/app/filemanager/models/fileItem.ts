export enum ItemType {
    Folder =2,
    File = 1
}
export class FileItem {
    id?: string;
    name: string;
    type: ItemType;
    path?: string;
    subItems?: FileItem[];
    isOpen?:boolean
    isSelected?:boolean
}

