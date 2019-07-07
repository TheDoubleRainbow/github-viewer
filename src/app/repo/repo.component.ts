import { Component, OnInit } from '@angular/core';
import { GithubService } from './../github.service';
import { ActivatedRoute } from '@angular/router';
import { BackButtonComponent } from './../back-button/back-button.component';

@Component({
  selector: 'app-repo',
  templateUrl: './repo.component.html',
  styleUrls: ['./repo.component.css']
})
export class RepoComponent implements OnInit {

  constructor(private _github: GithubService, private _route: ActivatedRoute) { }

  private _paramsub: any;
  public username: string;
  public reponame: string;
  public repo: object;
  public branches = [];

  loadRepo() {
    this._github.getRepo(this.username, this.reponame).subscribe(repo => {
      this.repo = repo;
      this.loadBranches();
    })
  }

  loadBranches() {
    this._github.getBranches(this.username, this.reponame).subscribe((branches: any) => {
      this.branches = branches;
      console.log(this.branches);
    })
  }

  ngOnInit() {
    this._paramsub = this._route.params.subscribe(params => {
      this.username = params['username'];
      this.reponame = params['repo'];
    });
    this.loadRepo();
  }

}
