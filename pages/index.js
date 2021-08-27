import { 
  Container,
  Box, 
  Input,
  Button, 
  Text, 
  FormControl,
  FormLabel,
  FormHelperText
  } from '@chakra-ui/react'

import { Logo } from './../components'


export default function Home() {
  return (
    <Container p={4} centerContent>
      <Logo />
      <Box p={4} mt={8}>
        <Text>Crie sua agenda compartilhada</Text>
      </Box>

      <Box>
        <FormControl id="email" p={4} isRequired>
          <FormLabel>E-mail address</FormLabel>
          <Input type="email" />
          <FormHelperText>We'll never share your email.</FormHelperText>  
        </FormControl>

        <FormControl id="password" p={4} isRequired>
          <FormLabel>Senha</FormLabel>
          <Input type="password" />
        </FormControl>

        <Box display="flex" flexDirection="row" alignItems="center">
          <Text>clocker.work/</Text>
          <FormControl id="username" p={4} isRequired>
            <Input type="username" />
          </FormControl>
        </Box>

        <Box>
          <Button width="100%">Entrar</Button>
        </Box>
      </Box>
    </Container>
  )
}
