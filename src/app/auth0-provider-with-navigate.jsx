import { Auth0Provider } from '@auth0/auth0-react'
import React from 'react'
import { useNavigate } from 'react-router-dom'

function Auth0ProviderWithNavigate({ children }) {
  const navigate = useNavigate()

  const domain = process.env.REACT_APP_AUTH0_DOMAIN
  const clientId = process.env.REACT_APP_AUTH0_CLIENT_ID
  const redirectUri = process.env.REACT_APP_AUTH0_CALLBACK_URL
  const audience = process.env.REACT_APP_AUTH0_AUDIENCE
  // console.log('domain', domain)
  // console.log('clientId', clientId)
  // console.log('redirectUri', redirectUri)
  // console.log('audience', audience)

  const onRedirectCallback = (appState) => {
    navigate(appState?.returnTo || window.location.pathname)
  }

  if (!(domain && clientId && redirectUri && audience)) {
    console.log('bad')
    return null
  }

  return (
    <Auth0Provider
      domain={domain}
      clientId={clientId}
      authorizationParams={{
        audience,
        redirect_uri: redirectUri
      }}
      onRedirectCallback={onRedirectCallback}
    >
      {children}
    </Auth0Provider>
  )
}

export default Auth0ProviderWithNavigate
