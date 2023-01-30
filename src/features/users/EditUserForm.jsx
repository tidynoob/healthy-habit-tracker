import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
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
import { useUpdateUserMutation, useDeleteUserMutation } from './usersApiSlice'

const USER_REGEX = /^[a-zA-Z0-9]{3,}$/
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/
const EMAIL_REGEX = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/

function EditUserForm({ user }) {
  const [updateUser, { isLoading, isSuccess, isError, error }] =
    useUpdateUserMutation()

  const [
    deleteUser,
    { isSuccess: isDeleteSuccess, isError: isDeleteError, error: deleteError }
  ] = useDeleteUserMutation()

  const navigate = useNavigate()

  const [username, setUsername] = useState(user.username)
  const [validUsername, setValidUsername] = useState(false)
  const [password, setPassword] = useState('')
  const [validPassword, setValidPassword] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [email, setEmail] = useState(user.email)
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

    if (isDeleteSuccess) {
      setUsername('')
      setPassword('')
      setEmail('')
      navigate('/')
    }
  }, [isSuccess, isDeleteSuccess])

  const onUsernameChange = (e) => {
    setUsername(e.target.value)
  }
  const onPasswordChange = (e) => {
    setPassword(e.target.value)
  }

  const onEmailChange = (e) => {
    setEmail(e.target.value)
  }

  let validUser
  if (password) {
    validUser =
      [validUsername, validPassword, validEmail].every(Boolean) && !isLoading
  } else {
    validUser = [validUsername, validEmail].every(Boolean) && !isLoading
  }

  const onSubmit = async (e) => {
    e.preventDefault()
    if (validUser) {
      await updateUser({
        id: user.id,
        username,
        password,
        email
      })
    } else {
      await updateUser({
        id: user.id,
        username,
        email
      })
    }
  }

  const onDelete = async (e) => {
    e.preventDefault()
    await deleteUser(user.id)
  }

  return (
    <Container
      bg="white"
      p="4"
      borderRadius="base"
      maxW={{ base: 'full', md: 'sm' }}
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
            <Input type="text" value={username} onChange={onUsernameChange} />
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
            isLoading={isLoading}
            isDisabled={!validUser}
          >
            Sign Up
          </Button>
          <Text
            color="red.500"
            visibility={isError || isDeleteError ? 'visible' : 'hidden'}
          >
            {error?.data?.message || deleteError?.data?.message}
          </Text>
          <Text color="teal.500" onClick={onDelete}>
            Delete User
          </Text>
        </Stack>
      </form>
    </Container>
  )
}

export default EditUserForm
