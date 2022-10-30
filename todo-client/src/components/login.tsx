import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';

function LoginButton() {
  const {
    isAuthenticated,
    loginWithPopup,
  } = useAuth0();

  return (
    <button onClick={loginWithPopup}>Log in</button>
  );
}

export default LoginButton;