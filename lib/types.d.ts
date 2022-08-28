export type ContributionsResponse = {
  data: {
    user: {
      name: string
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
