import { Component,Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { UserModel } from 'src/app/model/user';
import { ModalDeleteComponent } from '../modal-delete/modal-delete.component';
import { Router } from '@angular/router';
import { AdminService } from 'src/app/service/admin/service.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-list-technicien',
  templateUrl: './list-technicien.component.html',
  styleUrls: ['./list-technicien.component.scss']
})
export class ListTechnicienComponent {

  constructor(public modal:MatDialog,public route:Router,public service:AdminService,public location:Location){}


  data:Array<UserModel>=[]

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.data=[]
    if(this.location.path()=="/admin"){
      this.service.allTechnicien("TECHNICIEN").subscribe((value:Array<any>)=>{
        value.forEach((element)=>{
          this.data!.push(UserModel.fromJson(element))
        })

      })
    }
    else{
      if(this.location.path()=="/utilisateur"){
        this.service.allTechnicien("USER").subscribe((value:Array<any>)=>{
          value.forEach((element)=>{
            this.data!.push(UserModel.fromJson(element))
          })

        })
      }
    }
  }


  deleteTechnicien(id:string){
    const ref=this.modal.open(ModalDeleteComponent,{data:{'id':id,'type':"TECHNICIEN"}})

    ref.afterClosed().subscribe((value)=>{
      console.log("test"+value['data']['result'])
      if(value['data']['result']=="SUPPRIMER" && value['data']['type']=="TECHNICIEN"){
        this.data=[]
        this.service.allTechnicien("TECHNICIEN").subscribe((value:Array<any>)=>{
        value.forEach((element)=>{
        this.data!.push(UserModel.fromJson(element))
      })

    })
      }
    });
  }

  details(id:string){
    if(this.location.path()=="/admin"){
      this.route.navigateByUrl("/detail-technicien/"+btoa(id));
    }
    else{
      this.route.navigateByUrl("/detail-user/"+btoa(id));
    }
  }


}
