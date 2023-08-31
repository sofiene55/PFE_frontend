import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserModel } from 'src/app/model/user';
import { AdminService } from 'src/app/service/admin/service.service';

@Component({
  selector: 'app-add-technicien',
  templateUrl: './add-technicien.component.html',
  styleUrls: ['./add-technicien.component.scss']
})
export class AddTechnicienComponent {
  fg:FormGroup=this.fb.group({
    name:['',Validators.required],
    number:['',Validators.required,],
    email:['',Validators.email],
    adresse:['',Validators.required],
    pwd:['',Validators.required],
    confirm:['',Validators.required],
    // userName:['',Validators.required],
    // userPwd:['',Validators.required],
  })
  url:string="http://localhost:8080/admin/"
  message?:string="code erreur";
  responseType=-1;
  valid:boolean=false
  constructor(public fb:FormBuilder,private http:HttpClient,public service:AdminService){

  }

  validConfirm(){
    if(this.fg.value['pwd'].length>6&&this.fg.value['pwd']==this.fg.value['confirm']){
      this.valid=true
    }
    else{
      this.valid=false;
    }
  }

  addUser(text1:string,text2:string){
    if(text1==text2 && text1.length!=0){
      let t:UserModel = new UserModel(this.fg.value['name'],this.fg.value['name'],this.fg.value['email'],this.fg.value['number'],this.fg.value['adresse'],btoa(this.fg.value['pwd']))

    this.http.post(this.url+'add_technicien/'+this.service.getId(),t.toJson()).subscribe((value:any)=>{

      if(value.message=='Un compte existe déja'){
        this.message='Un compte existe déja';
        this.responseType=0;
        setTimeout(()=>{
          this.responseType=-1;
        },4000)

      }
      else if(value.message=='Donnée administrateur incorrecte'){
        this.message='Donnée administrateur incorrecte';
        this.responseType=0;
        setTimeout(()=>{
          this.responseType=-1;
        },4000)
      }
      else{
        this.message="Technicien Ajouté avec success"
        this.responseType=1;
        setTimeout(()=>{
          this.responseType=-1
        },5000)
      }
    },(e)=>{
      this.message='Une Erreur est survenue';
      this.responseType=0;
    })
    }
  }
}
