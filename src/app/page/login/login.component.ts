import { HttpResponse } from '@angular/common/http';
import { Component } from '@angular/core';

import {Validators,FormBuilder,FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Ticket } from 'src/app/model/Ticket';
import { AuthService } from 'src/app/service/auth.service';
import { ServiceService } from 'src/app/service/service.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  messageError:boolean=false;
  message=""
  fg:FormGroup=this.fb.group({
    email:['',[Validators.email]],
    password:['',Validators.required],
    forgot:[true]
  })

constructor(private fb:FormBuilder,private service:ServiceService,public router:Router,public auth:AuthService){}

  disabledPassword="password"

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    // this.auth.getId()
  }


  onLogin(){
    console.log("forgot"+this.fg.value['forgot'])
    this.service.login(this.fg.value['email'],btoa(this.fg.value['password'])).subscribe((value)=>{
      console.log(value);
      if(value==-1){
       this.messageError=true;
       this.message="Vos données sont incorrectes !"
       setTimeout(() => {
        this.messageError=false;
       }, 5000);
      }
      if(value==-2){
        this.messageError=true;
        this.message="Votre compte est en attente de confirmation."

       setTimeout(() => {
        this.messageError=false;
        this.router.navigateByUrl('/confirm-compte')
       }, 4000);
      }
      if(value!=-1 &&value!=-2 && value.id){
        this.auth.isAuth=true
        this.auth.deleteId();
        this.auth.deleteRole()
        this.service.idUser=value['id']
        // this.auth.userRole=value['role']
        console.log("User role:"+value['role']);
        console.log(value);


        if(this.fg.value['forgot']){
          this.auth.saveAuth(value['id'],value['role'])
        }
        else{
          this.auth.saveSession(value['id'],value['role'])
        }





        setTimeout(()=>{this.router.navigateByUrl('/')},1000)

      }
      console.log("mon id:"+this.service.idUser)

    },(e)=>{
      console.log(e);
    })
  }

  onSwitchPassword(){
    this.disabledPassword=this.disabledPassword=="password"?'text':"password";
  }


}
