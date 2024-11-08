import styled, { css } from 'styled-components';

export const Root = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  //padding: 0 16px;
  flex-direction: column;
  //justify-content: space-between;
  align-items: start;
  gap: 24px;
  //border: blue solid 1px;
  overflow: hidden;
`;

export const Form = styled.form`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: start;
  gap: 24px;

  input[type='date']::-webkit-calendar-picker-indicator {
    background-image: url('/images/icon-calendar.svg');
    background-size: 24px;
    background-position: 5px;
    margin: 0 15px 0 20px;
    padding: 0 10px 1px 10px;
    background-repeat: no-repeat;
    cursor: pointer;
  }

  span {
    color: #fff;
    font-family: 'Russo One', sans-serif;
    font-size: 32px;
    font-style: normal;
    font-weight: 400;
    line-height: 110%;
  }

  //input[type="date"]#date-time-edit {
  //  text-transform: uppercase;
  //}

  .container {
    display: flex;
    align-items: center;
    gap: 8px;
  }
`;

export const Text = styled.p`
  color: ${({ isGrey }) =>
          isGrey ? 'rgba(255, 255, 255, 0.50)' : '#FFF'};
  font-family: ${({ isRussoOne }) =>
          isRussoOne ? 'Russo One' : 'IBM Plex Sans'},
  sans-serif;
  font-size: ${({ size }) => size || 24}px !important;
  font-weight: 400;
  line-height: 110%;
  text-align: left;
`;

export const Button = styled.button`
  display: flex;
  width: 358px;
  padding: 16px;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 4px;
  //position: fixed;
  //bottom: 16px;
  //left: 16px;

  margin: 0 auto;

  border-radius: 16px;
  background: #c0ff3b;

  color: #000;
  font-family: 'IBM Plex Sans', sans-serif;
  font-size: 20px;
  font-style: normal;
  font-weight: 500;
  line-height: 110%;
`;

export const Container = styled.div`
  display: flex;
  overflow: hidden;
  cursor: pointer;
  padding: 16px;
  flex-direction: column;
  align-items: flex-start;
  gap: 16px;
  width: 358px;

  border-radius: 12px;
  border: 1px solid white;
  background: rgba(255, 255, 255, 0.05);

  ${({ isActive }) =>
  isActive &&
  css`
      border: 1px solid #a54bff;
      backdrop-filter: blur(7px);
    `}
`;

export const SwiperContainer = styled.div`
  position: relative;
  width: 326px;
  display: flex;
  flex-direction: row;
  align-items: center;

  img {
    object-fit: cover;
  }

  .swiper-wrapper {
    display: flex;
    flex-direction: row;
    //overflow: hidden;
    max-width: 326px;
  }
`;

export const Prev = styled.button`
  position: absolute;
  height: 150px;
  top: 27px;
  background-color: transparent;
  left: 18px;
  background-image: url('/images/icon-chevron-left.svg');
  background-repeat: no-repeat;
  background-position: center;
  width: 64px;
  align-self: center;
  z-index: 111;
`;

export const Next = styled.button`
  display: block;
  background-color: transparent;
  background-image: url('/images/icon-chevron-right.svg');
  background-repeat: no-repeat;
  position: absolute;
  background-position: center;
  width: 64px;
  height: 150px;
  top: 27px;
  right: 18px;
  z-index: 111;
`;
