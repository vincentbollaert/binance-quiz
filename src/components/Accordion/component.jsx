import React, { useState } from 'react'
import { string, any } from 'prop-types'
import styled from 'styled-components'
import chevronDown from '../../assets/svg/chevron-down.svg'
import { UNIT_XSM, UNIT_SM, ISABELLINE } from '../../styles'
import Svg from '../Svg/component'

const AccordionToggle = styled(Svg)`
  margin-left: auto;
  padding: ${UNIT_XSM};
  fill: ${props => props.isOpen ? ISABELLINE : '#5e5e5e'};
  cursor: pointer;

  &:hover {
    fill: ${ISABELLINE};
  };
`
const Body = styled.div`
  display: ${props => props.isOpen ? 'block' : 'none'};
  margin-top: ${UNIT_SM};
  margin-left: 40px;
`

const Accordion = ({ children, className }) => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      <AccordionToggle
        isOpen={isOpen}
        svg={chevronDown}
        size={2.4}
        onClick={() => setIsOpen(!isOpen)}
        className={className}
      />
      <Body isOpen={isOpen}>
        {children}
      </Body>
    </>
  )
}

Accordion.propTypes = {
  children: any.isRequired,
  className: string,
}

Accordion.defaultProps = {
  className: '',
}

export default Accordion
