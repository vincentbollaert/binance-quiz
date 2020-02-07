import { number, string, shape, arrayOf, bool } from 'prop-types'

export const SHAPE_QUIZ_QUESTION = {
  id: number.isRequired,
  title: string.isRequired,
  slug: string.isRequired,
  excerpt: string.isRequired,
  difficulty_id: number.isRequired,
  difficulty: shape({
    level: number.isRequired,
    title: string.isRequired,
  }).isRequired,
  answers: arrayOf(string).isRequired,
  isFinalQuestion: bool.isRequired,
}

export const SHAPE_QUESTION = {
  id: number.isRequired,
  title: string.isRequired,
  slug: string.isRequired,
  excerpt: string.isRequired,
  difficulty_id: number.isRequired,
  difficulty: shape({
    level: number.isRequired,
    title: string.isRequired,
  }).isRequired,
}

export const SHAPE_SELECTED_ANSWER = {
  id: number.isRequired,
  selectedAnswer: string.isRequired,
  correctAnswer: string.isRequired,
  timeToChoose: number.isRequired,
  isTimeout: bool,
  isCorrect: bool.isRequired,
}
