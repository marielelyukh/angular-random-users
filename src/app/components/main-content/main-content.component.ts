import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { UserService } from '../../core/services/user.service';
import { IUserData } from '../../models/user-data.interface';
import { InfoPopupComponent } from '../info-popup/info-popup.component';
import { interval } from 'rxjs';
import { debounceTime, map } from 'rxjs/operators';

@Component({
  selector: 'app-main-content',
  templateUrl: './main-content.component.html',
  styleUrls: ['./main-content.component.scss']
})
export class MainContentComponent implements OnInit {
  public userCounter = 1;
  public users: Array<IUserData> = [];
  public showTable = false;
  public isLoading = true;
  public displayedColumns: string[] = ['name', 'last_name', 'age', 'is_covid'];

  constructor(private userService: UserService, private changeDetectorRefs: ChangeDetectorRef, private dialogService: MatDialog) {
  }

  ngOnInit(): void {
    this.getUser();
  }

  public seeChanges(value): void {
    this.userCounter = value;
    this.getUser();
  }

  public getUser(): void {
    if (this.showTable) {
      this.showTable = false;
    }
    if (!this.isLoading) {
      this.isLoading = true;
    }
    if (this.users.length) {
      this.users = [];
    }
    const userSubscription = interval(250)
      .subscribe(() => {
        this.userService.getRandomUser().subscribe(
          (data) => {
            if (data){
              this.users.push(data);
              this.changeDetectorRefs.detectChanges();
              if (this.userCounter === this.users.length) {
                userSubscription.unsubscribe();
                this.isLoading = false;
                this.showTable = true;
              }
            }
          }
        );
      });
  }

  public openInfoPopup(user): void {
    this.dialogService.open(InfoPopupComponent, {
      maxWidth: '330px',
      disableClose: false,
      width: 'auto',
      height: 'auto',
      data: user
    }).afterClosed().subscribe(dialogRez => {
    });
  }

}
