import { Component, OnInit } from '@angular/core'
import { SnackbarItem, SnackbarService } from '../../snackbar.service'

@Component({
    selector: 'app-snack-bar',
    templateUrl: './snack-bar.component.html',
    styleUrls: ['./snack-bar.component.scss']
})
export class SnackBarComponent implements OnInit {
    messages: SnackbarItem[] = []

    private _duration = 3000

    constructor(
        private readonly snackbarService: SnackbarService,
    ){}

    ngOnInit(): void {
        this.snackbarService.getSnackbarMessages().subscribe((snackbarItem: SnackbarItem) => {
            this.messages.push(snackbarItem)
            setTimeout(() => {
                const indexOf = this.messages.findIndex(e => e === snackbarItem)
                this.messages.splice(indexOf, 1)
            }, this._duration)
        })
    }


}

