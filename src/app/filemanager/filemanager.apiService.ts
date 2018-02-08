import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { ReturnStatement } from '@angular/compiler';

@Injectable()
export class FileManagerApiService {
    constructor(private http: Http) { }

    rootPath:string;
    apiUrl:string;

    getUrl(methodName:string)
    {
        return `${this.apiUrl}?actionName=${methodName}&rootpath=${this.rootPath}`;
    }

    getList(path:string){
        return this.http.get(`${this.getUrl('list')}&path=${path}`);
    };

    copyFromTo(fromPath:string,toPath:string,isMove:boolean){
        return this.http.post(this.getUrl('copy'),{'fromPath':fromPath,'toPath':toPath,'isMove':isMove});
    };

    compress(items:string[],compressedFileName:string)
    {
        return this.http.post(this.getUrl('compress'),{'items':items,'outFile':compressedFileName});
    }



    
}