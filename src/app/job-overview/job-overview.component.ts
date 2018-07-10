import { Component, OnInit } from "@angular/core";
import { ApiService } from "../api.service";

@Component({
  selector: "app-job-overview",
  templateUrl: "./job-overview.component.html",
  styleUrls: ["./job-overview.component.css"]
})
export class JobOverviewComponent implements OnInit {
  positions: any;
  profile: any;

  constructor(private apiService: ApiService) {}

  ngOnInit() {
    this.getData();
  }

  //get an idea that we need data for specific user and we can get his/her data by id
  getData(): void {
    this.apiService.getAllJobsandProfile(1).subscribe(data => {
      this.positions = data[0];
      this.profile = data[1];
    });
  }
}
