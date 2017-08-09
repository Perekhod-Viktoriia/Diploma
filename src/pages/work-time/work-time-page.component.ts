import { Component, OnInit, ViewChild, ViewEncapsulation, AfterViewInit, OnDestroy } from '@angular/core';
import { WorkTimePageService } from './work-time-page.service';
import * as _ from 'lodash';
import { WorkTimeTable } from '../../models/work-time/work-time-table.model';
import { WorkTime } from '../../models/user/work-time.model';
import { WorkTimeTypeEnum } from '../../models/user/work-time-type.enum';
import { WorkDayType } from './work-day-type.enum';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import { User } from '../../models/user/user.model';
import { MonthInfoGenerator } from './month-info.generator';
import { TableHighlighter } from './table-highlighter';

@Component({
  selector: 'app-orders-page',
  templateUrl: './work-time-page.component.html',
  styleUrls: ['./work-time-page.component.css'],
  providers: [
    WorkTimePageService,
    MonthInfoGenerator,
    TableHighlighter
  ],
  encapsulation: ViewEncapsulation.None
})
export class WorkTimePageComponent implements OnInit, AfterViewInit, OnDestroy {

  @ViewChild('tableBody') public tableBody: any;
  public workerCtrl: FormControl;
  public workTimeTable: WorkTimeTable;
  public workDayTypes: string[];
  public workTimeChanges: any[] = [];

  public selectedWorkers: any[] = [];
  public filteredWorkers: Observable<any>;
  public workers: any[] = [];
  private enabledRowsEditing: boolean[] = [];

  public constructor(
    private service: WorkTimePageService,
    private monthInfoGenerator: MonthInfoGenerator,
    private tableHighlighter: TableHighlighter
  ) {
    tableHighlighter.setConfig({
      highlightClass: 'highlight'
    });

    this.workerCtrl = new FormControl();
    document.querySelector('.main-container').classList.add('full-width');
  }

  public ngOnDestroy() {
    console.log('dest');
    document.querySelector('.main-container').classList.remove('full-width');
  }

  /**
   * Loads available workers
   */
  public ngOnInit(): void {
    this.workDayTypes = (new WorkDayType).getAllTypes();
    this.monthInfoGenerator.calculateMonthInfo();
    this.getWorkersList();
  }

  public ngAfterViewInit() {
    this.tableHighlighter.setTableBody(this.tableBody);
  }

  public filterWorkers(name: string): any[] {
    return name ? this.workers.filter(s => s.enabled !== false && new RegExp(`^${name}`, 'gi').test(s.fioFull))
      : this.workers.filter(s => s.enabled !== false);
  }

  public newWorkerAttached(workerToAdd: any): void {
    this.selectedWorkers.push(workerToAdd);
    workerToAdd.enabled = false;
    this.workerCtrl.setValue('');
    this.loadNewWorker(workerToAdd.id);
  }

  /**
   * Deletes worker form selectedWorkers and worktimeTable
   *
   * @param workerToDelete
   */
  public deleteWorker(workerToDelete: any): void {
    this.selectedWorkers = this.selectedWorkers
      .filter((worker) => worker.id !== workerToDelete.id);
    workerToDelete.enabled = true;
    const currentValue: string = this.workerCtrl.value;
    this.workerCtrl.setValue(' ');
    this.workerCtrl.setValue(currentValue);
    this.workTimeTable.deleteWorker(workerToDelete);
  }

  /**
   * Loads work_time for current users
   */
  public getWorkTimeTable(): void {
    const workersIds: number[] = this.selectedWorkers.map(w => w.id);
    this.service.getWorkTime(
      this.monthInfoGenerator.getCurrentMonth(),
      this.monthInfoGenerator.getCurrentYear(),
      workersIds
    ).subscribe((workTimeTable: WorkTimeTable) => {
      this.workTimeTable = workTimeTable;
    });
  }

  /**
   * Loads one more worker to the table
   *
   * @param {number} workerId
   */
  public loadNewWorker(workerId: number): void {
    this.service.getWorkTime(this.monthInfoGenerator.getCurrentMonth(), this.currentYear, [workerId])
      .subscribe((workTimeTable: WorkTimeTable) => {
        if (_.isNil(this.workTimeTable)) {
          this.workTimeTable = workTimeTable;
        } else {
          this.workTimeTable.addWorkers(workTimeTable.users);
        }
      });
  }

  public getWorkersList(): void {
    this.service.getWorkersList()
      .subscribe((workersList: User[]) => {
        this.workers = workersList;

        this.filteredWorkers = this.workerCtrl.valueChanges
          .startWith(null)
          .map(name => this.filterWorkers(name));
      });
  }

  public get previousMonthName(): string {
    return this.monthInfoGenerator.getPreviousMonthName();
  }

  public get nextMonthName(): string {
    return this.monthInfoGenerator.getNextMonthName();
  }

  public get currentMonthName(): string {
    return this.monthInfoGenerator.getCurrentMonthName();
  }

  public get currentYear(): number {
    return this.monthInfoGenerator.getCurrentYear();
  }

  public get countOfDays(): number[] {
    return this.monthInfoGenerator.getCountOfDays();
  }

  public previousMonth() {
    this.monthInfoGenerator.previousMonth();
    this.getWorkTimeTable();
  }

  public nextMonth() {
    this.monthInfoGenerator.nextMonth();
    this.getWorkTimeTable();
  }

