import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { ConfirmComponent } from 'src/app/dialog/confirm/confirm.component';
import { AuthService } from 'src/app/service/auth.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {

    currentPage:String='';
    isAuth?:any=this.authService.isAuth;
    // role?:any=this.authService.getRolel()
    role:any=""
    constructor(public authService:AuthService,private matDialog:MatDialog,public activated:ActivatedRoute,public location:Location){
      this.isAuth=this.authService.isAuth;


      // this.role=this.authService.getRolel()



    }
    ngOnInit(): void {
      //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
      //Add 'implements OnInit' to the class.
      // this.role=this.authService.getRolel()
      this.isAuth=this.authService.isAuth;
      this.authService.getRoleForNavBar().subscribe((value)=>{
        this.role=""

        this.role=value;
      })
      if(this.location.path()=='/accueil'){
        this.currentPage='Accueil'
      }
      if(this.location.path()=='/ticket'){
        this.currentPage='ticket'
      }
      if(this.location.path()=='/add-ticket'){
        this.currentPage='add-t'
      }
      if(this.location.path()=='/contact'){
        this.currentPage='contact'
      }
      if(this.location.path()=='/list'){
        this.currentPage='admin'
      }
    }
    ngOnDestroy(): void {
      //Called once, before the instance is destroyed.
      //Add 'implements OnDestroy' to the class.
      this.role=""
    }

    logOut(){
      this.authService.deleteId()
    }

    changeCurrentPage(label:String){
      this.currentPage=label;
    }

    onpenConfirm(){
      this.matDialog.open(ConfirmComponent,{
        data:{
          text:'mon text'
        }
      })
    }
}
