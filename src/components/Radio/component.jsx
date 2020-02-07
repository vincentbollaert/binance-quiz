import React from 'react'
import { bool, string, number } from 'prop-types'
import styled from 'styled-components'
import { UNIT_LG, SELECTIVE_YELLOW, TRANSITION, GRANITE_GRAY } from '../../styles'
import { CN_ANSWER } from '../../pages/Home/shared'

export const STYLE_RADIO_SIZE_PX = 24
export const CN_RADIO = 'radio'

export const Wrap = styled.div`
  display: flex;
  align-items: center;
  margin-right: ${UNIT_LG};
`

export const RadioWrap = styled.div`
  position: relative;
  width: ${STYLE_RADIO_SIZE_PX}px;
  height: ${STYLE_RADIO_SIZE_PX}px;

  ${props => !props.isDisabled && `
    .${CN_ANSWER}:hover & {
      .${CN_RADIO} {
        border-color: ${props.accentColor};

        &::before {
          visibility: visible;
          background-color: ${props.accentColor};
        };
      };
    };
  `};
`

export const RadioField = styled.input`
  display: none;

  &:checked ~ {
    .${CN_RADIO} {
      border-color: ${props => props.accentColor};

      &::before {
        visibility: visible;
        width: ${STYLE_RADIO_SIZE_PX / 2}px;
        height: ${STYLE_RADIO_SIZE_PX / 2}px;
        background-color: ${props => props.accentColor};
      };
    };
  };
`

export const RadioLabel = styled.label`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
`

export const RadioStyled = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  border: 2px solid ${GRANITE_GRAY};
  width: 100%;
  height: 100%;
  border-radius: 50%;

  &::before {
    content: '';
    position: absolute;
    visibility: hidden;
    height: ${STYLE_RADIO_SIZE_PX / 4}px;
    width: ${STYLE_RADIO_SIZE_PX / 4}px;
    border-radius: 50%;
    background-color: ${GRANITE_GRAY};
    transition: width ${TRANSITION}, height ${TRANSITION}, background-color ${TRANSITION};
    pointer-events: none;
  }
`

const Radio = ({ isQuizComplete, isDisabled, checked, accentColor, id, className }) => {
  const accentColorConditional = isQuizComplete ? accentColor : SELECTIVE_YELLOW

  return (
    <Wrap className={className}>
      <RadioWrap accentColor={accentColorConditional} isDisabled={isDisabled}>
        <RadioField accentColor={accentColorConditional} checked={checked} type="radio" id={id} name={id} readOnly />
        <RadioLabel htmlFor={id} />
        <RadioStyled className={CN_RADIO} />
      </RadioWrap>
    </Wrap>
  )
}

Radio.propTypes = {
  isQuizComplete: bool.isRequired,
  isDisabled: bool,
  checked: bool,
  accentColor: string.isRequired,
  id: number.isRequired,
  className: string,
}

Radio.defaultProps = {
  isDisabled: false,
  checked: undefined,
  className: '',
}

export default Radio
