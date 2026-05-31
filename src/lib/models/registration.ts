import { supabase } from "@/lib/supabase"

export interface Registration {
  id?: number
  first_name: string
  last_name: string
  email: string
  institution: string
  country: string
  dietary_restrictions: string
  special_accommodations: string
  ticket_type: string
  ticket_name: string
  quantity: number
  amount: number
  currency: string
  paypal_order_id: string
  paypal_capture_id?: string
  status: "pending" | "completed" | "cancelled"
  created_at: string
  updated_at: string
}

export async function saveRegistration(data: Omit<Registration, "id" | "created_at" | "updated_at">) {
  const { data: result, error } = await supabase
    .from("registrations")
    .insert([data])
    .select("id")
    .single()

  if (error) throw new Error(error.message)
  return result.id.toString()
}

export async function updateRegistration(orderId: string, update: Partial<Registration>) {
  const { error } = await supabase
    .from("registrations")
    .update(update)
    .eq("paypal_order_id", orderId)

  if (error) throw new Error(error.message)
}

export async function getRegistrationByOrderId(orderId: string) {
  const { data, error } = await supabase
    .from("registrations")
    .select("*")
    .eq("paypal_order_id", orderId)
    .single()

  if (error && error.code !== "PGRST116") throw new Error(error.message)
  return data as Registration | null
}

export async function getAllRegistrations() {
  const { data, error } = await supabase
    .from("registrations")
    .select("*")
    .eq("status", "completed")
    .order("created_at", { ascending: false })

  if (error) throw new Error(error.message)
  return (data as Registration[]) || []
}
