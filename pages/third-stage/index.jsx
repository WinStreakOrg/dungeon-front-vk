import React, { useEffect, useState } from 'react';
import {
  Container,
  Form,
  Next,
  Prev,
  Root,
  SwiperContainer,
  Text,
} from '../../components/ThirdStage/Elements';
import { Swiper, SwiperSlide } from 'swiper/react';
import {
  moscow,
  polevaya,
  revolutionary,
} from '../../components/ThirdStage/content';
import { A11y, Navigation } from 'swiper/modules';
import { useRouter } from 'next/router';
import Stepper from '../../components/ui/Stepper';
import Head from 'next/head';

const Index = () => {
  const [softZone, setSoftZone] = useState(false);
  const [vipZone, setVipZone] = useState(false);
  const router = useRouter();
  const [address, setAddress] = useState('');

  const handleSaveZone = (zone) => {
    if (zone) {
      localStorage.setItem('zone', zone);
      router.push('/fourth-stage');
    }
  };

  useEffect(() => {
    const address = localStorage.getItem('address');
    setAddress(address);
  }, []);

  return (
    <>
      <Head>
        <title>third-step</title>
      </Head>
      <Root>
        <Form>
          <div
            className={'container'}
            onClick={() => router.push('/Second')}
          >
            <img src="/images/arrow-back.svg" alt="" />
            <Text>Выберите зону отдыха</Text>
          </div>

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
              src={'/images/third-stage.svg'}
            />
          </div>

          <div
            style={{
              width: '100%',
              display: 'flex',
              gap: '16px',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            {address === 'ул. Полевая, 72' && (
              <>
                <Container
                  isActive={softZone}
                  onClick={() => {
                    setSoftZone(true);
                    setVipZone(false);
                    handleSaveZone('Мягкая зона');
                  }}
                >
                  <SwiperContainer>
                    <Swiper
                      modules={[Navigation, A11y]}
                      spaceBetween={32}
                      centeredSlides={true}
                      navigation={{
                        nextEl: '.swiper-button-next',
                        prevEl: '.swiper-button-prev',
                      }}
                      height={200}
                      slidesPerView={1}
                      allowTouchMove={false}
                      mousewheel={{
                        enabled: false,
                      }}
                    >
                      {polevaya.soft.map((image) => {
                        return (
                          <SwiperSlide
                            style={{
                              maxWidth: '326px',
                            }}
                            key={image}
                          >
                            <img
                              alt=""
                              height={200}
                              width={326}
                              src={image}
                            />
                          </SwiperSlide>
                        );
                      })}
                      <Prev
                        className="swiper-button-prev"
                        onClick={(event) => event.stopPropagation()}
                      ></Prev>

                      <Next
                        className="swiper-button-next"
                        onClick={(event) => event.stopPropagation()}
                      ></Next>
                    </Swiper>
                  </SwiperContainer>
                  <div
                    style={{
                      width: '100%',
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                    }}
                  >
                    <Text size={20} isRussoOne>
                      {' '}
                      МЯГКАЯ ЗОНА{' '}
                    </Text>
                  </div>
                  <Text isGrey size={16}>
                    PlayStation 5 Телевизор 55
                  </Text>
                </Container>
              </>
            )}

            {address === 'Московское шоссе, 43' && (
              <>
                <Container
                  isActive={softZone}
                  onClick={() => {
                    setSoftZone(true);
                    setVipZone(false);
                    handleSaveZone('Мягкая зона');
                  }}
                >
                  <SwiperContainer>
                    <Swiper
                      modules={[Navigation, A11y]}
                      spaceBetween={32}
                      centeredSlides={true}
                      navigation={{
                        nextEl: '.swiper-button-next',
                        prevEl: '.swiper-button-prev',
                      }}
                      height={200}
                      slidesPerView={1}
                      allowTouchMove={false}
                      mousewheel={{
                        enabled: false,
                      }}
                    >
                      {moscow.soft.map((image) => {
                        return (
                          <SwiperSlide
                            style={{
                              maxWidth: '326px',
                            }}
                            key={image}
                          >
                            <img
                              alt=""
                              height={200}
                              width={326}
                              src={image}
                            />
                          </SwiperSlide>
                        );
                      })}
                      <Prev
                        className="swiper-button-prev"
                        onClick={(event) => event.stopPropagation()}
                      ></Prev>

                      <Next
                        className="swiper-button-next"
                        onClick={(event) => event.stopPropagation()}
                      ></Next>
                    </Swiper>
                  </SwiperContainer>

                  <div
                    style={{
                      width: '100%',
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                    }}
                  >
                    <Text size={20} isRussoOne>
                      {' '}
                      МЯГКАЯ ЗОНА{' '}
                    </Text>
                  </div>
                  <Text isGrey size={16}>
                    PlayStation 5 Телевизор 55
                  </Text>
                </Container>

                <Container
                  isActive={vipZone}
                  onClick={() => {
                    setVipZone(true);
                    setSoftZone(false);
                    handleSaveZone('VIP-зона');
                  }}
                >
                  <SwiperContainer
                    onClick={(event) => {
                      event.stopPropagation();
                    }}
                  >
                    <Swiper
                      modules={[Navigation, A11y]}
                      spaceBetween={32}
                      centeredSlides={true}
                      navigation={{
                        nextEl: '.swiper-button-next',
                        prevEl: '.swiper-button-prev',
                      }}
                      height={200}
                      slidesPerView={1}
                      allowTouchMove={false}
                      mousewheel={{
                        enabled: false,
                      }}
                    >
                      {moscow.vip.map((image) => {
                        return (
                          <SwiperSlide
                            style={{
                              maxWidth: '326px',
                            }}
                            key={image}
                          >
                            <img
                              alt=""
                              height={200}
                              width={326}
                              src={image}
                            />
                          </SwiperSlide>
                        );
                      })}
                      <Prev
                        className="swiper-button-prev"
                        onClick={(event) => event.stopPropagation()}
                      ></Prev>

                      <Next
                        className="swiper-button-next"
                        onClick={(event) => event.stopPropagation()}
                      ></Next>
                    </Swiper>
                  </SwiperContainer>
                  <div
                    style={{
                      width: '100%',
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                    }}
                  >
                    <Text size={20} isRussoOne>
                      {' '}
                      VIP-зона{' '}
                    </Text>
                  </div>
                  <Text isGrey size={16}>
                    PlayStation 5 Телевизор 65
                  </Text>
                </Container>
              </>
            )}

            {address === 'ул. Революционная, 155' && (
              <>
                <Container
                  isActive={softZone}
                  onClick={() => {
                    setSoftZone(true);
                    setVipZone(false);
                    handleSaveZone('Мягкая зона');
                  }}
                >
                  <SwiperContainer>
                    <Swiper
                      modules={[Navigation, A11y]}
                      spaceBetween={32}
                      centeredSlides={true}
                      height={200}
                      navigation={{
                        nextEl: '.swiper-button-next',
                        prevEl: '.swiper-button-prev',
                      }}
                      slidesPerView={1}
                      allowTouchMove={false}
                      mousewheel={{
                        enabled: false,
                      }}
                    >
                      {revolutionary.soft.map((image) => {
                        return (
                          <SwiperSlide
                            style={{
                              maxWidth: '326px',
                            }}
                            key={image}
                          >
                            <img
                              alt=""
                              height={200}
                              width={326}
                              src={image}
                            />
                          </SwiperSlide>
                        );
                      })}
                      <Prev
                        className="swiper-button-prev"
                        onClick={(event) => event.stopPropagation()}
                      ></Prev>

                      <Next
                        className="swiper-button-next"
                        onClick={(event) => event.stopPropagation()}
                      ></Next>
                    </Swiper>
                  </SwiperContainer>

                  <div
                    style={{
                      width: '100%',
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                    }}
                  >
                    <Text size={20} isRussoOne>
                      {' '}
                      МЯГКАЯ ЗОНА{' '}
                    </Text>
                  </div>
                  <Text isGrey size={16}>
                    PlayStation 5 Телевизор 55
                  </Text>
                </Container>

                <Container
                  isActive={vipZone}
                  onClick={() => {
                    setVipZone(true);
                    setSoftZone(false);
                    handleSaveZone('VIP-зона');
                  }}
                >
                  <SwiperContainer>
                    <Swiper
                      modules={[Navigation, A11y]}
                      spaceBetween={32}
                      centeredSlides={true}
                      navigation={{
                        nextEl: '.swiper-button-next',
                        prevEl: '.swiper-button-prev',
                      }}
                      height={200}
                      slidesPerView={1}
                      allowTouchMove={false}
                      mousewheel={{
                        enabled: false,
                      }}
                    >
                      {revolutionary.vip.map((image) => {
                        return (
                          <SwiperSlide
                            style={{
                              maxWidth: '326px',
                            }}
                            key={image}
                          >
                            <img
                              alt=""
                              height={200}
                              width={326}
                              src={image}
                            />
                          </SwiperSlide>
                        );
                      })}
                      <Prev
                        className="swiper-button-prev"
                        onClick={(event) => event.stopPropagation()}
                      ></Prev>

                      <Next
                        className="swiper-button-next"
                        onClick={(event) => event.stopPropagation()}
                      ></Next>
                    </Swiper>
                  </SwiperContainer>
                  <div
                    style={{
                      width: '100%',
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                    }}
                  >
                    <Text size={20} isRussoOne>
                      {' '}
                      VIP-зона{' '}
                    </Text>
                  </div>
                  <Text isGrey size={16}>
                    PlayStation 5 Проектор
                  </Text>
                </Container>
              </>
            )}
          </div>
        </Form>
      </Root>
    </>
  );
};
export default Index;
