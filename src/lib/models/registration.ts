import { getDb } from "../mongodb"

export interface Registration {
  _id?: string
  firstName: string
  lastName: string
  email: string
  institution: string
  country: string
  dietaryRestrictions: string
  specialAccommodations: string
  ticketType: string
  ticketName: string
  quantity: number
  amount: number
  currency: string
  paypalOrderId: string
  paypalCaptureId?: string
  status: "pending" | "completed" | "cancelled"
  createdAt: Date
  updatedAt: Date
}

export async function saveRegistration(data: Omit<Registration, "_id" | "createdAt" | "updatedAt">) {
  const db = await getDb()
  const collection = db.collection("registrations")

  const now = new Date()
  const result = await collection.insertOne({
    ...data,
    createdAt: now,
    updatedAt: now,
  })

  return result.insertedId.toString()
}

export async function updateRegistration(orderId: string, update: Partial<Registration>) {
  const db = await getDb()
  const collection = db.collection("registrations")

  await collection.updateOne(
    { paypalOrderId: orderId },
    { $set: { ...update, updatedAt: new Date() } }
  )
}

export async function getRegistrationByOrderId(orderId: string) {
  const db = await getDb()
  const collection = db.collection("registrations")
  return collection.findOne({ paypalOrderId: orderId })
}

export async function getAllRegistrations() {
  const db = await getDb()
  const collection = db.collection("registrations")
  return collection.find({ status: "completed" }).sort({ createdAt: -1 }).toArray()
}
