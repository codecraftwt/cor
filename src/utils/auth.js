export const isAuthenticated = () => {
    const authData = localStorage.getItem('authData');
    if (authData) {
      const parsedAuthData = JSON.parse(authData);
      return parsedAuthData.token !== undefined;
    }
    return false;
  };
  