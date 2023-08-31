import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { UserModel } from 'src/app/model/user';
import { AdminService } from 'src/app/service/admin/service.service';
import { ModalDeleteComponent } from '../modal-delete/modal-delete.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {


  componentView:string="liste";
  datatechnicien:Array<UserModel>=[]

  constructor(public service:AdminService,public modal:MatDialog){
    console.log("OK")
  }

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.




  }

  changeMenu(label:string){
    this.componentView=label;
  }





}
