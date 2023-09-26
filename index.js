// helpers.js

// Helper function to create an employee record
function createEmployeeRecord(arr) {
    return {
      firstName: arr[0],
      familyName: arr[1],
      title: arr[2],
      payPerHour: arr[3],
      timeInEvents: [],
      timeOutEvents: [],
    };
  }
  
  // Helper function to create an array of employee records
  function createEmployeeRecords(arrays) {
    return arrays.map(createEmployeeRecord);
  }
  
  // Helper function to parse date and time string and return date
  function parseDate(dateTimeString) {
    return dateTimeString.split(" ")[0];
  }
  
  // Helper function to parse date and time string and return hour
  function parseHour(dateTimeString) {
    return parseInt(dateTimeString.split(" ")[1], 10);
  }
  
  // Function to create a timeIn event and add it to an employee's record
  function createTimeInEvent(dateTimeString) {
    this.timeInEvents.push({
      type: "TimeIn",
      date: parseDate(dateTimeString),
      hour: parseHour(dateTimeString),
    });
    return this;
  }
  
  // Function to create a timeOut event and add it to an employee's record
  function createTimeOutEvent(dateTimeString) {
    this.timeOutEvents.push({
      type: "TimeOut",
      date: parseDate(dateTimeString),
      hour: parseHour(dateTimeString),
    });
    return this;
  }
  
  // Function to calculate the hours worked on a specific date
  function hoursWorkedOnDate(date) {
    const timeIn = this.timeInEvents.find((event) => event.date === date);
    const timeOut = this.timeOutEvents.find((event) => event.date === date);
    return (timeOut.hour - timeIn.hour) / 100;
  }
  
  // Function to calculate wages earned on a specific date
  function wagesEarnedOnDate(date) {
    const hoursWorked = hoursWorkedOnDate.call(this, date);
    return hoursWorked * this.payPerHour;
  }
  
  // Function to calculate all wages for an employee
  function allWagesFor() {
    const datesWorked = this.timeInEvents.map((event) => event.date);
    const totalWages = datesWorked.reduce((total, date) => total + wagesEarnedOnDate.call(this, date), 0);
    return totalWages;
  }
  
  // Function to find an employee by first name
  function findEmployeeByFirstName(srcArray, firstName) {
    return srcArray.find((employee) => employee.firstName === firstName);
  }
  
  // Function to calculate payroll for a set of employee records
  function calculatePayroll(employeeRecords) {
    return employeeRecords.reduce((totalPayroll, employee) => totalPayroll + allWagesFor.call(employee), 0);
  }
  
  module.exports = {
    createEmployeeRecord,
    createEmployeeRecords,
    createTimeInEvent,
    createTimeOutEvent,
    hoursWorkedOnDate,
    wagesEarnedOnDate,
    allWagesFor,
    findEmployeeByFirstName,
    calculatePayroll,
  };
  