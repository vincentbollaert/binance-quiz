import React from 'react'
import { string, func, node } from 'prop-types'
import styled from 'styled-components'
import { UNIT_XLG, SELECTIVE_YELLOW } from '../../styles'

const Wrap = styled.button`
  position: relative;
  margin-top: ${UNIT_XLG};
  padding: 0 ${UNIT_XLG};
  align-items: center;
  height: 3.6rem;
  white-space: nowrap;
  text-transform: uppercase;
  border-radius: 1.8rem;
  color: #202020;
  font-weight: bold;
  font-size: 14px;
  background: ${SELECTIVE_YELLOW};
  cursor: pointer;
  transition: transform 0.1s ease-out;

  &:hover {
    transform: scale(1.2);
  };
`

class Button extends React.PureComponent {
  render() {
    const { onClick, children, className } = this.props;

    return (
      <Wrap onClick={onClick} className={className}>
        {children}
      </Wrap>
    )
  }
}

Button.propTypes = {
  className: string,
  children: node.isRequired,
  onClick: func,
}

Button.defaultProps = {
  onClick() {},
  className: '',
}

export default Button
