import { css } from 'styled-components'

// colors
export const SELECTIVE_YELLOW = '#F0B90B'
export const MEDIUM_AQUAMARINE = '#5CF2AA'
export const SUNSET_ORANGE = '#F25C5C'

// colors - gray
export const LIGHT_GRAY = '#d1d1d1'
export const ASH_GRAY = '#b4b4b4'
export const ISABELLINE = '#eee'
export const JET = '#353535'
export const JET_LIGHTER = '#363636'
export const RAISIN_BLACK = '#202020'
export const CHARLESTON_GREEN = '#2e2e2e'
export const CHARLESTON_GREEN_DARKER = '#292929'
export const GRANITE_GRAY = '#636363'

// units
export const UNIT_XSM_INT = 0.4
export const UNIT_SM_INT = 0.8
export const UNIT_MD_INT = 1.2
export const UNIT_LG_INT = 1.6
export const UNIT_XLG_INT = 2.4
export const UNIT_XXLG_INT = 4.6

export const UNIT_XSM = `${UNIT_XSM_INT}rem`
export const UNIT_SM = `${UNIT_SM_INT}rem`
export const UNIT_MD = `${UNIT_MD_INT}rem`
export const UNIT_LG = `${UNIT_LG_INT}rem`
export const UNIT_XLG = `${UNIT_XLG_INT}rem`
export const UNIT_XXLG = `${UNIT_XXLG_INT}rem`

// font size
export const FONT_SIZE_SM = '1.1rem'
export const FONT_SIZE_MD = '1.2rem'
export const FONT_SIZE_LG = '1.4rem'
export const FONT_SIZE_XLG = '1.8rem'

// transition
export const TRANSITION = '0.1s ease-out'
export const TRANSITION_SLOW = '0.2s ease-in'


// media queries
export const sizes = {
  sm: 540,
  md: 940,
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
