import React from 'react'
import { bool, string, func } from 'prop-types'
import styled from 'styled-components'
import { UNIT_SM, UNIT_LG } from '../../styles'

const SIZE = 24
const BG = '#636363'
export const RADIO_STYLED_CLASSNAME = 'radio-styled'

const COLOR_PRIMARY = '#f0b90b'

export const Wrap = styled.div`
  display: flex;
  align-items: center;
  margin-right: ${UNIT_LG};

  ${props => props.isDisabled && `
    opacity: 0.6;
    pointer-events: none;
  `};
`

export const Label = styled.label`
  margin-right: ${UNIT_SM};
  color: ${props => props.checked ? COLOR_PRIMARY : 'inherit'};
`

export const RadioWrap = styled.div`
  position: relative;
  width: ${SIZE}px;
  height: ${SIZE}px;

  &:hover {
    .${RADIO_STYLED_CLASSNAME} {
      border-color: ${COLOR_PRIMARY};

      &::before {
        visibility: visible;
        background-color: ${COLOR_PRIMARY};
      }
    }
  }
`

export const RadioField = styled.input`
  display: none;

  &:checked ~ {
    .${RADIO_STYLED_CLASSNAME} {
      border-color: ${COLOR_PRIMARY};

      &::before {
        visibility: visible;
        width: ${SIZE / 2}px;
        height: ${SIZE / 2}px;
        background-color: ${COLOR_PRIMARY};
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
      checked,
      className,
      id,
      name,
      onClick,
    } = this.props

    return (
      <Wrap className={className}>
        <RadioWrap>
          <RadioField checked={checked} type="radio" id={id} name={name} onClick={onClick} />
          <RadioLabel htmlFor={id} />
          <RadioStyled className={RADIO_STYLED_CLASSNAME} />
        </RadioWrap>
      </Wrap>
    )
  }
}

Radio.propTypes = {
  checked: bool,
  id: string.isRequired,
  name: string,
  className: string,
  onClick: func.isRequired,
}

Radio.defaultProps = {
  checked: undefined,
  name: undefined,
  className: '',
}

export default Radio
