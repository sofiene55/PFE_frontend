import { Component } from '@angular/core';
import { AuthService } from './service/auth.service';
import { AdminService } from './service/admin/service.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'app-gestion-incident2';
  adminAuth?:boolean=false;
  isAuth:boolean=false;
  constructor(public authService:AuthService,public serviceAdmin:AdminService){
    if(this.authService.getId()){

    }
    else{
      this.isAuth=false;
    }

    if(serviceAdmin.getAuth()){
      this.adminAuth=true;
    }
  }

  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    this.authService.deleteId()
    this.authService.deleteRole()
  }
}
