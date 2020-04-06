import React from 'react'
import { View, Item, Input, Form, Picker, DatePicker, Button, Text } from 'native-base'
import { Formik } from 'formik'
import moment from 'moment'
import * as Yup from 'yup'

export const Step1Page = () => {
    const schema = Yup.object().shape({
        firstname: Yup.string().min(2).required(),
        lastname: Yup.string().min(2).required(),
        idNumber: Yup.string().length(13).required(),
        gender: Yup.string().required(),
        dob: Yup.string().required()
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
            firstname: '',
            lastname: '',
            gender: '',
            dob: '',
            idNumber: ''
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
                        <Item regular style={{marginBottom: 10, ...errorStyle(errors, 'firstname')}}>
                            <Input onBlur={handleBlur('firstname')} onChangeText={handleChange('firstname')} value={values.firstname} placeholder='Name' />
                        </Item>

                        <Item regular style={{marginBottom: 10, ...errorStyle(errors, 'lastname')}}>
                            <Input onBlur={handleBlur('lastname')} onChangeText={handleChange('lastname')} value={values.lastname} placeholder='Last Name' />
                        </Item>

                        <Item regular style={{marginBottom: 10, ...errorStyle(errors, 'idNumber')}}>
                            <Input keyboardType='decimal-pad' onBlur={handleBlur('idNumber')} onChangeText={handleChange('idNumber')} value={values.idNumber} placeholder='ID Number' />
                        </Item>
                        
                        <Item regular style={{marginBottom: 10, ...errorStyle(errors, 'gender')}} picker>
                            <Picker selectedValue={values.gender} onValueChange={value => setFieldValue('gender', value)} placeholder='Gender'>
                                <Picker.Item value={null} label='Select Gender' />
                                <Picker.Item value='male' label='Male' />
                                <Picker.Item value='female' label='Female' />
                            </Picker>
                        </Item>

                        <Item regular style={{marginBottom: 10, paddingTop: 5, paddingBottom: 5, ...errorStyle(errors, 'dob')}} picker>
                            <DatePicker placeHolderText='Date of Birth' defaultDate={values.dob} onDateChange={value => handleChange('dob')(moment(value).format('YYYY-MM-DD'))} maximumDate={moment().subtract(18, 'years').toDate()} />
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