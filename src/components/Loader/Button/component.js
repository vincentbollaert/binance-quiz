import React from 'react'
import styled from 'styled-components'
import { shape, string } from 'prop-types'
import { PROP_ASYNC_STATUS } from '../../../constants'
import loaderSvg from '../../../assets/svg/loader.svg'
import Svg from '../../Svg/component'

const LoaderStyledButton = styled(Svg)`
  display: ${props => props.isBusy ? 'inline-flex' : 'none'};
  margin: 0 auto;

  svg {
    width: 2rem;
    height: 2rem;
  };

  path {
    &:nth-child(1) {
      opacity: 1;
      fill: rgba(0, 0, 0, 0.4);
    };
    &:nth-child(2) {
      fill: rgba(0, 0, 0, 0.3);
    };
  }
`

const ButtonLoader = ({ asyncStatus: { isBusy }, testId }) => (
  <LoaderStyledButton isBusy={isBusy} svg={loaderSvg} size={2} testId={testId} />
)

ButtonLoader.propTypes = {
  asyncStatus: shape(PROP_ASYNC_STATUS).isRequired,
  testId: string,
}

ButtonLoader.defaultProps = {
  testId: undefined,
}

export default ButtonLoader
