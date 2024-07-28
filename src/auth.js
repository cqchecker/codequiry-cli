import inquirer from 'inquirer';
import axios from 'axios';
import fs from 'fs';
import { manageChecks } from './check.js';
import { API_KEY_FILE } from './const.js';
import { getApiKey } from './util.js';

export async function authenticate() {
  let apiKey = getApiKey();

  if (!apiKey) {
    const answers = await inquirer.prompt([
      {
        type: 'input',
        name: 'apiKey',
        message: 'Enter your API key:'
      }
    ]);

    apiKey = answers.apiKey;
  }

  if (apiKey) {
    try {
      const response = await axios.post('https://codequiry.com/api/v1/account', null, {
        headers: {
          'Accept': '*/*',
          'apikey': apiKey,
        }
      });

      if (response.status === 200) {
        fs.writeFileSync(API_KEY_FILE, JSON.stringify({ apiKey }));
        console.log(`Hello, ${response.data.user}!\nYour email is ${response.data.email}.`);

        manageChecks();
      } else {
        console.log('Invalid API key. Please re-enter the key.');
      }
    } catch (error) {
      console.error('Authentication failed:', error.response.data);
      if (fs.existsSync(API_KEY_FILE)) {
        fs.unlinkSync(API_KEY_FILE);
      }
    }
  }
}
