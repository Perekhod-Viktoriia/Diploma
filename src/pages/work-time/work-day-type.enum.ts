export class WorkDayType {
  public WORKING: string = 'р';
  public WORKING_PART_TIME: string = 'рс';
  public EVENING: string = 'вч';
  public NIGHT: string = 'рн';
  public OVERTIME: string = 'ну';
  public OUTPUT: string = 'рв';
  public BUSINESS_TRIP: string = 'вд';

  public HOLIDAY: string = 'в';
  public EXTRA_HOLIDAY: string = 'д';
  public EXTRA_HOLIDAY_CHERNOBYL: string = 'ч';
  public CREATIVE_HOLIDAY: string = 'тв';
  public EXTRA_HOLIDAY_LEARNING: string = 'н';
  public EXTRA_HOLIDAY_LEARNING_NO_MONEY: string = 'нб';
  public EXTRA_HOLIDAY_NO_MONEY: string = 'дб';
  public EXTRA_HOLIDAY_CHILDREN: string = 'до';
  public EXTRA_HOLIDAY_PREGNANCY: string = 'вп';
  public HOLIDAY_CHILD_6_AGE: string = 'дд';
  public HOLIDAY_NO_MONEY: string = 'на';
  public OTHER_HOLIDAY_NO_MONEY: string = 'бз';

  public NONAPPEARANCE_ANOTHER_SCHEDULE: string = 'нд';
  public NONAPPEARANCE_ANOTHER_WORK: string = 'нп';
  public ANOTHER_UNTREATED_TIME: string = 'iн';
  public DOWNTIME: string = 'п';
  public HOOKY: string = 'пр';
  public STRIKE: string = 'с';

  public DISABILITY: string = 'тн';
  public OFFICIAL_DISABILITY: string = 'нн';
  public NONAPPEARANCE_UNKNOWN: string = 'нз';
  public ANOTHER_NONAPPEARANCE: string = 'iв';
  public ANOTHER_CAUSE_NONAPPEARANCE: string = 'i';
  public CELEBRATION: string = 'вв';

  public  getAllTypes(): string[] {
    return [
      this.WORKING,
      this.WORKING_PART_TIME,
      this.EVENING,
      this.NIGHT,
      this.OVERTIME,
      this.OUTPUT,
      this.BUSINESS_TRIP,
      this.HOLIDAY,
      this.EXTRA_HOLIDAY,
      this.EXTRA_HOLIDAY_CHERNOBYL,
      this.CREATIVE_HOLIDAY,
      this.EXTRA_HOLIDAY_LEARNING,
      this.EXTRA_HOLIDAY_LEARNING_NO_MONEY,
      this.EXTRA_HOLIDAY_NO_MONEY,
      this.EXTRA_HOLIDAY_CHILDREN,
      this.EXTRA_HOLIDAY_PREGNANCY,
      this.HOLIDAY_CHILD_6_AGE,
      this.HOLIDAY_NO_MONEY,
      this.OTHER_HOLIDAY_NO_MONEY,
      this.NONAPPEARANCE_ANOTHER_SCHEDULE,
      this.NONAPPEARANCE_ANOTHER_WORK,
      this.ANOTHER_UNTREATED_TIME,
      this.DOWNTIME,
      this.HOOKY,
      this.STRIKE,
      this.DISABILITY,
      this.OFFICIAL_DISABILITY,
      this.NONAPPEARANCE_UNKNOWN,
      this.ANOTHER_NONAPPEARANCE,
      this.ANOTHER_CAUSE_NONAPPEARANCE,
      this.CELEBRATION,
    ];
  }
}
