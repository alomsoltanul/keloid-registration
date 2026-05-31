import { MongoClient, type Db } from "mongodb"

const MONGODB_URI = process.env.MONGODB_URI
const MONGODB_DB = process.env.MONGODB_DB || "keloid-registration"

let client: MongoClient | null = null
let clientPromise: Promise<MongoClient> | null = null

function getClient(): Promise<MongoClient> {
  if (client && clientPromise) {
    return clientPromise
  }

  if (!MONGODB_URI) {
    throw new Error("MONGODB_URI environment variable is not defined")
  }

  const c = new MongoClient(MONGODB_URI, {
    connectTimeoutMS: 10000,
    serverSelectionTimeoutMS: 10000,
    socketTimeoutMS: 45000,
    maxPoolSize: 1,
    minPoolSize: 0,
  })

  clientPromise = c.connect().then((connected) => {
    client = connected
    return connected
  })

  return clientPromise
}

export async function getDb(): Promise<Db> {
  const c = await getClient()
  return c.db(MONGODB_DB)
}
