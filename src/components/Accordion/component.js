import React, { memo } from 'react'
import { string, bool } from 'prop-types'
import styled from 'styled-components'
import chevronDown from '../../assets/svg/chevron-down.svg'
import { UNIT_XSM, UNIT_LG_INT, UNIT_SM, ISABELLINE, GRANITE_GRAY } from '../../styles'
import useToggle from '../../hooks/useBooleanToggle'

import { STYLE_RADIO_SIZE_PX } from '../Radio/component'
import Svg from '../Svg/component'

const Wrap = styled.div`
  position: relative;
  margin-left: auto;
`
const AccordionToggle = styled(Svg)`
  position: ${props => props.isOpen ? 'absolute' : 'static'};;
  right: 0;
  bottom: 100%;
  margin-left: auto;
  padding: ${UNIT_XSM};
  fill: ${props => props.isOpen ? ISABELLINE : GRANITE_GRAY};
  cursor: pointer;

  &:active {
    fill: ${ISABELLINE};
  };
`
const Body = styled.div`
  display: ${props => props.isOpen ? 'block' : 'none'};
  margin-top: ${UNIT_SM};
  margin-left: ${STYLE_RADIO_SIZE_PX / 10 + UNIT_LG_INT}rem;
`

const Accordion = ({ isShow, content, className }) => {
  const [isOpen, toggleOpen] = useToggle(false)

  return (
    !isShow ? null : (
      <Wrap data-testid="component-accordion">
        <AccordionToggle
          isOpen={isOpen}
          svg={chevronDown}
          size={2.4}
          onClick={toggleOpen}
          className={className}
        />
        <Body isOpen={isOpen}>
          {content}
        </Body>
      </Wrap>
    )
  )
}

Accordion.propTypes = {
  isShow: bool.isRequired,
  content: string.isRequired,
  className: string,
}

Accordion.defaultProps = {
  className: '',
}

export default memo(Accordion)
