import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class GithubService {

  constructor(private _http: HttpClient) { }

  private endpoint: string = 'https://api.github.com';

  public getUsers(since: number) {
    return this._http.get(`${this.endpoint}/users?since=${since}`);
  }

  public getUser(username: string) {
    return this._http.get(`${this.endpoint}/users/${username}`);
  }

  public getRepos(username: string) {
    return this._http.get(`${this.endpoint}/users/${username}/repos`);
  }

  public getRepo(username: string, repo: string) {
    return this._http.get(`${this.endpoint}/repos/${username}/${repo}`);
  }

  public getBranches(username: string, reponame: string) {
    return this._http.get(`${this.endpoint}/repos/${username}/${reponame}/branches`);
  }

  public getCommits(username: string, reponame: string, sha: string, until?: string) {
    return this._http.get(`${this.endpoint}/repos/${username}/${reponame}/commits?sha=${sha}${until ? '&until=' + until : ''}&per_page=10`);
  }

}
