import React, { useState } from 'react'
import { string, bool } from 'prop-types'
import styled from 'styled-components'
import chevronDown from '../../assets/svg/chevron-down.svg'
import { UNIT_XSM, UNIT_LG_INT, UNIT_SM, ISABELLINE, GRANITE_GRAY } from '../../styles'
import { STYLE_RADIO_SIZE_PX } from '../Radio/component'
import Svg from '../Svg/component'

const AccordionToggle = styled(Svg)`
  margin-left: auto;
  padding: ${UNIT_XSM};
  fill: ${props => props.isOpen ? ISABELLINE : GRANITE_GRAY};
  cursor: pointer;

  &:hover {
    fill: ${ISABELLINE};
  };
`
const Body = styled.div`
  display: ${props => props.isOpen ? 'block' : 'none'};
  margin-top: ${UNIT_SM};
  margin-left: ${STYLE_RADIO_SIZE_PX / 10 + UNIT_LG_INT}rem;
`

const Accordion = ({ isShow, content, className }) => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    !isShow ? null : (
      <>
        <AccordionToggle
          isOpen={isOpen}
          svg={chevronDown}
          size={2.4}
          onClick={() => setIsOpen(!isOpen)}
          className={className}
        />
        <Body isOpen={isOpen}>
          {content}
        </Body>
      </>
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

export default Accordion
