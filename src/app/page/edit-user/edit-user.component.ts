import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { UserModel } from 'src/app/model/user';
import { ServiceService } from 'src/app/service/service.service';
@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.scss']
})
export class EditUserComponent {

    fg?:FormGroup
    constructor(@Inject(MAT_DIALOG_DATA) public data:UserModel,public fb:FormBuilder,public service:ServiceService,public modal:MatDialog){

      this.fg=this.fb.group({
        name:[this.data?this.data.name:'',Validators.required],
        adresse:[this.data?this.data.adresse:'',Validators.required],
        number:[this.data?this.data.number:'',Validators.required]
      })
    }

    update(){
      this.data.name=this.fg!.value['name'];
      this.data.adresse=this.fg!.value['adresse'];
      this.data.number=this.fg!.value['number'];
      this.service.updateUser(this.data).subscribe((value)=>{
        this.data=UserModel.fromJson(value)
        this.modal.closeAll()
      })

    }

    close(){
      this.modal.closeAll()
    }
}
