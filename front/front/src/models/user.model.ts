export enum UserGender {
    MUSKI = 'muski',
    ZENSKI = 'zenski',
    NEIZJASNJEN = 'neizjasnjen',
  }
  
  export interface User {
    id: number;
    ime: string;
    prezime: string;
    email: string;

    brojTelefona?: string;
    datumRodjenja: Date;
    datumUclanjenja: Date;
    pol: UserGender;
  }