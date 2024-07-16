import React from 'react';
import LoginForm from '../components/login-form';

export default function LoginPage({ login }) {
  return (
    <div>
      <LoginForm login={login} />
    </div>
  );
}
