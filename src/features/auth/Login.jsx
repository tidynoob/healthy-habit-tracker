import React, { useState, useEffect, useRef } from 'react'
import { Link as RouterLink, useNavigate } from 'react-router-dom'
import { BiHide, BiShow } from 'react-icons/bi'
import {
  Text,
  Stack,
  Heading,
  FormControl,
  FormLabel,
  InputGroup,
  InputRightElement,
  Button,
  Input,
  Container,
  IconButton,
  Spinner
} from '@chakra-ui/react'
import { useDispatch } from 'react-redux'
import { useLoginMutation } from './authApiSlice'
import { setCredentials } from './authSlice'
import Background from '../../components/Background'

const newUserForm = () => {
  const userRef = useRef()
  const errRef = useRef()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')

  const navigate = useNavigate()
  const dispatch = useDispatch()

  const [login, { isLoading }] = useLoginMutation()

  useEffect(() => {
    userRef.current.focus()
  }, [])

  useEffect(() => {
    setErrorMessage('')
  }, [email, password])

  const onEmailChange = (e) => {
    setEmail(e.target.value)
  }

  const onPasswordChange = (e) => {
    setPassword(e.target.value)
  }

  const onSubmit = async (e) => {
    try {
      e.preventDefault()
      const { accessToken } = await login({ email, password }).unwrap()
      dispatch(setCredentials({ accessToken }))
      setEmail('')
      setPassword('')
      navigate('/dash')
    } catch (err) {
      if (!err.status) {
        setErrorMessage('Network Error')
      } else if (err.status === 400) {
        setErrorMessage('Missing fields')
      } else if (err.status === 401) {
        setErrorMessage('Invalid credentials')
      } else {
        setErrorMessage(err.data?.message)
      }
      errRef.current.focus()
    }
  }

  const content = isLoading ? (
    <Spinner mt="10" />
  ) : (
    <form>
      <Stack spacing="4">
        <Heading as="h1" fontSize="2xl" textAlign="center">
          Log In
        </Heading>
        <FormControl id="email" isRequired>
          <FormLabel>Email address</FormLabel>
          <Input
            type="email"
            value={email}
            onChange={onEmailChange}
            ref={userRef}
          />
        </FormControl>
        <FormControl id="password" isRequired>
          <FormLabel>Password</FormLabel>
          <InputGroup>
            <Input
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={onPasswordChange}
            />
            <InputRightElement h="full">
              <IconButton
                aria-label="Show Password"
                variant="ghost"
                icon={showPassword ? <BiHide /> : <BiShow />}
                onClick={() => setShowPassword(!showPassword)}
              />
            </InputRightElement>
          </InputGroup>
        </FormControl>
        <Button colorScheme="teal" onClick={onSubmit} isLoading={isLoading}>
          Log In
        </Button>
        <Text
          color="red.500"
          ref={errRef}
          visibility={errorMessage ? 'visible' : 'hidden'}
        >
          {errorMessage}
        </Text>
        <Text align="center">
          Not a user?{' '}
          <RouterLink to="/register">
            <Text
              as="span"
              color="teal.500"
              display="inline"
              _hover={{ textDecoration: 'underline' }}
            >
              Sign Up
            </Text>
          </RouterLink>{' '}
        </Text>
      </Stack>
    </form>
  )

  return (
    <Background>
      <Container
        bg="white"
        p="4"
        borderRadius="base"
        mt="10"
        maxW={{ base: 'full', md: 'sm' }}
      >
        {content}
      </Container>
    </Background>
  )
}

export default newUserForm
