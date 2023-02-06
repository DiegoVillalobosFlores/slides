'use client'

import {ReactNode} from "react";
import {motion} from "framer-motion";
import {amberDark} from "@radix-ui/colors";
import styles from './Button.module.scss'
import '@radix-ui/colors/cyanDark.css'
import '@radix-ui/colors/amberDark.css'

type Props = {
  children: ReactNode;
  onClick?: () => void;
}

export default function Button({children, onClick}: Props) {
  return (
    <motion.button
      whileHover={{
        backgroundColor: amberDark.amber1,
        borderColor: amberDark.amber7,
        color: amberDark.amber11
    }}
      whileTap={{ scale: 1.1 }}
      className={`${styles.root} dark-theme`}
      onClick={onClick}
    >
      {children}
    </motion.button>
  )
}