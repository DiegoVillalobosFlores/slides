import {Eczar, Karla, Andada_Pro} from "next/font/google";

const eczar = Eczar({
  subsets: ['latin'],
  display: "swap"
})

const karla = Karla({
  subsets: ['latin'],
  display: "swap"
})

const andada = Andada_Pro({
  subsets: ['latin'],
  display: "swap"
})

export default {eczar, andada, karla} as const
