#! /usr/bin/env node
import inquirer from "inquirer";
import chalk from "chalk";
let myBalance = 10000; //Dollar
let myPin = 1601;
console.log(chalk.gray("Welcome to my ATM Machine!"));
let pinAnswer = await inquirer.prompt([
    {
        name: "pin",
        message: chalk.cyan("Enter your Pin"),
        type: "number"
    }
]);
if (pinAnswer.pin === myPin) {
    console.log(chalk.green("Correct pin Code!"));
    let operationAns = await inquirer.prompt([
        {
            name: "operation",
            message: chalk.cyan("Please Select Option"),
            type: "list",
            choices: ["Withdraw", "Check Balance", "Fast Cash", "Exit"]
        }
    ]);
    if (operationAns.operation === "Withdraw") {
        let amountAns = await inquirer.prompt([
            {
                name: "amount",
                message: chalk.cyan("Enter your amount"),
                type: "number"
            }
        ]);
        if (amountAns.amount > myBalance) {
            console.log(chalk.red("Insufficient Balance!"));
        }
        else {
            myBalance -= amountAns.amount;
            console.log(chalk.green(`Your remaining balance is: ${myBalance}`));
        }
    }
    else if (operationAns.operation === "Check Balance") {
        console.log(chalk.green(`Your Balance is: ${myBalance}`));
    }
    else if (operationAns.operation === "Fast Cash") {
        let FastCash = await inquirer.prompt([
            {
                name: "amount",
                message: chalk.cyan("Enter an amount for Fast Cash"),
                type: "list",
                choices: [1000, 3000, 5000, 7000, 10000]
            }
        ]);
        myBalance -= FastCash.amount;
        console.log(chalk.green(`Your Remaining balance is: ${myBalance}`));
    }
    else if (operationAns.operation === "Exit") {
        console.log(chalk.gray("Thank you for using my ATM Machine, Good Bye!"));
        process.exit();
    }
}
else {
    console.log(chalk.red("Incorrect pin code!"));
}
