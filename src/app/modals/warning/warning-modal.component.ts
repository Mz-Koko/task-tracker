import {Component, EventEmitter, Inject, Output} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-warning',
  templateUrl: './warning-modal.component.html',
  styleUrls: ['./warning-modal.component.scss']
})
export class WarningModalComponent {
  confirmText = '';
  buttonText: string[];
  @Output() taskDeleted = new EventEmitter<any>();

  constructor(public dialogRef: MatDialogRef<WarningModalComponent>,
              @Inject(MAT_DIALOG_DATA) public data:  { confirmText?: string, customIcon?: string,
                hasConfirmInput: false, title: string, buttonText?: [string, string], subtitle: string}) {
    this.buttonText = ['Cancel', 'Confirm'];
    if(data.buttonText) {
      this.buttonText = data.buttonText;
    }
  }

  deleteTask() {
    this.dialogRef.close('confirm');
  }
}
