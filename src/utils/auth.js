import { useToast } from './ToastContext';
export const isAuthenticated = () => {
  const authData = localStorage.getItem('authData');
  if (authData) {
    const parsedAuthData = JSON.parse(authData);
    const token = parsedAuthData.token;

    if (!token) return false;

    try {
      const payload = JSON.parse(atob(token.split('.')[1])); // Decode the token payload
      const currentTime = Math.floor(Date.now() / 1000); // Current time in seconds

      if (payload.exp && payload.exp < currentTime) {
        // Token expired
        return false;
      }

      return true;
    } catch (err) {
      console.error("Invalid token", err);
      return false;
    }
  }

  return false;
};

export const startTokenWatcher = () => {
  // const toast = useToast();
  const checkTokenExpiration = () => {
    const authData = localStorage.getItem('authData');
    if (authData) {
      const parsedAuthData = JSON.parse(authData);
      const token = parsedAuthData.token;

      if (!token) return;

      try {
        const payload = JSON.parse(atob(token.split('.')[1])); // Decode the token payload
        const currentTime = Math.floor(Date.now() / 1000); // Current time in seconds

        if (payload.exp && payload.exp < currentTime) {
          // Token expired
          // toast.showToast('Your session has expired. Please sign in again.', 'error'); // Show toast
          localStorage.removeItem('authData'); // Clear local storage
          window.location.href = '/sign-in'; // Redirect to sign-in page
        }
      } catch (err) {
        console.error("Invalid token", err);
        // toast.showToast('Invalid session. Please sign in again.', 'error'); // Show toast for invalid token
        localStorage.removeItem('authData'); // Clear local storage for invalid token
        window.location.href = '/sign-in'; // Redirect to sign-in page
      }
    }
  };

  // Check token expiration every 10 seconds (adjust as needed)
  setInterval(checkTokenExpiration, 10000);
};
