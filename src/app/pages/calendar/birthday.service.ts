// birthday.service.ts
import axios from 'axios';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BirthdayService {
  private apiUrl = 'https://gestionrh-0d9m.onrender.com/api/v1/Collaborateurs';

  constructor() {}

  async getBirthdays(): Promise<any[]> {
    try {
      const response = await axios.get<any[]>(this.apiUrl);
      return response.data;
    } catch (error) {
      console.error('Error fetching birthdays:', error);
      return [];
    }
  }
}

// birthday.service.ts
import axios from 'axios';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BirthdayService {
  private apiUrl = 'http://localhost:8090/api/v1/Collaborateurs';

  constructor() {}

  async getBirthdays(): Promise<any[]> {
    try {
      const response = await axios.get<any[]>(this.apiUrl);
      return response.data;
    } catch (error) {
      console.error('Error fetching birthdays:', error);
      return [];
    }
  }
}
