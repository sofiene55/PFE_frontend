import { Component } from '@angular/core';
import {FormBuilder,FormGroup,Validators} from '@angular/forms';
import { UserModel } from 'src/app/model/user';
import {ServiceService} from '../../service/service.service';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Router } from '@angular/router';
@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent {

  alerteResponse:number=-1;
  alerteMessage="";
  listen=false;
  formGroup:FormGroup=this.form.group({
      name:['',Validators.required],
      lastname:['',Validators.required],
      email:['',Validators.required],
      number:['',Validators.required],
      password:['',Validators.required],
      adresse:['',Validators.required],
    });

  constructor(private form:FormBuilder,private service:ServiceService,private route:Router){

  }

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.

  }

  /*
  creation d'un nouveau compte
  */
  createAcount(){
    this.listen=true;
   let user=new UserModel(this.formGroup.value['name'],
      this.formGroup.value['lastname'],
      this.formGroup.value['email'],
      this.formGroup.value['number'],
      this.formGroup.value['adresse'],
      btoa(this.formGroup.value['password']),);

    this.service.saveUser(user).subscribe((value:any)=>{
      this.listen=false;
      console.log(value.message)


      if(value.message=='EXIST'){
        this.alerteResponse=0;
        this.alerteMessage="Un compte existe avec cette adresse mail"
        setTimeout(() => {
          this.alerteResponse=-1;
          this.alerteMessage=""
        }, 4000);
      }
      if(value.message=='CREE'){
        this.alerteResponse=1;
        this.alerteMessage="Votre Compte a été crée veuillez confirmer le compte"
        setTimeout(()=>{
          this.route.navigateByUrl('/confirm-compte')
          this.alerteMessage=""
        },2000)
      }
      if(value.message=="E-Mail"){

          this.alerteResponse=0;
          this.alerteMessage="Nous avons rencontré un problème avec le mail"
          setTimeout(() => {
            this.alerteResponse=-1;
            this.alerteMessage=""
          }, 4000);
      }
    },(error:HttpErrorResponse)=>{
      console.log("error")
      console.log(error.message);
    });

  }


}
