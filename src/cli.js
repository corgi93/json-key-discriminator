"use strict"
import program from 'commander';
import { start } from "./index";

program.on('--help', () => {
    console.log('                  json-key-discriminator CLI');
    console.log('                  Usage: jkd [Option]');
    console.log('                  Option: ');
    console.log('                      -h:  Display this help message');
    console.log('                      -d:  Name of the folder in the project directory');
    console.log('                      -f:  first name of json file');
    console.log('                      -s:  second name of json file');
})

program
    .version('1.0.0')
    .description('this is a simple JSON key value discriminator.')
    .option('-d , --dir <type>', 'directory folder name (required)')
    .option('-f ,--first <type>', 'first json name - main file (required)')
    .option('-s ,--second <type>', 'second json name - compare file (required)')
    .action((options) => {
        start(options.dir, options.first, options.second)
    })

// 해당되는 command가 없을 경우 실행되는 command
program.command('*', { noHelp: true }).action(() => {
    console.log('cannot find commander.');
    program.help();
})

program.parse(process.argv);