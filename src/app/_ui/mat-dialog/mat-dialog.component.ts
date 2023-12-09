import { Component, Inject } from '@angular/core'
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog'
import { Router } from '@angular/router'
import { AxiosError, AxiosResponse } from 'axios'
import { BookService } from 'src/app/_services/_api/_database/book/book.service'
import { LoadingSpinnerService } from 'src/app/_services/overlay.service'
import { SnackbarService } from 'src/app/_services/snackbar.service'

@Component({
    selector: 'app-mat-dialog',
    templateUrl: './mat-dialog.component.html',
    styleUrls: ['./mat-dialog.component.scss']
})
export class MatDialogComponent {

    axiosResponse: AxiosResponse
    axiosError: AxiosError
    constructor(
        @Inject(MAT_DIALOG_DATA)
        public data: number,
        public dialogRef: MatDialogRef<MatDialogComponent>,
        public loadingSpinnerService: LoadingSpinnerService,
        private bookService: BookService,
        private snackbarService: SnackbarService,
        private router: Router
    ) {
    }

    async deleteBook(bookId: number) {
        const deleteBookResult = await this.bookService.delete(this.data)
        console.log(deleteBookResult)
        if (deleteBookResult !== true) {
            this.snackbarService.error("Erreur à la suprression du livre")
        } else {
            this.snackbarService.success('Livre supprimé !')
            this.router.navigate(['/dashboard'])
        }
    }
}


