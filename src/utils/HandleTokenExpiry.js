export function isTokenExpired(payload, navigate) {
  const now = Date.now(); // ms
  const exp = payload.exp * 1000; // ms
  const timeUntilExpiry = exp - now;

  if (timeUntilExpiry <= 0) {
    localStorage.clear();
    navigate("/login", { replace: true });
  } else {
    setTimeout(() => {
      localStorage.clear();
      navigate("/login", { replace: true });
    }, timeUntilExpiry);
  }
}
