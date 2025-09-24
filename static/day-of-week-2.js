// NEW-LANGUAGE command line program to find the day of the week for a given date.
// The program does the following:
// Prompt user to input string in format YYYYMMDD
// Parse the string to check that it is a valid date.
// If it's not, print an error message and exit.
// Calculate the day of the week for the given date.
// Print the day of the week to the user.
const readline = require('readline');
const { DateTime } = require('luxon');

// Helper function to validate YYYYMMDD format
function validateDate(input) {
    if (!/^\d{8}$/.test(input)) return false;
    const year = parseInt(input.slice(0, 4), 10);
    const month = parseInt(input.slice(4, 6), 10);
    const day = parseInt(input.slice(6, 8), 10);
    // Basic checks for month and day
    if (month < 1 || month > 12) return false;
    if (day < 1 || day > 31) return false;
    // Try to construct a valid date object using Luxon
    const date = DateTime.fromObject({ year, month, day });
    return date.isValid && date.month === month && date.day === day && date.year === year;
}

// Weekday names
const weekdays = [
    'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'
];

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

rl.question('Enter a date in YYYYMMDD format (e.g. 20250616): ', (input) => {
    if (!validateDate(input)) {
        console.log('Invalid date format or date. Please use YYYYMMDD (e.g. 20250616).');
        rl.close();
        return;
    }
    const year = parseInt(input.slice(0, 4), 10);
    const month = parseInt(input.slice(4, 6), 10);
    const day = parseInt(input.slice(6, 8), 10);
    // Use Luxon to create a DateTime object
    const date = DateTime.fromObject({ year, month, day });
    const dayOfWeek = weekdays[date.weekday - 1]; // Luxon weekday is 1-7
    console.log(`The date ${input} is a ${dayOfWeek}.`);
    rl.close();
});

// This code uses Luxon for date handling, which provides a more robust way to manage dates and times compared to the native JavaScript Date object.
// Luxon also handles various edge cases and provides better validation for date inputs.
// This implementation ensures that the date is valid and correctly identifies the day of the week for the given date input.
