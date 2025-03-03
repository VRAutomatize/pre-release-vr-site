
import { execSync } from 'child_process';
import fs from 'fs';

// Run the Vite build
console.log('Building Vite application...');
execSync('vite build', { stdio: 'inherit' });

// Ensure the server.js file has proper permissions
console.log('Setting permissions for server.js...');
fs.chmodSync('server.js', '755');

console.log('Build completed successfully!');
