import Layout from "@/components/Layout/Layout";
import {ReactNode} from "react";

type Props = {
	editor: ReactNode;
	live: ReactNode;
	children: ReactNode;
}

export default function SlidesLayout({children, editor, live}: Props) {
	return (
		<Layout editor={editor} live={live}>
			{children}
		</Layout>
	)
}