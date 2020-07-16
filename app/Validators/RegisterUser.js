
'use strict'

const { formatters } = use('Validator')
class RegisterUser {
  get formatter() {
    return formatters.JsonApi
  }

  get validateAll() {
    return true
  }

  get rules() {
    return {
      username: 'required|max:80|min:4',
      email: 'required|email|max:180|unique:users,email',
      password: 'required|max:60|min:5'
    }
  }

  get messages () {
    return {
      'username.required': 'El usuario es obligatorio',
      'email.required':'El usuario es obligatorio',
      'password.required': 'La contraseña es obligatoria'
    }
  }
}

module.exports = RegisterUser