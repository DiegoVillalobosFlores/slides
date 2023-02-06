import {z} from "zod";
import {OptionsSchema} from "@/services/redis/options";

type Options = z.infer<typeof OptionsSchema>

export default Options;
