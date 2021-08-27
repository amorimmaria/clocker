import Link from 'next/link'
import { 
  Container,
  Box, 
  Input,
  Button, 
  Text, 
  FormControl,
  FormLabel,
  FormHelperText,
  } from '@chakra-ui/react'

import { useFormik } from 'formik'
import * as yup from 'yup'

import { Logo } from '../Logo'
import firebase, { persistenceMode } from './../../config/firebase'
import { useEffect } from 'react'


const validationSchema = yup.object().shape({
  email: yup.string().email('E-mail inválido').required('Preenchimento obrigatório'),
  password: yup.string().required('Preenchimento obrigatório'),
})

export const  Login = () => {
  const { 
    values, 
    errors, 
    touched, 
    handleBlur, 
    handleChange, 
    handleSubmit,
    isSubmitting
  } = useFormik({
    onSubmit: async ( values, form) => {
      firebase.auth().setPersistence(persistenceMode)
      try {
        const user = await firebase.auth().signInWithEmailAndPassword(values.email, values.password)
        console.log(user)
      } catch (error) {
        console.log('ERROR:', error)
      }
    },
    validationSchema,
    initialValues: {
      email: '',
      password: ''

    }

  })



  return (
    <Container p={4} centerContent>
      <Logo />
      <Box p={4} mt={8}>
        <Text>Crie sua agenda compartilhada</Text>
      </Box>

      <Box>
        <FormControl id="email" p={4} isRequired>
          <FormLabel>E-mail address</FormLabel>
          <Input size="lg" type="email" values={ values.email} onChange={ handleChange} onBlur={ handleBlur}  />
         { touched.email && <FormHelperText textColor="#e74c3c">{ errors.email}</FormHelperText>}
        </FormControl>

        <FormControl id="password" p={4} isRequired>
          <FormLabel>Senha</FormLabel>
          <Input size="lg" type="password"  values={ values.password} onChange={ handleChange} onBlur={ handleBlur}  />
          { touched.password && <FormHelperText textColor="#e74c3c">{ errors.password}</FormHelperText>}
        </FormControl>

        <Box p={4}>
          <Button colorScheme="blue" width="100%" onClick={ handleSubmit} isLoading={isSubmitting}>Entrar</Button>
        </Box>
      </Box>

      <Link href="/signup"> Ainda não tem uma conta? Cadastre-se</Link>
    </Container>
  )
}
