// Simple in-memory rate limiter
// En producción, considera usar Redis o un servicio dedicado

interface RateLimitStore {
  [key: string]: {
    count: number
    resetTime: number
  }
}

const store: RateLimitStore = {}

export interface RateLimitResult {
  allowed: boolean
  remaining: number
  resetTime: number
}

export function getClientIdentifier(request: Request): string {
  // Intentar obtener IP del cliente
  const forwarded = request.headers.get('x-forwarded-for')
  const realIp = request.headers.get('x-real-ip')
  const ip = forwarded?.split(',')[0] || realIp || 'unknown'
  
  return ip
}

export function rateLimit(
  identifier: string,
  maxRequests: number,
  windowMs: number
): RateLimitResult {
  const now = Date.now()
  const record = store[identifier]

  // Si no hay registro o la ventana expiró, crear uno nuevo
  if (!record || now > record.resetTime) {
    store[identifier] = {
      count: 1,
      resetTime: now + windowMs
    }
    return {
      allowed: true,
      remaining: maxRequests - 1,
      resetTime: now + windowMs
    }
  }

  // Si ya alcanzó el límite
  if (record.count >= maxRequests) {
    return {
      allowed: false,
      remaining: 0,
      resetTime: record.resetTime
    }
  }

  // Incrementar contador
  record.count++
  
  return {
    allowed: true,
    remaining: maxRequests - record.count,
    resetTime: record.resetTime
  }
}

// Limpiar registros expirados periódicamente (opcional)
if (typeof setInterval !== 'undefined') {
  setInterval(() => {
    const now = Date.now()
    Object.keys(store).forEach(key => {
      if (now > store[key].resetTime) {
        delete store[key]
      }
    })
  }, 60000) // Limpiar cada minuto
}

