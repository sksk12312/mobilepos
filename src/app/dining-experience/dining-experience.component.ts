import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { RoutingGuardService } from '../routing-guard.service';

@Component({
  selector: 'app-dining-experience',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './dining-experience.component.html',
  styleUrls: ['./dining-experience.component.scss']
})
export class DiningExperienceComponent {

  selectedExperience = 'normal_dining'; // default

  constructor(private router: Router, private guardService: RoutingGuardService) {}

  goBack() {
    this.router.navigate(['/select-outlet']);
  }

  continue() {
    console.log('Selected dining experience:', this.selectedExperience);

    // Set selected dining area in routing guard
    const success = this.guardService.setSelectedDiningArea(this.selectedExperience);
    
    if (success) {
      // Navigate to table selection (next step in correct order)
      this.router.navigate(['/select-table']);
    }
  }
}
