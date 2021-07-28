import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router'
import { Observable } from 'rxjs';
import { DbService } from './services/db.service'

@Injectable()
export class LoginActivate implements CanActivate {
    
    constructor(private dbService: DbService, private router: Router) {}

    canActivate(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): Observable<boolean>|Promise<boolean>|boolean {
        if (!this.dbService.isUserLoggedIn()) {
            this.router.navigate(['connexion']);
        }
        return true;
    }
}