import { Database } from "bun:sqlite";

const db = new Database("game.sqlite");

// Criar tabelas (se não existirem)
db.exec(`
   CREATE TABLE IF NOT EXISTS users (
    id TEXT PRIMARY KEY DEFAULT (lower(hex(randomblob(16)))), 
    email TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL
);
    
    CREATE TABLE IF NOT EXISTS scores (
        user_id TEXT PRIMARY KEY,
        score INTEGER DEFAULT 0,
        level INTEGER DEFAULT 1,
        FOREIGN KEY (user_id) REFERENCES users(id)
    );
`);

export default db;
