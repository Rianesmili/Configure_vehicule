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

  updateCredits(newCredits: number) {
    this.credits = newCredits;
  }

  makePurchase(totalAmount: number): boolean {
    if (this.credits >= totalAmount) {
      const newCredits = this.credits - totalAmount;
      this.updateCredits(newCredits);
      return true;
    } else {
      return false; // L'utilisateur n'a pas suffisamment de crédits
    }
  }
}
