import React from 'react'
import { bool, shape, number } from 'prop-types'
import styled from 'styled-components'
import { media, FONT_SIZE_MD, SELECTIVE_YELLOW, SUNSET_ORANGE, UNIT_LG, UNIT_SM, JET } from '../../../styles'

const Wrap = styled.div`
  display: none;
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
  color: inherit;

  &:hover {
    text-decoration: underline;
  };
`

const AdditionalInfo = ({
  isTimeout,
  isCorrect,
  isQuizComplete,
  isSelectedAnswerOption,
  questionMatchingAnswer,
  dummyRandomNumber,
}) => {
  const GLOSSARY_URL = `https://www.binance.vision/glossary/${questionMatchingAnswer.slug}`
  const isSelectedAnswerQuizIncomplete = isSelectedAnswerOption && !isQuizComplete

  return (
    <Wrap accentColor={isSelectedAnswerQuizIncomplete && SELECTIVE_YELLOW} isTimeout={isTimeout}>
      {isTimeout && <TimeoutText>No time remaining</TimeoutText>}
      {isQuizComplete && isSelectedAnswerOption && (
        isCorrect
          ? `${dummyRandomNumber}% of users got this right`
          : <Link href={GLOSSARY_URL} target="_blank">{questionMatchingAnswer.excerpt}</Link>
      )}
      {isSelectedAnswerQuizIncomplete && `${dummyRandomNumber}% of users chose this option`}
    </Wrap>
  )
}

AdditionalInfo.propTypes = {
  isTimeout: bool,
  isCorrect: bool.isRequired,
  isQuizComplete: bool.isRequired,
  isSelectedAnswerOption: bool.isRequired,
  questionMatchingAnswer: shape({}).isRequired,
  dummyRandomNumber: number.isRequired,
}

AdditionalInfo.defaultProps = {
  isTimeout: false,
}

export default AdditionalInfo
