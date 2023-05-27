import { Sequelize, SequelizeOptions } from 'sequelize-typescript';
import { User } from '../models/user';
import { Topic } from '../models/topic';
import { Comment } from '../models/comment';

const { POSTGRES_USER, POSTGRES_PASSWORD, POSTGRES_DB, POSTGRES_PORT, POSTGRES_HOST } = process.env;

export const initDB = async () => {
  try {
    const sequelizeOptions: SequelizeOptions = {
      host: POSTGRES_HOST || 'localhost',
      port: Number(POSTGRES_PORT),
      username: POSTGRES_USER,
      password: POSTGRES_PASSWORD,
      database: POSTGRES_DB,
      dialect: 'postgres',
    };

    const sequelize = new Sequelize(sequelizeOptions);
    sequelize.addModels([User, Topic, Comment]);

    // Create or update tables.
    await sequelize.sync({ alter: true });

    return sequelize;
  } catch (error) {
    console.log('sequelize initDB error: ', error);
    return null;
  }
};
