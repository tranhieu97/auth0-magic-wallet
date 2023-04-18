import React, { useEffect } from "react";

import { useAuth0 } from "@auth0/auth0-react";

// styles
import "./App.css";

// fontawesome
import initFontAwesome from "./utils/initFontAwesome";
import { magic } from "./utils/magic";
initFontAwesome();

const App = () => {
  const { isLoading, error, isAuthenticated, user, loginWithRedirect, logout, getIdTokenClaims, getAccessTokenSilently, loginWithPopup } = useAuth0();

  useEffect(() => {

  }, [isLoading])

  if (error) {
    return <div>Oops... {error.message}</div>;
  }

  if (isLoading) {
    return <>loading...</>;
  }

  async function loginWithMagic() {
    const token = await getIdTokenClaims()

    console.log(token.__raw)

    const did = await magic.openid.loginWithOIDC({
      jwt: token.__raw,
      providerId: 'TQuOQQJ50zFUiL4zw8svEyfIWO50RerPLXP7ygJxOTs=',
    })

    console.log(did)

    console.log('wallet', await magic.user.getMetadata())
  }

  if (isAuthenticated) {
    loginWithMagic()
  }

  return (
    isAuthenticated ? <>
      <div>
        <img src={user.picture} alt={user.name} />
        <h2>{user.name}</h2>
        <p>{user.email}</p>
      </div>
      <>
        <button onClick={logout}>logout</button>
      </>
    </> : <>
      <button onClick={ () => { loginWithPopup() }}>signup</button>
    </>
  );
};

export default App;
