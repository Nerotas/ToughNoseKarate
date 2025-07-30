import { Injectable, OnModuleInit } from '@nestjs/common';
import { Sequelize } from 'sequelize';
import { initModels } from '../models/init-models';

@Injectable()
export class DatabaseService implements OnModuleInit {
  private sequelize: Sequelize;
  public models: any;

  async onModuleInit() {
    // Initialize Sequelize connection
    this.sequelize = new Sequelize({
      dialect: 'mysql',
      host: process.env.MYSQL_HOST,
      port: 3306,
      username: process.env.MYSQL_USER,
      password: process.env.MYSQL_PASSWORD,
      database: process.env.MYSQL_DBNAME,
      logging: false, // Set to console.log to see SQL queries
      // Note: sequelize-auto generated models may show warnings about public class fields
      // This is a known issue but doesn't affect functionality
    });

    // Initialize all models
    this.models = initModels(this.sequelize);

    // Test the connection
    try {
      await this.sequelize.authenticate();
      console.log('Database connection has been established successfully.');
    } catch (error) {
      console.error('Unable to connect to the database:', error);
    }
  }

  getModels() {
    return this.models;
  }

  getSequelize() {
    return this.sequelize;
  }
}
