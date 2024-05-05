import { Component } from '@angular/core';
import { DatePipe } from '@angular/common';
import axios from 'axios';

import Swal from 'sweetalert2';
@Component({
  selector: 'app-collaborateur',
  templateUrl: './collaborateur.component.html',
  styleUrls: ['./collaborateur.component.scss'],
  providers: [DatePipe], // Add DatePipe as a provider


})
export class CollaborateurComponent {
  isVisible = false;
  collaborateurs: any[] = [];
  filteredCollaborateurs: any[] = [];
  currentPage = 1;
  entriesPerPage = 5; // Adjust the number of entries per page as needed
  totalPages = 0;
  selectedCollaborateur: any;

  constructor(private datePipe: DatePipe) {}

  showModal(): void {
    this.isVisible = true;
  }

  handleOk(): void {
    console.log('Button ok clicked!');
    this.isVisible = false;
  }

  handleCancel(): void {
    console.log('Button cancel clicked!');
    this.isVisible = false;
  }

  ngOnInit(): void {
    this.fetchCollaborateurs();
  }

  fetchCollaborateurs(): void {
    axios.get('http://localhost:8090/api/v1/Collaborateurs')
      .then(response => {
        this.collaborateurs = response.data;
        this.filteredCollaborateurs = this.collaborateurs.map(collaborateur => this.mapCollaborateur(collaborateur));
        this.totalPages = Math.ceil(this.collaborateurs.length / this.entriesPerPage);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }

  mapCollaborateur(collaborateur: any): any {
    return {
      Id: collaborateur.matricule,
      Nom: collaborateur.nom,
      Prenom: collaborateur.prenom,
      Sexe: collaborateur.sexe,
      CIN: collaborateur.cin,
      Nationalite: collaborateur.nationalité,
      Categorie: collaborateur.categorie,
      Age: collaborateur.age,
      DateNaissance: collaborateur.date_naissance,
      Filiale: collaborateur.filiale,
      Type: collaborateur.type,
      Departement: collaborateur.département,
      Fonction: collaborateur.fonction,
      DateEntree: collaborateur.date_entree,
      Anciennete: collaborateur.ancienneté
    };
  }

  formatDate(dateString: string): string {
    
 
    // Extract the date part from the ISO string and return
 
    // Check if the input string matches the format "yyyy-MM-dd HH:mm:ss"
    const regexISO8601 = /^\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}$/;
    if (regexISO8601.test(dateString)) {
        const date = new Date(dateString);
        return this.datePipe.transform(date, 'yyyy-MM-dd') || '';
    }

    // Check if the input string matches the format "Day Mon DD HH:mm:ss TZO YYYY"
    const regexJSDate = /^(Mon|Tue|Wed|Thu|Fri|Sat|Sun) (Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec) (\d{2}) (\d{2}:\d{2}:\d{2}) (\w{3}) (\d{4})$/;
    if (regexJSDate.test(dateString)) {
        const [, , month, day, , ,year] = dateString.match(regexJSDate);
        const formattedDate = `${year}-${this.getMonthNumber(month)}-${day}`;
        return formattedDate;
    }

    // If neither format matches, return an empty string or handle accordingly
    return dateString.split('T')[0];
}


getMonthNumber(month: string): string {
    const months = {
        Jan: '01', Feb: '02', Mar: '03', Apr: '04',
        May: '05', Jun: '06', Jul: '07', Aug: '08',
        Sep: '09', Oct: '10', Nov: '11', Dec: '12'
    };
    return months[month];
}




  setPage(pageNumber: number) {
    // Validate page number
    if (pageNumber >= 1 && pageNumber <= this.totalPages) {
      this.currentPage = pageNumber;
    }
  }

  getEntriesForPage() {
    // Calculate starting and ending index for entries on current page
    const startIndex = (this.currentPage - 1) * this.entriesPerPage;
    const endIndex = Math.min(startIndex + this.entriesPerPage, this.collaborateurs.length);
    // Return entries for current page
    return this.collaborateurs.slice(startIndex, endIndex);
  }
  generatePages(): number[] {
    return Array(this.totalPages).fill(0).map((_, i) => i + 1);
  }
  viewCollaborateur(collaborateur: any) {
    // Fetch detailed collaborateur data using collaborateur.Id
    axios.get(`http://localhost:8090/api/v1/Collaborateurs/${collaborateur.Id}`)
      .then(response => {
     // Show detailed information in a modal or popup
     const detailedCollaborateur = response.data;
     this.refreshTable();
     // Function to format date
    

     // Format date fields
     detailedCollaborateur.date_entree = this.formatDate(detailedCollaborateur.date_entree);
     detailedCollaborateur.date_naissance = this.formatDate(detailedCollaborateur.date_naissance);
     
     console.log(detailedCollaborateur.date_entree);

        Swal.fire({
          title: 'Collaborateur Details ',
          html: `
          <head>
          <style>
            
        
            .container {
              padding: 2rem;
            }
        
         
    .card {
      background-color: #fff;
      border-radius: 5px;
      box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
      margin-bottom: 2rem;
    }

    .card-header {
      background-color: #f0f0f0;
      padding: 1rem;
      border-bottom: 1px solid #e0e0e0;
    }

    .card-body {
      padding: 1.5rem;
    }

    h5 {
      font-size: 1.25rem;
      margin-bottom: 1rem;
      color: #333;
    }

    p {
      font-size: 1rem;
      margin-bottom: 0.5rem;
    }

    .details-item {
      margin-bottom: 1rem;
    }

    .details-item span {
      font-weight: bold;
      margin-right: 0.5rem;
    }
  </style>
</head>
        
          <div class="container">
            <div class="card">
              <div class="card-header">
                <h5>${detailedCollaborateur.nom} ${detailedCollaborateur.prenom}</h5>
              </div>
              <div class="card-body">
                <div class="details-item">
                  <span>CIN:</span>
                  <span>${detailedCollaborateur.cin}</span>
                </div>
                <div class="details-item">
                  <span>Age:</span>
                  <span>${detailedCollaborateur.age}</span>
                </div>
                <div class="details-item">
                  <span>Sexe:</span>
                  <span>${detailedCollaborateur.sexe}</span>
                </div>
                <div class="details-item">
                  <span>Nationalité:</span>
                  <span>${detailedCollaborateur.nationalité}</span>
                </div>
                <div class="details-item">
                  <span>Date de naissance:</span>
                  <span>${detailedCollaborateur.date_naissance}</span>
                </div>
              </div>
            </div>
        
            <div class="card">
              <div class="card-header">
                <h5>Information</h5>
              </div>
              <div class="card-body">
                <div class="details-item">
                  <span>Filiale:</span>
                  <span>${detailedCollaborateur.filiale}</span>
                </div>
                <div class="details-item">
                  <span>Département:</span>
                  <span>${detailedCollaborateur.département}</span>
                </div>
                <div class="details-item">
                  <span>Type:</span>
                  <span>${detailedCollaborateur.type}</span>
                </div>
                <div class="details-item">
                  <span>Fonction:</span>
                  <span>${detailedCollaborateur.fonction}</span>
                </div>
                <div class="details-item">
                  <span>Ancienneté:</span>
                  <span>${detailedCollaborateur.ancienneté}</span>
                </div>
                <div class="details-item">
                  <span>Date d'entrée:</span>
                  <span>${detailedCollaborateur.date_entree}</span>
                </div>
              </div>
            </div>
          </div>
        
        
          `,
          showCloseButton: true,
          showConfirmButton: false,
          focusConfirm: false
        });
      })
      .catch(error => {
        console.error('Error fetching detailed collaborateur data:', error);
      });
  } 


  // Add collaborateur method
  addCollaborateur(): void {
    Swal.fire({
      title: 'Add New Collaborateur',
      html: `
      <head>
      <style>
        .swal2-container {
          font-family: Arial, sans-serif;
        }
    
        .swal2-content {
          width: 1500px; /* Adjust width as needed */
          max-height: 80vh; /* Reduce maximum height */
          overflow-y: auto; /* Add vertical scrollbar if content exceeds maximum height */
        }
        .swal2-show {
          width: 75%;
         
      }
        .form-card {
          background-color: #fff;
          border-radius: 5px;
          box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
          margin-bottom: 1rem;
          width: 47%; /* Adjust width as needed */
          display: inline-block;
          vertical-align: top;
        }
    
        .form-card-header {
          background-color: #f0f0f0;
          padding: 1rem;
          border-bottom: 1px solid #e0e0e0;
          font-weight: bold;
          color: #333;
        }
    
        .form-card-body {
          padding: 1.5rem;
        }
    
        .form-label {
          margin-bottom: 0.5rem;
          font-weight: bold;
          color: #333;
        }
    
        .form-control {
          width: 100%;
          padding: 0.5rem;
          margin-bottom: 1rem;
          border: 1px solid #ccc;
          border-radius: 0.25rem;
          transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
        }
    
        .form-control:focus {
          border-color: #80bdff;
          outline: 0;
          box-shadow: 0 0 0 0.2rem rgba(0, 123, 255, 0.25);
        }
    
        .form-select {
          width: 100%;
          padding: 0.5rem;
          margin-bottom: 1rem;
          border: 1px solid #ccc;
          border-radius: 0.25rem;
          transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
        }
    
        .form-select:focus {
          border-color: #80bdff;
          outline: 0;
          box-shadow: 0 0 0 0.2rem rgba(0, 123, 255, 0.25);
        }
    
        .swal2-actions {
          margin-top: 1rem;
        }
    
        .swal2-confirm {
          margin-left: 0.5rem;
          padding: 0.5rem 1rem;
          font-weight: bold;
          color: #fff;
          background-color: #007bff;
          border: 1px solid #007bff;
          border-radius: 0.25rem;
          cursor: pointer;
          transition: background-color 0.15s ease-in-out, border-color 0.15s ease-in-out;
        }
    
        .swal2-confirm:hover {
          background-color: #0056b3;
          border-color: #0056b3;
        }
    
        .swal2-cancel {
          margin-right: 0.5rem;
          padding: 0.5rem 1rem;
          font-weight: bold;
          color: #333;
          background-color: #fff;
          border: 1px solid #ccc;
          border-radius: 0.25rem;
          cursor: pointer;
          transition: background-color 0.15s ease-in-out, border-color 0.15s ease-in-out;
        }
    
        .swal2-cancel:hover {
          background-color: #f8f9fa;
        }
      </style>
    </head>
    
    
    <div class="form-card">
    <div class="form-card-header">Information Personnelle</div>
    <div class="form-card-body">
      <div>
        <label for="nom" class="form-label">Nom:</label>
        <input id="nom" class="form-control" placeholder="Entrez le nom" required>
      </div>
      <div>
        <label for="prenom" class="form-label">Prénom:</label>
        <input id="prenom" class="form-control" placeholder="Entrez le prénom" required>
      </div>
      <div>
        <label for="cin" class="form-label">CIN:</label>
        <input id="cin" class="form-control" placeholder="Entrez le CIN">
      </div>
      <div>
        <label for="sexe" class="form-label">Sexe:</label>
        <select id="sexe" class="form-select">
          <option value="Masculin">Masculin</option>
          <option value="Féminin">Féminin</option>
        </select>
      </div>
      <div>
        <label for="nationalite" class="form-label">Nationalité:</label>
        <input id="nationalite" class="form-control" placeholder="Entrez la nationalité">
      </div>
      <div>
        <label for="age" class="form-label">Age:</label>
        <input id="age" type="number" class="form-control" placeholder="Entrez l'âge">
      </div>
      <div>
        <label for="date_naissance" class="form-label">Date de naissance:</label>
        <input id="date_naissance" type="date" class="form-control" placeholder="Entrez la date de naissance">
      </div>
    </div>
  </div>
  <div class="form-card">
    <div class="form-card-header">Informations Professionnelles</div>
    <div class="form-card-body">
      <div>
        <label for="categorie" class="form-label">Catégorie:</label>
        <input id="categorie" class="form-control" placeholder="Entrez la catégorie">
      </div>
      <div>
        <label for="filiale" class="form-label">Filiale:</label>
        <input id="filiale" class="form-control" placeholder="Entrez la filiale">
      </div>
      <div>
        <label for="type" class="form-label">Type:</label>
        <input id="type" class="form-control" placeholder="Entrez le type">
      </div>
      <div>
        <label for="departement" class="form-label">Département:</label>
        <input id="departement" class="form-control" placeholder="Entrez le département">
      </div>
      <div>
        <label for="fonction" class="form-label">Fonction:</label>
        <input id="fonction" class="form-control" placeholder="Entrez la fonction">
      </div>
      <div>
        <label for="date_entree" class="form-label">Date d'entrée:</label>
        <input id="date_entree" type="date" class="form-control" placeholder="Entrez la date d'entrée">
      </div>
      <div>
        <label for="anciennete" class="form-label">Ancienneté:</label>
        <input id="anciennete" class="form-control" placeholder="Entrez l'ancienneté">
      </div>
    </div>
  </div>
  `,
  showCancelButton: true,
  focusConfirm: false,
  preConfirm: () => {
    // Retrieve input values
    const nom = (<HTMLInputElement>document.getElementById('nom')).value;
    const prenom = (<HTMLInputElement>document.getElementById('prenom')).value;
    const cin = (<HTMLInputElement>document.getElementById('cin')).value;
    const sexe = (<HTMLSelectElement>document.getElementById('sexe')).value;
    const nationalité = (<HTMLInputElement>document.getElementById('nationalite')).value;
    const age = (<HTMLInputElement>document.getElementById('age')).value;
    const date_naissance = (<HTMLInputElement>document.getElementById('date_naissance')).value;
    const categorie = (<HTMLInputElement>document.getElementById('categorie')).value;
    const filiale = (<HTMLInputElement>document.getElementById('filiale')).value;
    const type = (<HTMLInputElement>document.getElementById('type')).value;
    const département = (<HTMLInputElement>document.getElementById('departement')).value;
    const fonction = (<HTMLInputElement>document.getElementById('fonction')).value;
    const date_entree = (<HTMLInputElement>document.getElementById('date_entree')).value;
    const ancienneté = (<HTMLInputElement>document.getElementById('anciennete')).value;
   // Check if any field is empty
   if (!nom || !prenom || !cin || !sexe || !nationalité || !age || !date_naissance ||
    !categorie || !filiale || !type || !département || !fonction || !date_entree || !ancienneté) {
    Swal.showValidationMessage('Veuillez remplir tous les champs.');
    return false; // Prevent form submission if any field is empty
}  
    // Create collaborateur object
    const newCollaborateur = {
      nom: nom,
      prenom: prenom,
      cin: cin,
      sexe: sexe,
      nationalité: nationalité,
      age: age,
      date_naissance: date_naissance,
      categorie: categorie,
      filiale: filiale,
      type: type,
      département: département,
      fonction: fonction,
      date_entree: date_entree,
      ancienneté: ancienneté
      // Include other fields here
    };

    // Send POST request to backend
    axios.post('http://localhost:8090/api/v1/Collaborateurs', newCollaborateur)
      .then(response => {
        // Refresh table upon successful creation
        Swal.fire('Success', 'Collaborateur ajouté avec succès', 'success');
        this.ngOnInit();
      })
      .catch(error => {
        console.error('Error adding collaborateur:', error);
        Swal.fire('Error', 'Une erreur s\'est produite lors de l\'ajout du collaborateur', 'error');
      });
  }
});
  }
  // Method to refresh table
  refreshTable(): void {
    axios.get('http://localhost:8090/api/v1/Collaborateurs')
      .then(response => {
        this.collaborateurs = response.data;
        // Filter and format data if needed
        
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }

  editCollaborateur(collaborateur): void {
    Swal.fire({
      title: 'Edit Collaborateur',
      html: `
      <head>
      <style>
        .swal2-container {
          font-family: Arial, sans-serif;
        }
    
        .swal2-content {
          width: 1500px; /* Adjust width as needed */
          max-height: 80vh; /* Reduce maximum height */
          overflow-y: auto; /* Add vertical scrollbar if content exceeds maximum height */
        }
        .swal2-show {
          width: 75%;
         
      }
        .form-card {
          background-color: #fff;
          border-radius: 5px;
          box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
          margin-bottom: 1rem;
          width: 47%; /* Adjust width as needed */
          display: inline-block;
          vertical-align: top;
        }
    
        .form-card-header {
          background-color: #f0f0f0;
          padding: 1rem;
          border-bottom: 1px solid #e0e0e0;
          font-weight: bold;
          color: #333;
        }
    
        .form-card-body {
          padding: 1.5rem;
        }
    
        .form-label {
          margin-bottom: 0.5rem;
          font-weight: bold;
          color: #333;
        }
    
        .form-control {
          width: 100%;
          padding: 0.5rem;
          margin-bottom: 1rem;
          border: 1px solid #ccc;
          border-radius: 0.25rem;
          transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
        }
    
        .form-control:focus {
          border-color: #80bdff;
          outline: 0;
          box-shadow: 0 0 0 0.2rem rgba(0, 123, 255, 0.25);
        }
    
        .form-select {
          width: 100%;
          padding: 0.5rem;
          margin-bottom: 1rem;
          border: 1px solid #ccc;
          border-radius: 0.25rem;
          transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
        }
    
        .form-select:focus {
          border-color: #80bdff;
          outline: 0;
          box-shadow: 0 0 0 0.2rem rgba(0, 123, 255, 0.25);
        }
    
        .swal2-actions {
          margin-top: 1rem;
        }
    
        .swal2-confirm {
          margin-left: 0.5rem;
          padding: 0.5rem 1rem;
          font-weight: bold;
          color: #fff;
          background-color: #007bff;
          border: 1px solid #007bff;
          border-radius: 0.25rem;
          cursor: pointer;
          transition: background-color 0.15s ease-in-out, border-color 0.15s ease-in-out;
        }
    
        .swal2-confirm:hover {
          background-color: #0056b3;
          border-color: #0056b3;
        }
    
        .swal2-cancel {
          margin-right: 0.5rem;
          padding: 0.5rem 1rem;
          font-weight: bold;
          color: #333;
          background-color: #fff;
          border: 1px solid #ccc;
          border-radius: 0.25rem;
          cursor: pointer;
          transition: background-color 0.15s ease-in-out, border-color 0.15s ease-in-out;
        }
    
        .swal2-cancel:hover {
          background-color: #f8f9fa;
        }
      </style>
    </head>
        <div class="form-card">
          <div class="form-card-header">Information Personnelle</div>
          <div class="form-card-body">
            <div>
              <label for="nom" class="form-label">Nom:</label>
              <input id="nom" class="form-control" placeholder="Entrez le nom" value="${collaborateur.Nom}" required>
            </div>
            <div>
              <label for="prenom" class="form-label">Prénom:</label>
              <input id="prenom" class="form-control" placeholder="Entrez le prénom" value="${collaborateur.Prenom}" required>
            </div>
            <div>
              <label for="cin" class="form-label">CIN:</label>
              <input id="cin" class="form-control" placeholder="Entrez le CIN" value="${collaborateur.CIN}">
            </div>
            <div>
              <label for="sexe" class="form-label">Sexe:</label>
              <select id="sexe" class="form-select">
                <option value="Masculin" ${collaborateur.Sexe === 'Masculin' ? 'selected' : ''}>Masculin</option>
                <option value="Féminin" ${collaborateur.Sexe === 'Féminin' ? 'selected' : ''}>Féminin</option>
              </select>
            </div>
            <div>
              <label for="nationalite" class="form-label">Nationalité:</label>
              <input id="nationalite" class="form-control" placeholder="Entrez la nationalité" value="${collaborateur.Nationalite}">
            </div>
            <div>
              <label for="age" class="form-label">Age:</label>
              <input id="age" type="number" class="form-control" placeholder="Entrez l'âge" value="${collaborateur.Age}">
            </div>
            <div>
              <label for="date_naissance" class="form-label">Date de naissance:</label>
              <input id="date_naissance" type="date" class="form-control" placeholder="Entrez la date de naissance" value="${this.formatDate(collaborateur.DateNaissance).split('T')[0]}">
              </div>          
          </div>
        </div>
        <div class="form-card">
          <div class="form-card-header">Informations Professionnelles</div>
          <div class="form-card-body">
            <div>
              <label for="categorie" class="form-label">Catégorie:</label>
              <input id="categorie" class="form-control" placeholder="Entrez la catégorie" value="${collaborateur.Categorie}">
            </div>
            <div>
              <label for="filiale" class="form-label">Filiale:</label>
              <input id="filiale" class="form-control" placeholder="Entrez la filiale" value="${collaborateur.Filiale}">
            </div>
            <div>
              <label for="type" class="form-label">Type:</label>
              <input id="type" class="form-control" placeholder="Entrez le type" value="${collaborateur.Type}">
            </div>
            <div>
              <label for="departement" class="form-label">Département:</label>
              <input id="departement" class="form-control" placeholder="Entrez le département" value="${collaborateur.Departement}">
            </div>
            <div>
              <label for="fonction" class="form-label">Fonction:</label>
              <input id="fonction" class="form-control" placeholder="Entrez la fonction" value="${collaborateur.Fonction}">
            </div>
            <div>
              <label for="date_entree" class="form-label">Date d'entrée:</label>
              <input id="date_entree" type="date" class="form-control" placeholder="Entrez la date d'entrée" value="${this.formatDate(collaborateur.DateEntree).split('T')[0]}">
            </div>
            <div>
              <label for="anciennete" class="form-label">Ancienneté:</label>
              <input id="anciennete" class="form-control" placeholder="Entrez l'ancienneté" value="${collaborateur.Anciennete}">
            </div>
          </div>
        </div>
      `,
      showCancelButton: true,
      focusConfirm: false,
      preConfirm: () => {
        // Retrieve input values and update collaborateur object
        const nom = (<HTMLInputElement>document.getElementById('nom')).value;
    const prenom = (<HTMLInputElement>document.getElementById('prenom')).value;
    const cin = (<HTMLInputElement>document.getElementById('cin')).value;
    const sexe = (<HTMLSelectElement>document.getElementById('sexe')).value;
    const nationalité = (<HTMLInputElement>document.getElementById('nationalite')).value;
    const age = (<HTMLInputElement>document.getElementById('age')).value;
    const date_naissance = (<HTMLInputElement>document.getElementById('date_naissance')).value;
    const categorie = (<HTMLInputElement>document.getElementById('categorie')).value;
    const filiale = (<HTMLInputElement>document.getElementById('filiale')).value;
    const type = (<HTMLInputElement>document.getElementById('type')).value;
    const département = (<HTMLInputElement>document.getElementById('departement')).value;
    const fonction = (<HTMLInputElement>document.getElementById('fonction')).value;
    const date_entree = (<HTMLInputElement>document.getElementById('date_entree')).value;
    const ancienneté = (<HTMLInputElement>document.getElementById('anciennete')).value;

      
        const editCollaborateur = {
          nom: nom,
          prenom: prenom,
          cin: cin,
          sexe: sexe,
          nationalité: nationalité,
          age: age,
          date_naissance: date_naissance,
          categorie: categorie,
          filiale: filiale,
          type: type,
          département: département,
          fonction: fonction,
          date_entree: date_entree,
          ancienneté: ancienneté
          // Include other fields here
        };
        // Send PUT request to backend to update collaborateur
        axios.put(`http://localhost:8090/api/v1/Collaborateurs/${collaborateur.Id}`, editCollaborateur)
          .then(response => {
            // Handle success
            Swal.fire('Success', 'Collaborateur modifié avec succès', 'success');
            this.ngOnInit();
            // Optionally, update the table or data after successful update
          })
          .catch(error => {
            // Handle error
            console.error('Error updating collaborateur:', error);
            Swal.fire('Error', 'Une erreur s\'est produite lors de la modification du collaborateur', 'error');
          });
      }
    });

  }

 
  deleteCollaborateur(collaborateur): void {
    // Show a confirmation popup message
    Swal.fire({
      title: 'Confirmation',
      text: 'Are you sure you want to delete this collaborateur?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      // If the user confirms deletion, send a DELETE request to the server
      if (result.isConfirmed) {
        axios.delete(`http://localhost:8090/api/v1/Collaborateurs/${collaborateur.Id}`)
          .then(response => {
            // Handle success response
            Swal.fire('Deleted!', 'The collaborateur has been deleted.', 'success');
            this.fetchCollaborateurs();// Refresh the table to reflect the deletion
          })
          .catch(error => {
            // Handle error response
            Swal.fire('Error', 'Failed to delete collaborateur', 'error');
          });
      }
    });
  }
  
}

