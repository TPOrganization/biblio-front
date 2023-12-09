import { Component, OnInit, Input, Output, HostListener, EventEmitter } from '@angular/core'
import { Router } from '@angular/router'
import { isMobileDevice } from 'src/app/_helpers/tools'

@Component({
    selector: 'app-custom-mat-card',
    templateUrl: './custom-mat-card.component.html',
    styleUrls: ['./custom-mat-card.component.scss']
})
export class CustomMatCardComponent implements OnInit {
  @Input() title: string
  @Input() textBtn: string
  @Output() btnUpdate = new EventEmitter<boolean>()
  @Output() btnDelete = new EventEmitter<boolean>()

  isMobile: boolean = false
  constructor(
    private readonly _router: Router
  ) { }

  ngOnInit(): void { this.isMobile = isMobileDevice() }
  @HostListener('window:resize')
  onResize() { this.isMobile = isMobileDevice() }
  returnToDashboard() { this._router.navigate(['dashboard']) }
}
