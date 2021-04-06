import { Component, Input, OnInit } from '@angular/core';
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



 
  constructor(public preferencesService : PreferencesService) { }
  

  ngOnInit(): void {
  }

}
