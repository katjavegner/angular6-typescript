import { Injectable } from "@angular/core";
import { environment } from "../environments/environment";

import { HttpClient } from "@angular/common/http";
import { Profile } from "./model/profile.model";
import { Job } from "./model/job.model";
import { Observable, forkJoin } from "rxjs";
import { catchError, map, tap } from "rxjs/operators";
import { HttpHeaders } from "@angular/common/http";

const API_URL = environment.apiUrl;
const httpOptions = {
  headers: new HttpHeaders({
    "Content-Type": "application/json",
    Authorization: "my-auth-token"
  })
};
@Injectable()
export class ApiService {
  constructor(private http: HttpClient) {}

  // API: GET /job-overview
  getAllJobsandProfile(userId) {
    return forkJoin(
      this.http.get(API_URL + "/jobs").pipe(map(response => response)),
      this.http
        .get(API_URL + "/users/" + userId)
        .pipe(map(response => response))
    );
  }

  // API: GET /profile
  getProfileData() {
    return this.http.get(API_URL + "/users").pipe(map(response => response));
  }

  // API: PUT /profile
  updateProfile(profile: Profile): Observable<any> {
    return this.http
      .put(API_URL + "/users/" + profile.id, profile, httpOptions)
      .pipe(
        tap(_ => console.log(`updated profile id=${profile.id}`)),
        catchError(this.handleError)
      );
  }

  // API: PUT /job-overview
  updateApplication(job: Job): Observable<any> {
    return this.http.put(API_URL + "/jobs/" + job.id, job, httpOptions).pipe(
      tap(_ => console.log(`updated job id=${job.id}`)),
      catchError(this.handleError)
    );
  }

  //handle error
  private handleError(error: Response | any) {
    console.error("ApiService::handleError", error);
    return Observable.throw(error);
  }
}
