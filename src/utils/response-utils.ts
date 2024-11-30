
const successResponse = (status: number = 200, message?: unknown, data?: unknown) => {
  return { status, message, data }
}
const errorResponse = (status: number, message: string) => {
  return { status, message }
}

export { successResponse, errorResponse };
