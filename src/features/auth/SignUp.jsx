import React, { useState, useEffect } from 'react'
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
  IconButton
} from '@chakra-ui/react'
import { useDispatch } from 'react-redux'
import { useAddNewUserMutation } from '../users/usersApiSlice'
import { useLoginMutation } from './authApiSlice'
import { setCredentials } from './authSlice'
import Background from '../../components/Background'

const USER_REGEX = /^[a-zA-Z0-9]{3,}$/
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/
const EMAIL_REGEX = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/

const newUserForm = () => {
  const [addNewUser, { isLoading, isSuccess, isError, error }] =
    useAddNewUserMutation()
  const [
    login,
    { isLoading: isLoginLoading, isError: isLoginError, error: loginError }
  ] = useLoginMutation()
  const dispatch = useDispatch()

  const navigate = useNavigate()

  const [username, setUsername] = useState('')
  const [validUsername, setValidUsername] = useState(false)
  const [password, setPassword] = useState('')
  const [validPassword, setValidPassword] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [email, setEmail] = useState('')
  const [validEmail, setValidEmail] = useState(false)

  useEffect(() => {
    setValidUsername(USER_REGEX.test(username))
  }, [username])

  useEffect(() => {
    setValidPassword(PWD_REGEX.test(password))
  }, [password])

  useEffect(() => {
    setValidEmail(EMAIL_REGEX.test(email))
  }, [email])

  useEffect(() => {
    if (isSuccess) {
      setUsername('')
      setPassword('')
      setEmail('')
      navigate('/dash')
    }
  }, [isSuccess])

  const onUsernameChange = (e) => {
    setUsername(e.target.value)
  }
  const onPasswordChange = (e) => {
    setPassword(e.target.value)
  }

  const onEmailChange = (e) => {
    setEmail(e.target.value)
  }

  const validUser =
    [validUsername, validPassword, validEmail].every(Boolean) && !isLoading

  const onSubmit = async (e) => {
    e.preventDefault()
    if (!validUser) return
    await addNewUser({ username, password, email })
    const { accessToken } = await login({ email, password }).unwrap()
    dispatch(setCredentials({ accessToken }))
    setUsername('')
    setPassword('')
    setEmail('')
    navigate('/dash')
  }

  return (
    <Background>
      <Container px={{ base: '4', md: '0' }}>
        <Container
          bg="white"
          p="4"
          borderRadius="base"
          maxW={{ base: 'full', md: 'sm' }}
          mt="10"
          // mx={{ base: '4', lg: '0' }}
        >
          <form>
            <Stack spacing="4">
              <Heading as="h1" fontSize="2xl" textAlign="center">
                Sign Up
              </Heading>
              <FormControl id="email" isRequired isInvalid={!validEmail}>
                <FormLabel>Email address</FormLabel>
                <Input type="email" value={email} onChange={onEmailChange} />
              </FormControl>
              <FormControl id="username" isRequired isInvalid={!validUsername}>
                <FormLabel>Username</FormLabel>
                <Input
                  type="text"
                  value={username}
                  onChange={onUsernameChange}
                />
              </FormControl>
              <FormControl id="password" isRequired isInvalid={!validPassword}>
                <FormLabel>Password</FormLabel>
                <InputGroup>
                  <Input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={onPasswordChange}
                  />
                  <InputRightElement h="full">
                    {/* <Button
                  h="full"
                  variant="ghost"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <BiHide /> : <BiShow />}
                </Button> */}
                    <IconButton
                      aria-label="Show Password"
                      variant="ghost"
                      icon={showPassword ? <BiHide /> : <BiShow />}
                      onClick={() => setShowPassword(!showPassword)}
                    />
                  </InputRightElement>
                </InputGroup>
              </FormControl>
              <Button
                colorScheme="teal"
                onClick={onSubmit}
                isLoading={isLoading || isLoginLoading}
                isDisabled={!validUser}
              >
                Sign Up
              </Button>
              <Text
                color="red.500"
                visibility={isError || isLoginError ? 'visible' : 'hidden'}
              >
                {error?.data?.message || loginError?.data?.message}
              </Text>
              <Text align="center">
                Already a user?{' '}
                <RouterLink to="/login">
                  <Text
                    as="span"
                    color="teal.500"
                    display="inline"
                    _hover={{ textDecoration: 'underline' }}
                  >
                    Log In
                  </Text>
                </RouterLink>{' '}
              </Text>
            </Stack>
          </form>
        </Container>
      </Container>
    </Background>
  )
}

export default newUserForm
