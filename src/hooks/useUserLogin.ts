import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function useUserLogin() {
  const [userLogin, setUserLogin] = React.useState(() => {
    // Read the value from localStorage when the component mounts
    const storedLoginStatus = localStorage.getItem('userLogin');
    return storedLoginStatus === 'true'; // Convert the value from string to boolean
  });
  const navigate = useNavigate();

  const handleLogin = () => {
    setUserLogin(true);
    localStorage.setItem('userLogin', 'true'); // Ensure the logout state is saved
  };
  const handleLogout = () => {
    setUserLogin(false);
    localStorage.setItem('userLogin', 'false'); // Ensure the logout state is saved
    navigate(`/login`);
  };

  React.useEffect(() => {
    // Save the userLogin state to localStorage whenever it changes
    localStorage.setItem('userLogin', userLogin.toString());
    if (userLogin) {
      console.log('User has logged in');
      // Perform actions when the user logs in
    } else {
      console.log('User has logged out');
      // Perform actions when the user logs out
    }
  }, [userLogin]); // Dependency array
  return { userLogin, handleLogin, handleLogout };
}
