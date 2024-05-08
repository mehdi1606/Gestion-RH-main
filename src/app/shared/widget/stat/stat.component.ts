import { Component, OnInit, Input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Router, RouterModule } from '@angular/router';
import axios from 'axios';

@Component({
  selector: 'app-stat',
  templateUrl: './stat.component.html',
  styleUrls: ['./stat.component.scss']
})
export class StatComponent implements OnInit {
  totalCollaborateurs: number = 0;
  @Input() title: string;
  @Input() value: string;
  @Input() icon: string;
  constructor(private router: Router) {}



  ngOnInit() {

    this.loadTotalCollaborateurs();
  }
  navigateToCollaborateur() {
    this.router.navigate(['/dashboard']);
  }
  loadTotalCollaborateurs() {
    axios.get('http://localhost:8090/api/v1/Collaborateurs')
      .then(response => {
        // Assuming the API returns an array of collaborators
        this.totalCollaborateurs = response.data.length;
        console.log('Total Collaborateurs:', this.totalCollaborateurs);
      })
      .catch(error => {
        console.error('Error fetching total collaborators:', error);
      });
  }
}
