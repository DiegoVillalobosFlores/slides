import {Fragment, ReactNode} from 'react'
import styles from './ContextMenu.module.scss'
import * as RadixContextMenu from "@radix-ui/react-context-menu";

type MenuItem = {
	type: 'RadioGroup'
	label: string,
	options: Array<string>
	withSeparator?: boolean
} & RadixContextMenu.MenuRadioGroupProps

type Props = {
  children: ReactNode
	disabled?: boolean
	items: Array<MenuItem>
}

export default function ContextMenu({children, disabled = false, items}: Props) {
  return (
	  <RadixContextMenu.Root>
		  <RadixContextMenu.Trigger disabled={disabled}>
			  {children}
		  </RadixContextMenu.Trigger>
		  <RadixContextMenu.Portal>
			  <RadixContextMenu.Content className={`${styles.ContextMenuContent} dark-theme`}>
				  {items.map(({type, label, options, withSeparator, ...groupProps}) => (
					  <Fragment key={label}>
						  <RadixContextMenu.Label className={styles.ContextMenuLabel}>{label}</RadixContextMenu.Label>
						  <RadixContextMenu.RadioGroup {...groupProps}>
							  {options.map((option) =>
								  <RadixContextMenu.RadioItem className={styles.ContextMenuRadioItem} value={option} key={option}>
									  <RadixContextMenu.ItemIndicator className={styles.ContextMenuItemIndicator}>
										  ✔️
									  </RadixContextMenu.ItemIndicator>
									  {option}
								  </RadixContextMenu.RadioItem>
							  )}
						  </RadixContextMenu.RadioGroup>
						  {withSeparator && <RadixContextMenu.Separator className={styles.ContextMenuSeparator}/>}
					  </Fragment>
				  ))}
			  </RadixContextMenu.Content>
		  </RadixContextMenu.Portal>
	  </RadixContextMenu.Root>
  )
}
