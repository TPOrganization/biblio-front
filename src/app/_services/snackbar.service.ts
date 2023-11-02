import { Injectable } from '@angular/core'
import { Observable, Subject } from 'rxjs'

export enum SnackbarItemType{
    Success,
    Error
  }
  
export interface SnackbarItem{
    type : SnackbarItemType,
    message : string
  }
  
@Injectable({
    providedIn: 'root'
})
export class SnackbarService {

    public subject = new Subject<SnackbarItem>()

    getSnackbarMessages = (): Observable<SnackbarItem> => this.subject.asObservable()
    success = (msg: string) => this._addMessage(msg, SnackbarItemType.Success)
    error = (msg: string) => this._addMessage(msg, SnackbarItemType.Error)

    private _addMessage(msg : string, type: SnackbarItemType){
        this.subject.next(<SnackbarItem>{type: type, message: msg})
    }
}
