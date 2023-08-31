export class Tache{
  message?:string
  etat?:boolean=false;
  constructor(message:string,etat:boolean){
    this.etat=etat
    this.message=message
  }

  toJson(){
    return {
      'description':this.message,
      'etat':this.etat
    }
  }

 static fromJson(json:any):Tache{
    let t=new Tache(json['description'],json['etat'])
    return t;
  }
}
