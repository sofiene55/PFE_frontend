import { Component,Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { Ticket } from 'src/app/model/Ticket';
import {  TechnicienService } from 'src/app/service/admin/admin.service';

@Component({
  selector: 'app-list-admin',
  templateUrl: './list-admin.component.html',
  styleUrls: ['./list-admin.component.scss']
})
export class ListAdminComponent {

  tickets:Array<Ticket>=[];


  @Input()
  type:string="TECHNICIEN";

  constructor(private service:TechnicienService,public router:ActivatedRoute){
    console.log("param:"+this.router.snapshot.params['admin'])
  }


  currentState:String="Tous";
  currentState2=0;

  ngOnInit(): void {

    if(this.router.snapshot.params['admin']=="admin"){
      this.tickets=this.service.getAllTicket()
    }
    else{
      this.tickets=this.service.getAllTicket()
    }
  }

  onSearch(name:String){
    if(name.length>=3){
     this.tickets= this.service.searchService(name)
     console.log(this.tickets)
    }
    else{
      this.tickets=this.service.getAllTicket()
    }
  }

  onFocus(text:String){
    this.currentState=text;
    // this.tickets= this.filter()

  }
  onFocus2(text:number){
    if(this.currentState2==text){
      this.currentState2=0;
    }
    else{
      this.currentState2=text
    }
  }

  filter():Array<Ticket>{
    if(this.currentState=='Tous'){
      this.tickets=this.service.getAllTicket();
      return this.tickets;
    }
    else{
      let t:Array<Ticket>=[]
      this.tickets.forEach((value)=>{
        if(this.currentState!='Tous' && value.status==this.currentState){
          console.log(value.status)
        }
      })
      return t;
    }
  }



}
