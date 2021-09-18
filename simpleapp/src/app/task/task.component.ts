import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { PopUpService } from '../services/pop-up.service';
import { TaskService } from '../services/task.service';
declare const $: any;

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss'],
})
export class TaskComponent implements OnInit, OnDestroy {
  //#region declaration

  contactForm: FormGroup;
  submitted: boolean = false;
  IsSuccess: boolean = false;
  IsDeleteSuccess: boolean = false;
  IsFailure: boolean = false;
  getUserList: Subscription;
  createUser: Subscription;
  deleteUser: Subscription;
  alluser: any;
  deletedId: any;

  //#endregion
  constructor(
    private myFormBuilder: FormBuilder,
    private taskService: TaskService,
    private detectChanges: ChangeDetectorRef,
    private router: Router,
    private popUpSer: PopUpService
  ) {}

  get f() {
    return this.contactForm.controls;
  }

  ngOnInit(): void {
    this.formControls();
    this.getUser();
  }

  formControls() {
    this.contactForm = this.myFormBuilder.group({
      fName: [
        '',
        [
          Validators.required,
          Validators.pattern('^[a-zA-Z0-9_][a-zA-Z-0-9_ ]*$'),
        ],
      ],
      lName: [
        '',
        [
          Validators.required,
          Validators.pattern('^[a-zA-Z0-9_][a-zA-Z-0-9_ ]*$'),
        ],
      ],
      phoneNo: [
        '03',
        Validators.compose([
          Validators.required,
          Validators.pattern(
            /^((\+92)|(0092))-{0,1}\d{3}-{0,1}\d{7}$|^\d{11}$|^\d{4}-\d{7}$/
          ),
        ]),
      ],
      Email: ['', [Validators.required, Validators.email]],
    });
  }

  submit() {
    this.submitted = true;
    if (this.contactForm.invalid) {
      return;
    }
    let json;
    json = {
      fName: this.contactForm.value['fName'],
      lName: this.contactForm.value['lName'],
      phoneNo: this.contactForm.value['phoneNo'],
      Email: this.contactForm.value['Email'],
    };
    this.createUser = this.taskService.createUser(json).subscribe((res) => {
      if (res) {
        this.getUser();
        this.contactForm.reset();
        this.submitted = false;
        this.IsSuccess = true;
        setTimeout(() => {
          this.IsSuccess = false;
        }, 1000);
      } else {
        this.IsFailure = true;
        setTimeout(() => {
          this.IsFailure = false;
        }, 1000);
      }
    });
  }

  reset() {
    this.contactForm.reset();
    this.submitted = false;
  }

  getUser() {
    this.getUserList = this.taskService.getUser().subscribe((res: any) => {
      if (res) {
        this.alluser = res.user;
        this.detectChanges.detectChanges();
        $('#userTable').DataTable({
          paging: true,
          searching: true,
          ordering: true,
        });
      } else {
        this.alluser = [];
        this.detectChanges.detectChanges();
        $('#userTable').DataTable({
          paging: true,
          searching: true,
          ordering: true,
        });
      }
    });
    $('#userTable').dataTable().fnDestroy();
  }

  ngOnDestroy() {
    if (this.createUser) {
      this.createUser.unsubscribe();
    }
    if (this.deleteUser) {
      this.deleteUser.unsubscribe();
    }
    this.getUserList.unsubscribe();
  }

  edit(id) {
    this.router.navigate(['pages/edittask/' + id]);
  }

  delete(id) {
    console.log(this.deletedId, 'save');
    this.popUpSer
      .confirm('Please Confirm', 'Do you really want to Delete!')
      .then((confirmed) => {
        if (confirmed) {
          this.deleteUser = this.taskService.deleteUser(id).subscribe((res) => {
            if (res) {
              this.IsDeleteSuccess = true;
              this.getUser();
              setTimeout(() => {
                this.IsDeleteSuccess = false;
              }, 1000);
            } else {
              this.IsFailure = true;
              setTimeout(() => {
                this.IsFailure = false;
              }, 1000);
            }
          });
        }
      })
      .catch(() =>
        console.log(
          'User dismissed the dialog (e.g., by using ESC, clicking the cross icon, or clicking outside the dialog)'
        )
      );
  }
}
