import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { RejectSolutionComponent } from 'src/app/dialog/reject-solution/reject-solution.component';
import { Ticket } from 'src/app/model/Ticket';
import { UserModel } from 'src/app/model/user';
import { TechnicienService } from 'src/app/service/admin/admin.service';

import { ServiceService } from 'src/app/service/service.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent {

    id?:String;
    ticket?:Ticket;
  technicien?:UserModel
    constructor(private activated:ActivatedRoute,public service:ServiceService,public adminService:TechnicienService,private modal:MatDialog){
      this.id=this.activated.snapshot.params['id'];

      this.service.getSingleTicket(this.id!).subscribe((value)=>{
        this.ticket=Ticket.fromJson(value)
        this.adminService.getUserInfo(this.ticket.id_technicien).subscribe((value)=>{
          this.technicien=UserModel.fromJson(value)
        })
      })
    }

    ngOnInit(): void {
      //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
      //Add 'implements OnInit' to the class.

    }

    rejectSolution(){
      let ref=this.modal.open(RejectSolutionComponent,{data:this.ticket})
      ref.afterClosed().subscribe(()=>{
        this.service.getSingleTicket(this.id!).subscribe((value)=>{
          this.ticket=Ticket.fromJson(value)
        })
      })
    }

    acceptSolution(){
      this.ticket!.status="Cloturer"

      console.log(this.ticket?.status)
      this.service.updateTicket(this.ticket!).subscribe((value)=>{
        this.ticket=Ticket.fromJson(value)
      })
    }



}
