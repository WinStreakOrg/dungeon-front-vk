import React, { useEffect } from 'react';
import Logo from '../../components/ui/Logo';
import {
  Blur,
  ImageBackground,
  Root,
} from '../../components/Loading/Elements.jsx';

const Loading = () => {
  useEffect(() => {
    const App = document.querySelector('.App');
    App.classList.add('loadingPage');

    return () => {
      App.classList.remove('loadingPage');
    };
  }, []);

  return (
    <Root>
      <Blur className={'blur'} />
      <div
        style={{
          zIndex: 3,
          display: 'flex',
          gap: '10px',
          width: '100%',
          height: '100%',
          alignItems: 'center',
          flexDirection: 'column',
          justifyContent: 'center',
        }}
      >
        <Logo src={'logo.svg'} />
        <img src="/images/winStreak.svg" alt="" />
        <img
          width={24}
          height={24}
          src="/images/Vector-loading.svg"
          alt=""
        />
      </div>

      <ImageBackground src={'/images/Loading.jpg'} />
    </Root>
  );
};
export default Loading;
