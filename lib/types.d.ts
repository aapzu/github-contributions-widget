export type ContributionsResponse = {
  data: {
    user: {
      name: string
      login: string
      contributionsCollection: {
        contributionCalendar: {
          totalContributions: number
          weeks: Array<{
            contributionDays: Array<{
              color: string
              contributionCount: number
              date: string
              weekday: number
            }>
            firstDay: string
          }>
        }
      }
    }
  }
}

export type ContributionsErrorResponse = {
  errors: Array<{
    message: string
  }>
}
