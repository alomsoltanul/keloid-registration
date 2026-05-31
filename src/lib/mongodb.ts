import { MongoClient, type Db } from "mongodb"

const MONGODB_URI = process.env.MONGODB_URI
const MONGODB_DB = process.env.MONGODB_DB || "keloid-registration"

let cachedClient: MongoClient | null = null
let cachedDb: Db | null = null

export async function getDb(): Promise<Db> {
  if (!MONGODB_URI) {
    throw new Error("MONGODB_URI environment variable is not defined")
  }

  if (cachedDb) return cachedDb

  const client = new MongoClient(MONGODB_URI)
  await client.connect()
  cachedClient = client
  cachedDb = client.db(MONGODB_DB)
  return cachedDb
}
