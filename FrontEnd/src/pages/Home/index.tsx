import { AuthenticationResult } from "@azure/msal-browser";
import { instance, loginRequest } from "../../../authConfig";
import { useNavigate } from "react-router-dom";

const Home = (): JSX.Element => {
  const navigate = useNavigate();
  sessionStorage.clear();

  const handleLogin = async (): Promise<void> => {
    try {
      const result: AuthenticationResult = await instance.loginPopup(loginRequest);
      const name = result.account?.name;
      const token = result.accessToken;
      const email = result.account?.username.toLowerCase();
      sessionStorage.setItem("user", JSON.stringify({ name, token, email }));
      navigate('/marketplace');
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <main id='landingMain'>
      <img id="marketplaceLogo" src="/images/home/vsg-marketplace-logo.png" alt="Marketplace-logo" />
      <a id="loginButton" onClick={handleLogin}>
        LOGIN
      </a>
    </main>
  );
};

export default Home;