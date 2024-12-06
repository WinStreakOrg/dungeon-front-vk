import { BackGround } from '../components/ui/BackGround';
import { Button, Root, Text } from '../components/FirstStage/Elements';
import Head from 'next/head';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import Stepper from '../components/ui/Stepper';

const addresses = ['ул. Революционная, 155', 'ул. Полевая, 72', 'Московское шоссе, 43'];

export default function Home() {
  const router = useRouter();
  const [focusedButton, setFocusedButton] = useState(null);
  const [isAddressSelected, setIsAddressSelected] = useState(false);

  const saveAddressToLocalStorage = (item) => {
    localStorage.setItem('address', item);
    setIsAddressSelected(true);
  }

  const BranchButton = ({ address, onClick, isFocused }) => (
    <Button onClick={onClick} isFocused={isFocused}>
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
        <Text>Выберите филиал </Text>
        <div
          style={{
            position: 'relative',
            width: '358px',
            height: '28px',
          }}
        >
          <Stepper canNavigateForward={true} url={'/'} id={1} left={0} />
          <Stepper canNavigateForward={isAddressSelected} url={'/Second'} id={2} left={110} />
          <Stepper canNavigateForward={isAddressSelected} url={'/third-stage'} id={3} left={220} />
          <Stepper canNavigateForward={isAddressSelected} url={'/fourth-stage'} id={4} left={328} />
          <img
            width={'100%'}
            alt={''}
            src={'/images/firstStage.svg'}
          />
        </div>

        {addresses.map((address) => (
          <BranchButton
            key={address}
            address={address}
            onClick={() => {
              saveAddressToLocalStorage(address);
              setFocusedButton(address);
              router.push('/Second');
            }}
            isFocused={focusedButton === address}
          />
        ))}

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
