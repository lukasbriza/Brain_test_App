import React, { SetStateAction, useState } from 'react'


////////////////////////////////////////////////////////////
interface inputProps {
    type: string;
    pattern: RegExp;
    valueCallback: React.Dispatch<SetStateAction<{ value: any, canSubmit: boolean }>>;
    errorMessage: string;
    modificationClasses?: string;
}

const Input = ({ type, pattern, valueCallback, errorMessage, modificationClasses }: inputProps) => {
    //STATE//
    const [isError, setError] = useState<boolean>(false)

    //HANDLERS//
    const handleChange = (e: React.FormEvent<HTMLInputElement>): void => {
        //VERIFICATION//
        let value = e.currentTarget.value
        let verification = pattern.test(value)
        console.log(verification)
        verification ? setError(false) : setError(true)
        verification ? valueCallback({ value: value, canSubmit: true }) : valueCallback({ value: value, canSubmit: false })

    }


    //SETUP//
    return (
        <div className={`input ${modificationClasses ? modificationClasses : ""}`}>
            <input
                type={type}
                onChange={(e) => { handleChange(e) }}
            />
            <p className={`input_error ${isError ? "show" : "hide"}`}>{errorMessage}</p>
        </div>
    )
}
////////////////////////////////////////////////////////////
export { Input }