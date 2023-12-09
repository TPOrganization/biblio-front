import { Component, Inject } from '@angular/core'
import { MAT_DIALOG_DATA } from '@angular/material/dialog'
import { Router } from '@angular/router'
import { BookService } from 'src/app/_services/_api/_database/book/book.service'
import { SnackbarService } from 'src/app/_services/snackbar.service'

@Component({
    selector: 'app-mat-dialog',
    templateUrl: './mat-dialog.component.html',
    styleUrls: ['./mat-dialog.component.scss']
})
export class MatDialogComponent {

    constructor(
        @Inject(MAT_DIALOG_DATA)
        private readonly _data: number,
        private readonly _bookService: BookService,
        private readonly _snackbarService: SnackbarService,
        private readonly _router: Router
    ) {
    }

    async deleteBook() {
        const deleteBookResult = await this._bookService.delete(this._data)
        if (deleteBookResult !== true) {
            this._snackbarService.error('Erreur à la suprression du livre')
        } else {
            this._snackbarService.success('Livre supprimé !')
            this._router.navigate(['/dashboard'])
        }
    }
}


