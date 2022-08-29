import { VercelApiHandler } from '@vercel/node'
import axios from 'axios'
import contributionsToImage from '../lib/contributionsToImage'
import { ContributionsResponse } from '../lib/types'

const token = process.env.GITHUB_PERSONAL_ACCESS_TOKEN

async function getContributions(token, username) {
  const body = {
    query: `
      query {
        user(login: "${username}") {
          name
          contributionsCollection {
            contributionCalendar {
              totalContributions
              weeks {
                contributionDays {
                  color
                  contributionCount
                  date
                  weekday
                }
                firstDay
              }
            }
          }
        }
      }
    `,
  }
  const { data } = await axios.post<ContributionsResponse>(
    'https://api.github.com/graphql',
    body,
    {
      headers: {
        Authorization: `bearer ${token}`,
      },
    },
  )
  return data
}

const handler: VercelApiHandler = async (req, res) => {
  const { username } = req.query
  if (!username) {
    return res.status(400).json({
      error: 'Query parameter "username" is required',
      data: null,
    })
  }
  if (Array.isArray(username)) {
    return res.status(400).json({
      error: 'Multiple username are not yet supported',
      data: null,
    })
  }
  try {
    const data = await getContributions(token, username)
    const imageBuffer = await contributionsToImage(data)
    res.setHeader('Content-type', 'image/svg')
    res.send(imageBuffer)
  } catch (e) {
    console.error(e)
    res.status(500).send(e)
  }
}

export const config = {}

export default handler
