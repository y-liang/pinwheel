














/**
 * https://www.prisma.io/docs/guides/performance-and-optimization/connection-management#long-running-processes
 */

import { PrismaClient } from "@prisma/client";

let db;
let _db; // existing connection, might not be necessary to check if instance already exists

// this is needed because in development we don't want to restart
// the server with every change, but we want to make sure we don't
// create a new connection to the db with every change either.
if (process.env.NODE_ENV === "production") {
   db = new PrismaClient();
} else {
   if (!_db) {
      _db = new PrismaClient();
   }
   db = _db;
}

export default db;


/**
 * pg deprecated, replaced by prisma
 */


// import { Pool } from 'pg';

// const { POSTGRES_USER, POSTGRES_DATABASE, POSTGRES_PASSWORD, POSTGRES_PORT, POSTGRES_HOST } = process.env;

// const pool = new Pool({
//    user: POSTGRES_USER,
//    database: POSTGRES_DATABASE,
//    password: POSTGRES_PASSWORD,
//    port: POSTGRES_PORT,
//    host: POSTGRES_HOST,
// });


// console.log('???pool', pool);

// export default pool;