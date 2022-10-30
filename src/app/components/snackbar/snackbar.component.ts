import { Component, OnInit } from '@angular/core';
import { ToasterService } from '../../chore/services/toaster.service';

@Component({
  selector: 'app-snackbar',
  templateUrl: './snackbar.component.html',
  styleUrls: ['./snackbar.component.scss']
})
export class SnackbarComponent {

  constructor(public readonly toaster: ToasterService) { }



}
