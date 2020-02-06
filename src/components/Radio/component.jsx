import React from 'react'
import { bool, string, number } from 'prop-types'
import styled from 'styled-components'
import { UNIT_LG, SELECTIVE_YELLOW } from '../../styles'

const SIZE = 24
const BG = '#636363'
export const RADIO_STYLED_CLASSNAME = 'radio-styled'

export const Wrap = styled.div`
  display: flex;
  align-items: center;
  margin-right: ${UNIT_LG};
`

export const RadioWrap = styled.div`
  position: relative;
  width: ${SIZE}px;
  height: ${SIZE}px;

  ${props => !props.isDisabled && `
    .sdsds:hover & {
      .${RADIO_STYLED_CLASSNAME} {
        border-color: ${props.accentColor};

        &::before {
          visibility: visible;
          background-color: ${props.accentColor};
        }
      }
    }
  `}
`

export const RadioField = styled.input`
  display: none;

  &:checked ~ {
    .${RADIO_STYLED_CLASSNAME} {
      border-color: ${props => props.accentColor};

      &::before {
        visibility: visible;
        width: ${SIZE / 2}px;
        height: ${SIZE / 2}px;
        background-color: ${props => props.accentColor};
      }
    }
  }
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
  border: 2px solid ${BG};
  width: 100%;
  height: 100%;
  border-radius: 50%;

  &::before {
    content: '';
    position: absolute;
    visibility: hidden;
    height: ${SIZE / 4}px;
    width: ${SIZE / 4}px;
    border-radius: 50%;
    background-color: ${BG};
    transition: width 0.1s ease-out, height 0.1s ease-out, background-color 0.1s ease-out;
    pointer-events: none;
  }
`

class Radio extends React.PureComponent {
  render() {
    const {
      isQuizComplete,
      isDisabled,
      checked,
      accentColor,
      id,
      name,
      className,
    } = this.props
    const accentColorConditional = isQuizComplete ? accentColor : SELECTIVE_YELLOW

    return (
      <Wrap className={className}>
        <RadioWrap accentColor={accentColorConditional} isDisabled={isDisabled}>
          <RadioField accentColor={accentColorConditional} checked={checked} type="radio" id={id} name={name} readOnly />
          <RadioLabel htmlFor={id} />
          <RadioStyled className={RADIO_STYLED_CLASSNAME} />
        </RadioWrap>
      </Wrap>
    )
  }
}

Radio.propTypes = {
  isQuizComplete: bool.isRequired,
  isDisabled: bool,
  checked: bool,
  accentColor: string.isRequired,
  id: number.isRequired,
  name: number,
  className: string,
}

Radio.defaultProps = {
  isDisabled: false,
  checked: undefined,
  name: undefined,
  className: '',
}

export default Radio
