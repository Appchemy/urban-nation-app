import { Container, Content, Text, Button, View } from "native-base"
import React, { useState } from 'react'
import { Step1Page } from "./step1"
import { Step2Page } from "./step2"
import { Step3Page } from "./step3"
import { Step4Page } from "./step4"

export const OnBoardingPage = () => {
    const [step, setStep] = useState(4)

    const onSave = (values) => {
        console(values)
        setStep(step + 1)
    }

    return (
        <Container>
            <Content contentContainerStyle={{padding: 20}}>
                <Text style={{textAlign: 'center', fontWeight: 'bold'}}>Step {step}</Text>
                <View style={{
                    paddingTop: 20,
                    paddingBottom: 20
                }}>
                    {step == 1 && <Step1Page onContinue={onSave} />}
                    {step == 2 && <Step2Page onContinue={onSave} />}
                    {step == 3 && <Step3Page onContinue={onSave} />}
                    {step == 4 && <Step4Page onContinue={onSave} />}
                </View>
            </Content>
        </Container>
    )
}

OnBoardingPage.navigationOptions = {
    title: "Let's Setup Your Profile"
}