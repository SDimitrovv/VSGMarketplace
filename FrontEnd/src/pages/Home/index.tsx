import { instance, loginRequest } from '../../../authConfig';
import { AuthenticationResult } from '@azure/msal-browser';
import { useNavigate } from 'react-router-dom';

const Home = (): JSX.Element => {
  const navigate = useNavigate();
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

      const adminGroupString = 'f2123818-3d51-4fe4-990b-b072a80da143';
      if (payload.groups?.includes(adminGroupString)) {
        memberType = 'Admin';
      }

      const user = { name, token, email, memberType };

      sessionStorage.setItem('user', JSON.stringify(user));
      navigate('/marketplace');
    } catch (error) {
      throw new Error(error as string);
    }
  };

  return (
    <main id='landingMain'>
      <img id='marketplaceLogo' src='/images/home/vsg-marketplace-logo.png' alt='Marketplace-logo' />
      <a id='loginButton' onClick={handleLogin}>
        LOGIN
      </a>
    </main>
  );
};

export default Home;