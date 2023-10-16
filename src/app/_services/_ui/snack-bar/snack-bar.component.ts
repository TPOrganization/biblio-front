import { Component, Inject, Injectable } from '@angular/core';
import { SnackbarItem, SnackbarService } from '../../snackbar.service';
import { AppConfigService } from '../../app-config.service';


@Component({
  selector: 'app-snack-bar',
  templateUrl: './snack-bar.component.html',
  styleUrls: ['./snack-bar.component.scss']
})
export class SnackBarComponent {
  constructor(
    private readonly snackBarService: SnackbarService,
    private readonly appConfigService : AppConfigService
  ){}




}

