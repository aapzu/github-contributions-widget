import {
  VercelApiHandler,
  VercelRequestQuery,
  VercelResponse,
} from '@vercel/node'
import axios from 'axios'
import contributionsToImage, {
  supportedImageFormats,
} from '../lib/contributionsToImage'
import { getContributions } from '../lib/data/contributions'
import { ContributionsResponse } from '../lib/types'
import ApiError from '../lib/utils/ApiError'

const getUsername = (query: VercelRequestQuery) => {
  const { username } = query
  if (!username) {
    throw new ApiError('Query parameter "username" is required', 400)
  }
  if (Array.isArray(username)) {
    throw new ApiError('Multiple username are not yet supported', 400)
  }
  return username
}

const getImageFormat = (query: VercelRequestQuery) => {
  const { imageFormat = 'svg' } = query
  if (Array.isArray(imageFormat)) {
    throw new ApiError('Only one imageFormat is supported', 400)
  }
  if (!(imageFormat in supportedImageFormats)) {
    throw new ApiError(
      `imageFormat ${imageFormat} not supported, supported formats: ${Object.keys(
        supportedImageFormats,
      ).join(', ')}`,
      400,
    )
  }
  return imageFormat as keyof typeof supportedImageFormats
}

const handler: VercelApiHandler = async (req, res) => {
  try {
    const username = getUsername(req.query)
    const imageFormat = getImageFormat(req.query)
    const data = await getContributions(username)
    const imageBuffer = await contributionsToImage(data, imageFormat)
    res.setHeader('Content-type', supportedImageFormats[imageFormat])
    res.send(imageBuffer)
  } catch (e) {
    if (e instanceof ApiError) {
      res.status(e.status).send(e.message)
    } else {
      res.status(500).send('Something went wrong')
    }
    console.error(e)
  }
}

export const config = {}

export default handler
