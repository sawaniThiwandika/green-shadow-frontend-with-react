export function LabelComponent({ text, htmlFor }){
    return (
        <label htmlFor={htmlFor} className="block text-sm font-medium text-gray-700" >
            {text}
        </label>
    );

}