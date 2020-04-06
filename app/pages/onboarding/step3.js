import React from 'react'
import { View, Item, Input, Form, Picker, DatePicker, Button, Text } from 'native-base'
import { Formik } from 'formik'
import moment from 'moment'
import * as Yup from 'yup'

export const Step3Page = () => {
    const schema = Yup.object().shape({
        qualification: Yup.string().required(),
        institution: Yup.string().min(2).required(),
        skill1: Yup.string().required(),
        skill2: Yup.string().required()
    })

    const errorStyle = (errors, field) => {
        if (errors[field]) {
            return {
                borderColor: 'red'
            }
        }

        return {}
    }

    const qualifications = [
        'Below Grade 10',
        'Grade 10',
        'Grade 11',
        'Grade 12',
        'Diploma',
        'Degree',
        'Honours',
        'Masters',
        'PhD'
    ]

    const skills = [
        'Acting',
        'Sales'
    ]

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
                        <Item regular style={{marginBottom: 10, ...errorStyle(errors, 'qualification')}} picker>
                            <Picker selectedValue={values.qualification} onValueChange={value => setFieldValue('qualification', value)} placeholder='Highest Qualification'>
                                <Picker.Item value={null} label='Select Qualification' />
                                {qualifications.map((qualification, index) => {
                                    return <Picker.Item key={index} value={qualification} label={qualification} />
                                })}
                            </Picker>
                        </Item>

                        <Item regular style={{marginBottom: 10, ...errorStyle(errors, 'institution')}}>
                            <Input onBlur={handleBlur('institution')} onChangeText={handleChange('institution')} value={values.institution} placeholder='Institution' />
                        </Item>

                        <Item regular style={{marginBottom: 10, ...errorStyle(errors, 'skill1')}} picker>
                            <Picker selectedValue={values.skill1} onValueChange={value => setFieldValue('skill1', value)} placeholder='First Skill'>
                                <Picker.Item value={null} label='Select First Skill' />
                                {skills.map((skill, index) => {
                                    return <Picker.Item key={index} value={skill} label={skill} />
                                })}
                            </Picker>
                        </Item>

                        <Item regular style={{marginBottom: 10, ...errorStyle(errors, 'skill2')}} picker>
                            <Picker selectedValue={values.skill2} onValueChange={value => setFieldValue('skill2', value)} placeholder='Second Skill'>
                                <Picker.Item value={null} label='Select Second Skill' />
                                {skills.map((skill, index) => {
                                    return <Picker.Item key={index} value={skill} label={skill} />
                                })}
                            </Picker>
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