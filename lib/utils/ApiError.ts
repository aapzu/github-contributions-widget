class ApiError extends Error {
  name: 'ApiError'
  status: number
  constructor(message: string, status: number) {
    super(message)
    this.status = status
  }
}

export default ApiError
