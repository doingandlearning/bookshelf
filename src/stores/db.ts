import Dexie from 'dexie'
import dexieCloud from 'dexie-cloud-addon'
// Define the database schema
const db = new Dexie('BookVault', { addons: [dexieCloud] })
db.version(1).stores({
  books: '@id, title, author, dateFinished, isbn, genre, coverArt',
})

db.cloud.configure({
  databaseUrl: 'https://za2nt52rr.dexie.cloud',
  requireAuth: true,
})

export default db
