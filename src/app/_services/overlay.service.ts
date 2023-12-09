import { Overlay, OverlayRef } from '@angular/cdk/overlay'
import { ComponentPortal } from '@angular/cdk/portal'
import { Injectable } from '@angular/core'
import { LoadingSpinnerComponent } from '../_ui/loading-spinner/loading-spinner.component'

@Injectable({
    providedIn: 'root'
})
export class LoadingSpinnerService {
    overlayRef: OverlayRef

    constructor(
        public overlay: Overlay
    ) {
        this.overlayRef = this.overlay.create({
            positionStrategy: this.overlay
                .position()
                .global()
                .centerHorizontally()
                .centerVertically(),
            hasBackdrop: true,
        })
    }

    private _attachOverlay(): void { this.overlayRef.attach(new ComponentPortal(LoadingSpinnerComponent)) }
    private _detachOverlay(): void { this.overlayRef.detach() }
    private async _sleepAndDetach(): Promise<void> {
        await new Promise(resolve => setTimeout(resolve, 400))
        this._detachOverlay()
    }

    async attachCallbackInOverlay(callback: any): Promise<any> {
        if (!this.overlayRef.hasAttached()) { this._attachOverlay() }

        try {
            const result = await callback()
            await this._sleepAndDetach()
            return result
        } catch (error) {
            console.error(error)
            await this._sleepAndDetach()
            return error
        }
    }
}