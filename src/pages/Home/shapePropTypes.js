import { number, string, shape, arrayOf, bool } from 'prop-types'

export const SHAPE_QUIZ_QUESTION = {
  id: number,
  title: string,
  slug: string,
  excerpt: string,
  difficulty_id: number,
  difficulty: shape({
    level: number,
    title: string,
  }),
  answers: arrayOf(string),
  isFinalQuestion: bool,
}

export const SHAPE_QUESTION = {
  id: number,
  title: string,
  slug: string,
  excerpt: string,
  difficulty_id: number,
  difficulty: shape({
    level: number,
    title: string,
  }),
}

export const SHAPE_SELECTED_ANSWER = {
  id: number.isRequired,
  selectedAnswer: string.isRequired,
  correctAnswer: string.isRequired,
  timeToChoose: number.isRequired,
  isTimeout: bool,
  isCorrect: bool.isRequired,
}