  public onMouseMove(event: Event): void {
    this.tableHighlighter.onMouseMove(event);
  }

  public clearSelections(): void {
    this.tableHighlighter.clearHighLight(-1, -1);
  }

  /**
   * @param {number} day
   *
   * @return {string}
   */
  public formatDayNumber(day: number): string {
    day++;

    return day < 10 ? '0' + day.toString() : day.toString();
  }

  /**
   * @return {number}
   */
  public workDaysInMoth(): number {
    const workTimes: WorkTime[] = this.workTimeTable.users[0].workTime;
    const workTimeWorkingDays = workTimes
      .filter((workTime: WorkTime) => workTime.type_of_day === WorkTimeTypeEnum.WORKING);

    return workTimeWorkingDays.length;
  }

  /**
   * @param {number} userIndex
   */
  public enableRowEdit(userIndex: number): void {
    this.workTimeChanges[userIndex] = [];
    this.enabledRowsEditing[userIndex] = true;
  }

  /**
   * @param {number} userIndex
   *
   * @return {Boolean}
   */
  public rowEditingIsEnabled(userIndex: number): boolean {
    return Boolean(this.enabledRowsEditing[userIndex]);
  }

  /**
   * @param {number} userIndex
   */
  public saveRowEdit(userIndex: number): void {
    const changesAreValid: boolean = this.parseUserChanges(userIndex);

    if (changesAreValid) {
      this.saveUserWorkTime(userIndex);
      this.enabledRowsEditing[userIndex] = false;
    }
  }

  /**
   *
   * @param {number} userIndex
   * @param {number} dayIndex
   * @param {string} fieldName
   *
   * @return {boolean}
   */
  public isValid(userIndex: number, dayIndex: number, fieldName: string): boolean {
    if (_.isNil(this.workTimeChanges[userIndex][dayIndex])) {
      return true;
    }

    return this.workTimeChanges[userIndex][dayIndex][fieldName + '_valid'] !== false;
  }

  /**
   * @param {number} userIndex
   * @param {number} dayIndex
   * @param {Event} event
   */
  public changeWorkTime(userIndex: number, dayIndex: number, event): void {
    if (_.isNil(this.workTimeChanges[userIndex][dayIndex])) {
      this.workTimeChanges[userIndex][dayIndex] = {};
    }

    this.workTimeChanges[userIndex][dayIndex].hours = event.target.value;
  }

  /**
   * @param {number} userIndex
   * @param {number} dayIndex
   * @param {Event} event
   */
  public changeDayType(userIndex: number, dayIndex: number, event): void {
    if (_.isNil(this.workTimeChanges[userIndex][dayIndex])) {
      this.workTimeChanges[userIndex][dayIndex] = {};
    }

    this.workTimeChanges[userIndex][dayIndex].type = event.target.value;
  }

  public exportToExcel(): void {
    const workersIds: number[] = this.selectedWorkers.map(w => w.id);
    this.service.exportToExcel(
      this.monthInfoGenerator.getCurrentMonth(),
      this.monthInfoGenerator.getCurrentYear(),
      workersIds
    );
  }

  /**
   * Checks what user changed
   *
   * @param {number} rowNumber
   */
  private parseUserChanges(rowNumber: number): boolean {
    let changesAreValid: boolean = true;
    this.workTimeChanges[rowNumber]
      .forEach((dayChange: Array<any>, dayIndex: number) => {
        changesAreValid = this.applyDayChanges(dayChange, rowNumber, dayIndex);

        return changesAreValid;
      });

    return changesAreValid;
  }

  /**
   * Copies change values to the workTimeTable
   *
   * @param {Object} dayChange
   * @param{number} userIndex
   * @param {number} dayIndex
   */
  private applyDayChanges(dayChange: any, userIndex: number, dayIndex: number): boolean {
    if (!_.isNil(dayChange.type)) {
      if (!this.typeOfDayIsValid(dayChange.type)) {
        this.workTimeChanges[userIndex][dayIndex].type_valid = false;

        return false;
      }

      this.workTimeTable.users[userIndex].workTime[dayIndex].type_of_day = dayChange.type;
    }

    if (!_.isNil(dayChange.hours)) {
      if (!this.workHourIsValid(dayChange.hours)) {
        this.workTimeChanges[userIndex][dayIndex].hours_valid = false;

        return false;
      }
      this.workTimeTable.users[userIndex].workTime[dayIndex].work_hours = dayChange.hours;
    }

    return true;
  }

  /**
   * @param {string} type
   *
   * @return {boolean}
   */
  private typeOfDayIsValid(type: string): boolean {
    return this.workDayTypes.indexOf(type) >= 0;
  }

  /**
   * @param {string} hours
   *
   * @return {boolean}
   */
  private workHourIsValid(hours: string): boolean {
    const floatHours: number = parseFloat(hours);

    return floatHours && floatHours < 24;
  }

  /**
   * @param {number} userIndex
   */
  private saveUserWorkTime(userIndex: number): void {
    const daysChanged: string[] = Object.keys(this.workTimeChanges[userIndex]);

    const changedWorkTimes = this.workTimeTable.users[userIndex].workTime
      .filter((v, index: number) => daysChanged.indexOf(index.toString()) >= 0);

    this.service.saveUserWorkTime(changedWorkTimes).subscribe();
  }
}
