import Header from '../components/Header/Header';
import Loading from '../pages/Loading';
import { useEffect, useState } from 'react';
import '../styles/globals.css';
import isPropValid from '@emotion/is-prop-valid';
import { StyleSheetManager } from 'styled-components';
import vkBridge from '@vkontakte/vk-bridge';

export default function MyApp({ Component, pageProps }) {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    vkBridge.send('VKWebAppInit');

    vkBridge
      .send('VKWebAppGetUserInfo')
      .then((data) => {
        console.log(data);
        setIsLoading(false);
      })
      .catch((error) => console.error(error));
  }, []);

  return (
    <div className="App">
      <Header />
      <StyleSheetManager
        shouldForwardProp={(prop) => isPropValid(prop)}>
        {isLoading ? <Loading /> : <Component {...pageProps} />}
      </StyleSheetManager>
    </div>
  );
}
