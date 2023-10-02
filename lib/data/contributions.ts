import axios from 'axios'
import { ContributionsResponse, ContributionsErrorResponse } from '../types'

const token = process.env.GITHUB_PERSONAL_ACCESS_TOKEN

const gqlQuery = (username: string) => `
  query {
    user(login: "${username}") {
      name
      login
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
  const { data: res } = await axios.post<
    ContributionsResponse | ContributionsErrorResponse
  >(
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
  return res
}
