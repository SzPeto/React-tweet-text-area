
export const onErrorHelper = (error: any) => {
  if (error?.status === 401) {
    return {
      logout: true,
      error: {
        message: 'Unauthorized',
        name: 'Error',
        statusCode: error?.status ?? 403,
      },
    }
  }
}