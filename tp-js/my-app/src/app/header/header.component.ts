import { Component, Input, OnInit } from '@angular/core';
import { MenuDefinition } from 'src/bs-util/data/MenuDefinition';
import { LoginService } from '../common/service/login.service';
import { PreferencesService } from '../common/service/preferences.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  @Input()
  public titre :string ="default-title";
   //à afficher via {{titre}} dans header.component.html

   myMenuDef : MenuDefinition[] = [
    { label : "basic" , path : "/ngr-basic" } , 
    { label : "welcome" , path : "/ngr-welcome" },
    { label : "conversion" , path : "/ngr-conversion" },
    { label : "autres" , 
      children : [
        { label : "login" , path : "/ngr-login" } ,
        { label : "welcome" , path : "/ngr-welcome" },
        { divider : true },
        { label : "admin devise" , path : "/ngr-admin-devise" , role : "admin" }
      ]
    }
    
    ];

 
    public couleurFondPrefereeLocale : string = "lightgrey";
    public couleurTexte : string = "black";


    constructor(private _preferencesService : PreferencesService,
                public loginService : LoginService) {
      //synchronisation de la "copie locale" :
      this._preferencesService.couleurFondPrefereeObservable
      .subscribe(
        //callback éventuellement re-déclenchée plusieurs fois :
        (couleurFondPreferee)=>{
            console.log("nouvelle couleurFondPreferee="+couleurFondPreferee)
            if(couleurFondPreferee=="black"){
              this.couleurTexte="white";
            }else{
              this.couleurTexte="black";
            }
            this.couleurFondPrefereeLocale=couleurFondPreferee;}
      );
     }
  

  ngOnInit(): void {
  }

}
