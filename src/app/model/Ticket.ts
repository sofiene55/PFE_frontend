import { Tache } from "./Tache";

export class Ticket{

  id?:string
  public titre?:String;
  date?:String;
  description?:String;
  urgence?:Number;
  categorie?:String;
  adresse?:String;
  etat?:Number;
  etatLabel?:String;
  numero?:String;
  lieu?:String;
  type?:String;
  id_user?:string;
  status?:String
  urgenceLabel?:String
  impact?:String
  tache:Array<Tache>=[]
  solution?:string
  id_technicien?:string;
  constructor(
    titre:String,
    date:String,
    description:String,
    urgence:Number,
    adresse:String,
    categorie:String
    ){
    this.titre=titre;
    this.date=date;
    this.description=description;
    this.urgence=urgence;
    this.adresse=adresse;
    this.categorie=categorie

  }

  toJson(){
    return {
      'title':this.titre,
      'description':this.description,
      'date':this.date,
      'urgence':this.urgence,
      'addresse':this.adresse,
      'etat':this.etat,
      'lieu':this.lieu,
      'type':this.type,
      'numero':this.numero,
      'id_user':this.id_user,
      'status':this.status

    }
  }
  toJson2(){
    return {
      'id':this.id,
      'title':this.titre,
      'description':this.description,
      'date':this.date,
      'urgence':this.urgence,
      'addresse':this.adresse,
      // 'etat':this.etat,
      'user_id':this.id_user,
       'lieu':this.lieu,
      'type':this.type,
      'numero':this.numero,
      'status':this.status,
      'solution':this.solution,
      'id_user':this.id_user,
      'technicien_id':this.id_technicien,
      'categorie':this.categorie,
      'tache':this.tache.map((e)=>e.toJson())


    }
  }

  static  fromJson(json:any):Ticket{
    let t=new Ticket(json['title'],json['date'],json['description'],json['urgence'],json['addresse'],json['categorie']);
    t.id=json['id'];
    t.etat=json['etat'];
    t.id_user=json['user_id'];
    t.lieu=json['lieu']
    t.type=json['type']
    t.numero=json['numero']
    t.status=json['status']
    json['tache'].forEach((val:any)=>{
      console.log(val)
      t.tache?.push(Tache.fromJson(val))
    })
    t.urgenceLabel=t.urgence==1?'Urgence Basse':(t.urgence==2?'Urgence Moyenne':'Urgence élevée')
    t.etatLabel=t.etat==0?'Nouveau':t.etat==1?"En cours":t.etat==2?"Tache":"Fermer";
    t.solution=json['solution']
    t.id_user=json['user_id']
    t.id_technicien=json['technicien_id']
    return t;
  }


}
