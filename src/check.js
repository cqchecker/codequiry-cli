import inquirer from 'inquirer';
import axios from 'axios';
import fs from 'fs';
import FormData from 'form-data';
import { API_KEY_FILE, validLanguageIds } from './const.js'
import { isValidNumber, getApiKey, getZipFiles } from './util.js'


export async function manageChecks() {
  try {
    const { apiKey } = JSON.parse(fs.readFileSync(API_KEY_FILE, 'utf8'));

    const action = await inquirer.prompt([
      {
        type: 'list',
        name: 'action',
        message: 'Choose an action:',
        choices: ['Create Check', 'Start Check', 'Upload to Check']
      }
    ]);

    switch (action.action) {
      case 'Create Check':
        await _createCheck(apiKey);
        break;
      case 'Start Check':
        await _startCheck(apiKey);
        break;
      case 'Upload to Check':
        await _uploadToCheck(apiKey);
        break;
      default:
        console.log('Invalid action.');
    }
  } catch (error) {
    if (error.message.includes('User force closed the prompt')) {
    } else {
      console.error('An unexpected error occurred:', error);
    }
  }
}

export function createCheck() {
  try {
    const apiKey = getApiKey();
    if (!apiKey) {
      console.log('Please authenticate first.');
      return;
    }
    _createCheck(apiKey);
  } catch (error) {
    if (error.message.includes('User force closed the prompt')) {
    } else {
      console.error('An unexpected error occurred:', error);
    }
  }
}

async function _createCheck(apiKey) {
  try {
    const answers = await inquirer.prompt([
      {
        type: 'input',
        name: 'language',
        message: 'Enter the programming language:'
      },
      {
        type: 'input',
        name: 'name',
        message: 'Enter the your name:'
      },
    ]);

    if (answers.language === '' || !isValidNumber(answers.language)) {
      console.log(validLanguageIds);
      return;
    }
    if (answers.name === '' || answers.name.length < 4) {
      console.log('Please enter name. And name must be at least 4 characters.');
      return;
    }

    try {
      const response = await axios.post('https://codequiry.com/api/v1/check/create', null, {
        params: {
          name: answers.name,
          language: answers.language,
        },
        headers: {
          'Accept': '*/*',
          'apikey': apiKey,
        }
      });

      if (response.status === 201) {
        console.log('Check created successfully:', response.data);
      } else {
        console.log('Failed to create check.');
      }
    } catch (error) {
      console.error('Error Creating Check:', error.response.data);
    }
  } catch (error) {
    if (error.message.includes('User force closed the prompt')) {
    } else {
      console.error('An unexpected error occurred:', error);
    }
  }
}

export function startCheck() {
  try {
    const apiKey = getApiKey();
    if (!apiKey) {
      console.log('Please authenticate first.');
      return;
    }
    _startCheck(apiKey);
  } catch (error) {
    if (error.message.includes('User force closed the prompt')) {
    } else {
      console.error('An unexpected error occurred:', error);
    }
  }
}

async function _startCheck(apiKey) {
  try {
    const answers = await inquirer.prompt([
      {
        type: 'input',
        name: 'checkId',
        message: 'Enter the check ID:'
      },
      {
        type: 'list',
        name: 'addintionalCheck',
        message: 'Select the additional check type:',
        choices: ['webcheck', 'dbcheck', 'group_similarity_only']
      }
    ]);

    if (answers.checkId === '' || !isValidNumber(answers.checkId)) {
      console.log('Please enter check ID. And check ID must be a number.');
      return;
    }
    if (answers.addintionalCheck === '') {
      console.log('Please select additional check type.');
      return;
    }

    let params = {};
    if (answers.addintionalCheck === 'webcheck') {
      params = { 'check_id': answers.checkId, 'webcheck': 1 };
    } else if (answers.addintionalCheck === 'dbcheck') {
      params = { 'check_id': answers.checkId, 'dbcheck': 1 };
    } else if (answers.addintionalCheck === 'group_similarity_only') {
      params = { 'check_id': answers.checkId };
    }
    try {
      const response = await axios.post(`https://codequiry.com/api/v1/check/start`, null, {
        params: {
          ...params
        },
        headers: {
          'apikey': apiKey,
        }
      });

      if (response.status === 200 && !response.data.hasOwnProperty('error')) {
        console.log('Check started successfully.\n', response.data);
      } else {
        console.log('Failed to start check.', response.data);
      }
    } catch (error) {
      console.error('Error starting check:', error.response.data);
    }
  } catch (error) {
    if (error.message.includes('User force closed the prompt')) {
    } else {
      console.error('An unexpected error occurred:', error);
    }
  }

}

export function uploadToCheck() {
  try {
    const apiKey = getApiKey();
    if (!apiKey) {
      console.log('Please authenticate first.');
      return;
    }
    _uploadToCheck(apiKey);
  } catch (error) {
    if (error.message.includes('User force closed the prompt')) {
    } else {
      console.error('An unexpected error occurred:', error);
    }
  }

}

