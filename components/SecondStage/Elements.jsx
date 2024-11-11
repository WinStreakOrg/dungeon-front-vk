import styled, { css } from 'styled-components';

const dateInput = css`
  padding: 16px;
  position: relative;
  height: 54px;
  text-align: start;
  width: 358px;

  border-radius: 12px;
  border: 1px solid #fff;
  background: rgba(255, 255, 255, 0.05);
  //backdrop-filter: blur(7px);
  //-webkit-backdrop-filter: blur(7px); /* Safari */
  z-index: 2;
  cursor: pointer;
  color: #fff;
  font-family: 'IBM Plex Sans', sans-serif;
  font-size: 20px;
  font-style: normal;
  font-weight: 400;
  line-height: 110%;

  &::placeholder {
    color: rgba(255, 255, 255, 0.5);
    font-size: 20px;
    font-style: normal;
    font-weight: 400;
    line-height: 110%;
  }

  &::-webkit-calendar-picker-indicator {
    display: block;
    background-image: url('/images/icon-calendar.svg');
    background-size: 16px;
    background-repeat: no-repeat;
    cursor: pointer;
  }

  //@media screen and (max-width: 382px) {
  //  
  //}
  //@media screen and (min-width: 382px) {
  //  &::-webkit-calendar-picker-indicator {
  //    display: none;
  //  }
  //}
`;

const timeInput = css`
  display: flex;
  width: 90px;
  padding: 12px 16px;
  justify-content: center;
  align-items: center;
  gap: 10px;

  background-image: url('/images/arrow-bottom.svg');
  //background-size: 5px 9px;
  background-repeat: no-repeat;
  background-position-x: 64px;
  background-position-y: center;

  background-color: rgba(255, 255, 255, 0.05);
  border-radius: 12px;
  border: 1px solid #fff;
  backdrop-filter: blur(7px);
  -webkit-backdrop-filter: blur(7px); /* Safari */

  color: #fff;
  font-family: 'Russo One', sans-serif !important;
  font-size: 32px;
  font-style: normal;
  font-weight: 400;
  line-height: 110%;
`;

const personInput = css`
  display: flex;
  padding: 12px 0;
  justify-content: center;
  align-items: center;
  gap: 16px;
  width: 258px;

  border-radius: 12px;
  border: 1px solid #fff;
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(7px);
  -webkit-backdrop-filter: blur(7px); /* Safari */

  text-align: center;

  color: #fff;
  font-family: 'Russo One', sans-serif;
  font-size: 32px;
  font-style: normal;
  font-weight: 400;
  line-height: 110%;
`;

const personButton = css`
  display: flex;
  width: 59px;
  height: 59px;
  justify-content: center;
  align-items: center;
  border-radius: 12px;
  background: #c0ff3b;
  backdrop-filter: blur(7px);
`;

const submitButton = css`
  display: flex;
  width: 358px;
  padding: 16px;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 4px;
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

export const Root = styled.div`
  //width: 100%;
  margin: 0 auto;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: start;
  gap: 24px;
  overflow: hidden;
`;

export const IconCalendar = styled.img`
  //display: none;
  @media screen and (max-width: 382px) {
    position: absolute;
    display: block;
    top: 14px;
    right: 31px;
    //background: red;
    cursor: pointer;
    appearance: none;
    z-index: -1;
  }

  @media screen and (min-width: 600px) {
    position: absolute;
    display: block;
    top: 14px;
    right: 31px;
    width: 26px;
    height: 25px;
    cursor: pointer;
    appearance: none;
    z-index: 1;
  }
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
  color: #fff;
  font-family: 'IBM Plex Sans', sans-serif;
  font-size: ${({ size }) => size || 24}px !important;
  font-weight: 400;
  line-height: 110%;
  text-align: left;
  text-transform: ${({ isUppercase }) =>
          isUppercase ? 'uppercase' : 'unset'};
`;

export const Input = styled.input`
  ${({ isDateInput }) => isDateInput && dateInput}
  ${({ isTimeInput }) => isTimeInput && timeInput}
  ${({ isPersonInput }) => isPersonInput && personInput}
`;

export const Button = styled.button`
  ${({ isButtonPerson }) => isButtonPerson && personButton}
  ${({ isButtonSubmit }) => isButtonSubmit && submitButton}
`;

export const ColumnHourWrapper = styled.div`
  padding: 5px 3px;
  width: 90px;
  background-color: #1a1a1a;
  height: 200px;
  z-index: 132;
  position: absolute;
  top: 70px;
  left: 0;
  border-radius: 10px;
  display: none;

  ${({ isOpen }) =>
          isOpen &&
          css`
            display: block !important;
          `}
`;
export const ColumnHour = styled.div`
  overflow-y: scroll;
  background-color: #1a1a1a;
  padding: 12px 24px 12px 16px;
  height: 195px;
  border-radius: 10px;

  &::-webkit-scrollbar {
    width: 5px; /* ширина скроллбара */
    background-color: #222222; /* цвет фона за скроллбаром */
    border-radius: 10px;
  }

  &::-webkit-scrollbar-track {
    background: transparent;
  }

  &::-webkit-scrollbar-thumb {
    background-color: #9b51e0 !important;
    border-radius: 10px;
    height: 10px;
  }
`;

export const ColumnMinutesWrapper = styled.div`
  display: none;
  padding: 5px 3px;
  width: 90px;
  background-color: #1a1a1a;
  height: 200px;
  z-index: 132;
  position: absolute;
  top: 70px;
  //right: 161px;
  border-radius: 10px;

  ${({ isOpen }) =>
          isOpen &&
          css`
            display: block !important;
          `}
`;

export const ColumnMinutes = styled.div`
  width: 82px;
  height: 195px;
  overflow-y: scroll;
  background-color: #1a1a1a;
  border-radius: 10px;
  padding: 12px 24px 12px 16px;

  &::-webkit-scrollbar {
    width: 5px;
    background-color: #222222;
    border-radius: 10px;
  }

  &::-webkit-scrollbar-track {
    background: transparent;
  }

  &::-webkit-scrollbar-thumb {
    background-color: #9b51e0 !important;
    border-radius: 10px;
    height: 10px;
  }
`;

export const TimeItem = styled.div`
  color: #fff;
  font-family: 'Russo One', sans-serif;
  font-size: 32px;
  font-style: normal;
  font-weight: 400;
  line-height: 110%;
`;

export const CheckBox = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;

  @media screen and (max-width: 500px) {
    flex-direction: row-reverse;
  }

  .inputTheme[type='checkbox'] {
    height: 0;
    width: 0;
    visibility: hidden;
    margin: 0;
  }

  .inputTheme:checked + .labelTheme {
    background: #c0ff3b;
  }

  .inputTheme:checked + .labelTheme:after {
    left: calc(100% - 15px);
    transform: translateX(-60%);
  }

  .labelTheme {
    cursor: pointer;
    text-indent: -9999px;
    width: 66px;
    height: 33px;
    //background: white;
    border: grey solid 1px;
    display: block;
    border-radius: 100px;
    position: relative;
  }

  .labelTheme:after {
    content: '';
    position: absolute;
    top: 2px;
    left: 3px;
    width: 27px;
    background: gray;
    height: 27px;
    border-radius: 90px;
    transition: 0.3s;
  }

  .labelTheme:active:after {
    width: 30px;
  }
`;
