import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const AuthSuccess = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const query = new URLSearchParams(window.location.search);
    const token = query.get("token");

    if (token) {
      localStorage.setItem("token", token);

      // (Optional) Decode JWT if you need the user ID
      const payload = JSON.parse(atob(token.split('.')[1]));
      const userId = payload.id;
      localStorage.setItem('userId', userId);

      navigate("/"); // Go to home page after saving
    } else {
      navigate("/login"); // No token, something went wrong
    }
  }, []);

  return <div>Logging you in...</div>;
};

export default AuthSuccess;
