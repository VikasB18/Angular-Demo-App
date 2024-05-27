import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, Validators, FormArray } from "@angular/forms";
import { DatahandleService } from "../../services/datahandle.service";
import { Router } from "@angular/router";
import { userData } from "../../model/userData";
import { COMMA, ENTER } from "@angular/cdk/keycodes";
import { MatChipInputEvent } from "@angular/material/chips";

export interface Tags {
  name: string;
}

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.scss"]
})
export class HomeComponent implements OnInit {
  id: string;
  constructor(
    private formBuilder: FormBuilder,
    private adddata: DatahandleService,
    private rout: Router
  ) {}
  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = true;
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];
  myTag: Tags[] = [];
  age: number;
  profilePhoto = null;
  registerForm: FormGroup;
  homeHide: boolean = true;
  profdata: boolean;
  companyHide: boolean = true;
  imageValid: boolean = true;
  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      firstName: [
        "",
        [Validators.required, Validators.pattern("^[a-zA-Z]{1,20}$")]
      ],
      lastName: ["", Validators.required],
      email: [
        "",
        [
          Validators.required,
          Validators.pattern(
            "^[0-9]*[a-zA-Z]([-.w]*[0-9a-zA-Z])*@([a-zA-Z][-w.]*[0-9a-zA-Z].)+[a-zA-Z]{2,9}$"
          )
        ]
      ],
      contactNo: ["", [Validators.required, Validators.pattern("^[0-9]{10}$")]],
      age: ["", Validators.required],
      state: ["", Validators.required],
      country: ["", Validators.required],
      address: ["", Validators.required],
      address1: [{ value: "", disabled: true }, Validators.required],
      address2: [{ value: "", disabled: true }, Validators.required],
      companyAddress1: [{ value: "", disabled: true }, Validators.required],
      companyAddress2: [{ value: "", disabled: true }, Validators.required],
      tags: [""],
      newsLetter: [""],
      profilePhoto: ["", Validators.required]
    });
  }

  rangedata(agevalue) {
    this.age = agevalue;
  }

  displayAddress(address) {
    if (address == "1") {
      this.companyHide = true;
      this.homeHide = false;
      this.registerForm.controls.address1.enable();
      this.registerForm.controls.address2.enable();
      this.registerForm.controls.companyAddress1.disable();
      this.registerForm.controls.companyAddress2.disable();
    }
    if (address == "2") {
      this.homeHide = true;
      this.companyHide = false;
      this.registerForm.controls.companyAddress1.enable();
      this.registerForm.controls.companyAddress2.enable();
      this.registerForm.controls.address1.disable();
      this.registerForm.controls.address2.disable();
    }
  }

  imagePreview(event) {
    if (event.target.files && event.target.files[0]) {
      this.checkres(event);
      var reader = new FileReader();
      reader.onload = event => {
        this.profilePhoto = (<FileReader>event.target).result;
      };
      reader.readAsDataURL(event.target.files[0]);
    }
  }

  checkres(event) {
    let file = event.target.files && event.target.files[0];
    var img = new Image();
    img.src = window.URL.createObjectURL(file);
    var data: boolean = true;
    var me = this;
    img.onload = function() {
      var width = img.naturalWidth,
        height = img.naturalHeight;
      window.URL.revokeObjectURL(img.src);
      if (width == 310 && height == 233) {
        me.imageValid = true;
      } else {
        me.imageValid = false;
      }
    };
  }

  submitregisterForm(formvalue: userData) {
    formvalue.profilePhoto = this.profilePhoto;
    formvalue.tags = JSON.stringify(this.myTag);
    this.adddata.insertData(formvalue).subscribe(res => {
      this.rout.navigate(["profile/" + res["id"]]);
    });
  }

  closeModal() {
    this.ngOnInit();
  }

  add(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;

    // Add our Tag
    if ((value || "").trim()) {
      this.myTag.push({ name: value.trim() });
    }

    // Reset the input value
    if (input) {
      input.value = "";
    }
  }

  remove(tags: Tags): void {
    const index = this.myTag.indexOf(tags);

    if (index >= 0) {
      this.myTag.splice(index, 1);
    }
  }
}
