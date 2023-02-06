import {blueDark, redDark, tealDark, violetDark} from "@radix-ui/colors";

export const colorVariants = {
  violet: {
    backgroundColor: violetDark.violet2,
    color: violetDark.violet11,
    borderColor: violetDark.violet7
  },
  red: {
    backgroundColor: redDark.red2,
    color: redDark.red11,
    borderColor: redDark.red7
  },
  blue: {
    backgroundColor: blueDark.blue2,
    color: blueDark.blue11,
    borderColor: blueDark.blue7
  },
  teal: {
    backgroundColor: tealDark.teal2,
    color: tealDark.teal11,
    borderColor: tealDark.teal7
  }
} as const

export const alignVariants = {
  top: {
    alignItems: 'start'
  },
  center: {
    alignItems: 'center'
  },
  bottom: {
    alignItems: 'end'
  }
} as const

export const justifyVariants = {
  left: {
    justifyContent: 'start',
    textAlign: 'start'
  },
  center: {
    justifyContent: 'center',
    textAlign: 'center'
  },
  right: {
    justifyContent: 'end',
    textAlign: 'end'
  }
} as const