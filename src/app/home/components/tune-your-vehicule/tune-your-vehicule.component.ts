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

  total: number = 0; // total des crédits requis pour la configuration actuelle
  creditsLeft: number = 250; // Stocke le nombre de crédits disponibles initialement a 250
  disableTires: boolean = false; // Désactive le bouton des pneus
  selectedVehicleType: string = ''; //  Stocke le type de véhicule sélectionné
  selectedTires: string = ''; // Stocke le type de pneus sélectionné

  isNitroSelected: boolean = false;
  isSpoilerSelected: boolean = false;

  configuration: VehicleConfiguration = {
    // configuration: Objet contenant les informations de configuration du véhicule
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

    this.userDataService.setCredits(this.credits - this.configuration.creditsRequired);
    this.userDataService.setPurchasedItems(this.configuration.purchasedItems);

   this.router.navigate(['purchase'], {state: purchaseSummary});
  }

  get credits(): number {
    /**
     * Cette fonction récupère la valeur actuelle des crédits de l'utilisateur à partir du service UserDataService.
     */
    return this.userDataService.getCredits();
  }

  set credits(newCredits: number) {
    /**
     * Cette fonction met à jour la valeur des crédits de l'utilisateur dans le service UserDataService.
     */
    this.userDataService.setCredits(newCredits);
  }

  isTotalExceededAvailableCredits(): boolean {
    /**
     * Cette fonction vérifie si le total des crédits requis pour la configuration actuelle est supérieur aux crédits disponibles.
     * Si c'est le cas, elle retourne true.
     * et elle vérifie si les valeurs des propriétés selectedVehicleType, selectedTires, isNitroSelected et isSpoilerSelected
     *  sont toutes égales à '' ou false. Si c'est le cas, cela signifie qu'aucun champ n'est sélectionné et la fonction retourne true
     */
    return (
      this.configuration.creditsRequired > this.credits ||
      (this.selectedVehicleType === '' && this.selectedTires === '' && !this.isNitroSelected && !this.isSpoilerSelected)
    );
  }

  updateConfiguration() {
    /**
     * Cette fonction met à jour la configuration du véhicule en fonction des valeurs des propriétés
     * selectedVehicleType, selectedTires, isNitroSelected et isSpoilerSelected.
     */
    let creditsRequired = 0;
    let purchasedItems = '';

    creditsRequired += 0;
    purchasedItems += this.selectedVehicleType + ', ';

    if (this.selectedVehicleType === 'Hovercraft') {
      creditsRequired += 50;
      purchasedItems += 'Hard tires, ';
      this.configuration.tires = 'Hard';
    } else {
      if (this.selectedTires === 'Hard') {
        creditsRequired += 0;
        purchasedItems += 'Hard tires, ';
      } else if (this.selectedTires === 'Soft') {
        creditsRequired += 30;
        purchasedItems += 'Soft tires, ';
      }
      this.configuration.tires = this.selectedTires;
    }

    if (this.isNitroSelected) {
      creditsRequired += 100;
      purchasedItems += 'Nitro (10 units), ';
      this.configuration.nitro = true;
    } else {
      this.configuration.nitro = false;
    }

    if (this.isSpoilerSelected) {
      creditsRequired += 200;
      purchasedItems += 'Spoiler, ';
      this.configuration.spoiler = true;
    } else {
      this.configuration.spoiler = false;
    }

    this.configuration.creditsRequired = creditsRequired;
    this.configuration.purchasedItems = purchasedItems.slice(0, -2); // Supprime la dernière virgule et l'espace
    this.userDataService.setTotal(creditsRequired);
  }

  ngOnInit() {
    /**
     * Cette fonction est appelée lors de l'initialisation du composant.
     * Elle récupère les valeurs initiales du total et des crédits disponibles à partir du service.
     */
    this.total = this.userDataService.getTotal();
    this.creditsLeft = this.userDataService.getCredits();
  }
}
