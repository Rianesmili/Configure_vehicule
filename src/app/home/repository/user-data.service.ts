import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserDataService {
  private credits: number = 215;
  private purchasedItems: string = "";
  private total: number = 0;


  constructor() {
  }

  getCredits(): number {
    // permet de récupérer le nombre de crédits
    return this.credits;
  }

  setCredits(newCredits: number) {
    // permet de mettre a jour le nombre de crédits
    this.credits = newCredits;
  }

  getPurchasedItems(): string {
    // permet de récupérer les items achetés
    return this.purchasedItems;
  }

  setPurchasedItems(items: string) {
    // permet de mettre a jour les items achetés
    this.purchasedItems = items;
  }

  getTotal(): number {
    // permet de récupérer le total des items achetés (en crédits)
    return this.total;
  }

  setTotal(newTotal: number) {
    // permet de mettre a jour le total des items achetés (en crédits)
    this.total = newTotal;
  }


}
