import React, { memo } from 'react'
import { shape } from 'prop-types'
import styled from 'styled-components'
import { media, UNIT_MD, FONT_SIZE_MD, SUNSET_ORANGE } from '../../styles'
import { PROP_ASYNC_STATUS } from '../../constants'
import errorApiSvg from '../../assets/svg/error-api.svg'
import { STYLE_HEADER_HEIGHT, STYLE_HEADER_HEIGHT_SM } from '../../Application/shared'
import Svg from '../Svg/component'

const Wrap = styled.div`
  z-index: 1;
  position: fixed;
  display: flex;
  top: 0;
  right: 0;
  left: 0;
  padding: ${UNIT_MD};
  height: ${STYLE_HEADER_HEIGHT};
  align-items: center;
  justify-content: center;
  font-size: ${FONT_SIZE_MD};
  font-weight: bold;
  color: rgba(255, 255, 255, 0.9);
  background-color: ${SUNSET_ORANGE};

  ${media.md`
    height: ${STYLE_HEADER_HEIGHT_SM};
  `};
`

const SvgStyled = styled(Svg)`
  display: flex;
  margin-right: ${UNIT_MD};
  width: 2.4rem;
  height: 100%;
  fill: rgba(255, 255, 255, 0.9);
`

const Error = ({ asyncStatus: { isError, errorMessage } }) => (
  !isError ? null :
  <Wrap data-testid="component-error">
    <SvgStyled svg={errorApiSvg} static />
    {errorMessage}
  </Wrap>
)

Error.propTypes = {
  asyncStatus: shape(PROP_ASYNC_STATUS).isRequired,
}

export default memo(Error)
