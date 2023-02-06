import Slide from "@/components/Slide/Slide";

type Props = {
  params: {
    slidesId: string,
    slideId: string
  }
}

export default function SlideViewPage({params}: Props) {
  const id = params.slideId;
  /* @ts-expect-error Server Component*/
  return (<Slide id={id} isEditable={false}/>)
}
