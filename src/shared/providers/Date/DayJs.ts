import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import { IDateProvider } from "./IDateProvider";

dayjs.extend(utc);

export class DayjsProvider implements IDateProvider {
  dateNow(): Date {
    return dayjs().toDate();
  }
  convertToUtc(date: Date): string {
    return dayjs(date).utc().local().format();
  }
  compareDateInHours(start_date: Date, end_date: Date): number {
    const end_date_utc = this.convertToUtc(end_date);
    const start_date_utc = this.convertToUtc(start_date);
    return dayjs(end_date).diff(start_date, "hours");
  }
  compareInDays(start_date: Date, end_date: Date): number {
    const end_date_utc = this.convertToUtc(end_date);
    const start_date_utc = this.convertToUtc(start_date);
    return dayjs(end_date).diff(start_date, "days");
  }
  addDays(days: number): Date {
    return dayjs().add(days, "days").toDate();
  }
  addHours(hours: number): Date {
    return dayjs().add(hours, "hours").toDate();
  }
}
