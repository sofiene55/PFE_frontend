import { Component, Pipe } from '@angular/core';
import {  ActivatedRoute, Router } from '@angular/router';
import {MatDialog, MAT_DIALOG_DATA, MatDialogModule} from '@angular/material/dialog';
import { AddTicketComponent } from '../add-ticket/add-ticket.component';
import { ServiceService } from 'src/app/service/service.service';
import { AdminService } from 'src/app/service/admin/service.service';
import { Ticket } from 'src/app/model/Ticket';
import { ModalDeleteComponent } from '../admin/modal-delete/modal-delete.component';

@Component({
  selector: 'app-ticket',
  templateUrl: './ticket.component.html',
  styleUrls: ['./ticket.component.scss']
})
export class TicketComponent {


  tickets:Array<Ticket>;
  nameSearch:String="chercher un nom"
  listener:boolean=true;
  role:string="TECH";
  constructor(public navigate:Router,
    private dialog:MatDialog,
    public service:ServiceService,
    public router:ActivatedRoute,
    public service_:AdminService){
      if(this.router.snapshot.params['type']=="admin"){
        this.tickets=this.service_.getAllTicket()
        this.role="ADMIN"
      }
      else{
        this.tickets=this.service.getTickets();
      }
      this.listener=false;

    }

  currentType="Tous"


  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.

    console.log(this.router.snapshot.params['type'])

  }

  btnAddTicket(){
    this.dialog.open(AddTicketComponent)
  }

  onSearch(name:String){
    if(name.length>=3){
     if(this.router.snapshot.params['type']=="admin"){
      this.tickets= this.service_.searchService(name);
     }
     else{
      this.tickets= this.service.searchService(name)
     }

    }
    else{
      if(this.router.snapshot.params['type']!="admin"){
        this.tickets=this.service.getTickets()
      }
      else{
        this.tickets=this.service_.getAllTicket()
      }
    }
  }

  onFocus(text:string){
    this.currentType=text;
  }

  deleteTicket(id:string){
    const refDialog=this.dialog.open(ModalDeleteComponent,{data:{'id':id,'type':'TICKET'}})
    refDialog.afterClosed().subscribe((value)=>{
      if(value['data']['type']=="TICKET"){
        this.tickets=this.service_.getAllTicket()
      }
    })

  }

}
