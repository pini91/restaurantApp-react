/**
 * Brand color tokens — single source of truth.
 * These values are mirrored as CSS custom properties in home.css (:root).
 */

export const primary = {
  100: '#FBE7D3',
  200: '#F6CBA6',
  300: '#F0AE78',
  400: '#EB9046',
  500: '#E97817', // base — warm orange (CTA, brand mark)
  600: '#C96211',
  700: '#A24D0D',
  800: '#793909',
  900: '#532706',
} as const

export const secondary = {
  100: '#D6DEE0',
  200: '#ADBCC0',
  300: '#82999E',
  400: '#5B777D',
  500: '#34575E',
  600: '#1B3B41',
  700: '#071B1E', // base — dark teal hero background
  800: '#051416',
  900: '#030C0D', // deepest surface / footer
} as const

export const grays = {
  '000': '#FFFFFF',
  '050': '#F7F7F6', // surface-light
  100: '#EFEFED',
  200: '#DFDFDC',
  300: '#C8C8C3',
  400: '#A5A6A1',
  500: '#7E817F',
  600: '#5C605F',
  700: '#3E4342',
  800: '#242A29',
  900: '#141817',
} as const

export const accent = {
  leafGreen:    '#4E6B39', // decorative botanical only
  avocadoGreen: '#90A84D', // food-media accent only
  salmonCoral:  '#F37A52', // food-media accent only
  wasabiGreen:  '#6E8D2D', // garnish / media support
  riceIvory:    '#ECE9E2', // food highlight / decor fills
} as const
