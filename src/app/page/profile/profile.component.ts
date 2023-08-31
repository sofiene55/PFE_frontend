import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmComponent } from 'src/app/dialog/confirm/confirm.component';
import { UserModel } from 'src/app/model/user';
import { TechnicienService } from 'src/app/service/admin/admin.service';
import { AuthService } from 'src/app/service/auth.service';
import { ServiceService } from 'src/app/service/service.service';
import { EditUserComponent } from '../edit-user/edit-user.component';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent {

  user?:UserModel

  constructor(public service:TechnicienService,public auth:AuthService,public dialog:MatDialog){
    this.service.getUserInfo(this.auth.getId()).subscribe((value)=>{
      this.user=UserModel.fromJson(value)
    })
  }

  logOut(){
    this.dialog.open(ConfirmComponent)
  }

  edit(){
    let dialogRef_=this.dialog.open(EditUserComponent,{
      data:this.user
    })

    dialogRef_.afterClosed().subscribe((data:UserModel)=>{
      // this.user=data
    })




  }

  afterClose(){

  }

}
