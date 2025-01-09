/* eslint-disable class-methods-use-this */

class DateHelper {
  formats = {
    YEAR: 'YYYY',
    MONTH: 'MM',
    DAY: 'DD',
  };

  /**
   * @param {string} dateValue
  */
  formatDateItemToBeValid(dateValue) {
    if (dateValue.length < 2) return `0${dateValue}`;
    return dateValue;
  }
}

const dateHelper = new DateHelper();

export default dateHelper;
