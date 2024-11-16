import React, { useEffect, useState } from 'react';
import {
  Button,
  CheckboxContainer,
  Container,
  CustomCheckbox,
  HiddenCheckbox,
  Input,
  Loading,
  Nav,
  Root,
  Text,
} from '../../components/FourthStage/Elements';
import CustomText from '../../components/ui/CustomText';
import axios from 'axios';
import { useRouter } from 'next/router';
import Image from 'next/image';
import { BackGround } from '../../components/ui/BackGround';
import { useForm } from 'react-hook-form';
import Stepper from '../../components/ui/Stepper';
import Head from 'next/head';
import { ErrorText } from '../../components/ui/ErrorText';


const Index = () => {

  const router = useRouter();


  const {
    register,
    handleSubmit,
    setValue,
    // setError,
    formState: {
      errors,
      isValid,
    },
    // trigger,
    // resetField,
  } = useForm({
    mode: 'onSubmit',
  });

  const [zone, setZone] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [address, setAddress] = useState('');
  const [persons, setPersons] = useState('');
  const [comment, setComment] = useState('');
  const [hookah, setHookah] = useState(false);
  const [userName, setUserName] = useState('');
  const [nameValue, setNameValue] = useState('');
  const [phoneValue, setPhoneValue] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const [isChecked, setIsChecked] = useState(false);

  const [isAddressSelected, setIsAddressSelected] = useState(false);

  const [isLoading, setIsLoading] = useState(false);

  const handleBlur = () => setIsFocused(true);
  const handleFocus = () => setIsFocused(false);
  const toggleCheckbox = () => setIsChecked(!isChecked);

  useEffect(() => {
    const storedZone = localStorage.getItem('zone');
    const storedTime = localStorage.getItem('time');
    const storedDate = localStorage.getItem('date');
    const storedAddress = localStorage.getItem('address');
    const storedPersons = localStorage.getItem('persons');
    const storedHookah = localStorage.getItem('hookah');
    const storedUsername = localStorage.getItem('username');

    if (storedZone && storedTime && storedDate && storedAddress && storedPersons) {
      setZone(storedZone);
      setTime(storedTime);
      setDate(storedDate);
      setAddress(storedAddress);
      setPersons(storedPersons);
      setHookah(storedHookah);
      setUserName(storedUsername);
    }

  }, []);

  const createDeal = async () => {
    if (isValid) {
      setIsLoading(true);
      try {
        const response = await axios.post('/api/createLead', {
          zone, time, date, comment, address, hookah, persons, nameValue, phoneValue, userName,
        });
        if (response.status >= 200 && response.status < 300) {
          router.push('/final-stage');
        } else {
          console.error('Ошибка запроса');
        }
      } catch (error) {
        console.error('Ошибка:', error.message);
      } finally {
        setIsLoading(false);
      }
    } else {
      console.error('Имя или телефон не заполнены');
    }
  };
  const saveNameToLocalStorage = () => {
    if (nameValue && phoneValue) {
      localStorage.setItem('name', nameValue);
      localStorage.setItem('phone', phoneValue);
      localStorage.setItem('comment', comment);
      setIsAddressSelected(true);
      createDeal();
    } else {
      return undefined;
    }
  };

  return (
    <>
      <Head>
        <title>fourth-step</title>
      </Head>
      <Root>
        <Nav onClick={() => router.push('/third-stage')} id={'container'}>
          <img src="/images/arrow-back.svg" alt="" />
          <Text>Контактные данные</Text>
        </Nav>

        <div style={{ position: 'relative', width: '358px', height: '28px' }}>
          <Stepper canNavigateForward={true} url={'/'} id={1} left={0} />
          <Stepper canNavigateForward={true} url={'/Second'} id={2} left={110} />
          <Stepper canNavigateForward={true} url={'/third-stage'} id={3} left={220} />
          <Stepper canNavigateForward={isAddressSelected} url={'/fourth-stage'} id={4} left={328} />
          <Image alt={''} src={'/images/FourthStage.svg'} width={358} height={28} />
        </div>

        <Container>
          <Text size={20} isRussoOne> {address || 'не указан'} </Text>
          <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
            <Text size={20}> {persons || 'не указан'} гостя </Text>
            <img src="/images/point.svg" alt="" />
            <Text size={20}> {date || 'не указан'} </Text>
            <img src="/images/point.svg" alt="" />
            <Text size={20}> {time || 'не указан'} </Text>
          </div>
          <Text size={20}> {zone || 'не указн'} {hookah ? '+ Кальян' : 'не указан'} </Text>
        </Container>

        <form onSubmit={handleSubmit(saveNameToLocalStorage)}>
          <div>
            <Text size={16}>
              Ваше ФИО
            </Text>
            <Input placeholder={'Фамилия Имя'}
                   value={nameValue}
                   type={'text'}
                   isNotValid={errors.nameValue}
                   isNameInput
                   {...register('nameValue', {
                     required: 'Это обязательное поле', onChange: (e) => setNameValue(e.target.value),
                   })}
            />
            {errors.nameValue && <ErrorText>{errors.nameValue.message}</ErrorText>}
          </div>
          <div>
            <Text size={16}>
              Контактный телефон
            </Text>
            <Input
              placeholder={'+7'}
              value={phoneValue}
              isNotValid={errors.phoneValue}
              type={'tel'}
              onFocus={handleFocus}
              isPhoneInput
              {...register('phoneValue', {
                required: 'Это обязательное поле',
                onBlur: () => setIsFocused(true),
                onChange: (e) => {
                  let inputValue = e.target.value.replace(/\D/g, '');

                  if (inputValue.startsWith('8')) {
                    inputValue = '7' + inputValue.slice(1);
                  }
                  if (!inputValue.startsWith('7')) {
                    inputValue = '7' + inputValue;
                  }

                  const part1 = inputValue.slice(1, 4);
                  const part2 = inputValue.slice(4, 7);
                  const part3 = inputValue.slice(7, 9);
                  const part4 = inputValue.slice(9, 11);

                  let formattedValue = `+7`;

                  if (part1) formattedValue += `-(${part1}`;
                  if (part1 && inputValue.length >= 4) formattedValue += `)`;
                  if (part2) formattedValue += `-${part2}`;
                  if (part3) formattedValue += `-${part3}`;
                  if (part4) formattedValue += `-${part4}`;

                  setPhoneValue(formattedValue);
                },
              })}
            />
            {errors.phoneValue && <ErrorText>{errors.phoneValue.message}</ErrorText>}
          </div>
          <div>
            <Text size={16}>
              Комментарий
            </Text>
            <Input placeholder={'Текст комментария'}
                   value={comment}
                   type={'text'}
                   onChange={(e) => setComment(e.target.value)}
                   isCommentInput />
          </div>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <div style={{ display: 'flex', gap: '8px', alignItems: 'start' }}>
              <CheckboxContainer>
                <HiddenCheckbox checked={isChecked}
                                {...register('checkBox', {
                                  required: 'Это обязательное поле',
                                  onChange: () => toggleCheckbox(),
                                })}
                />
                <CustomCheckbox isNotValid={errors.checkBox} checked={isChecked} />
              </CheckboxContainer>

              <Text onClick={() => router.push('/personal-data')} width={'330'} size={16}>
                Даю подтверждение на <CustomText color> обработку персональных данных.</CustomText>
              </Text>
            </div>
            <div style={{ paddingLeft: '25px' }}>
              {errors.checkBox && <ErrorText>{errors.checkBox.message}</ErrorText>}
            </div>

          </div>
          <Button isLoading={isLoading} type="submit" disabled={isLoading}>
            {isLoading ?
              <Loading>
                <Image src="/images/Vector-loading.svg"
                       alt="Загрузка..."
                       width={24}
                       height={24} />
              </Loading>
              :
              'Подтвердить бронь'
            }
          </Button>
        </form>

        <BackGround height={289} width={176} bottom={47} left={197} src={'/images/smoke-1.png'} />
        <BackGround bottom={231} left={0} src={'/images/controller.png'} />
      </Root>
    </>
  );
};
export default Index;
