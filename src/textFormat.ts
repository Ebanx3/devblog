import { Remarkable } from "remarkable";

const md = new Remarkable()

const formatText = async (s: string): Promise<string> => {
    const res: string[] = s.split("\n");
    const n: string[] = res.map((str: string) => {
        let st = str;
        if (st === "") return "//n"
        return st
    })
    const st = await md.render(n.join("\n")).replaceAll("//n", "<br/>")
    return st
}

export default formatText;

