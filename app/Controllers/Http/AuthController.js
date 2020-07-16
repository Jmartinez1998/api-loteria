'use strict'
const Encryption = use('Encryption')
const User = use('App/Models/User')

class AuthController {

    async login({ request, response, auth }) {
        const { email, password } = request.only(['email', 'password'])
        const tkn = await auth.query().withRefreshToken().attempt(email, password, true)
        const us = await User.findBy('email', email)
    
        return response.ok({ tkn, us })
    }

    //Genera token
    async TokenGenerate({ request, response, auth }) {
        const refreshToken = request.input('refresh_token')
        const token = await auth.newRefreshToken()
          .generateForRefreshToken(refreshToken)
        return response.ok(token)
    }

    //Registro
    async register ({ request, response, auth }) {
        const us_data = request.only(User.store)
        const user = await User.create(us_data)
        const token = await auth.query().withRefreshToken().attempt(user.email, us_data.password, true)
        return response.created({
          status: true,
          message: 'Usario creado!',
          data: { user, token }
        })
    }

    async logout({ request, response, auth }) {
        const refreshToken = request.input('refresh_token')
        const decryptedToken = Encryption.decrypt(refreshToken)
    
        try {
          const user = await auth.getUser()
          await user.tokens()
            .where('token', decryptedToken)
            .delete()
        } catch (error) {}
    
        return response.ok({
          success: true,
          message: 'Logged out successfully!',
          data: {}
        })
      }
}

module.exports = AuthController
