import { Component, Input, OnInit } from "@angular/core";
import { ApiService } from "../api.service";
import { Profile } from "../model/profile.model";
import { Job } from "../model/job.model";

@Component({
  selector: "app-job-description",
  templateUrl: "./job-description.component.html",
  styleUrls: ["./job-description.component.css"]
})
export class JobDescriptionComponent implements OnInit {
  @Input() position: Job;
  @Input() profile: Profile;

  applyButtonVisible: boolean;
  retractButtonVisible: boolean;

  constructor(private apiService: ApiService) {}

  ngOnInit() {
    this.checkButtonState(this.position);
  }

  // assume that there's no such situation where applicantsIds had id of user, but user doesn't have email
  checkButtonState(position) {
    if (position.applicantsIds.length == 0) {
      if (this.profile.email) {
        this.retractButtonVisible = false;
        this.applyButtonVisible = true;
      } else {
        this.retractButtonVisible = false;
        this.applyButtonVisible = false;
      }
    } else {
      if (
        position.applicantsIds.includes(this.profile.id) &&
        this.profile.email
      ) {
        this.retractButtonVisible = true;
        this.applyButtonVisible = true;
      } else {
        this.retractButtonVisible = false;
        this.applyButtonVisible = false;
      }
    }
  }

  retractFromPosition(position) {
    var index = position.applicantsIds.indexOf(this.profile.id);
    position.applicantsIds.splice(index, 1);
    this.apiService.updateApplication(position).subscribe();
    //TODO proper state update after sending request
    this.checkButtonState(this.position);
  }

  applyForPosition(position) {
    position.applicantsIds.push(this.profile.id);
    this.apiService.updateApplication(position).subscribe();
    this.checkButtonState(this.position);
  }
}
