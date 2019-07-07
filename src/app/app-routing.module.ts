import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UsersComponent } from './users/users.component';
import { UserComponent } from './user/user.component';
import { RepoComponent } from './repo/repo.component';
import { NfComponent } from './nf/nf.component';
import { CommitsComponent } from './commits/commits.component';


const routes: Routes = [
  { path: '', component: UsersComponent },
  { path: 'user/:username', component: UserComponent },
  { path: 'repo/:username/:repo', component: RepoComponent },
  { path: 'commits/:username/:repo/:sha', component: CommitsComponent },
  { path: '**', component: NfComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
