import React from 'react'
import { string, func, node, shape } from 'prop-types'
import styled from 'styled-components'
import { UNIT_XLG, SELECTIVE_YELLOW, UNIT_LG } from '../../styles'
import { PROP_ASYNC_STATUS } from '../../constants'
import { ButtonLoader } from '../Loader'

const Wrap = styled.button`
  display: flex;
  position: relative;
  margin-top: ${UNIT_XLG};
  padding: 0 ${UNIT_LG};
  align-items: center;
  justify-items: center;
  text-align: center;
  width: 100%;
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
    const { onClick, children, asyncStatus, className } = this.props;
    const { isBusy } = asyncStatus

    return (
      <Wrap onClick={onClick} className={className}>
        {!isBusy && children}
        <ButtonLoader asyncStatus={asyncStatus} />
      </Wrap>
    )
  }
}

Button.propTypes = {
  className: string,
  children: node.isRequired,
  onClick: func,
  asyncStatus: shape(PROP_ASYNC_STATUS).isRequired,
}

Button.defaultProps = {
  onClick() {},
  className: '',
}

export default Button