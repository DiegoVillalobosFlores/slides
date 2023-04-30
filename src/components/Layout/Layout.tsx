import {ReactNode} from "react";
import styles from './Layout.module.scss'

type Props = {
	editor: ReactNode;
	live: ReactNode;
	children: ReactNode;
}

export default function Layout({editor, live, children}: Props) {
	return (
		<div className={styles.root}>
			<div className={styles.left}>
				{children}
			</div>
			<div className={styles.right}>
				{editor}
				{live}
			</div>
		</div>
	)
}