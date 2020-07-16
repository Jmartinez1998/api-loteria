'use strict'
const Encryption = use('Encryption')

class AuthController {
    async login({ request, response, auth }) {
        const { email, password } = request.only(['email', 'password'])
        const tkn = await auth.query().withRefreshToken().attempt(email, password, true)
        const us = await User.findBy('email', email)
    
        return response.ok({ tkn, us })
    }

    //Registro
    async register ({ request, response, auth }) {
        const us_data = request.only(User.store)
        const user = await User.create(userData)
        const token = await auth.query().withRefreshToken().attempt(user.email, us_data.password, true)
        return response.created({
          status: true,
          message: 'Usario creado!',
          data: { user, token }
        })
    }
}

module.exports = AuthController
