import { Injectable } from "@angular/core";
import { Resolve } from "@angular/router";
import { Observable, delay, of } from "rxjs";
import { UserService } from "../services/auth/user.service";


@Injectable({
   providedIn: 'root' 
})

export class UserDataResolver implements Resolve<Observable<any>> {

    constructor(
        private userService: UserService
    ) {
        
    }

    resolve() {
        return of(this.userService.getUserData()).pipe(
            delay(2000)
        )
    }
}