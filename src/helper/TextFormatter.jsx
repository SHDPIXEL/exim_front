import { htmlToText } from "html-to-text";

const TextFormatter = (text) => {
    return (
        <p>{htmlToText(text, {
            wordwrap: 130,
        })}</p>
    )
}
export default TextFormatter;