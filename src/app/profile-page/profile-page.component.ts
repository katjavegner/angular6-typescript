import { Component, OnInit } from "@angular/core";
import { ApiService } from "../api.service";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Profile } from "../model/profile.model";

@Component({
  selector: "app-profile-page",
  templateUrl: "./profile-page.component.html",
  styleUrls: ["./profile-page.component.css"]
})
export class ProfilePageComponent implements OnInit {
  restItems: any;
  profileForm: FormGroup;
  updatedProfile: Profile;

  constructor(private apiService: ApiService, private profile: FormBuilder) {}

  ngOnInit() {
    this.getRestItems();

    this.profileForm = this.profile.group({
      id: [""],
      name: [""],
      email: [""]
    });
  }

  getRestItems(): void {
    this.apiService.getProfileData().subscribe(restItems => {
      this.restItems = restItems;
    });
  }

  onSubmit(user) {
    this.updatedProfile = {
      id: user.id,
      name: this.profileForm.controls.name.value || user.name,
      email: this.profileForm.controls.email.value
    };
    this.apiService.updateProfile(this.updatedProfile).subscribe();
  }
}
