import { Location } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { TaskService } from '../services/task.service';

@Component({
  selector: 'app-edittask',
  templateUrl: './edittask.component.html',
  styleUrls: ['./edittask.component.scss'],
})
export class EdittaskComponent implements OnInit, OnDestroy {
  //#region declaration

  contactForm: FormGroup;
  submitted: boolean = false;
  IsSuccess: boolean = false;
  IsFailure: boolean = false;
  alluser: any;
  editId;
  getEditUser: Subscription;
  updatUser: Subscription;

  //#endregion
  constructor(
    private myFormBuilder: FormBuilder,
    private taskService: TaskService,
    private location: Location,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  get f() {
    return this.contactForm.controls;
  }

  formControls() {
    this.contactForm = this.myFormBuilder.group({
      id: [''],
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

  ngOnInit(): void {
    this.editId = this.route.snapshot.paramMap.get('id');
    this.formControls();
    this.getEditData(this.editId);
  }

  getEditData(id) {
    this.getEditUser = this.taskService.getEditUser(id).subscribe((res) => {
      if (res) {
        this.contactForm.controls['fName'].setValue(res['fName']);
        this.contactForm.controls['lName'].setValue(res['lName']);
        this.contactForm.controls['phoneNo'].setValue(res['phoneNo']);
        this.contactForm.controls['Email'].setValue(res['Email']);
      }
    });
  }

  update() {
    this.submitted = true;
    if (this.contactForm.invalid) {
      return;
    }
    let json;
    json = {
      id: this.editId,
      fName: this.contactForm.value['fName'],
      lName: this.contactForm.value['lName'],
      phoneNo: this.contactForm.value['phoneNo'],
      Email: this.contactForm.value['Email'],
    };
    this.updatUser = this.taskService.updateUser(json).subscribe((res) => {
      if (res) {
        this.IsSuccess = true;
        setTimeout(() => {
          this.IsSuccess = false;
          this.router.navigate(['/']);
        }, 1000);
      } else {
        this.IsFailure = true;
        setTimeout(() => {
          this.IsFailure = false;
        }, 1000);
      }
    });
  }

  cancel() {
    this.location.back();
  }

  ngOnDestroy() {
    this.getEditUser.unsubscribe();
  }
}
