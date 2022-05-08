import React, { useState, useEffect, useContext, SetStateAction } from "react"

import { AppContext } from "../App/Context"

import { numGenerator } from "../Helpers/numGenerator"
import { operatorGenerator } from "../Helpers/operatorGenerator"
import { calcResult } from "../Helpers/calcResult"
import { isEqual } from "../Helpers/isEqual"
////////////////////////////////////////////////////////////
interface calculationUnitProps {
    timePassed?: boolean
}
const CalculationUnit = ({ timePassed }: calculationUnitProps) => {
    //STATE//
    const [input, setInput] = useState<number>()
    const [num1, setNum1] = useState<number>(0)
    const [num2, setNum2] = useState<number>(0)
    const [operator, setOperator] = useState<"+" | "-" | "*" | "/">("+")
    const [locked, setLock] = useState<boolean>(false)
    const [sucess, setSucess] = useState<boolean | null>()

    const appContext = useContext(AppContext)
    //FUNCTIONS//
    const hadnleInput = (e: any) => {
        e.preventDefault()
        let value = e.currentTarget.value
        let valueArr = value.split("")
        if (Number(valueArr[valueArr.length - 1])) {
            setInput(Number(value))
        } else if (e.code !== "Backspace") {
            e.currentTarget.value = String(input ? input : "")
        }

    }

    const handleSubmit = (e: any) => {
        if (e.code === "Enter" || e.code === "NumpadEnter") {
            appContext!.fn.setNocCompleted(appContext!.nocCompleted + 1)
            setLock(true)
            setSucess(isEqual(result, input!))
        }
    }


    //VARIBLES//
    const result = calcResult({ num1, num2, operator })

    const inputProps = {
        type: "text",
        onKeyUp: (e: React.BaseSyntheticEvent) => { hadnleInput(e); handleSubmit(e) },
        onTouchEnd: hadnleInput
    }

    //EFFECTS//
    useEffect(() => {
        let oper: any = operatorGenerator()
        setOperator(oper)
        /*handle divide */
        if (oper === "/") {
            let number1 = numGenerator(1, 10)
            let number2 = numGenerator(1, 10)
            let res = number1 * number2
            setNum1(res)
            switch (numGenerator(1, 2)) {
                case 1:
                    setNum2(number1)
                    return;
                case 2:
                    setNum2(number2)
                    return;
            }
        } else {
            setNum1(numGenerator(1, 100))
            setNum2(numGenerator(1, 10))
        }
    }, [])
    useEffect(() => {
        if (timePassed === true) setLock(true)
    }, [timePassed])
    //SETUP//
    return (
        <div className={`unit ${sucess === true ? "correct" : sucess === false ? "uncorrect" : ""}`}>
            <p className="unit_operand">{num1}</p>
            <p className="unit_operator">{operator}</p>
            <p className="unit_operand">{num2} = </p>
            <input className="unit_result" {...inputProps} disabled={locked} />
        </div>
    )
}
////////////////////////////////////////////////////////////
export { CalculationUnit }