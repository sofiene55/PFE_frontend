import { Ticket } from "./Ticket";

export class Reparation{
  id?:String;
  id_technicien?:String;
  id_ticket?:String;
  solution?:String;
  tache?:Array<String>;
  date?:String;

  constructor(date:String, id_technicien:String,id_ticket:String ){
    this.id_technicien=id_technicien;
    this.id_ticket=id_ticket
    this.date=date;

  }

  toJson(){
    return {
      // 'id':this.id,
      'date':this.date,
      'id_technicien':this.id_technicien,
      'id_ticket':this.id_ticket,
      'tache':this.tache,
      'solution':this.solution
    }
  }

  static  fromJson(json:any):Reparation{
    let r:Reparation=new Reparation(json['date'],json['id_technicien'],json['id_ticket']);
    r.solution=json['solution']
    r.tache=json['tache']
    return r;
  }
}
