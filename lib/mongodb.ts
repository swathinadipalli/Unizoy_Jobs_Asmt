import { MongoClient, Db } from "mongodb"

const MONGODB_URI = process.env.MONGODB_URI || ""

let cachedClient: MongoClient | null = null
let cachedDb: Db | null = null

export async function connectToDatabase(): Promise<{ client: MongoClient; db: Db }> {
  if (cachedClient && cachedDb) {
    return { client: cachedClient, db: cachedDb }
  }

  if (!MONGODB_URI) {
    throw new Error("Please define the MONGODB_URI environment variable")
  }

  const client = new MongoClient(MONGODB_URI)
  await client.connect()
  const db = client.db("unizoy_jobboard")

  cachedClient = client
  cachedDb = db

  return { client, db }
}
