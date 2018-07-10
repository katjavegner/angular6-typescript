import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { JobOverviewComponent } from "./job-overview/job-overview.component";
import { ProfilePageComponent } from "./profile-page/profile-page.component";

const routes: Routes = [
  { path: "", redirectTo: "/", pathMatch: "full" },
  { path: "job-overview", component: JobOverviewComponent },
  { path: "profile-page", component: ProfilePageComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
