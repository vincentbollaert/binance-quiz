import React, { useState } from 'react'
import { string, bool, number, oneOfType } from 'prop-types'
import styled from 'styled-components'
import { UNIT_LG, UNIT_MD, MEDIUM_AQUAMARINE, FONT_SIZE_SM } from '../../styles'

const Wrap = styled.div`
  position: absolute;
  right: ${UNIT_LG};
  cursor: pointer;
`
const Label = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid ${MEDIUM_AQUAMARINE};
  width: 24px;
  height: 24px;
  color: ${MEDIUM_AQUAMARINE};
  border-radius: 50%;
  font-size: ${FONT_SIZE_SM};
`
const Tooltip = styled.div`
  visibility: hidden;
  position: absolute;
  right: 100%;
  top: 50%;
  border-right: 2px solid ${MEDIUM_AQUAMARINE};
  margin-right: ${UNIT_MD};
  padding: 1rem ${UNIT_LG};
  line-height: 1.1;
  font-size: ${FONT_SIZE_SM};
  text-transform: uppercase;
  background-color: ${MEDIUM_AQUAMARINE};
  color: rgba(0, 0, 0, 0.6);
  font-weight: bold;
  border-radius: 2px;
  white-space: nowrap;
  transform: translateY(-50%);

  &::before {
    content: "";
    position: absolute;
    top: 50%;
    left: 100%;
    border-style: solid;
    border-width: 6px 0 6px 6px;
    border-color: transparent transparent transparent ${MEDIUM_AQUAMARINE};
    width: 0;
    height: 0;
    transform: translateY(-50%);
  };

  ${props => props.isVisible && `
    visibility: visible;
    margin-right: ${UNIT_LG};
    transition: margin 0.2s ease-out, visibility 0.4s ease-out;
  `};
`

const TooltipWrap = ({ isShow, label, tooltip, className }) => {
  const [isVisible, setIsVisible] = useState(false)

  return (
    !isShow ? null : (
      <Wrap className={className} onClick={() => setIsVisible(!isVisible)}>
        <Label>{label}</Label>
        <Tooltip isVisible={isVisible}>
          {tooltip}
        </Tooltip>
      </Wrap>
    )
  )
}

TooltipWrap.propTypes = {
  isShow: bool.isRequired,
  label: oneOfType([string, number]).isRequired,
  tooltip: string.isRequired,
  className: string,
}

TooltipWrap.defaultProps = {
  className: undefined,
}

export default TooltipWrap
