import React, { useEffect, useState } from 'react';
import CustomText from '../../components/ui/CustomText';
import { BackGround } from '../../components/ui/BackGround';
import {
  Button,
  Container,
  Root,
  Text,
} from '../../components/final-stage/Elements';
import bridge from '@vkontakte/vk-bridge';

const Index = () => {
  const [bookingData, setBookingData] = useState({
    name: '',
    phone: '',
    zone: '',
    date: '',
    time: '',
    address: '',
    persons: '',
  });

  useEffect(() => {
    const data = {
      name: localStorage.getItem('name') || '',
      phone: localStorage.getItem('phone') || '',
      zone: localStorage.getItem('zone') || '',
      date: localStorage.getItem('date') || '',
      time: localStorage.getItem('time') || '',
      address: localStorage.getItem('address') || '',
      persons: localStorage.getItem('persons') || '',
    };
    setBookingData(data);
  }, []);

  const { name, phone, zone, date, time, address, persons } =
    bookingData;


  const handleCloseApp = async () => {
    if (bridge) {
      localStorage.removeItem('time');
      localStorage.removeItem('persons');
      localStorage.removeItem('date');
      localStorage.removeItem('hookah');
      localStorage.removeItem('name');
      localStorage.removeItem('phone');
      localStorage.removeItem('zone');
      localStorage.removeItem('username');
      localStorage.removeItem('address');
      window.location.replace('https://vk.com/im');
      await bridge.send('VKWebAppClose', { status: 'success' });
    } else {
      console.warn('Telegram WebApp API не доступен.');
    }
  };

  return (
    <Root>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '5px',
        }}
      >
        <Text isGreen isUppercase isRussoOne size={20}>
          заявка успешно отправлена
        </Text>
        <Text size={20}>Спасибо, ожидайте подтверждения!</Text>
      </div>
      <div
        style={{
          display: 'flex',
          gap: '8px',
          flexDirection: 'column',
          width: '100%',
        }}
      >
        <Text size={16}>Данные о брони</Text>
        <Container>
          <div
            style={{
              width: '100%',
              display: 'flex',
              gap: '5px',
            }}
          >
            <Text isGrey size={20}>
              Имя:
            </Text>
            <Text size={20}>{name}</Text>
          </div>
          <div
            style={{
              width: '100%',
              display: 'flex',
              padding: '0 0 16px 0 ',
              borderBottom: '1px solid  #A54BFF',
              gap: '5px',
            }}
          >
            <Text isGrey size={20}>
              Телефон:
            </Text>
            <Text size={20}>{phone}</Text>
          </div>

          <Text size={20} isRussoOne>
            {' '}
            {address}{' '}
          </Text>
          <div
            style={{
              display: 'flex',
              gap: '8px',
              alignItems: 'center',
            }}
          >
            <Text size={20}> {persons} гостя </Text>
            <img src="/images/point.svg" alt="" />
            <Text size={20}> {date} </Text>
            <img src="/images/point.svg" alt="" />
            <Text size={20}> {time} </Text>
          </div>
          <Text size={20}> {zone} </Text>
        </Container>

        <div onClick={handleCloseApp} style={{
          padding: '16px 0 0 0',
          display: 'flex',
          cursor: 'pointer',
          gap: '12px',
          flexDirection: 'column',
        }}
        >
          <Text size={12}>
            Остались вопросы?
            <CustomText size={'12'} color>
              {' '}
              Мы с удовольствием на них ответим!
            </CustomText>
          </Text>
          <Text size={12}>
            Изменить информацию о бронировании?
            <CustomText size={'12'} color>
              {' '}
              Напишите нам!
            </CustomText>
          </Text>
        </div>

        <Button onClick={handleCloseApp}>Вернуться в диалог</Button>
      </div>
      <BackGround
        height={289}
        width={176}
        bottom={-2}
        left={197}
        src={'/images/smoke-1.png'}
      />
      <BackGround
        bottom={177}
        left={0}
        src={'/images/controller.png'}
      />
    </Root>
  );
};

export default Index;
