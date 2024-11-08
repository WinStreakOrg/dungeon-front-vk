import { BackGround } from '../components/ui/BackGround';
import { Button, Root, Text } from '../components/FirstStage/Elements';
import Head from 'next/head';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import Stepper from '../components/ui/Stepper';


export default function Home() {
  const router = useRouter();

  const saveAddressToLocalStorage = (item) =>
    localStorage.setItem('address', item);

  const [focusedButton, setFocusedButton] = useState(null);

  // useEffect(() => {
  //   if (typeof window !== 'undefined' && window.Telegram?.WebApp) {
  //     const tg = window.Telegram?.WebApp;
  //     const user = tg.initDataUnsafe?.user;
  //
  //     if (user) {
  //       localStorage.setItem('username', user.username);
  //     } else {
  //       return undefined;
  //     }
  //   }
  // }, []);

  const renderBranchButton = (address) => (
    <Button
      onClick={() => {
        saveAddressToLocalStorage(address);
        setFocusedButton(address);
        router.push('/Second');
      }}
      isFocused={focusedButton === address}
    >
      <p>{address}</p>
      <img alt="" width={16} height={16} src="/images/arrow.svg" />
    </Button>
  );

  return (
    <>
      <Head>
        <title>first-step</title>
      </Head>
      <Root>
        <Text>Выберите филиал</Text>
        <div
          style={{
            position: 'relative',
            width: '358px',
            height: '28px',
          }}
        >
          <Stepper url={'/'} id={1} left={0} />
          <Stepper url={'/Second'} id={2} left={110} />
          <Stepper url={'/third-stage'} id={3} left={220} />
          <Stepper url={'/fourth-stage'} id={4} left={328} />
          <img
            width={'100%'}
            alt={''}
            src={'/images/firstStage.svg'}
          />
        </div>

        {renderBranchButton('ул. Революционная, 155')}
        {renderBranchButton('ул. Полевая, 72')}
        {renderBranchButton('Московское шоссе, 43')}

        <BackGround
          bottom={10}
          left={225}
          src={'/images/smoke-1.png'}
        />
        <BackGround
          isRotated
          bottom={26}
          left={5}
          src={'/images/controller.png'}
        />
      </Root>
    </>
  );
}
