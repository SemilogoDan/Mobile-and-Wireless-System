import jsonfile from "jsonfile";
import moment from "moment";
import simpleGit from "simple-git";

const path = "./data.json";

// Function to generate a commit date based on weeks, days, or any specific date
const markCommit = (x, y, customDate = null) => {
    let dateToCommit;

    if (customDate) {
        // If a custom date is passed, use that date
        dateToCommit = moment(customDate).format();
    } else {
        // Otherwise, calculate based on x (weeks) and y (days)
        dateToCommit = moment()
            .subtract(1, "y")   // Subtract 1 year from current date
            .add(1, "d")        // Add 1 day
            .add(x, "w")        // Add x weeks
            .add(y, "d")        // Add y days
            .format();          // Format the result as a date string
    }

    return dateToCommit;  // Return the generated date
};

// Function to commit on multiple specific dates
const commitOnMultipleDates = (dates) => {
    dates.forEach(date => {
        x=0; y=0;  // weeks and days  to add to  the current date
        const commitDate = markCommit(x, y, date);  // Using the specific date for each commit
        const data = { date: commitDate };  // Use the current date for the commit

        // Write to file and commit with the generated date
        jsonfile.writeFile(path, data, () => {
            simpleGit().add([path]).commit(commitDate, { '--date': commitDate }).push();
        });

        console.log(`Commit made for: ${commitDate}`);
    });
};

// Example Usage:
// List of specific dates to commit on
const datesToCommit = ['2024-02-07'];

// Call the function to commit on the specified dates
commitOnMultipleDates(datesToCommit);
