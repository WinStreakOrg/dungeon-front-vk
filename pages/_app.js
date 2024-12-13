import '../styles/globals.css';
import Loading from '../pages/Loading';
import bridge from '@vkontakte/vk-bridge';
import { useEffect, useState } from 'react';
import Header from '../components/Header/Header';
import isPropValid from '@emotion/is-prop-valid';
import { StyleSheetManager } from 'styled-components';
import { ContactProvider } from '../context/ContactContext';

export default function MyApp({ Component, pageProps }) {
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    bridge.send('VKWebAppInit');
    bridge.send('VKWebAppGetUserInfo').then((data) => {
      console.log(data);
      setIsLoading(false);
    })
      .catch((error) => console.error(error));
  }, []);

  return (
    <div className="App">
      <Header winStreak />
      <StyleSheetManager
        shouldForwardProp={(prop) => isPropValid(prop)}>
        {isLoading ? <Loading /> :
          <ContactProvider>
            <Component {...pageProps} />
          </ContactProvider>
        }
      </StyleSheetManager>
    </div>
  );
}
