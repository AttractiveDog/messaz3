import React from 'react'
import { Button } from '@material-ui/core'
import './Login.css'
import { auth, provider } from './firebase'
import { useStateValue } from './StateProvider'
import { actionTypes } from './reducer'

export default function Login() {
  const [, dispath] = useStateValue()

  const signIn = () => {
    auth
      .signInWithPopup(provider)
      .then((result) =>
        dispath({
          type: actionTypes.SET_USER,
          user: result.user,
        })
      )
      .catch((error) => alert(error.message))
  }

  return (
    <div className="login">
      <div className="login__container">
        <img
          src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2F1000logos.net%2Fwp-content%2Fuploads%2F2018%2F01%2FWhatsApp-Logo.png&f=1&nofb=1"
          alt=""
        />
        <div className="login__text">
          <h1>Sign in to WhatsApp</h1>
        </div>
        <Button type="submit" onClick={signIn}>
          Sign In With Google
        </Button>
      </div>
    </div>
  )
}
