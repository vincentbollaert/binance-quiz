import React from 'react'
import { bool, shape, number, string } from 'prop-types'
import styled from 'styled-components'
import {
  media,
  FONT_SIZE_MD,
  SELECTIVE_YELLOW,
  SUNSET_ORANGE,
  UNIT_LG,
  UNIT_SM,
  JET,
  MEDIUM_AQUAMARINE,
} from '../../../styles'
import { SHAPE_QUIZ_QUESTION } from '../shapePropTypes'

const Wrap = styled.div`
  display: ${props => props.isTimeout ? 'block' : 'none'};
  position: absolute;
  right: ${UNIT_LG};
  right: 3.4rem;
  margin-left: auto;
  padding: ${UNIT_SM};
  padding-right: 0;
  max-width: 28rem;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  background-color: ${JET};
  box-shadow: -22px 0px 17px -4px ${JET};
  color: ${props => props.accentColor || 'inherit'};

  ${media.xsm`
    display: block;
    font-size: ${FONT_SIZE_MD};
  `};
`
const TimeoutText = styled.div`
  color: ${SUNSET_ORANGE};
  font-weight: bold;
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

  return (
    <Wrap accentColor={accentColor} isTimeout={isTimeout}>
      {isTimeout && <TimeoutText>No time remaining</TimeoutText>}
      {accentColor !== undefined && (
        <>
          {isQuizComplete && answer !== correctAnswer && !isCorrect && <Link href={GLOSSARY_URL} target="_blank">{excerpt}</Link>}
          {isQuizComplete && answer === correctAnswer && `${dummyRandomNumber}% of users got this right`}
          {!isQuizComplete && `${dummyRandomNumber}% chose this option`}
        </>
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
