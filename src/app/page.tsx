import Slide from "@/components/Slide/Slide";

export default function Home() {
  /* @ts-expect-error Server Component*/
  return (<Slide id={'test'} isEditable={true}/>)
}
