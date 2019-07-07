import { Component, OnInit } from '@angular/core';
import { GithubService } from './../github.service';
import { BackButtonComponent } from './../back-button/back-button.component';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-commits',
  templateUrl: './commits.component.html',
  styleUrls: ['./commits.component.css']
})
export class CommitsComponent implements OnInit {

  constructor(private _github: GithubService, private _route: ActivatedRoute) { }

  public username: string;
  public reponame: string;
  private _sha: string;
  private _paramsub: any;

  public commits: any;
  public nothingToLoad: boolean;

  private _loadCommits() {
    this._github.getCommits(this.username, this.reponame, this._sha).subscribe(commits => {
      this.commits = commits;
      if(this.commits.length < 10) this.nothingToLoad = true;
    });
  }

  public loadMore() {
    var until = this.commits[this.commits.length-1].commit.author.date;
    this._github.getCommits(this.username, this.reponame, this._sha, until).subscribe((commits: any) => {
      if(commits.length > 0) {
        this.commits = [...this.commits, ...commits.splice(1, commits.length - 1)];
      }
      if(commits.length < 10) this.nothingToLoad = true;
    });
  }

  ngOnInit() {
    this._paramsub = this._route.params.subscribe(params => {
      this.username = params['username'];
      this.reponame = params['repo'];
      this._sha = params['sha'];
    });

    this._loadCommits();
  }

}
