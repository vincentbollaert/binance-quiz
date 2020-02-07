import React from 'react'
import { bool, shape, number } from 'prop-types'
import styled from 'styled-components'
import { media, UNIT_XSM, FONT_SIZE_MD, SELECTIVE_YELLOW, SUNSET_ORANGE } from '../../../styles'

const Wrap = styled.div`
  display: none;
  position: absolute;
  right: ${UNIT_XSM};
  bottom: ${UNIT_XSM};
  margin-left: auto;
  max-width: 28rem;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  color: ${props => props.accentColor || 'inherit'};

  ${media.xsm`
    display: block;
    position: static;
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

  return (
    <Wrap accentColor={!isQuizComplete && isSelectedAnswerOption && SELECTIVE_YELLOW} isTimeout={isTimeout}>
      {isTimeout && <TimeoutText>No time remaining</TimeoutText>}
      {isQuizComplete && isSelectedAnswerOption && (
        isCorrect
          ? `${dummyRandomNumber}% of users got this right`
          : <Link href={GLOSSARY_URL} target="_blank">{questionMatchingAnswer.excerpt}</Link>
      )}
      {!isQuizComplete && isSelectedAnswerOption && `${dummyRandomNumber}% of users chose this option`}
    </Wrap>
  )
}

AdditionalInfo.propTypes = {
  isTimeout: bool.isRequired,
  isCorrect: bool.isRequired,
  isQuizComplete: bool.isRequired,
  isSelectedAnswerOption: bool.isRequired,
  questionMatchingAnswer: shape({}).isRequired,
  dummyRandomNumber: number.isRequired,
}

AdditionalInfo.defaultProps = {

}

export default AdditionalInfo
