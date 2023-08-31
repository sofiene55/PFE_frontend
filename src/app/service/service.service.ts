import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserModel } from '../model/user';
import { Ticket } from '../model/Ticket';
import { AuthService } from './auth.service';


@Injectable({
  providedIn: 'root'
})
export class ServiceService {

  //
  url:String="http://localhost:8080/"

  idUser?:String=this.auth.getId()?.replaceAll("\"","");
  userRole?:string;



  ticket:Array<Ticket>=[]

  categorie:Array<any>=[
    {
      label:'Panne Impression'
    },
      {
        label:'Panne Logiciel'
      },
      {
        label:'Panne Matérielle'
      },
      {
        label:'Panne Réseau'
      }

   ]

   status:Array<String>=[
      "Nouveau","En cours","Ajouter Tâche","Terminer","Cloturer",
   ]

   urgence:Array<string>=[
    "Urgence Elevée",
    "Urgence moyenne",
    "Urgence basse",
   ]

  constructor(public http:HttpClient,public auth:AuthService) { }





  //Nouveau Utilisateur
  saveUser(user:UserModel):Observable<any>{
    return this.http.post(this.url+'save_user',user.toJson());
  }


  //login
  login(email:String,password?:String):Observable<any>{
    // const params=new HttpParams().set('email',email).set('password',password);
    return this.http.get(this.url+'login/'+email+'/'+password);
  }

  //chargerTicket
  getTickets():Array<Ticket>{
    this.ticket=[]
    console.log("Mon Log:"+this.idUser)
    this.http.get<any[]>(this.url+'tickets/'+this.idUser).subscribe((value)=>{
      value.map((e)=>{
        this.ticket?.push(Ticket.fromJson(e))
      })
    })
    return this.ticket!;
  }

  addTicket(ticket:Ticket):Observable<any>{
    console.log(ticket.toJson2())
    return this.http.post(this.url+'save_ticket',ticket.toJson2());
  }

  updateTicket(ticket:Ticket):Observable<any>{
    console.log("appel"+ticket.toJson2())
    return this.http.put(this.url+'update-ticket/'+this.idUser,ticket.toJson2());
  }

  searchService(text:String):Array<Ticket>{
    let output:Array<Ticket>=[]
    this.ticket.forEach((value)=>{
      if(value.titre?.toLocaleLowerCase().includes(text.toLocaleLowerCase())){
        output.push(value);
      }
    })
    return output;
  }

  getElementById(id:String):Ticket{
    let ticket:any;
    console.log("rien")
    this.ticket.forEach((e:Ticket)=>{
      console.log(e.id)
      if(e.id==id){
        ticket=e;
        console.log("OK")
      }
    })
    return  ticket;
  }

  getSingleTicket(id:String):Observable<Ticket>{
    return this.http.get<Ticket>(this.url+'single_ticket/'+id);
  }

  getStat(id:string):Observable<any>{
    return this.http.get(this.url+'get_statistique/'+id);
  }

  getConfirm(email:string,pwd:string):Observable<any>{
    return this.http.get(this.url+'confirm-compte/'+email+'/'+pwd);
  }

  getLastTicket():Observable<any>{
    return this.http.get(this.url+'dernier-ticket/'+this.auth.getId());
  }

  updateUser(user:UserModel):Observable<any>{
    return this.http.post(this.url+'update_user',user.toJson())
  }

  sendMessage(body:any):Observable<any>{
    return this.http.post(this.url+'send_message',body)
  }
}
