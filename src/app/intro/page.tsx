"use client"
import "./intro.css"
import { useState } from "react"
import ThirdScene from "./scenes/ThirdScene"
import SecondScene from "./scenes/SecondScene"
import FirstScene from "./scenes/FirstScene"

const IntroPage = () => {
    const [step, setStep] = useState(0)

    return( 
        <main className="container-intro">
            { step === 0 && <FirstScene setStep={setStep}/>}
            {
                step === 1 && <SecondScene step={step} setStep={setStep}/>
            }
            {
                step === 2 && <ThirdScene step={step} setStep={setStep}/>
            }
        </main>
    )
}


export default IntroPage