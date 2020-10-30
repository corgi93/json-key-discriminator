import {Command} from "commander";
import start from "./index";
const program = new Command();
program
	.version('0.0.1')
	.description('this is a simple JSON key value discriminator.')
	.arguments('filename')
	.option('-h, --help', 'help guide')

program.parse(process.argv);