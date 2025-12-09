#!/usr/bin/env node

// Development script to start both frontend and backend servers
import { spawn } from 'child_process';
import { readdir } from 'fs/promises';
import { join } from 'path';

console.log('🚀 Starting YVI Soft Development Environment...');
console.log('=============================================\n');

// Check if node_modules exist in both directories
async function checkNodeModules() {
  try {
    await readdir(join(process.cwd(), 'frontend', 'node_modules'));
    await readdir(join(process.cwd(), 'backend', 'node_modules'));
    return true;
  } catch (error) {
    return false;
  }
}

// Function to start a service
function startService(name, command, cwd, color) {
  console.log(`🔄 Starting ${name}...`);
  
  const service = spawn(command, {
    cwd,
    shell: true,
    stdio: ['pipe', 'pipe', 'pipe']
  });

  service.stdout.on('data', (data) => {
    const lines = data.toString().split('\n');
    lines.forEach(line => {
      if (line.trim()) {
        console.log(`[${name}] ${line}`);
      }
    });
  });

  service.stderr.on('data', (data) => {
    const lines = data.toString().split('\n');
    lines.forEach(line => {
      if (line.trim()) {
        console.error(`[${name}] ${line}`);
      }
    });
  });

  service.on('error', (error) => {
    console.error(`❌ Error starting ${name}:`, error.message);
  });

  service.on('close', (code) => {
    console.log(`[${name}] Process exited with code ${code}`);
  });

  return service;
}

// Main async function
async function main() {
  // Check if node_modules exist
  const hasNodeModules = await checkNodeModules();
  if (!hasNodeModules) {
    console.log('⚠️  Warning: node_modules not found in one or both directories.');
    console.log('Please run "npm install" in both frontend and backend directories.\n');
  }

  // Start backend server
  const backend = startService(
    'Backend', 
    'node server.js', 
    join(process.cwd(), 'backend'),
    '\x1b[36m' // Cyan
  );

  // Start frontend server
  const frontend = startService(
    'Frontend', 
    'npm run dev', 
    join(process.cwd(), 'frontend'),
    '\x1b[35m' // Magenta
  );

  // Handle graceful shutdown
  process.on('SIGINT', () => {
    console.log('\n🛑 Shutting down development servers...');
    backend.kill();
    frontend.kill();
    process.exit(0);
  });

  console.log('\n✅ Development environment started successfully!');
  console.log('📝 Frontend available at: http://localhost:5173');
  console.log('📝 Backend API available at: http://localhost:3000');
  console.log('📝 Production API available at: https://yvitech-com.onrender.com');
  console.log('\nPress Ctrl+C to stop both servers.\n');
}

// Run the main function
main().catch(console.error);