import {Component, OnInit} from '@angular/core';
import {UserDataService} from "../../repository/user-data.service";
import {Platform, ToastController} from '@ionic/angular'; // service Platform pour gérer la plateforme si android ou web pour presse papier // service ToastController

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
    /** Création d'un toast asynchrone  veut dire que le code ne s'arrête pas pour attendre la fin de l'exécution de la méthode */
    const toast = await this.toastController.create({
      message: message, // prend en paramètre le message à afficher
      duration: 2000, // durée d'affichage du toast
      position: 'bottom',
    });
    await toast.present();
  }

  getClipboardText(): string { /** construit le texte à copier dans le presse papier */
    return `Total amount: ${this.total} credits - Purchased: ${this.purchasedItems} - Credits left: ${this.creditsLeft}`;
  }

  onCopySuccess() { /** Dans le cas d'une application mobile, on utilise le plugin Clipboard de capacitor */
    if (this.platform.is('cordova') || this.platform.is('capacitor')) {
      this.showToast(`Texte copié avec succès`); // Si mobile android
    } else {
      alert(`Texte copié avec succès`); // Si Web
    }
  }

  ngOnInit() {
    /** récupère les données du service UserDataService */
    this.total = this.userDataService.getTotal();
    this.creditsLeft = this.userDataService.getCredits();
    this.purchasedItems = this.userDataService.getPurchasedItems();
  }

}
