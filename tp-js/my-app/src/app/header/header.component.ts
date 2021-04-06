import { Component, Input, OnInit } from '@angular/core';
import { MenuDefinition } from 'src/bs-util/data/MenuDefinition';
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
    { label : "autres" , 
      children : [
        { label : "login" , path : "/ngr-login" } ,
        { label : "welcome" , path : "/ngr-welcome" },
        { divider : true },
        { label : "menu-item3" , path : "path3" }
      ]
    }
    
    ];

 
  constructor(public preferencesService : PreferencesService) { }
  

  ngOnInit(): void {
  }

}
