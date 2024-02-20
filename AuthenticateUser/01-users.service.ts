function createFailedAuthenticationResponse() {
  return {
    status: 409,
    message: 'Invalid user data'
  }
}

function createSuccessfulAuthenticationResponse() {
  return {
    status: 200,
    token: 'some-token',
  }
}

function validateAuthentication(username: string, password: string) {
  return username === 'admin' && password === 'admin'
}

function authenticateUser(username: string, password: string) {
  if (validateAuthentication(username, password)) {
    return createSuccessfulAuthenticationResponse()
  }
  return createFailedAuthenticationResponse()
}

export class UsersAuthenticationService {
  createFailedAuthenticationResponse() {
    return {
      status: 409,
      message: 'Invalid user data'
    }
  }

  createSuccessfulAuthenticationResponse() {
    return {
      status: 200,
      token: 'some-token',
    }
  }

  validateAuthentication(username: string, password: string) {
    return username === 'admin' && password === 'admin'
  }

  authenticateUser(username: string, password: string) {
    if (validateAuthentication(username, password)) {
      return createSuccessfulAuthenticationResponse()
    }
    return createFailedAuthenticationResponse()
  }
}