import fs from 'fs';
import { API_KEY_FILE } from './const.js';
import path from 'path';

export function getApiKey() {
    if (fs.existsSync(API_KEY_FILE)) {
        return JSON.parse(fs.readFileSync(API_KEY_FILE, 'utf8')).apiKey;
    } else {
        return null;
    }
}

export function isValidNumber(value) {
    return !isNaN(value) && typeof Number(value) === 'number';
};

export function getZipFiles() {
    try {
        const files = fs.readdirSync('./uploads/');
        const zipFiles = files.filter(file => path.extname(file).toLowerCase() === '.zip');
        return zipFiles;
    } catch (error) {
        console.error('Error reading directory:', error);
        return [];
    }
};