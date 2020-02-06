import React from 'react'
import styled from 'styled-components'
import chevronDown from '../../assets/svg/chevron-down.svg'
import { SUNSET_ORANGE, UNIT_XSM } from '../../styles'
import Svg from '../Svg/component'

const Wrap = styled.div`
  position: relative;
`
const AccordionToggle = styled(Svg)`
  margin-left: auto;
  padding: ${UNIT_XSM};
  fill: ${props => props.isOpen ? '#eee' : '#5e5e5e'};
  cursor: pointer;

  &:hover {
    fill: #eee;
  };
`
const AccordionContent = styled.div`
  display: ${props => props.isOpen ? 'block' : 'none'};
  margin-top: 8px;
  margin-left: 40px;
`

class Accordion extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      isOpen: false,
    }
  }

  onToggle = () => {
    this.setState({ isOpen: !this.state.isOpen })
  }

  render() {
    const { isOpen } = this.state
    const { content } = this.props
    return (
      <>
        <AccordionToggle isOpen={isOpen} svg={chevronDown} size={2.4} onClick={this.onToggle} />
        <Wrap>
          <AccordionContent isOpen={isOpen}>
            {content}
          </AccordionContent>
        </Wrap>
      </>
    )
  }
}

export default Accordion
