import React, { memo } from 'react'
import { string, number, func } from 'prop-types'
import styled from 'styled-components'

const Wrap = styled.span`
  display: flex;
  flex-shrink: 0;
  width: ${props => props.size || props.width}rem;
  height: ${props => props.size || props.height}rem;

  svg {
    width: 100%;
    height: 100%;
  };
`

const Svg = ({ svg, width, size, className, onClick }) => (
  <Wrap
    width={width}
    size={size}
    className={className}
    onClick={onClick}
    dangerouslySetInnerHTML={{ __html: svg }}
    data-testid="component-svg"
  />
)

Svg.propTypes = {
  svg: string.isRequired,
  width: number,
  size: number,
  onClick: func,
  className: string,
}

Svg.defaultProps = {
  width: undefined,
  size: undefined,
  onClick() {},
  className: undefined,
}

export default memo(Svg)
