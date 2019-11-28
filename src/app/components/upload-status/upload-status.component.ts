import { UploadStatusDialogComponent } from './../../component/upload-status-dialog/upload-status-dialog.component';
import { FileStatusModel } from './../../model/file-status-model';
import { Component, OnInit, AfterViewInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatSnackBar } from '@angular/material/snack-bar';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-upload-status',
  templateUrl: './upload-status.component.html',
  styleUrls: ['./upload-status.component.css']
})
export class UploadStatusComponent implements OnInit, AfterViewInit {

  displayedColumns: string[] = ['fileName', 'status', 'details'];
  files = new MatTableDataSource<FileStatusModel>();

  constructor(private dialog: MatDialog, private httpClient: HttpClient, private snackbar : MatSnackBar) { }

  ngOnInit() {
    
  }

  ngAfterViewInit() {
    this.refresh();
  }

  detailsOf(row) {
    this.dialog.open(UploadStatusDialogComponent, {width:'450px', data:row});
  }

  refresh() {
    if(!this.loading) {
      this.getData();      
    }
  }

  error: boolean;
  loading: boolean = false;
  errorMessage: string;
  getData() {
    this.loading = true;
    this.error = false;

    let api = this.httpClient.get(`${environment.gatewayUrl}/stock-market-service/upload-status/`);
    api.subscribe(
      (response: FileStatusModel[]) => {
        this.loading = false;
        this.files.data = response;
      }, 

      (error) => {
        this.loading = false;
        this.error = true;
        if(error.error && error.error.message) {
          this.errorMessage = "Error:" + error.error.message;
        } else {
          this.errorMessage = "Error occured while calling service.";
        }
        this.snackbar.open(this.errorMessage);
      }
    );
  }
}
