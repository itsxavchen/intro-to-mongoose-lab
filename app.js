/*------------------------------- Starter packages -------------------------------*/

const dotenv = require('dotenv');
dotenv.config();

const mongoose = require('mongoose');

const prompt = require('prompt-sync')();


const connect = async () => {
    await mongoose.connect(process.env.MONGODB_URI);

    const username = prompt('What is your name? ');

    console.log(`Welcome to the CRM, ${username}\n\nWhat would you like to do?\n\nPlease select from the following options:\n\n1. Create Customer\n\n2. View All Customers\n\n3. Update Customer\n\n4. Delete Customer\n\n5. Quit Application\n`);
    
    const numberOfActions = prompt('Number of action to run:');

    // await runQueries();

    await mongoose.disconnect();

    process.exit();
  
}

connect();

/*------------------------------- Query functions -------------------------------*/

