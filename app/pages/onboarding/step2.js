import React from 'react'
import { Item, Input, Form, Picker, Button, Text } from 'native-base'
import { Formik } from 'formik'
import * as Yup from 'yup'

export const Step2Page = () => {
    const schema = Yup.object().shape({
        province: Yup.string().required(),
        city: Yup.string().required()
    })

    const provinces = [
        'Eastern Cape',
        'Free State',
        'Gauteng',
        'KwaZulu-Natal',
        'Limpopo',
        'Mpumalanga',
        'Northern Cape',
        'North West',
        'Western Cape'
    ]

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
            province: '',
            city: ''
        }} onSubmit={values => {
            console.log(values)
        }}>
            {({
                values,
                handleChange,
                handleBlur,
                handleSubmit,
                errors,
                setFieldValue
            }) => {
                return (
                    <Form>
                        <Item regular style={{marginBottom: 10, ...errorStyle(errors, 'province')}} picker>
                            <Picker selectedValue={values.province} onValueChange={value => setFieldValue('province', value)} placeholder='Province'>
                                <Picker.Item value={null} label='Select Province' />
                                {provinces.map((province, index) => {
                                    return <Picker.Item key={index} value={province} label={province} />
                                })}
                            </Picker>
                        </Item>

                        <Item regular style={{marginBottom: 10, ...errorStyle(errors, 'city')}}>
                            <Input keyboardType='default' onBlur={handleBlur('city')} onChangeText={handleChange('city')} value={values.city} placeholder='City' />
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