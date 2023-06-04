class DatePickerPage {
  dateRangeSelect = '.DateRangeSelect';
  startDateInput = '[data-testid="start-date-input"]';
  endDateInput = '[data-testid="end-date-input"]';
  dateSelectModal = 'div[role="tooltip"]';

  formatDate(
    date: Date | any,
    format: string,
    range?: boolean
  ): string | string[] {
    const currentDate = new Date(date);
    const day = currentDate.getDate();
    const month = currentDate
      .toLocaleString('default', { month: 'short' })
      .trim();
    const year = currentDate.getFullYear();

    const formattedDate = (dayValue: number) => {
      switch (format) {
        case 'MMM DD, YYYY':
          return `${month} ${dayValue}, ${year}`;
        case 'MM/DD/YYYY':
          const formattedDay = String(dayValue).padStart(2, '0');
          const formattedMonth = String(currentDate.getMonth() + 1).padStart(
            2,
            '0'
          );
          return `${formattedMonth}/${formattedDay}/${year}`;
        default:
          throw new Error(`Unsupported date format: ${format}`);
      }
    };

    if (range) {
      return Array.from({ length: day + 1 }, (_, index) =>
        formattedDate(index)
      );
    } else {
      return formattedDate(day);
    }
  }

  getCurrentMonthDates(date: any): Date[][] {
    const currentDate = new Date(date);
    const firstDate = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      1
    );
    const lastDate = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth() + 1,
      0
    );
    const monthRange: Date[][] = [];
    monthRange.push([firstDate, lastDate]);
    return monthRange;
  }
}
export const datePickerPage = new DatePickerPage();
