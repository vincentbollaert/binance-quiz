import React from 'react'
import { bool, shape, number, string } from 'prop-types'
import styled from 'styled-components'
import { media, UNIT_LG, FONT_SIZE_MD, SUNSET_ORANGE, UNIT_SM } from '../../../styles'
import { CN_ADDITIONAL_INFO, STYLE_ADDITIONAL_INFO_BOX_SHADOW } from '../shared'
import { SHAPE_QUIZ_QUESTION } from '../shapePropTypes'

const Wrap = styled.div`
  display: ${props => props.isShow ? 'block' : 'none'};
  position: absolute;
  right: ${UNIT_LG};
  margin-left: auto;
  ${props => props.isShowLink && 'margin-right: -0.4rem'}; // ellipsis added spacing
  padding: ${UNIT_SM};
  padding-right: 0;
  max-width: 28rem;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  background-color: inherit;
  box-shadow: ${STYLE_ADDITIONAL_INFO_BOX_SHADOW};
  color: ${props => props.accentColor || 'inherit'};

  ${media.sm`
    right: 3.4rem;
    display: block;
    font-size: ${FONT_SIZE_MD};
  `};
`
const TimeoutText = styled.div`
  color: ${SUNSET_ORANGE};
`
const Link = styled.a`
  color: ${SUNSET_ORANGE};

  &:hover {
    text-decoration: underline;
  };
`

const AdditionalInfo = ({
  isTimeout,
  isCorrect,
  isQuizComplete,
  accentColor,
  answer,
  correctAnswer,
  questionMatchingAnswer: { slug, excerpt },
  dummyRandomNumber,
}) => {
  const GLOSSARY_URL = `https://www.binance.vision/glossary/${slug}`
  const isShowLink = !isTimeout && isQuizComplete && answer !== correctAnswer && !isCorrect

  return (
    <Wrap
      isShow={!isQuizComplete || isTimeout}
      isShowLink={isShowLink}
      accentColor={accentColor}
      data-testid="component-additional-info"
      className={CN_ADDITIONAL_INFO}
    >
      {isTimeout && <TimeoutText>No time remaining</TimeoutText>}
      {accentColor !== undefined && (
        <span>
          {isShowLink && <Link href={GLOSSARY_URL} target="_blank">{excerpt}</Link>}
          {!isTimeout && isQuizComplete && answer === correctAnswer && `${dummyRandomNumber}% of users got this right`}
          {!isQuizComplete && `${dummyRandomNumber}% chose this option`}
        </span>
      )}
    </Wrap>
  )
}

AdditionalInfo.propTypes = {
  isTimeout: bool,
  isCorrect: bool.isRequired,
  isQuizComplete: bool.isRequired,
  accentColor: string,
  answer: string.isRequired,
  correctAnswer: string.isRequired,
  questionMatchingAnswer: shape(SHAPE_QUIZ_QUESTION).isRequired,
  dummyRandomNumber: number.isRequired,
}

AdditionalInfo.defaultProps = {
  isTimeout: false,
  accentColor: undefined,
}

export default AdditionalInfo
