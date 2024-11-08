import styled from 'styled-components';

export const Root = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  //border: blue solid 1px;
  overflow: hidden;
`;

export const Blur = styled.div`
  position: absolute;
  top: -73px;
  left: -65px;
  width: 471px;
  height: 150px;
  border-radius: 471px;
  background: linear-gradient(93deg, #a54bff 27.91%, #4e8aff 96.96%);
  filter: blur(123px);
`;

export const ImageBackground = styled.img.attrs({
  alt: '',
})`
  position: fixed;
  bottom: 0;
  width: 100%;
  height: 341px;
  object-fit: fill;
  margin: 0;
  background: linear-gradient(
    180deg,
    rgba(11, 11, 14, 0.8) 0%,
    rgba(11, 11, 14, 0) 80%
  );
`;
