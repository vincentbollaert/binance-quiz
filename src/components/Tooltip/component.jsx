import React from 'react'
import { string } from 'prop-types'
import styled from 'styled-components'
import { UNIT_MD, UNIT_LG, MEDIUM_AQUAMARINE } from '../../styles'

const TooltipInnerWrap = styled.div`
  position: absolute;
  right: ${UNIT_LG};
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
  font-size: 11px;
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
  font-size: 11px;
  text-transform: uppercase;
  background-color: ${MEDIUM_AQUAMARINE};
  color: #0d683c;
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
    transition-delay: 0.4s;
  `};
`

class TooltipWrap extends React.PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      isVisible: false,
    }
  }

  onClickHandler = () => {
    this.setState({ isVisible: !this.state.isVisible })
  }

  render() {
    const { isVisible } = this.state
    const { label, tooltip, className } = this.props;

    return (
      <TooltipInnerWrap className={className} onClick={this.onClickHandler}>
        <Label>{label}</Label>
        <Tooltip isVisible={isVisible}>
          {tooltip}
        </Tooltip>
      </TooltipInnerWrap>
    )
  }
}

TooltipWrap.propTypes = {
  label: string.isRequired,
  tooltip: string.isRequired,
  className: string,
}

TooltipWrap.defaultProps = {
  className: undefined,
}

export default TooltipWrap
