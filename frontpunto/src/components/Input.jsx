import {useState} from "react";

const Input = ({input,
                   onChange, sty= "normal" }) => {

    const styles = {
        "normal": "border h-[65px] ",
        "underline": "border-b-4 bg-gray-300 p-4 text-2xl rounded",
        "search": "border border-gray-300 p-2 bg-white"
    }

    input = {value: "", type: "normal", error: false, placeholder: "", ...input}

    return <input
        autoFocus={true}
        placeholder={input.placeholder}
        className={`
            w-full 
            ${styles[sty]}
            outline-none
            ${input.error ? "border-1 border-red-400" : ""}
        `}
        type={input.type}
        value={input.value}

        onChange={(ev) => {
            let {target: {value}} = ev;
            onChange({...input, value, error: value.length === 0});
        }}
    />
}

export default Input;