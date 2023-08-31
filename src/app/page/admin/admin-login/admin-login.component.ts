import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserModel } from 'src/app/model/user';
import { AdminService } from 'src/app/service/admin/service.service';

@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.scss']
})
export class AdminLoginComponent {

  fg:FormGroup=this.fb.group({
    username:['',Validators.required],
    password:['',Validators.required],
  })
  error:boolean=false;
  constructor(public fb:FormBuilder,public service:AdminService,public route:Router){}

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.

  }

  login(){
    let user=new UserModel("","",this.fg.value['username'],"","",this.fg.value['password']  )


    this.service.login(user).subscribe((value)=>{
      let message=value['message']
      console.log(value)
      if(message!="NOT FOUND"){
        console.log("TEST reçu")
        this.service.saveAuth(message);
        this.service.isAuth=true;
        this.navigateByAdmin()
      }
      else{
        this.error=true;
        setTimeout(()=>{
          this.error=false;
        },4000)
      }


    })

  }
  navigateByAdmin(){
    this.route.navigateByUrl("admin")
  }

}
