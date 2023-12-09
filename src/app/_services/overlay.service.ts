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

    attachOverlay() { this.overlayRef.attach(new ComponentPortal(LoadingSpinnerComponent)) }
    detachOverlay() { setTimeout(() => { this.overlayRef.detach() }, 20) }
}