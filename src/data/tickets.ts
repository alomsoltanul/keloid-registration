export interface TicketType {
  id: string
  name: string
  description: string
  price: number
  availability: string
}

export const tickets: Record<string, TicketType> = {
  "general-admission": {
    id: "general-admission",
    name: "General Admission",
    description:
      "Physicians in Practice and PhD Scientists. Includes access to technical sessions, proceedings download, and coffee breaks.",
    price: 695,
    availability: "16 available",
  },
  "residents-in-training-phd-students": {
    id: "residents-in-training-phd-students",
    name: "Residents in Training & PhD Students",
    description:
      "Residents, Fellows, Medical and PhD Students. Includes access to technical sessions, proceedings download, and coffee breaks.",
    price: 350,
    availability: "92 available",
  },
  "members-of-industry": {
    id: "members-of-industry",
    name: "Members of Industry",
    description:
      "Pharmaceutical Physicians and Scientists affiliated with a for-profit organization.",
    price: 3500,
    availability: "Unlimited",
  },
  "remote-participation": {
    id: "remote-participation",
    name: "Remote Participation",
    description:
      "Join the scientific sessions via Zoom from anywhere in the world.",
    price: 450,
    availability: "Unlimited",
  },
}

export function getTicketById(id: string): TicketType | undefined {
  return tickets[id]
}
