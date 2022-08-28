import path from 'path'
import { optimize } from 'svgo'
import ejs from 'ejs'
import { ContributionsResponse } from './types'
import tinygradient from 'tinygradient'

const svgTemplatePath = path.resolve(
  __dirname,
  '../templates/contributions.ejs',
)

const colorGetter = (maxNum: number) => {
  const gradient = tinygradient(['#001d3d', '#0069CC'])
    .rgb(maxNum + 1)
    .map((c) => c.toString())
  return (num: number) => gradient[num]
}

export const optimizeSvg = async (svgString: string) => {
  const optimizeResult = await optimize(svgString)
  if ('data' in optimizeResult) {
    return optimizeResult.data
  } else {
    throw optimizeResult.modernError
  }
}

const contributionsToImage = async (contributions: ContributionsResponse) => {
  const flattenedContributions =
    contributions.data.user.contributionsCollection.contributionCalendar.weeks.flatMap(
      (week) => week.contributionDays,
    )
  const maxContributions = Math.max(
    ...flattenedContributions.map((c) => c.contributionCount),
  )
  const svgString = await ejs.renderFile(
    svgTemplatePath,
    {
      contributions: flattenedContributions,
      width: 1020,
      getColor: colorGetter(maxContributions),
    },
    {},
  )
  // const optimizedSvg = await optimizeSvg(svgString)
  const optimizedSvg = svgString
  return Buffer.from(optimizedSvg, 'utf-8')
}

export default contributionsToImage
