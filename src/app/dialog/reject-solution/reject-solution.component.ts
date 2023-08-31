import { Component,Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ServiceService } from 'src/app/service/service.service';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Ticket } from 'src/app/model/Ticket';
@Component({
  selector: 'app-reject-solution',
  templateUrl: './reject-solution.component.html',
  styleUrls: ['./reject-solution.component.scss']
})
export class RejectSolutionComponent {

  fg?:FormGroup
  constructor(@Inject(MAT_DIALOG_DATA) public ticket:Ticket,  public service:ServiceService,public fb:FormBuilder,){
    this.fg=fb.group({
      description:[this.ticket.description?this.ticket.description:'',Validators.required],
      status:[this.ticket.status?this.ticket.status:'',Validators.required]
    })
  }

  update(){
    console.log(this.ticket)
    this.ticket.description=this.fg?.value['description']
    this.ticket.status=this.fg!.value['status']
    this.ticket.solution=""
    this.service.updateTicket(this.ticket).subscribe((value)=>{})
  }
}
