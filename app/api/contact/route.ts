import { type NextRequest, NextResponse } from "next/server"
import { supabaseAdmin } from "@/lib/supabase"
import { rateLimit, getClientIdentifier } from "@/lib/rate-limit"

// Allowed service values
const ALLOWED_SERVICES = [
  'business-intelligence',
  'machine-learning',
  'desarrollo-software',
  'analisis-datos',
  'otro'
]

// Input validation limits
const MAX_LENGTHS = {
  name: 255,
  email: 255,
  phone: 50,
  company: 255,
  service: 100,
  message: 1000
}

function sanitizeString(input: string, maxLength: number): string {
  if (typeof input !== 'string') {
    return ''
  }
  // Remove control characters and trim
  return input
    .replace(/[\x00-\x1F\x7F]/g, '') // Remove control characters
    .trim()
    .slice(0, maxLength)
}

function validateEmail(email: string): boolean {
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
  return emailRegex.test(email) && email.length <= MAX_LENGTHS.email
}

function validatePhone(phone: string): boolean {
  // Remove spaces and validate
  const cleaned = phone.replace(/\s/g, '')
  const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/
  return phoneRegex.test(cleaned) && cleaned.length <= MAX_LENGTHS.phone
}

export async function POST(request: NextRequest) {
  try {
    // Rate limiting - 5 requests per 15 minutes per IP
    const clientId = getClientIdentifier(request)
    const rateLimitResult = rateLimit(clientId, 5, 15 * 60 * 1000)
    
    if (!rateLimitResult.allowed) {
      return NextResponse.json(
        { error: "Too many requests. Please try again later." },
        { 
          status: 429,
          headers: {
            'Retry-After': Math.ceil((rateLimitResult.resetTime - Date.now()) / 1000).toString(),
            'X-RateLimit-Limit': '5',
            'X-RateLimit-Remaining': '0',
            'X-RateLimit-Reset': new Date(rateLimitResult.resetTime).toISOString()
          }
        }
      )
    }

    // Parse and validate request body
    let body
    try {
      body = await request.json()
    } catch {
      return NextResponse.json({ error: "Invalid JSON in request body" }, { status: 400 })
    }

    const { name, email, phone, company, service, message } = body

    // Validate required fields
    if (!name || !email || !message) {
      return NextResponse.json({ 
        error: "Name, email, and message are required",
        details: { hasName: !!name, hasEmail: !!email, hasMessage: !!message }
      }, { status: 400 })
    }

    // Validate and sanitize each field
    const sanitizedName = sanitizeString(name, MAX_LENGTHS.name)
    if (!sanitizedName || sanitizedName.length < 2) {
      return NextResponse.json({ error: "Name must be at least 2 characters long" }, { status: 400 })
    }

    const sanitizedEmail = sanitizeString(email, MAX_LENGTHS.email).toLowerCase()
    if (!validateEmail(sanitizedEmail)) {
      return NextResponse.json({ error: "Invalid email format" }, { status: 400 })
    }

    // Phone is optional, but if provided, validate it
    let sanitizedPhone: string | null = null
    if (phone && phone.trim() !== '') {
      sanitizedPhone = sanitizeString(phone, MAX_LENGTHS.phone)
      if (!validatePhone(sanitizedPhone)) {
        return NextResponse.json({ error: "Invalid phone format" }, { status: 400 })
      }
    }

    // Validate service if provided
    let sanitizedService: string | null = null
    if (service && service.trim() !== '') {
      sanitizedService = sanitizeString(service, MAX_LENGTHS.service)
      if (!ALLOWED_SERVICES.includes(sanitizedService)) {
        return NextResponse.json({ error: "Invalid service selected" }, { status: 400 })
      }
    }

    const sanitizedMessage = sanitizeString(message, MAX_LENGTHS.message)
    if (!sanitizedMessage || sanitizedMessage.length < 10) {
      return NextResponse.json({ error: "Message must be at least 10 characters long" }, { status: 400 })
    }

    // Sanitize optional company field
    const sanitizedCompany = (company && company.trim() !== '') ? sanitizeString(company, MAX_LENGTHS.company) : null

    // Prepare sanitized data
    const sanitizedData = {
      name: sanitizedName,
      email: sanitizedEmail,
      phone: sanitizedPhone,
      company: sanitizedCompany,
      service: sanitizedService,
      message: sanitizedMessage,
      reviewed: false,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    }

    // Insert data into Supabase
    const { error } = await supabaseAdmin
      .from('contact_submissions')
      .insert([sanitizedData])
      .select()

    if (error) {
      // Log error server-side but don't expose details to client
      console.error("Supabase error:", error.message)
      return NextResponse.json({ error: "Failed to process your request" }, { status: 500 })
    }

    return NextResponse.json(
      { message: "Contact form submitted successfully" },
      { 
        status: 200,
        headers: {
          'X-RateLimit-Limit': '5',
          'X-RateLimit-Remaining': rateLimitResult.remaining.toString(),
          'X-RateLimit-Reset': new Date(rateLimitResult.resetTime).toISOString()
        }
      }
    )
  } catch (error) {
    // Log error but don't expose details
    console.error("Contact form error:", error instanceof Error ? error.message : 'Unknown error')
    return NextResponse.json({ error: "An error occurred processing your request" }, { status: 500 })
  }
}