async function _uploadToCheck(apiKey) {
  try {
    const answers = await inquirer.prompt([
      {
        type: 'input',
        name: 'checkId',
        message: 'Enter the check ID:'
      }
    ]);

    if (answers.checkId === '' || !isValidNumber(answers.checkId)) {
      console.log('Please enter check ID. And check ID must be a number.');
      return;
    }

    const files = getZipFiles();

    if (answers.checkId === '') {
      console.log('Please enter check ID.');
      return;
    }
    if (files.length === 0) {
      console.log('No ZIP files found in uploads folder.\nPlease copy files in upload folder and try again.');
      return;
    }


    files.forEach(async (file, index) => {
      try {
        const form = new FormData();
        form.append('file', fs.createReadStream(`./uploads/${file}`));
        form.append('check_id', answers.checkId);
        const response = await axios.post('https://codequiry.com/api/v1/check/upload', form, {
          headers: {
            apikey: apiKey,
          }
        });

        if (response.status === 200) {
          console.log('File uploaded successfully.', response.data);
        } else {
          console.log('Failed to upload file.');
        }
      } catch (error) {
        console.error('Error uploading file:', error.message);
      }
    });
  } catch (error) {
    if (error.message.includes('User force closed the prompt')) {
    } else {
      console.error('An unexpected error occurred:', error);
    }
  }
}

export async function retriveCheck() {
  try {
    const apiKey = getApiKey();
    if (!apiKey) {
      console.log('Please authenticate first.');
      return;
    }

    try {
      const response = await axios.post(`https://codequiry.com/api/v1/checks`, null, {
        headers: {
          'Accept': '*/*',
          'apikey': apiKey,
        }
      });

      if (response.status === 200) {
        console.log('Retrive Checks successfully.\n', response.data);
      } else {
        console.log('Failed to retrive check.', response.data);
      }
    } catch (error) {
      console.error('Error retriving checks:', error.response.data);
    }
  } catch (error) {
    if (error.message.includes('User force closed the prompt')) {
    } else {
      console.error('An unexpected error occurred:', error);
    }
  }

}

export async function checkStatus() {
  try {
    const apiKey = getApiKey();
    if (!apiKey) {
      console.log('Please authenticate first.');
      return;
    }
    const answers = await inquirer.prompt([
      {
        type: 'input',
        name: 'checkId',
        message: 'Enter the check ID:'
      }
    ]);
    if (answers.checkId === '' || !isValidNumber(answers.checkId)) {
      console.log('Please enter check ID. And check ID must be a number.');
      return;
    }

    let params = { check_id: answers.checkId };

    try {
      const response = await axios.post(`https://codequiry.com/api/v1/check/get`, null, {
        params: {
          ...params
        },
        headers: {
          'Accept': '*/*',
          'apikey': apiKey,
        }
      });

      if (response.status === 200) {
        console.log('Check status successfully.\n', response.data);
      } else {
        console.log('Failed to check status.', response.data);
      }
    } catch (error) {
      console.error('Error check status:', error.response.data);
    }
  } catch (error) {
    if (error.message.includes('User force closed the prompt')) {
    } else {
      console.error('An unexpected error occurred:', error);
    }
  }
}

export async function resultOverview() {
  try {
    const apiKey = getApiKey();
    if (!apiKey) {
      console.log('Please authenticate first.');
      return;
    }
    const answers = await inquirer.prompt([
      {
        type: 'input',
        name: 'checkId',
        message: 'Enter the check ID:'
      }
    ]);

    if (answers.checkId === '' || !isValidNumber(answers.checkId)) {
      console.log('Please enter check ID. And check ID must be a number.');
      return;
    }

    let params = { check_id: answers.checkId };

    try {
      const response = await axios.post(`https://codequiry.com/api/v1/check/overview`, null, {
        params: {
          ...params
        },
        headers: {
          'Accept': '*/*',
          'apikey': apiKey,
        }
      });

      if (response.status === 200) {
        console.log('Result Overview.\n', response.data);
      } else {
        console.log('Failed to check result overview.', response.data);
      }
    } catch (error) {
      console.error('Error check result overview:', error.response.data);
    }
  } catch (error) {
    if (error.message.includes('User force closed the prompt')) {
    } else {
      console.error('An unexpected error occurred:', error);
    }
  }
}

export async function detailedResult() {
  try {
    const apiKey = getApiKey();
    if (!apiKey) {
      console.log('Please authenticate first.');
      return;
    }
    const answers = await inquirer.prompt([
      {
        type: 'input',
        name: 'checkId',
        message: 'Enter the check ID:'
      },
      {
        type: 'input',
        name: 'submissionId',
        message: 'Enter the submission ID:'
      }
    ]);
    if (answers.checkId === '' || !isValidNumber(answers.checkId)) {
      console.log('Please enter check ID. And check ID must be a number.');
      return;
    }
    if (answers.submissionId === '' || !isValidNumber(answers.submissionId)) {
      console.log('Please enter submission ID. And submission ID must be a number.');
      return;
    }

    let params = { check_id: answers.checkId, submission_id: answers.submissionId };

    try {
      const response = await axios.post(`https://codequiry.com/api/v1/check/overview`, null, {
        params: {
          ...params
        },
        headers: {
          'Accept': '*/*',
          'apikey': apiKey,
        }
      });

      if (response.status === 200) {
        console.log('Detailed Result.\n', response.data);
      } else {
        console.log('Failed to detailed result.', response.data);
      }
    } catch (error) {
      console.error('Error get detailed result:', error.response.data);
    }
  } catch (error) {
    if (error.message.includes('User force closed the prompt')) {
    } else {
      console.error('An unexpected error occurred:', error);
    }
  }
}
