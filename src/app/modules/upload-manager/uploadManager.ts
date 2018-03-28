import { Observable } from 'rxjs/Rx';
import { catchError, map, tap } from 'rxjs/operators';
import { of } from 'rxjs/observable/of';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

import {environment} from '../../../environments/environment'
import { imgPathResponse } from '../../components/add/add.component';
import { Injectable } from '@angular/core';

export abstract class UploadManager {
    constructor() {
        
    }

    public static upload(http: HttpClient, fileList: any, imgPathRes: imgPathResponse){
        if (fileList.length > 0) {
            let file = fileList[0];
            
            // build body as form data
            let formData: FormData = new FormData();
            formData.append('uploadFile', file, file.name);
            
            // url to send request
            let apiUrl1 = environment.reqUrl + "/api/Upload/Image";
      
      
            if (formData) console.log(file);
            
            // post data to server
            http.post(apiUrl1, formData)
              .catch(error => Observable.throw(error))
              .subscribe(
                data => {
                  
                  // get image Guid from response
                  imgPathRes.value = data;
                  console.log(imgPathRes);
      
                },
                error => console.log(error)
              )
          }
    }
} 

    