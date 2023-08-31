import { Location } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Ticket } from 'src/app/model/Ticket';
import { AdminService } from 'src/app/service/admin/service.service';
import { ServiceService } from 'src/app/service/service.service';

@Component({
  selector: 'app-details-technicien',
  templateUrl: './details-technicien.component.html',
  styleUrls: ['./details-technicien.component.scss']
})
export class DetailsTechnicienComponent {

  data:any
  ticket?:Array<Ticket>=[];
  label:string="";
  role:string=""
  constructor(public service:AdminService,public activated:ActivatedRoute,public location:Location){}

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    const id=atob(this.activated.snapshot.params['id']);

    let url=this.location.path().split("/")[1];
    console.log(url)

    if(url=='detail-technicien'){
      this.role="t"
      this.service.getDetailsClient(id,"TECHNICIEN").subscribe((value)=>{
        this.data=value;

      })
      this.ticket=this.service.getTickets(id,'ticket-technicien/');
      this.label="Les tickets prises en charge par:"
    }
    else{
      this.role="u"
      this.service.getDetailsClient(id,"USER").subscribe((value)=>{
        this.data=value;

      })
      this.ticket=this.service.getTickets(id,'tickets/');
      this.label="Les tickets crées par:"

    }

  }

}
