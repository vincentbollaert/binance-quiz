import React from 'react'
import styled from 'styled-components'
import { shape } from 'prop-types'
import { PROP_ASYNC_STATUS } from '../../../constants'
import loaderSvg from '../../../assets/svg/loader.svg'
import Svg from '../../Svg/component'

const LoaderStyledButton = styled(Svg)`
  display: ${props => props.isBusy ? 'inline-flex' : 'none'};

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

const ButtonLoader = ({ asyncStatus: { isBusy } }) => (
  <LoaderStyledButton isBusy={isBusy} svg={loaderSvg} size={2} />
)

ButtonLoader.propTypes = {
  asyncStatus: shape(PROP_ASYNC_STATUS).isRequired,
}

export default ButtonLoader
