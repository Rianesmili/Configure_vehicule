import { Component, OnInit } from '@angular/core';
import { UserDataService } from '../../repository/user-data.service';
import { Router } from '@angular/router';
import {VehicleConfiguration} from "../../data/vehicle-configuration";

@Component({
  selector: 'app-tune-your-vehicule',
  templateUrl: './tune-your-vehicule.component.html',
  styleUrls: ['./tune-your-vehicule.component.scss'],
})
export class TuneYourVehiculeComponent implements OnInit {

  total: number = 215;
  selectedItem: string = "";
  disableTires: boolean = false;

  configuration: VehicleConfiguration = {
    type: '',
    tires: '',
    nitro: false,
    spoiler: false,
    creditsRequired: 0
  };

  constructor(
    private userDataService: UserDataService,
    private router: Router
  ) {}

  navigateToPurchase() {
    // const purchasedItems = /* Logique pour obtenir les articles achetés */;
    const purchaseSummary = {
      total: this.configuration.creditsRequired,
      // purchasedItems: purchasedItems,
      creditsLeft: this.credits - this.configuration.creditsRequired
    };

    this.router.navigate(['purchase'], { state: purchaseSummary });
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

    if (this.configuration.type === 'Car') {
      creditsRequired += 0;
    } else if (this.configuration.type === 'Motorbike') {
      creditsRequired += 0;
    } else if (this.configuration.type === 'Hovercraft') {
      creditsRequired += 50;
    }

    if (this.configuration.tires === 'Hard') {
      creditsRequired += 0;
    } else if (this.configuration.tires === 'Soft') {
      creditsRequired += 30;
    }

    if (this.configuration.nitro) {
      creditsRequired += 100;
      this.disableTires = true; // Désactive la sélection de pneus lorsque Nitro est sélectionné
      this.configuration.tires = '';
    } else {
      this.disableTires = false; // Réactive la sélection de pneus lorsque Nitro n'est pas sélectionné
    }
    if (this.configuration.spoiler) {
      creditsRequired += 200;
    }

    this.configuration.creditsRequired = creditsRequired;
  }


  ngOnInit() {}

}
