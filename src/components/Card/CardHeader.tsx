import {ReactNode} from "react";
import styles from './CardHeader.module.scss'
import CardFont from "@/components/Card/CardFont";

type Props = {
  children: ReactNode;
}

export default function CardHeader({children}: Props) {
  return (
    <h2 className={`${styles.root} dark-theme ${CardFont.className}`}>
      {children}
    </h2>
  )
}