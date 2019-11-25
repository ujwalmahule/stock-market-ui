import { Component, OnInit } from '@angular/core';
import { FormGroupDirective, FormGroup } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-import-data',
  templateUrl: './import-data.component.html',
  styleUrls: ['./import-data.component.css']
})
export class ImportDataComponent implements OnInit {

  loading = false;
  fileToUpload: File;

  constructor(private http: HttpClient, private snackbar : MatSnackBar) { }

  ngOnInit() {
  }

  fileSelected(files: FileList) {
    this.fileToUpload = files.item(0); 
  }

  onSubmit() {
    this.loading = true;
    var config = {
      headers: {'Content-Type': undefined},
      transformRequest: []
    };

    let data = new FormData(); 
    data.append('file', this.fileToUpload, this.fileToUpload.name); 
    console.log(data);

    let api = this.http.post(`${environment.gatewayUrl}/upload-service`, data);
    api.subscribe(
      (response) => {
        console.log("todo display results");
        console.log(response);
        this.loading = false;
      },
      (error) => {
          let errorMessage: string;
          this.loading = false; 
          if(error.error && error.error.message) {
            errorMessage = "Error:" + error.error.message;
          } else {
            errorMessage = "Error occured while uploading, please try again after some time.";
            console.log(error);
          }
          this.snackbar.open(errorMessage);
      }
    );
  }
}
