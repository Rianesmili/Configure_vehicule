import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Clipboard } from '@capacitor/clipboard';
import { UserDataService } from "../../repository/user-data.service";

@Component({
  selector: 'app-purchase',
  templateUrl: './purchase.component.html',
  styleUrls: ['./purchase.component.scss'],
})
export class PurchaseComponent implements OnInit {

  constructor(private userDataService: UserDataService) {}

  total: number = 130;
  creditsLeft: number = 85;
  purchasedItems: string = "";

  @ViewChild('purchaseSummary', { static: false }) purchaseSummary!: ElementRef;

  copyToClipboard(text: string) {
    Clipboard.write({
      string: text
    }).then(() => {
      console.log('Texte copié avec succès dans le presse-papiers.');
    }).catch((error) => {
      console.error('Erreur lors de la copie du texte dans le presse-papiers :', error);
    });
  }

  copyPurchaseSummary() {
    if (this.purchaseSummary) {
      const purchaseSummaryText = this.purchaseSummary.nativeElement.innerText;
      this.copyToClipboard(purchaseSummaryText);
    }
  }

  ngOnInit() {
    this.creditsLeft = this.userDataService.getCredits();
    const state = window.history.state;
    if (state && state.purchasedItems) {
      this.purchasedItems = state.purchasedItems;
    }
  }

}
