import { Component } from '@angular/core';
import {ServiceService} from '../../service/service.service'
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Ticket } from 'src/app/model/Ticket';
import { TechnicienService } from 'src/app/service/admin/admin.service';
import { Reparation } from 'src/app/model/Reparation';
import { Tache } from 'src/app/model/Tache';
import { AuthService } from 'src/app/service/auth.service';
@Component({
  selector: 'app-reparation',
  templateUrl: './reparation.component.html',
  styleUrls: ['./reparation.component.scss']
})
export class ReparationComponent {
  public fg?:FormGroup

  id:any
  ticket?:Ticket
  isDisabled:boolean=true;
  type?:Number
  showAlerte:boolean=false;
  solution_=""
  constructor(public auth: AuthService, public service:ServiceService,public fb:FormBuilder,public snapshot:ActivatedRoute,public adminService:TechnicienService,private route:Router){

  }

  name?:String;

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.id=this.snapshot.snapshot.params['id']
    this.type=this.snapshot.snapshot.params['type']
  //  this.adminService.getSingleTicket(this.id).subscribe((value)=>{
  //   this.ticket=Ticket.fromJson(value);
  //  })

  this.adminService.getSingleTicket(this.id).subscribe((value)=>{
    this.ticket=Ticket.fromJson(value)
    this.solution_=this.ticket.solution!;
    this.adminService.getUserName(this.ticket!.id_user!).subscribe((value)=>{
      console.log(value['name'])
      this.name=value['name']
    })

    this.fg=new FormGroup({

        date:new FormControl(this.ticket?.date?this.ticket.date:'',Validators.required),
        // name:new FormControl(this.ticket?name:''),
        category:new FormControl(this.ticket.categorie?this.ticket.categorie: '',Validators.required),
        type:new FormControl('Incident',Validators.required),
        status:new FormControl(this.ticket ? this.ticket?.status:'Nouveau',Validators.required),
        technicien:new FormControl('Sois même',Validators.required),
        urgence:new FormControl(this.ticket?this.ticket.urgenceLabel:'',Validators.required),
        impact :new FormControl('impact',Validators.required),
        solution:new FormControl(this.ticket.solution?this.ticket.solution:"")
    })






  })

  }

  onAttribute(){
    console.log(this.fg!.value['type'])
    let t=new Ticket(this.ticket?.titre!,this.ticket?.date!,this.ticket!.description!,this.fg!.value['urgence']=='Urgence basse'?1:(this.fg!.value['urgence']=='Urgence Moyenne'?2:3),this.ticket!.adresse!,this.fg!.value['category'])
    t.status=this.fg!.value['status']
    t.type=this.fg!.value['type']
    t.impact=this.fg!.value['impact']
    t.id=this.ticket?.id;
    t.tache=this.ticket?.tache!;
    t.id_technicien=this.auth.getId()!;
    t.id_user=this.ticket?.id_user;
    t.numero=this.ticket?.numero
    t.lieu=this.ticket?.lieu;
    this.service.updateTicket(t).subscribe((value)=>{
      this.showAlerte=true;
      setTimeout(()=>{
        this.showAlerte=false;
        this.route.navigateByUrl('/list')
      },3000)
      console.log(value)
    })

    console.log(Date.now().toString())
    let reparation=new Reparation("","64a834b8fb89682061ff6915",this.ticket?.id!)
    console.log(reparation)
    this.adminService.addReparation(reparation).subscribe((value)=>{
      // console.log(value)
    })
  }

  addTache(tache:string){
    let t=new Tache(tache,false);
    if(tache.length){
      this.adminService.addTacheInTicket(t,this.ticket?.id!).subscribe((value)=>{
        this.ticket=Ticket.fromJson(value);
      })
    }
  }

  closeTicket(){
    let t:Ticket=this.ticket!;
    this.ticket!.status=this.fg?.value['status'];
    this.ticket!.solution=this.fg?.value['solution']
    console.log("Solution"+this.fg?.value['solution'])
    this.service.addTicket(this.ticket!).subscribe((value)=>{
      this.ticket=Ticket.fromJson(value);
      this.showAlerte=true;
      setTimeout(() => {
        this.route.navigateByUrl('/list')
      }, 4000);
    })
  }

  removeTache(tache:any){
    console.log("ok")
    this.adminService.deleteTache(tache,this.ticket?.id!).subscribe((value)=>{
      this.ticket=Ticket.fromJson(value)
      console.log(value)
    })
  }

  switchState(tache:string){
    this.adminService.switchState(tache,this.ticket?.id!).subscribe((value)=>{
      this.ticket=Ticket.fromJson(value);
    })
  }


}
