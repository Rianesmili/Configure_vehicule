import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserDataService {
  private credits: number = 215;
  private purchasedItems: string = "";
  private total: number = 0;


  constructor() {}

  getCredits(): number {
    return this.credits;
  }

  setCredits(newCredits: number) {
    this.credits = newCredits;
  }

  getPurchasedItems(): string {
    return this.purchasedItems;
  }

  setPurchasedItems(items: string) {
    this.purchasedItems = items;
  }


  setTotal(newTotal: number) {
    this.total = newTotal;
  }

  getTotal(): number {
    return this.total;
  }


}
