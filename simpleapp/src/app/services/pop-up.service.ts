import { Injectable } from "@angular/core";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { Subject } from "rxjs";
import { PopupmodalComponent } from "../popupmodal/popupmodal.component";

@Injectable({
  providedIn: "root",
})
export class PopUpService {

  constructor(private modalService: NgbModal) { }

  public confirm(
    title: string,
    message: string,
    btnOkText: string = "OK",
    btnCancelText: string = "Cancel",
    dialogSize: "sm" | "lg" = "sm"
  ): Promise<boolean> {
    let subject = new Subject<boolean>();
    const modalRef = this.modalService.open(PopupmodalComponent, {
      size: dialogSize,
    });
    modalRef.componentInstance.title = title;
    modalRef.componentInstance.message = message;
    modalRef.componentInstance.btnOkText = btnOkText;
    modalRef.componentInstance.btnCancelText = btnCancelText;
    return modalRef.result;
  }

  public confirmLogin(
    title: string,
    message: string,
    btnOkText: string = "OK",
    btnCancelText: string = "Cancel",
    dialogSize: "sm" | "lg" = "sm"
  ): Promise<boolean> {
    let subject = new Subject<boolean>();
    const modalRef = this.modalService.open(PopupmodalComponent, {
      size: dialogSize,
    });
    modalRef.componentInstance.title = title;
    modalRef.componentInstance.message = message;
    modalRef.componentInstance.btnOkText = btnOkText;
    // modalRef.componentInstance.btnCancelText = btnCancelText;
    return modalRef.result;
  }

  public confirmCommon(title: string,
    message: string,
    btnOkText: string = "OK",
    //btnCancelText: string = "Cancel",
    dialogSize: "sm" | "lg" = "sm"
  ): Promise<boolean> {
    let subject = new Subject<boolean>();
    const modalRef = this.modalService.open(PopupmodalComponent, {
      size: dialogSize,
    });
    modalRef.componentInstance.title = title;
    modalRef.componentInstance.message = message;
    modalRef.componentInstance.btnOkText = btnOkText;
    //modalRef.componentInstance.btnCancelText = btnCancelText;
    return modalRef.result;
  }
}
