import { Component } from '@angular/core';
import { Location } from '@angular/common';
import { AdminService } from 'src/app/service/admin/service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar-admin',
  templateUrl: './navbar-admin.component.html',
  styleUrls: ['./navbar-admin.component.scss']
})
export class NavbarAdminComponent {


  componentView:string="";

  constructor(public location:Location,public service:AdminService,public router:Router){}

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    let url=this.location.path().split("/")[1];
    if(this.location.path()=="/admin"  || url=="detail-technicien"){
      this.componentView="liste";
    }
    if(this.location.path()=="/utilisateur" || url=="detail-user"){
      this.componentView="utilisateur";
    }
    if(this.location.path()=="/add-technicien"){
      this.componentView="add";
    }
    if(this.location.path()=="/admin-ticket/admin"){
      this.componentView="liste-ticket"
    }
    if(this.location.path()=="/stat"){
      this.componentView="stat"
    }
  }

  changeMenu(label:string){
    this.componentView=label;
  }

  deconnexion(){
    this.service.deleteSession();
    this.service.isAuth=false;
    setTimeout(()=>{
      this.router.navigateByUrl("/")
    },1000)
  }


}
