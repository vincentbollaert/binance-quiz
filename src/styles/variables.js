import { css } from 'styled-components'

// colors
export const SELECTIVE_YELLOW = '#F0B90B'
export const MEDIUM_AQUAMARINE = '#5CF2AA'
export const SUNSET_ORANGE = '#F25C5C'

// colors - gray
export const ISABELLINE = '#eee'

// units
export const UNIT_XSM_INT = 0.4
export const UNIT_SM_INT = 0.8
export const UNIT_MD_INT = 1.2
export const UNIT_LG_INT = 1.6
export const UNIT_XLG_INT = 2.4
export const UNIT_XXLG_INT = 2.4

export const UNIT_XSM = `${UNIT_XSM_INT}rem`
export const UNIT_SM = `${UNIT_SM_INT}rem`
export const UNIT_MD = `${UNIT_MD_INT}rem`
export const UNIT_LG = `${UNIT_LG_INT}rem`
export const UNIT_XLG = `${UNIT_XLG_INT}rem`
export const UNIT_XXLG = `${UNIT_XXLG_INT}rem`

// font size
export const FONT_SIZE_MD = '1.2rem'
export const FONT_SIZE_LG = ''

// transition
export const TRANSITION = '0.1s ease-out'


// media queries
export const sizes = {
  xsm: 540,
  sm: 940,
  lg: 1140,
}

export const media = Object.keys(sizes).reduce((acc, label) => {
  acc[label] = (...args) => css`
    @media (min-width: ${sizes[label]}px) {
      ${css(...args)}
    }
  `

  return acc
}, {})
