import { Injectable } from '@angular/core';
import { Devise } from '../data/devise';
import { Observable, of } from 'rxjs';
import { delay, map} from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class DeviseService {

  //jeu de données (en dur) pour pré-version (simulation asynchrone)
  private devises : Devise[] = [
    new Devise('EUR','euro',1.0),
    new Devise('USD','dollar',1.1),
    new Devise('GBP','livre',0.9)
  ];

  public getAllDevises$() : Observable<Devise[]>{
      //version préliminaire (cependant asynchrone)
      return of(this.devises) 
            .pipe(
               delay(111) //simuler une attente de 111ms 
            );
  }

  public convertir$(montant: number,
                   codeDeviseSrc : string, 
                   codeDeviseTarget : string
                   ) : Observable<number> {
      //coefficient aléatoire ici (simple simulation)
      let coeff =  Math.random(); 
      let montantConverti = montant * coeff;  
      //version temporaire (cependant asynchrone)
      return of(montantConverti) 
            .pipe(
                 delay(222) //simuler une attente de 222ms 
            );
  }

}
