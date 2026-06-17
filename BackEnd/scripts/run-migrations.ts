import * as fs from 'fs';
import * as path from 'path';
import { Sequelize } from 'sequelize-typescript';

/**
 * Database Migration Runner
 * Executes all SQL migration files in order before app startup
 * Usage: ts-node scripts/run-migrations.ts
 */

async function runMigrations() {
  const sequelize = new Sequelize({
    dialect: 'postgres',
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT || '5432'),
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    ssl: process.env.DB_SSL === 'true',
    dialectOptions: {
      ssl: process.env.DB_SSL === 'true' ? { require: true, rejectUnauthorized: false } : undefined,
    },
    logging: (sql) => console.log('🔄 SQL:', sql.substring(0, 100)),
  });

  try {
    console.log('🔗 Connecting to database...');
    await sequelize.authenticate();
    console.log('✅ Database connection successful');

    const migrationsDir = path.resolve(process.cwd(), 'DB', 'migrations');
    const migrationFiles = fs
      .readdirSync(migrationsDir)
      .filter((file) => file.endsWith('.sql'))
      .sort();

    console.log(`📂 Found ${migrationFiles.length} migration files`);

    for (const file of migrationFiles) {
      const filePath = path.join(migrationsDir, file);
      const sql = fs.readFileSync(filePath, 'utf-8');

      console.log(`⏳ Running migration: ${file}`);
      try {
        await sequelize.query(sql, { raw: true });
        console.log(`✅ Completed: ${file}`);
      } catch (error) {
        if (error instanceof Error) {
          // Check if table already exists (idempotent)
          if (error.message.includes('already exists') || error.message.includes('duplicate')) {
            console.log(`⏭️  Skipped (already exists): ${file}`);
          } else {
            console.error(`❌ Failed: ${file}`);
            console.error(error.message);
            throw error;
          }
        }
      }
    }

    console.log('🎉 All migrations completed successfully!');
    await sequelize.close();
  } catch (error) {
    console.error('❌ Migration failed:', error);
    process.exit(1);
  }
}

runMigrations();
