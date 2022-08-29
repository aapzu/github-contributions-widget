import axios from 'axios'
import { ContributionsResponse } from '../types'

const token = process.env.GITHUB_PERSONAL_ACCESS_TOKEN

const gqlQuery = (username: string) => `
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
`

export const getContributions = async (username: string) => {
  const { data } = await axios.post<ContributionsResponse>(
    'https://api.github.com/graphql',
    {
      query: gqlQuery(username),
    },
    {
      headers: {
        Authorization: `bearer ${token}`,
      },
    },
  )
  return data
}
