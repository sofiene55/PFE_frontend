export class UserModel{
  public  name?:String;
  public  lastname?:String;
  public  email?:String;
  public  number?:String;
  public  adresse?:String;
  public  password?:String;
  public role?:string;
  public id?:string;
  constructor(name:String,lastName:String, email:String,number:String,adresse:String,password:String){

    this.name=name;
    this.lastname=lastName;
    this.email=email;
    this.number=number;
    this.adresse=adresse;
    this.password=password

  }

  toJson(){
    return {
      'id':this.id,
      'name':this.name,
      'lastname':this.lastname,
      'email':this.email,
      'number':this.number,
      'adresse':this.adresse,
      'password':this.password

    }
  }

  static fromJson(json:any):UserModel{
    let u=new UserModel(json['name'],json['lastname'],json['email'],json['number'],json['adresse'],"")
    u.id=json['id']
    return u;
  }

}
