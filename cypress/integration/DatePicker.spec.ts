import { datePickerPage } from '../pageObjects/datePicker.page';

describe('DateRangePicker', () => {
  beforeEach(function () {
    cy.visit('/');
  });

  it('Should render', () => {
    cy.get(datePickerPage.dateRangeSelect).should('be.visible');
    cy.get(datePickerPage.dateSelectModal).should('be.visible');
  });

  it('Should close modal', () => {
    cy.get(datePickerPage.startDateInput).should('be.visible').click();
    cy.get(datePickerPage.dateSelectModal).should('be.visible');
    cy.get('body').click(0, 0);
    cy.get(datePickerPage.dateSelectModal).should('not.exist');
  });

  it('Selecting current date', () => {
    const formattedDateMMM = datePickerPage.formatDate(
      new Date(),
      'MMM DD, YYYY'
    );
    const formattedDateMMDDYYYY = datePickerPage.formatDate(
      new Date(),
      'MM/DD/YYYY'
    );

    cy.get(datePickerPage.startDateInput).click();
    cy.get(`button[aria-label="${formattedDateMMM}"]`)
      .should('be.visible')
      .dblclick();

    cy.get(datePickerPage.dateRangeSelect).each(($el) => {
      cy.wrap($el).within(() => {
        cy.get('input').should('have.value', formattedDateMMDDYYYY);
      });
    });

    cy.get(datePickerPage.startDateInput).within(() => {
      cy.get('input').should('have.value', `${formattedDateMMDDYYYY}`);
    });
    cy.get(datePickerPage.endDateInput).within(() => {
      cy.get('input').should('have.value', `${formattedDateMMDDYYYY}`);
    });
  });

  it('Selecting date range of current month', () => {
    const monthRange = datePickerPage.getCurrentMonthDates(new Date());
    const formattedDatesMMM = monthRange.map(([startDate, endDate]) => [
      datePickerPage.formatDate(startDate, 'MMM DD, YYYY'),
      datePickerPage.formatDate(endDate, 'MMM DD, YYYY'),
    ]);

    cy.get(datePickerPage.startDateInput).should('be.visible').click();
    formattedDatesMMM.forEach((dateRange) => {
      dateRange.forEach((date) => {
        cy.get(`button[aria-label="${date}"]`).should('be.visible').click();
      });
    });

    //asserting selected values
    const formattedDatesMM = monthRange.map(([startDate, endDate]) => [
      datePickerPage.formatDate(startDate, 'MM/DD/YYYY'),
      datePickerPage.formatDate(endDate, 'MM/DD/YYYY'),
    ]);

    cy.get(datePickerPage.startDateInput).within(() => {
      cy.get('input').should(
        'have.value',
        String(formattedDatesMM).split(',')[0]
      );
    });
    cy.get(datePickerPage.endDateInput).within(() => {
      cy.get('input').should(
        'have.value',
        String(formattedDatesMM).split(',')[1]
      );
    });
  });
});
