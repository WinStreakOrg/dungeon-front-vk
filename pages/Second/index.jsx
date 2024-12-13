import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import CustomText from '../../components/ui/CustomText';
import {
  Button,
  CheckBox,
  ColumnHour,
  ColumnHourWrapper,
  ColumnMinutes,
  ColumnMinutesWrapper,
  Form,
  IconCalendar,
  Input,
  Root,
  Text,
  TimeItem,
} from '../../components/SecondStage/Elements';
import { itemsHours, itemsMinutes } from '../../components/SecondStage/content';
import { useRouter } from 'next/router';
import { BackGround } from '../../components/ui/BackGround';
import Stepper from '../../components/ui/Stepper';
import Head from 'next/head';
import { ErrorText } from '../../components/ui/ErrorText';

const Index = () => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isValid },
    setError,
    clearErrors,
    trigger,
    // resetField,
  } = useForm({
    mode: 'onSubmit',
  });

  const [selectedHourMenu, setSelectedHourMenu] = useState(false);
  const [selectedMinuteMenu, setSelectedMinuteMenu] = useState(false);

  const [selectedHour, setSelectedHour] = useState(null);
  const [selectedMinute, setSelectedMinute] = useState(null);

  const [personsValue, setPersonsValue] = useState(0);

  const [date, setDate] = useState('');

  const [isChecked, setIsChecked] = useState(false);
  const [isAddressSelected, setIsAddressSelected] = useState(false);


  const [filteredHours, setFilteredHours] = useState(itemsHours);
  const [filteredMinutes, setFilteredMinutes] = useState(itemsMinutes);


  useEffect(() => {
    const today = new Date().toISOString().split('T')[0];
    setDate(today);
    setValue('dateValue', today);
  }, [setValue]);
  const router = useRouter();

  useEffect(() => {
    const now = new Date();
    const currentHour = now.getHours();
    const currentMinute = now.getMinutes();

    const selectedDate = new Date(date);
    selectedDate.setHours(0, 0, 0, 0);

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const daysDifference = (selectedDate - today) / (1000 * 3600 * 24);

    let filteredHours = [];
    let filteredMinutes = [];

    if (daysDifference > 0) {
      filteredHours = itemsHours;
      filteredMinutes = itemsMinutes;
    } else {
      filteredHours = itemsHours.filter((hour) => parseInt(hour, 10) >= currentHour);

      filteredMinutes = itemsMinutes.filter((minute) => {
        return parseInt(minute, 10) >= currentMinute;
      });
    }

    setFilteredHours(filteredHours);
    setFilteredMinutes(filteredMinutes);

    if (filteredHours.length > 0 && !filteredHours.includes(selectedHour)) {
      setSelectedHour(filteredHours[0]);
      setValue('hourValue', filteredHours[0]);
    }

    if (filteredMinutes.length > 0 && !filteredMinutes.includes(selectedMinute)) {
      setSelectedMinute(filteredMinutes[0]);
      setValue('minuteValue', filteredMinutes[0]);
    }
  }, [date, setValue, selectedHour, selectedMinute]);


  const handlePlus = () => {
    setPersonsValue((prev) => {
      const newValue = prev + 1;
      setValue('personsValue', newValue);
      return newValue;
    });
  };

  const handleMinus = () => {
    setPersonsValue((prev) => {
      const newValue = prev > 0 ? prev - 1 : 0;
      setValue('personsValue', newValue);
      return newValue;
    });
  };


  useEffect(() => {
    const now = new Date();
    // console.log(now);
    const currentHour = now.getHours();
    const currentMinute = now.getMinutes();

    const updatedHours = itemsHours.filter((hour) => {
      const hourNumber = parseInt(hour, 10);
      return (hourNumber >= currentHour || hourNumber < 5) && hourNumber !== 24;
    });
    setFilteredHours(updatedHours);

    const updatedMinutes = selectedHour === currentHour.toString()
      ? itemsMinutes.filter((minute) => parseInt(minute, 10) >= currentMinute)
      : itemsMinutes;

    setFilteredMinutes(updatedMinutes);
  }, [selectedHour]);


  useEffect(() => {
    if (isValid) setIsAddressSelected(true);
  }, [isValid]);

  const handleHourChange = (hour) => {
    setSelectedHour(hour);

    const hourNumber = parseInt(hour, 10);

    if (hourNumber >= 0 && hourNumber < 5) {
      const newDate = new Date(date || new Date());
      newDate.setDate(newDate.getDate() + 1);
      setDate(newDate.toISOString().split('T')[0]);
    }

    // trigger('hourValue');

  };
  //
  const handleTimeChange = (hour, minute) => {
    const selectedHourInt = parseInt(hour, 10);
    const selectedMinuteInt = parseInt(minute, 10);

    let currentDate = new Date(date);

    if (selectedHourInt >= 0 && selectedHourInt < 6) {
      const today = new Date();
      const isAlreadyNextDay = currentDate.getDate() > today.getDate();

      if (!isAlreadyNextDay) {
        currentDate.setDate(currentDate.getDate() + 1);
      }
    }


    const newDate = currentDate.toISOString().split('T')[0];

    setDate(newDate);
    setValue('dateValue', newDate);

    setSelectedHour(hour);
    setSelectedMinute(minute);
  };


  const handleMinuteChange = (e) => {
    setSelectedMinute(e.target.value);
    trigger('minuteValue');
  };

  const today = new Date().toISOString().split('T')[0];

  const validateDate = (selectedDate) => {
    if (!selectedDate) {
      setError('dateValue', {
        type: 'required',
        message: 'Это обязательное поле',
      });
      return false;
    }
    if (selectedDate < today) {
      setError('dateValue', {
        type: 'validate',
        message: 'Нельзя забронировать на прошедшую дату. Выберите актуальную дату',
      });
      return false;
    }
    clearErrors('dateValue');
    return true;
  };

  const dataSubmit = async (data) => {
    const isFormValid = await trigger();
    if (!isFormValid) {
      return;
    }

    if (!data.personsValue || data.personsValue === '0') {
      setError('personsValue', {
        type: 'manual',
        message: 'Введите кол-во персон',
      });
      return;
    }

    const [year, month, day] = date.split('-');
    const reversedDate = `${day}-${month}-${year}`;
    const time = selectedHour && selectedMinute ? selectedHour + ':' + selectedMinute : '00:00';
    if (time && personsValue && reversedDate) {

      localStorage.setItem('time', time);
      localStorage.setItem('persons', personsValue);
      localStorage.setItem('date', reversedDate);
      if (isChecked) {
        localStorage.setItem('hookah', 'буду');
      } else {
        localStorage.setItem('hookah', 'не буду');
      }
      router.push('/third-stage');
    }
  };


  return (
    <>
      <Head>
        <title>Second-step</title>
      </Head>
      <Root>
        <Form onSubmit={handleSubmit(dataSubmit)}>
          <div className={'container'} onClick={() => router.push('/')}>
            <img src="/images/arrow-back.svg" alt="" />
            <Text>Выберите дату и время </Text>
          </div>
          <div style={{ position: 'relative', width: '358px', height: '28px' }}>
            <Stepper canNavigateForward={true} url={'/'} id={1} left={0} />
            <Stepper
              canNavigateForward={isAddressSelected}
              url={'/Second'}
              id={2}
              left={110}
            />
            <Stepper
              canNavigateForward={isAddressSelected}
              url={'/third-stage'}
              id={3}
              left={220}
            />
            <Stepper
              canNavigateForward={isAddressSelected}
              url={'/fourth-stage'}
              id={4}
              left={328}
            />
            <img width={'100%'} alt={''} src={'/images/secondStage.svg'} />
          </div>
          <div
            style={{
              position: 'relative',
              display: 'flex',
              width: '100%',
              flexDirection: 'column',
              gap: '8px',
            }}>
            <Text size={16}>Выберите дату</Text>
            <div style={{ width: '100%' }}>
              <div style={{ position: 'relative', width: 'fit-content' }}>
                <Input
                  isDateInput
                  type="date"
                  min={today}
                  isNotValid={errors?.dateValue}
                  value={date || ''}
                  {...register('dateValue', {
                    required: 'Это обязательное поле',
                  })}
                  onChange={(e) => {
                    const selectedDate = e.target.value;
                    setDate(selectedDate);
                    validateDate(selectedDate);
                  }}
                />
                <IconCalendar src="/images/icon-calendar.svg" alt="" />
              </div>
              {errors?.dateValue && (
                <ErrorText>{errors.dateValue.message}</ErrorText>
              )}
            </div>
          </div>
          <div
            style={{
              display: 'flex',
              width: '100%',
              flexDirection: 'column',
              gap: '8px',
            }}>
            <Text size={16}>Выберите время</Text>
            <div style={{
              display: 'flex',
              position: 'relative',
              alignItems: 'center',
              gap: '10px',
            }}>
              <div>
                <Input
                  onClick={() => {
                    setSelectedHourMenu(!selectedHourMenu);
                    setSelectedMinuteMenu(false);
                  }}
                  isTimeInput
                  isNotValid={errors.hourValue}
                  readOnly
                  type="text"
                  value={selectedHour}
                  onChange={handleHourChange}
                  pattern="\d{1,2}"
                  maxLength={2}
                  {...register('hourValue', {
                    required: 'Это обязательное поле',
                  })}
                />
                {selectedHourMenu && (
                  <ColumnHourWrapper isOpen={selectedHourMenu}>
                    <ColumnHour>
                      {filteredHours.map((hour, index) => (
                        <TimeItem
                          key={index}
                          onClick={() => {
                            handleTimeChange(hour, selectedMinute);
                            setSelectedHourMenu(false);
                          }}
                          style={{
                            color:
                              selectedHour === hour ? '#9b51e0' : '#ffffff',
                          }}
                        >
                          {hour}
                        </TimeItem>
                      ))}
                    </ColumnHour>
                  </ColumnHourWrapper>
                )}
              </div>
              <span className={'span'}>:</span>
              <div style={{ position: 'relative' }}>
                <Input
                  onClick={() => {
                    setSelectedMinuteMenu(!selectedMinuteMenu);
                    setSelectedHourMenu(false);
                  }}
                  isTimeInput
                  readOnly
                  type="text"
                  value={selectedMinute}
                  isNotValid={errors.minuteValue}
                  pattern="\d{1,2}"
                  maxLength={2}
                  onChange={handleMinuteChange}
                  {...register('minuteValue', {
                    required: 'Это обязательное поле',
                  })}
                />
                {selectedMinuteMenu && (
                  <ColumnMinutesWrapper isOpen={selectedMinuteMenu}>
                    <ColumnMinutes>
                      {filteredMinutes.map((minute) => (
                        <TimeItem
                          key={minute}
                          onClick={() => {
                            handleTimeChange(selectedHour, minute);
                            setSelectedMinuteMenu(false);
                          }}
                          style={{
                            color:
                              selectedMinute === minute ? '#9b51e0' : '#ffffff',
                          }}
                        >
                          {minute}
                        </TimeItem>
                      ))}
                    </ColumnMinutes>
                  </ColumnMinutesWrapper>
                )}
              </div>
            </div>
            {errors?.hourValue ? (
              // ||
              // errors?.minuteValue
              <ErrorText>Это обязательное поле</ErrorText>
            ) : (
              ''
            )}
          </div>
          <div
            style={{
              display: 'flex',
              width: '100%',
              flexDirection: 'column',
              gap: '8px',
            }}
          >
            <Text size={16}>Количество персон</Text>

            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '7px',
                maxWidth: '390px',
              }}
            >
              <Button
                isButtonPerson
                type={'button'}
                onClick={() => handleMinus()}
              >
                <img alt={''} src={'/images/icon-minus.svg'} />
              </Button>
              <Input
                maxLength={2}
                value={personsValue}
                isPersonInput
                readOnly
                type={'number'}
                isNotValid={errors?.personsValue}
                {...register('personsValue', {
                  required: 'Это обязательное поле',
                })}
              />
              <Button
                isButtonPerson
                type={'button'}
                onClick={() => handlePlus()}
              >
                <img alt={''} src={'/images/icon-plus.svg'} />
              </Button>
            </div>
            {errors?.personsValue && (
              <ErrorText>{errors.personsValue.message}</ErrorText>
            )}
            {/*{personsValue === 0 && <ErrorText>Это обязательное поле</ErrorText>}*/}
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Text isUppercase size={16}>
              <CustomText isValid={isChecked}>Буду кальян</CustomText>
            </Text>
            <CheckBox>
              <input
                className="inputTheme"
                type="checkbox"
                checked={isChecked}
                onChange={(event) => setIsChecked(event.target.checked)}
                id="themeSwitchButton"
              />
              <label className={'labelTheme'} htmlFor="themeSwitchButton" />
            </CheckBox>
          </div>

          <Button type={'submit'} isButtonSubmit>
            Продолжить
          </Button>
        </Form>
        <BackGround
          height={289}
          width={176}
          bottom={-1}
          left={197}
          src={'/images/smoke-1.png'}
        />
        <BackGround bottom={111} left={0} src={'/images/controller.png'} />
      </Root>
    </>
  );
};
export default Index;
