import { Component, OnInit, Inject } from '@angular/core';
import { IUserData } from '../../models/user-data.interface';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';


@Component({
  selector: 'app-info-popup',
  templateUrl: './info-popup.component.html',
  styleUrls: ['./info-popup.component.scss']
})
export class InfoPopupComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public userInfo: IUserData) { }

  ngOnInit(): void {
  }

}
