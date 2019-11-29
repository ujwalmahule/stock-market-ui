import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ExchangeModel } from './../../model/exchange-model';
import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-exchange-editor-dialog',
  templateUrl: './exchange-editor-dialog.component.html',
  styleUrls: ['./exchange-editor-dialog.component.css']
})
export class ExchangeEditorDialogComponent implements OnInit {

  newExchange: boolean = false
  editMode: boolean = false
  editorForm: FormGroup 

  constructor(private fb : FormBuilder, private dialogRef: MatDialogRef<ExchangeEditorDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ExchangeModel) { }

  ngOnInit() {
    if(this.data == null) {
      this.newExchange = true;
      this.editMode = true;
    }

    this.editorForm = this.fb.group({
      code:['', Validators.required],
      brief:['', Validators.required],
      address:['', Validators.required],
      remarks:['']
    })

    if(!this.newExchange) {
      this.editorForm.get('code').setValue(this.data.code);
      this.editorForm.get('brief').setValue(this.data.brief);
      this.editorForm.get('address').setValue(this.data.address);
      this.editorForm.get('remarks').setValue(this.data.remarks);
    }
  }

  cancel() {
    this.dialogRef.close();
  }

  createNewExchange() {

  }

  updateExchange() {

  }

  performAction() {
    if(this.newExchange) {
      this.createNewExchange();
    } else if(this.editMode) {
      this.updateExchange();
    } else {
      this.editMode = true;
    }
  }

  hasError = (controlName: string, errorName: string) => {
    return this.editorForm.controls[controlName].hasError(errorName);
  }
}
