import { Component, OnInit } from '@angular/core';
import { GithubService } from './../github.service';
import { ActivatedRoute } from '@angular/router';
import { BackButtonComponent} from './../back-button/back-button.component';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  constructor(private _github: GithubService, private _route: ActivatedRoute) { }
  public user: object;
  public repos: any;

  public username: string;
  private _paramsub: any;

  loadUser() {
    if(localStorage.getItem(this.username)) {
      this.user = JSON.parse(localStorage.getItem(this.username));
    }
    else {
      this._github.getUser(this.username).subscribe(user => this.user = user);
    }

    this.loadRepos(this.username);
  }

  loadRepos(username: string) {
    this._github.getRepos(username).subscribe(repos => {
      this.repos = repos;
    });
  }

  ngOnInit() {
    this._paramsub = this._route.params.subscribe(params => {
      this.username = params['username'];
    });
    this.loadUser();
  }

}
