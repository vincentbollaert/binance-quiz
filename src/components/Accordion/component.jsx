import React from 'react'
import styled from 'styled-components'
import chevronDown from '../../assets/svg/chevron-down.svg'
import { SUNSET_ORANGE } from '../../styles'
import Svg from '../Svg/component'

const Wrap = styled.div`
  position: relative;
`
const AccordionToggle = styled(Svg)`
  margin-left: auto;
  fill: ${SUNSET_ORANGE};
  cursor: pointer;
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
        <AccordionToggle svg={chevronDown} size={1.4} onClick={this.onToggle} />
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
