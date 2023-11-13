import {Component, OnInit} from '@angular/core';
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
    private toastController: ToastController,  // Injection ToastController
    private platform: Platform
  ) {
  }

  total: number = 0;
  creditsLeft: number = 0;
  purchasedItems: string = "";


  async showToast(message: string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 2000,
      position: 'bottom',
    });
    await toast.present();
  }

  getClipboardText(): string {
    return `Total amount: ${this.total} credits - Purchased: ${this.purchasedItems} - Credits left: ${this.creditsLeft}`;
  }

  onCopySuccess() {
    if (this.platform.is('cordova') || this.platform.is('capacitor')) {
      // Si mobile android
      this.showToast(`${this.getClipboardText()} - Texte copié avec succès`);
    } else {
      // Si Navigateur
      alert(`${this.getClipboardText()} - Texte copié avec succès`);
    }
  }

  ngOnInit() {
    this.total = this.userDataService.getTotal();
    this.creditsLeft = this.userDataService.getCredits();
    this.purchasedItems = this.userDataService.getPurchasedItems();
  }

}
