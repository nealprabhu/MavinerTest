﻿import { Component, OnInit } from '@angular/core';
import { filter, first } from 'rxjs/operators';

import { User } from '@/_models';
import { UserService, AuthenticationService } from '@/_services';

@Component({ templateUrl: 'home.component.html' })
export class HomeComponent implements OnInit {
    currentUser: User;
    users = [];
    usertype : boolean= false;

    constructor(
        private authenticationService: AuthenticationService,
        private userService: UserService
    ) {
        this.currentUser = this.authenticationService.currentUserValue;
        this.currentUser.type ==="admin"?this.usertype = true:this.usertype =false;
   
    }

    ngOnInit() {
        this.loadAllUsers();
    }

    deleteUser(id: number) {
        this.userService.delete(id)
            .pipe(first())
            .subscribe(() => this.loadAllUsers());
    }

    private loadAllUsers() {
       
        this.userService.getAll()
            .pipe(first())
        //    filter((x:any) => x.type  !== curruser.type))
            .subscribe(users=>{
              this.users = users.filter(x => x.username !== this.currentUser.username)
            });
    }
}