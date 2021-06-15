import { Component, OnInit } from '@angular/core';
import { EnvService } from '../common/service/env.service';
import { PreferencesService } from '../common/service/preferences.service'

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

  public couleurFondPrefereeLocale : string = "lightgrey";

  public listeCouleurs : string[] = [ "lightyellow", "white",
     "lightgrey" , "lightgreen" , "lightpink" , "lightblue" , "black"] ;


  constructor(private _preferencesService : PreferencesService, private _envService : EnvService) {
        //synchronisation de la "copie locale" :
        this._preferencesService.couleurFondPrefereeObservable
            .subscribe(
              //callback éventuellement re-déclenchée plusieurs fois :
              (couleurFondPreferee)=>{
                  this.couleurFondPrefereeLocale=couleurFondPreferee;}
            );
        console.log("apiUrl=" + this._envService.apiUrl);
  }

  public onCouleurFondPrefereeLocaleChange(){
    this._preferencesService.couleurFondPreferee=
                    this.couleurFondPrefereeLocale;
  }

  ngOnInit(): void {
  }

}