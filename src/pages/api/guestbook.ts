
import type { NextApiRequest, NextApiResponse } from 'next'
import { supabase } from '@/lib/supabase'
import { Filter } from 'bad-words'

const filter = new Filter()

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' })
    }

    const { name, message } = req.body

    if (!name || !message) {
        return res.status(400).json({ error: 'Name and message are required' })
    }

    if (filter.isProfane(message) || filter.isProfane(name)) {
        return res.status(400).json({ error: 'Please keep it clean!' })
    }


    const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress
    const userAgent = req.headers['user-agent']

    const { data, error } = await supabase
        .from('guestbook')
        .insert([
            {
                name,
                message,
                ip: Array.isArray(ip) ? ip[0] : ip,
                user_agent: userAgent,
            },
        ])
        .select()

    if (error) {
        return res.status(500).json({ error: error.message })
    }

    return res.status(200).json(data)
}
