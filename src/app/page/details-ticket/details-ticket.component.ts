import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Ticket } from 'src/app/model/Ticket';
import { UserModel } from 'src/app/model/user';
import { TechnicienService } from 'src/app/service/admin/admin.service';
import { ServiceService } from 'src/app/service/service.service';

@Component({
  selector: 'app-details-ticket',
  templateUrl: './details-ticket.component.html',
  styleUrls: ['./details-ticket.component.scss']
})
export class DetailsTicketComponent {


  ticket?:Ticket;

  btn1Text:String=""
  btn2Text:String=""
  id:any;
  client?:UserModel;
  constructor(private route:ActivatedRoute,private service:TechnicienService,private router:Router){}

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.

    this.id= this.route.snapshot.params['id'];
    // this.ticket=this.service.getElementById(this.id)

    this.service.getSingleTicket(this.id).subscribe((value)=>{
      this.ticket=Ticket.fromJson(value)
      this.btn1Text=this.ticket!.etat==1?'Rénoncer aux ticket':this.ticket!.etat==2?'Revenir aux Suivis':'Revenir Tâche'
    this.btn2Text=this.ticket!.etat==1?'Mettre en tâche':this.ticket!.etat==2?'Terminer':'Terminer';

    this.service.getUserInfo(this.ticket.id_user).subscribe((value)=>{
      this.client=UserModel.fromJson(value);
    })
    })




  }









  onGoToAttribution(type:String){
    this.router.navigateByUrl('/attribution/'+this.id+'/'+type)
  }

  removeTache(tache:any){
    console.log("ok")
    this.service.deleteTache(tache,this.ticket?.id!).subscribe((value)=>{
      this.ticket=Ticket.fromJson(value)

    })
  }

  switchState(tache:string){
    this.service.switchState(tache,this.ticket?.id!).subscribe((value)=>{
      this.ticket=Ticket.fromJson(value);
    })
  }

}
