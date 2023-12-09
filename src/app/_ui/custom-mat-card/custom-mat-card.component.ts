import { Component, OnInit, Input, Output, HostListener, EventEmitter } from '@angular/core'
import { FormGroup } from '@angular/forms'
import { Router } from '@angular/router'
import { isMobileDevice } from 'src/app/_helpers/tools'
import { QuestionBase } from 'src/app/_models/_ui/dynamic-form-question/question-base'

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
    private router: Router
  ) { }

  ngOnInit(): void {
    this.isMobile = isMobileDevice()
  }

  @HostListener('window:resize')
  onResize() {
    this.isMobile = isMobileDevice()
  }

  returnToDashboard() {
    this.router.navigate(['dashboard'])
  }
}
