import { HttpResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import {FormBuilder,FormGroup,Validators} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Ticket } from 'src/app/model/Ticket';
import { AuthService } from 'src/app/service/auth.service';
import { ServiceService } from 'src/app/service/service.service';

@Component({
  selector: 'app-add-ticket',
  templateUrl: './add-ticket.component.html',
  styleUrls: ['./add-ticket.component.scss']
})
export class AddTicketComponent {

 fg?:FormGroup;
 messageShow:boolean=false;
 ticket?:Ticket
 id:any;
 btnText?:String;
 urgence:Array<any>=[
  {
    value:1,
    viewValue:'Très Urgente'
  }
 ]



  constructor(public form:FormBuilder,public service:ServiceService,private activated:ActivatedRoute,private route:Router,public auth:AuthService){}

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.

    this.id=this.activated.snapshot.params['id'];

    if(this.id){
      this.ticket=this.service.getElementById(this.id);
      this.btnText="Modifier";
    }
    else{
      this.btnText="Ajouter Ticket"
    }

    console.log(this.ticket)
    this.fg=this.form.group({
      title:[this.ticket?this.ticket.titre: '',Validators.required],
      date:[this.ticket?this.ticket.date: '',Validators.required],
      adresse:[this.ticket?this.ticket.adresse: '',Validators.required],
      categorie:[this.ticket?this.ticket.categorie: '',Validators.required],
      description:[this.ticket?this.ticket.description: '',Validators.required],
      urgence:[this.ticket?this.ticket.urgence: '',Validators.required],
      type:[this.ticket?this.ticket.type: ''],
      lieu:[this.ticket?this.ticket.lieu: ''],
      numero:[this.ticket?this.ticket.numero: '']

    })
  }



  public addTicket(){

    let ticket=new Ticket(
      this.fg?.value['title'],
      this.fg?.value['date'],
      this.fg?.value['description'],
      this.fg?.value['urgence'],
      this.fg?.value['adresse'],
      this.fg?.value['categorie'],
    );
    ticket.numero=this.fg?.value['numero']
    ticket.lieu=this.fg?.value['lieu']
    ticket.type=this.fg?.value['type']



    if(this.ticket){
      ticket.id=this.ticket.id;
      ticket.etat=this.ticket.etat;
      ticket.status=this.ticket.status;
      ticket.id_technicien=this.ticket.id_technicien;
      ticket.id_user=this.ticket.id_user;
      ticket.tache=this.ticket.tache;

      this.service.updateTicket(ticket).subscribe((value:HttpResponse<any>)=>{
        this.messageShow=true;

        setTimeout(() => {
          this.messageShow=false;
          this.route.navigateByUrl('ticket')
        }, 3000);
      },(e)=>{
        console.log(e)
      });
    }
    else{

      let t :Ticket=this.ticket!;
      if(this.auth.getRolel()=="USER"){
        ticket.id_user=this.auth.getId()! ;
        // this.ticket!.id_user=""

      }
      if(this.auth.getRolel()=="TECHNICIEN"){
        ticket.id_technicien=this.auth.getId()!.toString();

      }
      this.service.addTicket(ticket).subscribe((value:HttpResponse<any>)=>{
        this.messageShow=true;

        setTimeout(() => {
          this.messageShow=false;
        }, 6000);
      },(e)=>{
        console.log(e)
      });
    }

  }







}
