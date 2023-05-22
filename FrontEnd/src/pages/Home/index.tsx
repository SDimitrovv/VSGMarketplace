import { setUser } from '../../redux/authSlice';
import { instance, loginRequest } from '../../../authConfig';
import { AuthenticationResult } from '@azure/msal-browser';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const Home = (): JSX.Element => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  sessionStorage.clear();

  const handleLogin = async (): Promise<void> => {
    try {
      const result: AuthenticationResult = await instance.loginPopup(loginRequest);
      const name = result.account?.name;
      const token = result.accessToken;
      const email = result.account?.username.toLowerCase();
      const tokenParts = token.split('.');
      const payload = JSON.parse(atob(tokenParts[1]));
      let memberType = 'User';

      //Check if user is in admin group
      const adminGroupString = 'f2123818-3d51-4fe4-990b-b072a80da143';
      if (payload.groups.includes(adminGroupString)) {
        memberType = 'Admin';
      }

      const user = { name, token, email, memberType };
      dispatch(setUser(user));

      sessionStorage.setItem("user", JSON.stringify(user));
      navigate('/marketplace');
      location.reload();
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