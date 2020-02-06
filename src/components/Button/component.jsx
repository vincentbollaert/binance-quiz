import React from 'react'
import { string, func, node, shape } from 'prop-types'
import styled from 'styled-components'
import { UNIT_XLG, UNIT_SM, SELECTIVE_YELLOW } from '../../styles'
import { PROP_ASYNC_STATUS } from '../../constants'
import SpinnerLoader from '../Spinner/component'

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

const SpinnerLoaderStyled = styled(SpinnerLoader)`
  margin-left: ${UNIT_SM};

  path {
    &:nth-child(1) {
      opacity: 1;
      fill: rgba(0, 0, 0, 0.2);
    };
    &:nth-child(2) {
      fill: rgba(0, 0, 0, 0.3);
    };
  };
`;

class Button extends React.PureComponent {
  render() {
    const { onClick, children, asyncStatus, className } = this.props;
    const { isBusy } = asyncStatus

    return (
      <Wrap onClick={onClick} className={className}>
        {!isBusy && children}
        <SpinnerLoaderStyled
          isAlwaysVisible
          asyncStatus={asyncStatus}
          isStatic
          size={2}
        />
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
