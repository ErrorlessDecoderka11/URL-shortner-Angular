import { Component, ChangeDetectorRef, NgZone, OnInit } from "@angular/core";
import {
  FormBuilder,
  NgForm,
  FormControl,
  FormGroup,
  Validators
} from "@angular/forms";
import { MatSnackBar } from "@angular/material/snack-bar";
import { BitlyService } from "./service/bitly.service";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"]
})
export class AppComponent implements OnInit {
  title = "link-shortener-app";
  formShorter!: FormGroup;
  loading = false;
  reg =
    "((http|https)://)(www.)?" +
    "[a-zA-Z0-9@:%._\\+~#?&//=]{2,256}\\.[a-z]" +
    "{2,6}\\b([-a-zA-Z0-9@:%._\\+~#?&//=]*)";

  constructor(
    public fb: FormBuilder,
    private bitly: BitlyService,
    private cdr: ChangeDetectorRef,
    private _snackbar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.formShorter = this.fb.group({
      longLink: ["", [Validators.required, Validators.pattern(this.reg)]],
      shortLink: new FormControl({ value: null, disabled: true })
    });
  }

  onSubmit(form: FormGroup) {
    if (form.valid) {
      this.loading = true;
      this.bitly.shortenUrl(form.value["longLink"]).subscribe(
        ({ link }) => {
          this.formShorter.patchValue({ shortLink: link });
          this.loading = false;
        },
        (error) => {
          this._snackbar.open(error.massage, `Error`);
          this.loading = false;
        }
      );
    } else {
      this._snackbar.open(`Invalid URL!`, `Error`);
    }
  }

  setCopied() {
    this._snackbar.open("Copied!");
  }
}
