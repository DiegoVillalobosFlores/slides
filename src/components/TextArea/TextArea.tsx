'use client'

import {useEffect, useState} from 'react'
import {motion, useAnimationControls} from "framer-motion";
import styles from './TextArea.module.scss'
import * as ContextMenu from "@radix-ui/react-context-menu";
import TextAreaFont from "@/components/TextArea/TextAreaFont";
import Options from "@/types/Options";
import {alignVariants, colorVariants, justifyVariants} from "@/utils/variables";
import useStream from "@/utils/useStream";
import {k} from "@/services/redis/options";
import {k as textKeys} from "@/services/redis/text"

import '@radix-ui/colors/violetDark.css'
import '@radix-ui/colors/blackA.css'
import '@radix-ui/colors/mauve.css'
import useMeasure from "react-use-measure";

type Props = {
  id: string
  editable?: boolean
  options: Options
}

export default function TextArea({id, editable = true, options}: Props) {
  const [text, setText] = useState('');
  const [color, setColor] = useState<Options["color"]>(options.color || 'violet')
  const [alignment, setAlignment] = useState<Options['alignment']>(options.alignment || 'top')
  const [position, setPosition] = useState<Options['position']>(options.position || 'left')
  const [font, setFont] = useState<Options['font']>(options.font || 'eczar')
  const [ref, bounds] = useMeasure({debounce: 100});
  const controls = useAnimationControls();

  const optionsKey = k.s(id)
  const textKey = textKeys.s(id)

  const {[optionsKey]: streamedOptions, [textKey]: streamedText} = useStream([
    optionsKey,
    textKey
  ], editable)

  useEffect(() => {
    if(editable || !streamedOptions) return;
    setFont(streamedOptions.font)
    setColor(streamedOptions.color)
    setAlignment(streamedOptions.alignment)
    setPosition(streamedOptions.position)
    controls.start({width: parseInt(streamedOptions.width), height: parseInt(streamedOptions.height)})
  }, [controls, editable, streamedOptions])

  useEffect(() => {
    if(editable || !streamedText) return
    setText(streamedText.text)
  }, [editable, streamedText])

  const handleColorChange = (selectedColor: string) => {
    setColor(selectedColor as Options["color"])
  }

  const handleAlignChange = (selectedAlignment: string) => {
    setAlignment(selectedAlignment as Options["alignment"])
  }

  const handlePositionChange = (selectedPosition: string) => {
    setPosition(selectedPosition as Options["position"])
  }

  const saveText = (text: string) => {
    if(!editable) return;
    fetch(`/api/slide/${id}/text/save`, {
      method: 'POST',
      body: JSON.stringify({
        text
      })
    })
  }

  const saveOption = () => {
    if(!editable) return;
    fetch(`/api/slide/${id}/options/save`, {
      method: 'POST',
      body: JSON.stringify({
        options: {
          color,
          font,
          position,
          alignment,
          height: bounds.height.toString(),
          width: bounds.width.toString()
        }
      })
    })
  }

  useEffect(() => {
    controls.start(colorVariants[color])
    saveOption()
  }, [controls, color])

  useEffect(() => {
    controls.start(alignVariants[alignment])
    saveOption()
  }, [controls, alignment])

  useEffect(() => {
    controls.start(justifyVariants[position])
    saveOption()
  }, [controls, position])

  useEffect(() => {
    controls.start({...TextAreaFont[font].style})
    saveOption()
  }, [controls, font])

  useEffect(() => {
    saveOption()
  }, [bounds.height, bounds.width])

  return (
    <ContextMenu.Root>
      <ContextMenu.Trigger disabled={!editable}>
        <motion.div
          animate={controls}
          className={`${styles.root} ${editable && styles.root_editable} dark-theme ${TextAreaFont[font].className}`}
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
      </ContextMenu.Trigger>
      <ContextMenu.Portal>
        <ContextMenu.Content className={`${styles.ContextMenuContent} dark-theme`}>
          <ContextMenu.Label className={styles.ContextMenuLabel}>Color</ContextMenu.Label>
          <ContextMenu.RadioGroup value={color} onValueChange={handleColorChange}>
            {Object.keys(colorVariants).map((color) =>
              <ContextMenu.RadioItem className={styles.ContextMenuRadioItem} value={color} key={color}>
                <ContextMenu.ItemIndicator className={styles.ContextMenuItemIndicator}>
                  ✔️
                </ContextMenu.ItemIndicator>
                {color}
              </ContextMenu.RadioItem>
            )}
          </ContextMenu.RadioGroup>
          <ContextMenu.Separator className={styles.ContextMenuSeparator}/>
          <ContextMenu.Label className={styles.ContextMenuLabel}>Alignment</ContextMenu.Label>
          <ContextMenu.RadioGroup value={alignment} onValueChange={handleAlignChange}>
            {Object.keys(alignVariants).map((alignmentOption) =>
              <ContextMenu.RadioItem className={styles.ContextMenuRadioItem} value={alignmentOption} key={alignmentOption}>
                <ContextMenu.ItemIndicator className={styles.ContextMenuItemIndicator}>
                  ✔️
                </ContextMenu.ItemIndicator>
                {alignmentOption}
              </ContextMenu.RadioItem>
            )}
          </ContextMenu.RadioGroup>
          <ContextMenu.Separator className={styles.ContextMenuSeparator}/>
          <ContextMenu.Label className={styles.ContextMenuLabel}>Position</ContextMenu.Label>
          <ContextMenu.RadioGroup value={position} onValueChange={handlePositionChange}>
            {Object.keys(justifyVariants).map((position) =>
              <ContextMenu.RadioItem className={styles.ContextMenuRadioItem} value={position} key={position}>
                <ContextMenu.ItemIndicator className={styles.ContextMenuItemIndicator}>
                  ✔️
                </ContextMenu.ItemIndicator>
                {position}
              </ContextMenu.RadioItem>
            )}
          </ContextMenu.RadioGroup>
          <ContextMenu.Separator className={styles.ContextMenuSeparator}/>
          <ContextMenu.Label className={styles.ContextMenuLabel}>Font</ContextMenu.Label>
          <ContextMenu.RadioGroup value={font} onValueChange={font => setFont(font as Options['font'])}>
            {Object.keys(TextAreaFont).map((font) =>
              <ContextMenu.RadioItem className={styles.ContextMenuRadioItem} value={font} key={font}>
                <ContextMenu.ItemIndicator className={styles.ContextMenuItemIndicator}>
                  ✔️
                </ContextMenu.ItemIndicator>
                {font}
              </ContextMenu.RadioItem>
            )}
          </ContextMenu.RadioGroup>
        </ContextMenu.Content>
      </ContextMenu.Portal>
    </ContextMenu.Root>
  )
}
