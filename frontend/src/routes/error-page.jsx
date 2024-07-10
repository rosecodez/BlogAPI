import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const ErrorPage = () => {
  const navigate = useNavigate();
  const [countdown, setCountdown] = useState(5);

  useEffect(() => {
    const redirectTimer = setInterval(() => {
      setCountdown(prevCountdown => prevCountdown - 1);
    }, 1000);

    return () => clearInterval(redirectTimer);
  }, []);

  useEffect(() => {
    if (countdown === 0) {
      navigate('/page/homepage');
    }
  }, [countdown, navigate]);

  return (
  <div>
    <h3>
      Oh no, this route doesn't exist!
    </h3>
    <h5>
      You will be redirected in {countdown}{' '}  seconds to the main page
    </h5>
  </div>
  );
};

export default ErrorPage;
