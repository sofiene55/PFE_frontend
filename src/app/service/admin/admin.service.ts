import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Reparation } from 'src/app/model/Reparation';
import { Tache } from 'src/app/model/Tache';
import { Ticket } from 'src/app/model/Ticket';
import { AuthService } from '../auth.service';

@Injectable({
  providedIn: 'root'
})
export class TechnicienService {

  // allTicketSubject?:Subject<any>=new Subject<any>();
  allTicket:Array<Ticket>=[];
  urgence:Array<string>=[
    "Urgence Elevée",
    "Urgence moyenne",
    "Urgence basse",
   ]
  url:String="http://localhost:8080/"
  user:any=this.auth.getRolel()
  constructor(private http:HttpClient,public auth:AuthService,) { }

  getAllTicket():Array<Ticket>{
    this.allTicket=[]
    this.http.get<any[]>(this.url+"ticket-technicien/"+this.auth.getId()).subscribe((value)=>{
      value.forEach((e:any)=>{
        this.allTicket.push(Ticket.fromJson(e))
      })
    })
    this.allTicket.forEach((e)=>{
      console.log(e)
    })
    return this.allTicket;
    // this.emitAppareil()
  }

  getElementById(id:String):Ticket{
    let ticket:any;

    this.allTicket.forEach((e:Ticket)=>{

      if(e.id==id){
        ticket=e;

      }
    })
    return  ticket;
  }

  searchService(text:String):Array<Ticket>{
    let output:Array<Ticket>=[]
    this.allTicket.forEach((value)=>{
      if(value.titre?.toLocaleLowerCase().includes(text.toLocaleLowerCase())){
        output.push(value);
      }
    })
    return output;
  }

  updateEtat(ticket:Ticket):Observable<any>{
    return this.http.put<Ticket>(this.url+"update_state",ticket.toJson2());
  }

  getSingleTicket(id:String):Observable<Ticket>{
    return this.http.get<Ticket>(this.url+'single_ticket/'+id);
  }

  getUserName(id:String):Observable<any>{
    return this.http.get<any>(this.url+'getUserName/'+id,{'headers':{'content-type':'application/json'}});
  }

  getUserInfo(id:any):Observable<any>{
    return this.http.get(this.url+'info_user/'+id);
  }

  addReparation(reparation:Reparation):Observable<any>{
    return this.http.post(this.url+'add_reparation',reparation.toJson())
  }

  addTacheInTicket(tache:Tache,id:String):Observable<any>{
    return this.http.post(this.url+'add_taches/'+id,tache.toJson(),)
  }

  deleteTache(tache:string,id:any){
    return this.http.post(this.url+'remove_tache'+"/"+id,{},{params:{'tache':tache}})
  }

  switchState(text:string,id:String):Observable<any>{
    return this.http.post<any>(this.url+'update_state/'+id,{},{params:{'tache':text}})
  }

  // emitAppareil(){
  //   this.allTicketSubject?.next(this.allTicket.slice)
  // }
}
