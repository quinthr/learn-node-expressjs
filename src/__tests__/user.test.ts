import { nextTick } from 'process'
import * as user from '../handlers/user'

describe('user handler', () => {
    it('should do something when something happens', async () => {
        const req = {body: {username: 'hello', password: 'hello'}}
        const res = {json({token}) {
            expect(token).toBeTruthy()
        }}
        await user.createNewUser(req, res, () => {})
    })
})