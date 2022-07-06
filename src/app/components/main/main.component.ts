import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CurencyService } from 'src/app/curency.service';
import { moneyDTO } from 'src/app/models/interface';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css'],
})
export class MainComponent implements OnInit {
  public formGroup: FormGroup;

  public money: moneyDTO[];
  public dollar: number;
  public euro: number;

  public leftVal: moneyDTO;
  private leftInp = 0;

  public rightVal: moneyDTO;
  private rightInp = 0;

  constructor(private curencyService: CurencyService) {}

  ngOnInit(): void {
    this.curencyService.getCurrentVal().subscribe((res: Array<moneyDTO>) => {
      this.money = res;
      this.dollar = res[25].rate;
      this.euro = res[32].rate;
      this.formGroup.patchValue({
        valueLeft: this.money[0],
        valueRight: this.money[0],
      });
    });

    this.formGroup = new FormGroup({
      valueLeft: new FormControl('', []),
      inputLeft: new FormControl(0, []),
      valueRight: new FormControl('', []),
      inputRight: new FormControl(0, []),
    });

    this.formGroup.valueChanges.subscribe((val) => {
      this.leftVal = val.valueLeft;
      this.leftInp = +val.inputLeft;

      this.rightVal = val.valueRight;
      this.rightInp = +val.inputRight;
    });

    this.formGroup.get('valueLeft').valueChanges.subscribe((res) => {
      this.leftVal = res;
      this.leftInputClick();
    });

    this.formGroup.get('valueRight').valueChanges.subscribe((res) => {
      this.rightVal = res;
      this.rightInputClick();
    });
  }

  public leftInputClick() {
    if (this.leftVal && this.rightVal) {
      const newVal = (this.leftInp * this.leftVal.rate) / this.rightVal.rate;
      this.formGroup.patchValue({
        inputRight: newVal,
      });
    }
  }

  public rightInputClick() {
    if (this.leftVal && this.rightVal) {
      const newVal = (this.rightInp * this.rightVal.rate) / this.leftVal.rate;
      this.formGroup.patchValue({
        inputLeft: newVal,
      });
    }
  }
}
