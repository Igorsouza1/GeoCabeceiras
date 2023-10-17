// db.js
import Dexie from 'dexie';

const db = new Dexie('MyDatabase');

db.version(1).stores({
  files: '++id, nome, jsonContent'
});

export default db;
