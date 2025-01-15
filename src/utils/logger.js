import chalk from "chalk";
import ora from "ora";

const spinner = ora();

const logger = {
  info: (msg) => console.log(chalk.blue("[INFO]"), msg),
  success: (msg) => console.log(chalk.green("[SUCCESS]"), msg),
  error: (msg) => console.log(chalk.red("[ERROR]"), msg),
  spinnerStart: (msg) => spinner.start(msg),
  spinnerStop: (msg) => spinner.succeed(msg),
};

export default logger;
