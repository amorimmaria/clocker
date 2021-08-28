/* eslint-disable react/no-children-prop */
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
  InputLeftAddon,
  InputGroup
  } from '@chakra-ui/react'

import { useFormik } from 'formik'
import * as yup from 'yup'

import { Logo } from '../components'
import { firebaseClient } from '../config/firebase/client'


const validationSchema = yup.object().shape({
  email: yup.string().email('E-mail inválido').required('Preenchimento obrigatório'),
  password: yup.string().required('Preenchimento obrigatório'),
  username: yup.string().required('Preenchimento obrigatório')
})

export default function Home() {
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
      try {
        const user = await firebase.auth().createUserWithEmailAndPassword(values.email, values.password)
        console.log(user)
      } catch (error) {
        console.log('ERROR:', error)
      }
    },
    validationSchema,
    initialValues: {
      email: '',
      username: '',
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

       

          <FormControl id="username" p={4} isRequired>
            <InputGroup size="lg">
              <InputLeftAddon children="clocker.work/" />
              <Input type="username" value={values.username} onChange={handleChange} onBlur={handleBlur} />
            </InputGroup>
            { touched.username && <FormHelperText textColor="#e74c3c">{ errors.username}</FormHelperText>} 
          </FormControl>

        <Box>
          <Button colorScheme="blue" width="100%" onClick={ handleSubmit} isLoading={isSubmitting}>Entrar</Button>
        </Box>
      </Box>

      <Link href="/">Já uma conta? Acesse!</Link>

    </Container>
  )
}
