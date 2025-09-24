const readline = require('readline');

// Helper function to validate YYYYMMDD format
function validateDate(input) {
    if (!/^\d{8}$/.test(input)) return false;
    const year = parseInt(input.slice(0, 4), 10);
    const month = parseInt(input.slice(4, 6), 10);
    const day = parseInt(input.slice(6, 8), 10);
    // Basic checks for month and day
    if (month < 1 || month > 12) return false;
    if (day < 1 || day > 31) return false;
    // Try to construct a valid date object
    const date = new Date(`${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`);
    return date && date.getMonth() + 1 === month && date.getDate() === day && date.getFullYear() === year;
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
    // JS Date: month is zero-based
    const date = new Date(year, month - 1, day);
    const dayOfWeek = weekdays[date.getDay()];
    console.log(`The date ${input} is a ${dayOfWeek}.`);
    rl.close();
});
