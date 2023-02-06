import {ReactNode} from "react";
import CardFont from "@/components/Card/CardFont";
import styles from './CardContent.module.scss'

type Props = {
  children: ReactNode
}

export default function CardContent({children}: Props) {
  return (
    <div className={`${CardFont.className} ${styles.root}`}>
      {children}
    </div>
  )
}