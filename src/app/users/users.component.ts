import { Component, OnInit } from '@angular/core';
import { GithubService } from './../github.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  constructor(private _github: GithubService) { }

  public users = [];
  public loadSince = 15015117;

  public loadUsers() {
    this._github.getUsers(this.loadSince).subscribe ((data: any) => this.users = data);
  }

  public loadEmail(user: any) {
    this._github.getUser(user.login).subscribe ((data: any) => { // github does not allow to get email for user list, field exists but it always === null for some reason
      user.fullUser = data;
      user.email = data.email === null ? 'No email available' : data.email; 
    })
  }

  public setUser(user: any){
    if(user.fullUser) {
      localStorage.setItem(user.login, JSON.stringify(user.fullUser)); // save user if full profile loaded to reduce traffic
    }
  }

  ngOnInit() {
    this.loadUsers();
  }

}
