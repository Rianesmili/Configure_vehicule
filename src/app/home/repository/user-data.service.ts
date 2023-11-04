import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserDataService {
  private credits: number = 215;

  constructor() {}

  getCredits(): number {
    return this.credits;
  }

  setCredits(newCredits: number) {
    this.credits = newCredits;
  }
}
