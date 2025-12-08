import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dining-experience',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './dining-experience.component.html',
  styleUrls: ['./dining-experience.component.scss']
})
export class DiningExperienceComponent {

  selectedExperience = 'normal_dining'; // default

  constructor(private router: Router) {}

  goBack() {
    this.router.navigate(['/select-outlet']);
  }

  continue() {
    console.log('Selected dining experience:', this.selectedExperience);

    if (this.selectedExperience === 'takeout') {
      this.router.navigate(['/pos']);
    } else if (this.selectedExperience === 'fine_dine') {
      this.router.navigate(['/reservation']);
    } else {
      this.router.navigate(['/waitlist']);
    }
  }
}
