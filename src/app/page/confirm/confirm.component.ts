import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/service/auth.service';
import { ServiceService } from 'src/app/service/service.service';

@Component({
  selector: 'app-confirm',
  templateUrl: './confirm.component.html',
  styleUrls: ['./confirm.component.scss']
})
export class ConfirmComponent {


  fg?:FormGroup=this.fb.group({
    email:['',Validators.required],
    pwd:['',Validators.required]
  });

  error=false;
  constructor(public service:ServiceService,public fb:FormBuilder,public auth:AuthService,public router:Router){

  }

  onConfirm(email:string,pwd:string){
    this.service.getConfirm(email,pwd).subscribe((value)=>{
      console.log(value)
      if(value['id']){
        this.auth.isAuth=true;
        this.auth.idUser=value['id']
        this.auth.saveSession(value['id'],value['role'])
        this.router.navigateByUrl('/accueil')

      }
      if(value.message=="IMPOSSIBLE"){
        this.error=true;
        setTimeout(() => {
          this.error=false;
        }, 3000);
      }
    })
  }

}
