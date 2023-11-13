import {Component, OnInit} from '@angular/core';
import {UserDataService} from '../../repository/user-data.service';
import {Router} from '@angular/router';
import {VehicleConfiguration} from "../../data/vehicle-configuration";

@Component({
  selector: 'app-tune-your-vehicule',
  templateUrl: './tune-your-vehicule.component.html',
  styleUrls: ['./tune-your-vehicule.component.scss'],
})
export class TuneYourVehiculeComponent implements OnInit {

  total: number = 0;
  creditsLeft: number = 250;
  selectedItem: string = "";
  disableTires: boolean = false;

  configuration: VehicleConfiguration = {
    type: '',
    tires: '',
    nitro: false,
    spoiler: false,
    creditsRequired: 0,
    purchasedItems: '',
  };

  constructor(
    private userDataService: UserDataService,
    private router: Router
  ) {
  }

  navigateToPurchase() {
    const purchaseSummary = {
      total: this.configuration.creditsRequired,
      purchasedItems: this.configuration.purchasedItems,
      creditsLeft: this.credits - this.configuration.creditsRequired
    };

    // TODO : fix to non reinitialisation of credits in first view this.userDataService.setPurchasedItems(this.configuration.purchasedItems);

    this.userDataService.setCredits(this.credits - this.configuration.creditsRequired);
    this.userDataService.setPurchasedItems(this.configuration.purchasedItems);

    this.router.navigate(['purchase'], {state: purchaseSummary});
  }

  get credits(): number {
    return this.userDataService.getCredits();
  }

  set credits(newCredits: number) {
    this.userDataService.setCredits(newCredits);
  }

  isTotalExceededAvailableCredits(total: number, availableCredits: number): boolean {
    return total > availableCredits;
  }

  updateCreditsRequired() {
    let creditsRequired = 0;
    let purchasedItems = '';

    if (this.configuration.type === 'Car') {
      creditsRequired += 0;
      purchasedItems += 'Car, ';
      this.disableTires = false;
    } else if (this.configuration.type === 'Motorbike') {
      creditsRequired += 0;
      purchasedItems += 'Motorbike, ';
      this.disableTires = false;
    } else if (this.configuration.type === 'Hovercraft') {
      creditsRequired += 50;
      purchasedItems += 'Hovercraft, ';
      this.disableTires = true; // Désactive la sélection de pneus lorsque le type est "Hovercraft"
      this.configuration.tires = ''; // Réinitialise la sélection de pneus
    } else {
      this.disableTires = false; // Réactive la sélection de pneus pour les autres types de véhicules
    }

    if (this.configuration.tires === 'Hard') {
      creditsRequired += 0;
      purchasedItems += 'Hard tires, ';
    } else if (this.configuration.tires === 'Soft') {
      creditsRequired += 30;
      purchasedItems += 'Soft tires, ';
    }

    if (this.configuration.nitro) {
      creditsRequired += 100;
      purchasedItems += 'Nitro (10 units), ';
    }

    if (this.configuration.spoiler) {
      creditsRequired += 200;
      purchasedItems += 'Spoiler, ';
    }

    this.configuration.creditsRequired = creditsRequired;
    this.configuration.purchasedItems = purchasedItems.slice(0, -2);
    // Supprime la virgule et l'espace du dernier élément
    this.userDataService.setTotal(creditsRequired);
  }

  ngOnInit() {
    // Initialisez les valeurs avec celles du service UserDataService
    this.total = this.userDataService.getTotal();
    this.creditsLeft = this.userDataService.getCredits();
  }

}
