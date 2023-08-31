import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Route, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AdminService } from 'src/app/service/admin/service.service';

@Injectable({
  providedIn: 'root'
})
export class GardGuard implements CanActivate {

  constructor(public service:AdminService,public routes:Router){}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if(this.service.isAuth){
      return true;
    }
    else{
      this.routes.navigateByUrl('/admin-login')
      return false;
    }
  }

}
