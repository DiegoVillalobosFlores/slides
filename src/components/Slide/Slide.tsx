import {Card, CardHeader, CardContent} from "@/components/Card";
import {Button} from "@/components/Button";
import TextArea from "@/components/TextArea/TextArea";
import RedisInstance from "@/clients/redis";
import RedisOptionsService, {OptionsSchema} from "@/services/redis/options";

type Props = {
	id: string;
	isEditable: boolean
}

const redis = await RedisInstance();
const OptionsService = RedisOptionsService(redis);

export default async function Slide({id, isEditable}: Props) {
	const options = await OptionsService.getOptions(id)
	const defaultOptions = OptionsSchema.parse(undefined)
	return (
		<Card>
			<CardHeader>
				I think this font looks okay right?
			</CardHeader>
			<CardContent>
				<div>Seems about right</div>
				<br/>
				<div>
					<TextArea
						savedOptions={options || defaultOptions}
						id={id}
						editable={isEditable}
					/>
				</div>
			</CardContent>
			<Button>
				This is a button
			</Button>
		</Card>
	)
}
