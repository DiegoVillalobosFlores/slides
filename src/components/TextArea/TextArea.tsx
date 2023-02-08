'use client'

import {useCallback, useEffect, useReducer, useState} from 'react'
import {motion, useAnimationControls} from "framer-motion";
import styles from './TextArea.module.scss'
import TextAreaFont from "@/components/TextArea/TextAreaFont";
import Options from "@/types/Options";
import {alignVariants, colorVariants, justifyVariants} from "@/utils/variables";
import useStream from "@/utils/useStream";
import {keys as OptionsKeys} from "@/services/redis/options";
import {keys as TextKeys} from "@/services/redis/text"

import '@radix-ui/colors/violetDark.css'
import '@radix-ui/colors/blackA.css'
import '@radix-ui/colors/mauve.css'
import useMeasure from "react-use-measure";
import ContextMenu from "@/components/ContextMenu/ContextMenu";

type Props = {
  id: string
  editable?: boolean
  savedOptions: Options
}

const VARIANTS = [
  {name: 'color', variant:colorVariants},
  {name: 'position', variant: justifyVariants},
  {name: 'alignment', variant: alignVariants},
  {name: 'font', variant: TextAreaFont}
] as const;

const optionsReducer = (prevOptions: Options, payload: Partial<Options>) => ({
  ...prevOptions,
  ...payload
})

export default function TextArea({id, editable = true, savedOptions}: Props) {
  const [text, setText] = useState('');
  const [options, dispatchOptions] = useReducer(optionsReducer, savedOptions)
  const [ref, bounds] = useMeasure({debounce: 100});
  const animationControls = useAnimationControls()

  const optionsKey = OptionsKeys.stream(id)
  const textKey = TextKeys.stream(id)
  
  const handleOptionsStream = useCallback(dispatchOptions, [dispatchOptions])
  
  const handleTextStream = useCallback((streamedText: { text: string }) => {
    if(editable || !streamedText) return
    setText(streamedText.text)
  }, [editable])

  useStream(
    {
      [optionsKey]: handleOptionsStream,
      [textKey]: handleTextStream
    }, editable
  )

  const saveText = (text: string) => {
    if(!editable) return;
    fetch(`/api/slide/${id}/text/save`, {
      method: 'POST',
      body: JSON.stringify({
        text
      })
    })
  }

  useEffect(() => {
    animationControls.start({
      ...colorVariants[options.color],
      ...alignVariants[options.alignment],
      ...justifyVariants[options.position],
      ...TextAreaFont[options.font].style,
    })

    if(!editable) {
      animationControls.start({
        width: parseInt(options.width),
        height: parseInt(options.height)
      })
    }

    if(!editable) return;

    fetch(`/api/slide/${id}/options/save`, {
      method: 'POST',
      body: JSON.stringify({
        options
      })
    })
  }, [animationControls, editable, id, options])

  useEffect(() => {
    dispatchOptions({height: bounds.height.toString(), width: bounds.width.toString()})
  }, [bounds.width, bounds.height])

  return (
    <ContextMenu
      disabled={!editable}
      items={VARIANTS.map((variant, i) => ({
          type: "RadioGroup",
          label: variant.name,
          value: options[variant.name],
          withSeparator: i < VARIANTS.length -1,
          onValueChange: (value) => dispatchOptions({[variant.name]: value}),
          options: Object.keys(variant.variant)
      }))}
    >
      <motion.div
        animate={animationControls}
        layout
        className={`${styles.root} ${editable && styles.root_editable} dark-theme ${TextAreaFont[options.font].className}`}
        onInput={(e) => {
          saveText(e.currentTarget.innerText)
          setText(e.currentTarget.innerText);
        }}
        contentEditable={editable}
        ref={ref}
        suppressContentEditableWarning
      >
        {!editable && text}
      </motion.div>
    </ContextMenu>
  )
}
