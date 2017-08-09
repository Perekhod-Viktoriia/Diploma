import { Model } from '../model';
import { Autowired } from '../../app/core/decorators/autowired.decorator';
import { Teacher } from '../teacher/teacher.model';
import { MappedClass } from '../../app/core/decorators/mapped-class.decorator';
import { WorkTime } from './work-time.model';
import { WorkTimeTypeEnum } from './work-time-type.enum';

export class User extends Model {
  public id: number;
  public name: string;
  public email: string;
  public avatar: string;
  public password: string;
  public first_name: string;
  public second_name: string;
  public last_name: string;
  public gender: string;
  public tokenId: number;
  public token: string;

  @Autowired(Teacher) public teacher: Teacher;
  @MappedClass(WorkTime) public workTime: WorkTime[];

  public get genderT(): string {
    return this.gender === 'm' ? 'м' : 'ж';
  }

  public get fio(): string {
    return this.second_name + ' ' + this.first_name[0] + '.' + this.last_name[0] + '.';
  }

  public get fioFull(): string {
    return this.second_name + ' ' + this.first_name + ' ' + this.last_name + ' ';
  }

  /**
   * @return {number}
   */
  public totalWorkHours(): number {
    let totalWorkHours: number = 0;

    for (const workTime of this.workTime) {
      totalWorkHours += parseFloat(workTime.work_hours);
    }

    return this.fixNumber(totalWorkHours);
  }

  public totalWorkDays(): number {
    return this.workTime.filter(d => parseFloat(d.work_hours) > 0).length;
  }

  /**
   * @return {number}
   */
  public totalWorkHoursEvening(): number {
    return this.totalWorkHoursByType(WorkTimeTypeEnum.EVENING);
  }

  /**
   * @return {number}
   */
  public totalWorkHoursCelebration(): number {
    return this.totalWorkHoursByType(WorkTimeTypeEnum.CELEBRATION);
  }

  /**
   * @return {number}
   */
  public totalWorkHoursOverTime(): number {
    return this.totalWorkHoursByType(WorkTimeTypeEnum.OVERTIME);
  }

  /**
   * @return {number}
   */
  public totalWorkHoursNight(): number {
    return this.totalWorkHoursByType(WorkTimeTypeEnum.NIGHT);
  }

  /**
   * @return {number}
   */
  protected totalWorkHoursByType(type: WorkTimeTypeEnum): number {
    let totalWorkHours: number = 0;
    const workTimeWorking = this.workTime
      .filter((workTime: WorkTime) => workTime.type_of_day === type);

    for (const workTime of workTimeWorking) {
      totalWorkHours += parseFloat(workTime.work_hours);
    }

    return this.fixNumber(totalWorkHours);
  }

  /**
   * @param number
   *
   * @return {number}
   */
  private fixNumber(number: number): number {
    const fixedNumber: string = number.toFixed(1);
    return parseFloat(fixedNumber) == parseInt(fixedNumber, 10) ? parseInt(fixedNumber, 10) : parseFloat(fixedNumber);
  }
}
