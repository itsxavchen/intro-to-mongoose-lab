/*------------------------------- Starter packages -------------------------------*/

const dotenv = require('dotenv');
dotenv.config();

const mongoose = require('mongoose');

const prompt = require('prompt-sync')();

const Customer = require('./models/customer');


const connect = async () => {
    await mongoose.connect(process.env.MONGODB_URI);

    const username = prompt('What is your name? ');

    console.log(`Welcome to the CRM, ${username}\n\nWhat would you like to do?\n\nPlease select from the following options:\n\n1. Create Customer\n\n2. View All Customers\n\n3. Update Customer\n\n4. Delete Customer\n\n5. Quit Application\n`);

    await runQueries();
  
}

connect();

/*------------------------------- Query functions -------------------------------*/
const runQueries = async () => {
    const userChoice = prompt('Please select an option to run: ');
    switch (userChoice) {
        case '1':
            await createCustomer();
            break;
        case '2':
            await viewAllCustomer();
            break;
        case '3':
            await updateCustomer();
            break;
        case '4':
            await deleteCustomer();
            break;
        case '5':
            await mongoose.connection.close();
            console.log('Exit Completed');
            process.exit();
            break;
        default:
            console.log('Invalid option! Please only select 1, 2, 3, 4, or 5.');
    }
    
    await runQueries();
};



/*------------------------------- CRUD Functions -------------------------------*/
const createCustomer = async () => {
    const namePrompt = prompt("New customer's name: ");
    const agePrompt = prompt("New customer's age: ");
    const customerData = {
        name: namePrompt,
        age: agePrompt,
    };
    const createdCustomer = await Customer.create(customerData);
    console.log(createdCustomer);
}

const viewAllCustomer = async () => {
    const viewedAllCustomers = await Customer.find({});
    console.log(viewedAllCustomers);
}

const updateCustomer = async () => {
    // Fetch and display all customers
    const viewedAllCustomers = await Customer.find({});
    console.log(viewedAllCustomers)

    // Prompt for the customer's ID to update
    const updateIdPrompt = prompt('Copy and paste the id of the customer you would like to update here: ');

    // Find customer by the provided ID and display the found customer
    const foundCustomer = await Customer.findById(updateIdPrompt);
    console.log(foundCustomer);

    // If no customer is found
    if (!foundCustomer) {
        console.log('Customer with the given ID not found.');
        return;
    }

    // Prompt for which field(s) to update: name, age, or both
    const updateOptionPrompt = prompt('Please choose what to update: name or age or both? ');
    if (updateOptionPrompt === 'name') {
        const nameUpdatePrompt = prompt('What is the customer\'s new name? ');
        const updatedCustomer = await Customer.findByIdAndUpdate(updateIdPrompt, {name: nameUpdatePrompt}, {new: true});
        console.log('Updated customer:', updatedCustomer)
    } else if (updateOptionPrompt === 'age') {
        const ageUpdatePrompt = prompt('What is the customer\'s new age? ');
        const updatedCustomer = await Customer.findByIdAndUpdate(updateIdPrompt, {age: ageUpdatePrompt}, {new: true});
        console.log('Updated customer:', updatedCustomer)
    } else if (updateOptionPrompt === 'both') {
        const nameUpdatePrompt = prompt('What is the customer\'s new name? ');
        const ageUpdatePrompt = prompt('What is the customer\'s new age? ');
        const updatedCustomer = await Customer.findByIdAndUpdate(updateIdPrompt, {name: nameUpdatePrompt, age: ageUpdatePrompt}, {new: true});
        console.log('Updated customer:', updatedCustomer)
    } else {
        console.log('Invalid option selected.');
    }
}

const deleteCustomer = async () => {
    // Fetch and display all customers
    const viewedAllCustomers = await Customer.find({});
    console.log(viewedAllCustomers);

    // Prompt for the customer's ID to update
    const deleteIdPrompt = prompt('Copy and paste the id of the customer you would like to delete here: ');

    // delete the found customer
    const deletedCustomer = await Customer.findByIdAndDelete(deleteIdPrompt);
    console.log('Deleted customer:', deletedCustomer)
}
