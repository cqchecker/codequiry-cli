#!/usr/bin/env node

import { program } from 'commander';
import { authenticate } from './auth.js';
import { createCheck, uploadToCheck, startCheck, retriveCheck, checkStatus, resultOverview, detailedResult } from './check.js';

program
    .version('1.0.0')
    .description('CLI for Plagiarism Checker API');

program
    .command('auth')
    .description('Authenticate API key')
    .action(authenticate);

program
    .command('createCheck')
    .description('Create check')
    .action(createCheck);

program
    .command('uploadToCheck')
    .description('Upload file to check')
    .action(uploadToCheck);

program
    .command('startCheck')
    .description('Start check')
    .action(startCheck);

program
    .command('retriveCheck')
    .description('Retrive checks')
    .action(retriveCheck);

program
    .command('checkStatus')
    .description('Check status')
    .action(checkStatus);

program
    .command('resultOverview')
    .description('Result Overview')
    .action(resultOverview);

program
    .command('detailedResult')
    .description('Detailed Result')
    .action(detailedResult);

program.parse(process.argv);
