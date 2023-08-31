import { Component } from '@angular/core';
import { AdminService } from 'src/app/service/admin/service.service';

@Component({
  selector: 'app-stat',
  templateUrl: './stat.component.html',
  styleUrls: ['./stat.component.scss']
})
export class StatComponent {

  // stats:Array<any>=[
  //   {
  //     'icon':'ri-shield-user-fill',
  //     'label':'Nombre technicien',
  //     'value':'55'
  //   },
  //   {
  //     'icon':'ri-user-line',
  //     'label':'Nombre utilisateur',
  //     'value':'55'
  //   },
  //   {
  //     'icon':'ri-ticket-line',
  //     'label':'Total ticket',
  //     'value':'55'
  //   },
  //   {
  //     'icon':'ri-ticket-fill',
  //     'label':'Ticket cloturé',
  //     'value':'55'
  //   },
  //   {
  //     'icon':'ri-coupon-3-line',
  //     'label':'Ticket terminer',
  //     'value':'55'
  //   },
  //   {
  //     'icon':'ri-coupon-3-line',
  //     'label':'Ticket En cours',
  //     'value':'55'
  //   },
  //   {
  //     'icon':'ri-coupon-3-line',
  //     'label':'Ticket non traité',
  //     'value':'55'
  //   },

  // ]
  data:any
  constructor(public service:AdminService){}
  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.service.getStat().subscribe((value)=>{
      this.data=value;
      console.log(this.data);
    })

  }
}
