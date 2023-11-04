import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';

import { Clipboard } from '@capacitor/clipboard';


@Component({
  selector: 'app-purchase',
  templateUrl: './purchase.component.html',
  styleUrls: ['./purchase.component.scss'],
})
export class PurchaseComponent implements OnInit {

  constructor() {
  }

  total: number = 130;
  purchasedItems: string = "Car, Soft tires, Nitro (10 units)";
  creditsLeft: number = 85;


  @ViewChild('purchaseSummary', {static: false}) purchaseSummary!: ElementRef;

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
    const purchaseSummaryText = this.purchaseSummary.nativeElement.innerText;
    this.copyToClipboard(purchaseSummaryText);
  }

  ngOnInit() {
  }

}
