import { Component,Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { AdminService } from 'src/app/service/admin/service.service';

@Component({
  selector: 'app-modal-delete',
  templateUrl: './modal-delete.component.html',
  styleUrls: ['./modal-delete.component.scss']
})
export class ModalDeleteComponent {
    label:string=""
    constructor(@Inject(MAT_DIALOG_DATA) public data:any,
    public dialogRef:MatDialogRef<ModalDeleteComponent>,
    public modal:MatDialog,public service:AdminService
  ){
    this.label=this.data['type'];
  }


  close(){
    this.modal.closeAll()
  }

  confirmer(){

      this.service.delteTechnicien(this.data['id'],this.label).subscribe((value)=>{
        this.data['result']="OK";
        this.dialogRef.close({data:{'result':'SUPPRIMER','type':this.label}})

      });






  }

}
