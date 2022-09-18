import express from 'express'
import cors from 'cors'

import { PrismaClient } from '@prisma/client'
import { convertHourToMinutes } from './utils/convertHourToMInutes'
import { convertMinutesToHours } from './utils/convertMinutesToHours'

const app = express()
app.use(express.json())
app.use(cors())

const prisma = new PrismaClient()

app.get('/games', async (req, res) => {
  const games = await prisma.game.findMany({
    include: {
      _count: {
        select: {
          ads: true
        }
      }
    }
  })

  return res.json(games)
})

app.post('/games/:id/ads', async (req, res) => {
  const { id } = req.params
  const {
    name,
    weekDays,
    useVoiceChannel,
    yearsPlaying,
    hourEnd,
    hourStart,
    discord,
  } = req.body

  const ad = await prisma.ad.create({
    data: {
      gameId: id,
      name,
      weekDays: weekDays.join(','),
      useVoiceChannel,
      yearsPlaying,
      hourEnd: convertHourToMinutes(hourEnd),
      hourStart: convertHourToMinutes(hourStart),
      discord
    }
  })

  return res.json(ad)
})

app.get('/games/:id/ads', async(req, res) => {
  const { id } = req.params

  const ads = await prisma.ad.findMany({
    select: {
      id: true,
      name: true,
      weekDays: true,
      useVoiceChannel: true,
      yearsPlaying: true,
      hourEnd: true,
      hourStart: true
    },
    where: {gameId: id},
    orderBy: {
      createdAt: 'desc'
    }
  })

  return res.json(ads.map(ad => {
    return {
      ...ads,
      weekDays: ad.weekDays.split(','),
      hourStart: convertMinutesToHours(ad.hourStart),
      hourEnd: convertMinutesToHours(ad.hourEnd)
    }
  }))
})

app.get('/ads/:id/discord', async (req, res) => {
  const { id } = req.params

  const ad = await prisma.ad.findUniqueOrThrow({
    select: {
      discord: true
    },
    where: {
      id
    }
  })

  return res.json({discord: ad.discord})
})

app.listen(3333)