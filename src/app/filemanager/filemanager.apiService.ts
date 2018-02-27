import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { ReturnStatement } from '@angular/compiler';
import { FilemanagerConfig } from './filemanager.config'
import { HttpClient } from 'selenium-webdriver/http';

@Injectable()
export class FileManagerApiService {
    private _config = FilemanagerConfig.getConfig();

    constructor(private http: Http) { }

    
    getUrl(methodName: string) {
        return `${this._config.apBaseiUrl}${methodName}?rootpath=${this._config.rootPath}`;
    }

    getList(path: string) {      
        
        return this.http.post(this.getUrl(this._config.listAction), { "path": path }).map(x=> x.json());
    };

    copyFromTo(fromPath: string, toPath: string, isMove: boolean) {
        return this.http.post(this.getUrl('/copy'), { 'fromPath': fromPath, 'toPath': toPath, 'isMove': isMove });
    };

    compress(items: string[], compressedFileName: string) {
        return this.http.post(this.getUrl('/compress'), { 'items': items, 'outFile': compressedFileName });
    }

    download(items: string[]) {
        return this.http.post(this.getUrl('/download'), { 'items': items });
    }

    delete(items: string[]) {
        return this.http.post(this.getUrl('/delete'), { 'items': items }).map(x=> x.json());;
    }

    rename(path:string,newName:string)
    {
        debugger
        return this.http.post(this.getUrl('/rename'),{item:path,newItemPath:newName}).map(x=> x.json());        
    }





}