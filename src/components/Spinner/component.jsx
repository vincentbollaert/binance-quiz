import React from 'react'
import { number, string, shape } from 'prop-types'
import styled from 'styled-components'
import { PROP_ASYNC_STATUS, SHAPE_ASYNC_STATUS_INITIAL } from '../../constants'
import loaderSvg from '../../assets/svg/loader.svg'
import Svg from '../Svg/component'

const Wrap = styled.div`
  display: flex;
  z-index: 2;
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
`

const LoaderStyled = styled(Svg)`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  path {
    &:nth-child(1) {
      fill: rgba(0, 0, 0, 0.5);
    };
    &:nth-child(2) {
      fill: rgba(255,255,255,0.5);
    };
  }
`

class SpinnerLoader extends React.PureComponent {
  render() {
    const { asyncStatus, width, size, className } = this.props
    const { isBusy } = asyncStatus

    return (
      isBusy &&
      <Wrap className={className}>
        <LoaderStyled width={width} size={size} svg={loaderSvg} />
      </Wrap>
    )
  }
}

SpinnerLoader.propTypes = {
  asyncStatus: shape(PROP_ASYNC_STATUS),
  size: number,
  width: number,
  className: string,
}

SpinnerLoader.defaultProps = {
  asyncStatus: SHAPE_ASYNC_STATUS_INITIAL,
  size: 4,
  width: 4,
  className: '',
}

export default SpinnerLoader
