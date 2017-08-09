import { Injectable } from '@angular/core';
import * as _ from 'lodash';

@Injectable()
export class MonthInfoGenerator {

  public monthInfo: MonthInfo = {
    previousMonth: null,
    currentMonth: null,
    nextMonth: null,
    currentYear: null,
    countOfDays: null
  };

  private monthVocabulary: string[] = [
    'Январь',
    'Февраль',
    'Март',
    'Апрель',
    'Май',
    'Июнь',
    'Июль',
    'Август',
    'Сентябрь',
    'Октябрь',
    'Ноябрь',
    'Декабрь'
  ];

  public getPreviousMonthName(): string {
    return this.translateMonth(this.monthInfo.previousMonth);
  }

  public getNextMonthName(): string {
    return this.translateMonth(this.monthInfo.nextMonth);
  }

  public getCurrentMonthName(): string {
    return this.translateMonth(this.monthInfo.currentMonth);
  }

  public getCurrentMonth(): number {
    return this.monthInfo.currentMonth;
  }

  public getCurrentYear(): number {
    return this.monthInfo.currentYear;
  }

  public getCountOfDays(): number[] {
    return this.monthInfo.countOfDays;
  }

  /**
   * Toggles current month to previous
   */
  public previousMonth() {
    if (this.monthInfo.currentMonth === 0) {
      this.monthInfo.currentYear--;
    }

    this.monthInfo.currentMonth = this.monthInfo.previousMonth;
    this.calculateMonthInfo();
  }

  /**
   * Toggles current month to next
   */
  public nextMonth(): void {
    if (this.monthInfo.currentMonth === 11) {
      this.monthInfo.currentYear++;
    }

    this.monthInfo.currentMonth = this.monthInfo.nextMonth;
    this.calculateMonthInfo();
  }

  /**
   * Calculates info about current, next and previous monthes
   */
  public calculateMonthInfo(): void {
    if (_.isNil(this.monthInfo.currentMonth)) {
      this.monthInfo.currentMonth = (new Date).getMonth();
      this.monthInfo.currentYear = (new Date).getFullYear();
    }

    this.monthInfo.previousMonth = this.monthInfo.currentMonth === 0 ? 11 : this.monthInfo.currentMonth - 1;
    this.monthInfo.nextMonth = this.monthInfo.currentMonth === 11 ? 0 : this.monthInfo.currentMonth + 1;
    this.monthInfo.countOfDays = new Array(
      (new Date(this.monthInfo.currentYear, this.monthInfo.currentMonth + 1, 0)).getDate()
    ).fill(1);
  }

  /**
   * Returns a text representation of month
   *
   * @param {number} monthNumber
   *
   * @return {string}
   */
  private translateMonth(monthNumber: number): string {
    return this.monthVocabulary[monthNumber];
  }
}

interface MonthInfo {
  previousMonth: number;
  currentMonth: number;
  nextMonth: number;
  currentYear: number;
  countOfDays: number[];
}
