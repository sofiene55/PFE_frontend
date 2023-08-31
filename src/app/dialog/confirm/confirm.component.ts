import { Dialog } from '@angular/cdk/dialog';
import { Component } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-confirm',
  templateUrl: './confirm.component.html',
  styleUrls: ['./confirm.component.scss']
})
export class ConfirmComponent {
  text:any;
  constructor(public data: Dialog ,public dialog:MatDialog, private authService:AuthService,public route:Router ){
    this.text=data;
  }

  close(){
    this.dialog.closeAll()
  }

  logOut(){
    console.log("log out")
    this.authService.deleteId()
    this.authService.deleteRole()
    this.authService.deleteSession()
    this.dialog.closeAll()
    this.authService.isAuth=false;
    this.authService.userRole=undefined;
    this.route.navigateByUrl('/accueil')
  }
}
