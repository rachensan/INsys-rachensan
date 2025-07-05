import pg from 'pg';

export const db = new pg.Client({
  user: 'postgres',
  host: 'localhost',
  database: 'capstone',
  password: 'marchdb', //napakavulnerable na ilagay dito kaso tinatamad ako for now... (.env)
  port: 5432,
});

db.connect();



