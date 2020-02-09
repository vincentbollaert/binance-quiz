import React from 'react'
import { string, shape } from 'prop-types'
import styled, { keyframes } from 'styled-components'
import { PROP_ASYNC_STATUS } from '../../../constants'
import { SELECTIVE_YELLOW } from '../../../styles'

const transition = keyframes`
  from { left: -20rem; width: 30%; }
  50%  { width: 30%; }
  70%  { width: 70%; }
  80%  { left: 50%; }
  95%  { left: 120%; }
  to   { left: 100%; }
`

const Wrap = styled.div`
  z-index: 1;
  position: fixed;
  top: 0;
  right: 0;
  left: 0;
  height: 3px;
  overflow: hidden;

  &::before {
    content: "";
    display: block;
    position: absolute;
    left: -20rem;
    width: 20rem;
    height: 100%;
    background-color: ${SELECTIVE_YELLOW};
    animation: ${transition} 2s linear infinite;
  };
`

const LineLoader = ({ asyncStatus: { isBusy }, className }) => {
  return (
    isBusy ? <Wrap className={className} data-testid="component-line-loader" /> : null
  )
}

LineLoader.propTypes = {
  asyncStatus: shape(PROP_ASYNC_STATUS).isRequired,
  className: string,
}

LineLoader.defaultProps = {
  className: '',
}

export default LineLoader
