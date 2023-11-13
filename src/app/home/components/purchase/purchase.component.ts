import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {Clipboard} from '@capacitor/clipboard';
import {UserDataService} from "../../repository/user-data.service";
import { ToastController } from '@ionic/angular';  // service ToastController
import { Platform } from '@ionic/angular';  // service Platform pour gérer la plateforme si android ou web pour presse papier

@Component({
  selector: 'app-purchase',
  templateUrl: './purchase.component.html',
  styleUrls: ['./purchase.component.scss'],
})
export class PurchaseComponent implements OnInit {

  constructor(
    private userDataService: UserDataService,
    private toastController: ToastController,  // Injectez ToastController
    private platform: Platform
  ) {
  }

  total: number = 0;
  creditsLeft: number = 0;
  purchasedItems: string = "";


  @ViewChild('purchaseSummary', {static: false}) purchaseSummary!: ElementRef;

  async copyToClipboard(text: string) {
    await Clipboard.write({ string: text });

    // Affichez un message de succès basé sur la plateforme
    if (this.platform.is('cordova') || this.platform.is('capacitor')) {
      // Code spécifique à Cordova/Capacitor (mobile)
      this.showToast('Texte copié avec succès');
    } else {
      alert('Texte copié avec succès');
    }
  }

  async showToast(message: string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 2000,
      position: 'bottom',
    });
    await toast.present();
  }

  copyPurchaseSummary() {
    if (this.purchaseSummary && this.purchaseSummary.nativeElement) {
      const purchaseSummaryText = this.purchaseSummary.nativeElement.innerText;
      this.copyToClipboard(purchaseSummaryText);
    } else {
      console.error('Aucun élément purchaseSummary ou purchaseSummary.nativeElement trouvé.');
    }
  }

  getClipboardText(): string {
    return `Total amount: ${this.total} credits - Purchased: ${this.purchasedItems} - Credits left: ${this.creditsLeft}`;
  }

  onCopySuccess() {
    console.log('Texte copié avec succès dans le presse-papiers.');
  }

  onCopyError() {
    console.error('Erreur lors de la copie du texte dans le presse-papiers.');
  }

  ngOnInit() {
    this.total = this.userDataService.getTotal();
    this.creditsLeft = this.userDataService.getCredits();
    this.purchasedItems = this.userDataService.getPurchasedItems();
  }

}
