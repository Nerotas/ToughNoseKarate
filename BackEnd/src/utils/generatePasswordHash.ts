import * as bcrypt from 'bcrypt';

/**
 * Password Hashing Utility
 * Run this script to generate a bcrypt hash for your admin password
 */

async function generatePasswordHash(
  plainTextPassword: string,
): Promise<string> {
  const saltRounds = 10; // Standard salt rounds for bcrypt
  const hashedPassword = await bcrypt.hash(plainTextPassword, saltRounds);
  return hashedPassword;
}

async function main() {
  // Change this to your desired admin password
  const adminPassword = 'YourSecureAdminPassword123!';

  try {
    const hashedPassword = await generatePasswordHash(adminPassword);

    console.log('='.repeat(60));
    console.log('🔐 PASSWORD HASH GENERATOR');
    console.log('='.repeat(60));
    console.log(`Original Password: ${adminPassword}`);
    console.log(`Hashed Password:  ${hashedPassword}`);
    console.log('='.repeat(60));
    console.log('');
    console.log('📋 SQL INSERT STATEMENT:');
    console.log('');
    console.log(
      `INSERT INTO instructors (email, password_hash, first_name, last_name, role)`,
    );
    console.log(
      `VALUES ('admin@toughnosekarate.com', '${hashedPassword}', 'Admin', 'User', 'admin');`,
    );
    console.log('');
    console.log('⚠️  SECURITY NOTE: Delete this script after use!');
    console.log('='.repeat(60));
  } catch (error) {
    console.error('Error generating password hash:', error);
  }
}

// Verification function to test the hash
async function verifyPassword(
  plainTextPassword: string,
  hashedPassword: string,
): Promise<boolean> {
  return await bcrypt.compare(plainTextPassword, hashedPassword);
}

// Example verification test
async function testHash() {
  const password = 'YourSecureAdminPassword123!';
  const hash = await generatePasswordHash(password);
  const isValid = await verifyPassword(password, hash);

  console.log('\n🧪 VERIFICATION TEST:');
  console.log(`Password verification: ${isValid ? '✅ PASSED' : '❌ FAILED'}`);
}

// Run the script
main().then(() => testHash());

/**
 * USAGE INSTRUCTIONS:
 *
 * 1. Install bcrypt if not already installed:
 *    npm install bcrypt @types/bcrypt
 *
 * 2. Change the 'adminPassword' variable above to your desired password
 *
 * 3. Run this script:
 *    npx ts-node src/utils/generatePasswordHash.ts
 *
 * 4. Copy the generated SQL statement and run it in your database
 *
 * 5. Delete this file for security
 */
