import { Component, Input } from '@angular/core';
import axios from 'axios';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-collaborateur-modal',
  templateUrl: './collaborateur-modal.component.html',
  styleUrls: ['./collaborateur-modal.component.scss']
})
export class CollaborateurModalComponent {
  constructor() {}
  @Input() detailedCollaborateur: any;

  viewCollaborateur(collaborateur: any) {
    // Récupérer les détails du collaborateur
    this.fetchCollaborateurDetails(collaborateur.id)
      .then((detailedCollaborateur: any) => {
        // Afficher les détails dans une fenêtre modale
        this.showCollaborateurModal(detailedCollaborateur);
      })
      .catch(error => {
        console.error('Erreur lors de la récupération des détails du collaborateur :', error);
      });
  }

  fetchCollaborateurDetails(collaborateurId: any) {
    return axios.get(`http://localhost:8090/api/v1/Collaborateurs/${collaborateurId}`)
      .then(response => response.data)
      .catch(error => {
        throw error;
      });
  }

  showCollaborateurModal(detailedCollaborateur: any) {
    // Récupérer le contenu HTML de la template
    axios.get('./collaborateur-modal.component.html', { responseType: 'text' })
      .then(response => {
        const htmlTemplate = response.data;
        // Remplacer les variables dans le modèle HTML
        const htmlContent = htmlTemplate.replace(/\$\{([^}]+)\}/g, (match, group) => {
          return detailedCollaborateur[group.trim()] || '';
        });

        // Afficher les détails du collaborateur dans une fenêtre modale
        Swal.fire({
          title: 'Détails du Collaborateur',
          html: htmlContent,
          showCloseButton: true,
          showConfirmButton: false
        });
      })
      .catch(error => {
        console.error('Erreur lors de la récupération du contenu HTML :', error);
      });
  }
}
