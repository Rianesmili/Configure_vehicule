import { Component, OnInit } from '@angular/core';
import { UserDataService } from '../../repository/user-data.service';

import { Router } from '@angular/router';

@Component({
  selector: 'app-tune-your-vehicule',
  templateUrl: './tune-your-vehicule.component.html',
  styleUrls: ['./tune-your-vehicule.component.scss'],
})
export class TuneYourVehiculeComponent implements OnInit {

  total: number = 0;
  selectedItem: string = "";
  disableTires: boolean = false;

  constructor(
    private userDataService: UserDataService,
    private router: Router
  ) {}

  navigateToPurchase() {
    this.router.navigate(['purchase']);
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

  onCheckboxChange(event: CustomEvent) {
    const isChecked = event.detail.checked;
    this.disableTires = isChecked && this.selectedItem === 'Nitro';
  }

  ngOnInit() {}

}
