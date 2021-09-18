import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  apiUrl = environment.api + '/user/';
  constructor(private httpClient: HttpClient, private router: Router) {}

  createUser(formData) {
    return this.httpClient.post(this.apiUrl + '/createUser', formData);
  }

  updateUser(formData) {
    return this.httpClient.put(this.apiUrl + '/updateUser', formData);
  }

  getUser() {
    return this.httpClient.get(this.apiUrl);
  }

  getEditUser(id) {
    return this.httpClient.get(this.apiUrl + id);
  }

  deleteUser(id) {
    return this.httpClient.delete(this.apiUrl + id);
  }
}
