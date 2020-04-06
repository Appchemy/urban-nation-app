import React from 'react'
import { Item, Input, Form, Picker, Button, Text, Textarea } from 'native-base'
import { Formik } from 'formik'
import * as Yup from 'yup'

export const Step4Page = () => {
    const schema = Yup.object().shape({
        bio: Yup.string().required()
    })

    const errorStyle = (errors, field) => {
        if (errors[field]) {
            return {
                borderColor: 'red'
            }
        }

        return {}
    }

    return (
        <Formik validationSchema={schema} initialValues={{
            bio: ''
        }} onSubmit={values => {
            console.log(values)
        }}>
            {({
                values,
                handleChange,
                handleBlur,
                handleSubmit,
                errors
            }) => {
                return (
                    <Form>
                        <Item regular style={{marginBottom: 10, minHeight: 200, alignItems: 'flex-start', ...errorStyle(errors, 'bio')}}>
                            <Textarea numberOfLines={8} keyboardType='default' onBlur={handleBlur('bio')} onChangeText={handleChange('bio')} value={values.bio} placeholder='Bio' />
                        </Item>

                        <Button block dark onPress={() => {
                            handleSubmit()
                        }}>
                            <Text>Continue</Text>
                        </Button>
                    </Form>
                )
            }}
            
        </Formik>
    )
}