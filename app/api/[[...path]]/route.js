import { NextResponse } from 'next/server'
import { MongoClient } from 'mongodb'
import { v4 as uuidv4 } from 'uuid'

const MONGO_URL = process.env.MONGO_URL
const DB_NAME = process.env.DB_NAME || 'jhauto'

let cachedClient = null
async function getDb() {
  if (!cachedClient) {
    cachedClient = new MongoClient(MONGO_URL)
    await cachedClient.connect()
  }
  return cachedClient.db(DB_NAME)
}

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
}

export async function OPTIONS() {
  return new NextResponse(null, { status: 200, headers: corsHeaders })
}

function json(data, status = 200) {
  return NextResponse.json(data, { status, headers: corsHeaders })
}

async function handle(request, { params }) {
  const path = (params?.path || []).join('/')
  const method = request.method

  try {
    const db = await getDb()

    // Health
    if (path === '' || path === 'health') {
      return json({ status: 'ok', service: 'James Hannah Auto Body API', time: new Date().toISOString() })
    }

    // ESTIMATES
    if (path === 'estimates') {
      if (method === 'POST') {
        const body = await request.json()
        const required = ['name', 'phone', 'email', 'vehicle', 'description']
        for (const f of required) {
          if (!body[f]) return json({ error: `Missing field: ${f}` }, 400)
        }
        const doc = {
          id: uuidv4(),
          name: body.name,
          phone: body.phone,
          email: body.email,
          vehicle: body.vehicle,
          description: body.description,
          preferredDate: body.preferredDate || null,
          photos: body.photos || [], // array of base64 data URLs (small previews)
          status: 'new',
          createdAt: new Date().toISOString(),
        }
        await db.collection('estimates').insertOne(doc)
        return json({ success: true, id: doc.id, message: 'Estimate request received. We\'ll contact you within 1 business hour.' })
      }
      if (method === 'GET') {
        const docs = await db.collection('estimates')
          .find({}, { projection: { _id: 0, photos: 0 } })
          .sort({ createdAt: -1 })
          .limit(100)
          .toArray()
        return json({ estimates: docs })
      }
    }

    // BOOKINGS
    if (path === 'bookings') {
      if (method === 'POST') {
        const body = await request.json()
        const required = ['name', 'phone', 'email', 'service', 'date', 'time', 'vehicle']
        for (const f of required) {
          if (!body[f]) return json({ error: `Missing field: ${f}` }, 400)
        }
        // Check for slot conflict
        const conflict = await db.collection('bookings').findOne({ date: body.date, time: body.time, status: { $ne: 'cancelled' } })
        if (conflict) return json({ error: 'That time slot is no longer available. Please pick another.' }, 409)

        const doc = {
          id: uuidv4(),
          name: body.name,
          phone: body.phone,
          email: body.email,
          service: body.service,
          date: body.date,
          time: body.time,
          vehicle: body.vehicle,
          notes: body.notes || '',
          status: 'confirmed',
          confirmationCode: 'JH-' + Math.random().toString(36).substring(2, 8).toUpperCase(),
          createdAt: new Date().toISOString(),
        }
        await db.collection('bookings').insertOne(doc)
        return json({ success: true, id: doc.id, confirmationCode: doc.confirmationCode, message: 'Appointment confirmed!' })
      }
      if (method === 'GET') {
        const url = new URL(request.url)
        const date = url.searchParams.get('date')
        const query = date ? { date } : {}
        const docs = await db.collection('bookings')
          .find(query, { projection: { _id: 0 } })
          .sort({ date: 1, time: 1 })
          .limit(200)
          .toArray()
        return json({ bookings: docs })
      }
    }

    // CONTACT MESSAGES
    if (path === 'contact') {
      if (method === 'POST') {
        const body = await request.json()
        if (!body.name || !body.email || !body.message) {
          return json({ error: 'Missing required fields' }, 400)
        }
        const doc = {
          id: uuidv4(),
          name: body.name,
          email: body.email,
          phone: body.phone || '',
          message: body.message,
          createdAt: new Date().toISOString(),
        }
        await db.collection('contact').insertOne(doc)
        return json({ success: true, message: 'Message sent! We\'ll reply soon.' })
      }
    }

    // BOOKED SLOTS for a date (helper)
    if (path === 'available-slots') {
      const url = new URL(request.url)
      const date = url.searchParams.get('date')
      if (!date) return json({ error: 'date required' }, 400)
      const taken = await db.collection('bookings')
        .find({ date, status: { $ne: 'cancelled' } }, { projection: { _id: 0, time: 1 } })
        .toArray()
      return json({ taken: taken.map(t => t.time) })
    }

    return json({ error: 'Not found', path }, 404)
  } catch (err) {
    console.error('API error:', err)
    return json({ error: err.message || 'Internal server error' }, 500)
  }
}

export const GET = handle
export const POST = handle
export const PUT = handle
export const DELETE = handle
