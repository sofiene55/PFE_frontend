import { Component } from '@angular/core';
import { Ticket } from 'src/app/model/Ticket';
import { AuthService } from 'src/app/service/auth.service';
import { ServiceService } from 'src/app/service/service.service';

@Component({
  selector: 'app-accueil',
  templateUrl: './accueil.component.html',
  styleUrls: ['./accueil.component.scss']
})
export class AccueilComponent {




  data:any

  isAuth:any;
  stat:any
  constructor(public auth:AuthService,public service:ServiceService){


    this.isAuth=auth.isAuth;
    service.getStat(this.auth.getId()!).subscribe((value)=>{
      console.log(value)
      this.stat=value
    })

    this.service.getLastTicket().subscribe((value)=>{
      this.data=value;
      console.log(value)
    })

  }

  onScroll(){
    window.scrollTo({behavior:'smooth',top:500})
  }



}
