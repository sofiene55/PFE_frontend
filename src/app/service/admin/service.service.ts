import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Ticket } from 'src/app/model/Ticket';
import { UserModel } from 'src/app/model/user';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  ticket:Array<Ticket>=[];
  constructor(public http:HttpClient) {
    this.isAuth=this.getAuth();
   }

  url:string="http://localhost:8080/"
  isAuth:boolean=false;
  id:string=""
  getAuth(){

    console.log(sessionStorage.getItem("admin/id"))
    if(sessionStorage.getItem('admin/id')){
      console.log("USER");
      this.id=atob(sessionStorage.getItem("admin/id")!)
      return true;
    }
    console.log("USER");

    return false;
  }

  saveAuth(id:string){
    sessionStorage.setItem("admin/id",btoa(id))

  }

  getId(){
    return atob(sessionStorage.getItem("admin/id")!).replaceAll("'","");
  }

  allTechnicien(choice:string):Observable<any>{
    return this.http.get(this.url+"admin/all_technicien/"+choice)
  }

  login(user:UserModel):Observable<any>{
    return this.http.post(this.url+"admin/login",user.toJson());
  }

  delteTechnicien(id:string,type:string){
    return this.http.delete(this.url+'admin/deleteT/'+id+'/'+this.getId()+'/'+type)
  }

  getAllTicket():Array<Ticket>{
    this.ticket=[]

    this.http.get<any[]>(this.url+"admin/all-tickets/"+this.getId()).subscribe((value)=>{
      value.forEach((e:any)=>{
        this.ticket.push(Ticket.fromJson(e))
      })
    })
    this.ticket.forEach((e)=>{
      console.log(e)
    })

    return this.ticket;
    // this.emitAppareil()
  }

  getTickets(id:string,path:string):Array<Ticket>{
    let  ticket:Array<Ticket>=[]

    this.http.get<any[]>(this.url+path+id).subscribe((value)=>{

      value.map((e)=>{
        ticket?.push(Ticket.fromJson(e))
      })
    })
    return ticket;
  }

  getStat():Observable<any>{
    return this.http.get(this.url+'admin/stats/'+this.getId());
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

  getDetailsClient(id:string,choice:string):Observable<any>{
    return this.http.get(this.url+'admin/details-technicien/'+id+'/'+this.getId()+'/'+choice)
  }

  deleteSession(){
    sessionStorage.removeItem('admin/id')
  }

}
