import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-popupmodal',
  templateUrl: './popupmodal.component.html',
  styleUrls: ['./popupmodal.component.scss']
})
export class PopupmodalComponent implements OnInit {

 //#region declaration
 @Input() title: string;
 @Input() message: string;
 @Input() btnOkText: string;
 //@Input() btnCancelText: string;
 IsShow: boolean = false;
 //#endregion
 constructor(private activeModal: NgbActiveModal, private myRouter: Router) { }

 ngOnInit() {
   if (this.myRouter.url == "/") {
     this.IsShow = true;
   } else {
     this.IsShow = false;
   }
 }

 public decline() {
   this.activeModal.close(false);
 }

 public accept() {
   this.activeModal.close(true);
 }

 public dismiss() {
   this.activeModal.dismiss();
 }
}
