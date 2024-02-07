// ForgotResetPasswordPage.js

import React, { useState } from 'react';
import {
  Box,
  Button,
  Input,
  Stack,
  FormControl,
  FormLabel,
  Heading,
  Text,
} from '@chakra-ui/react';

const ForgotResetPasswordPage = () => {
  const [email, setEmail] = useState('');
  const [token, setToken] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleForgotPassword = async () => {
    try {
      const response = await fetch('http://your-backend-url/forgot_password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      if (response.ok) {
        setMessage('Email sent successfully. Check your email for the reset link.');
      } else {
        setMessage('Error sending email. Please try again.');
      }
    } catch (error) {
      console.error('Internal server error:', error);
    }
  };

  const handleResetPassword = async () => {
    try {
      const response = await fetch('http://your-backend-url/reset_password', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ token, newPassword, email }),
      });

      if (response.ok) {
        setMessage('Password reset successfully.');
      } else {
        setMessage('Error resetting password. Please try again.');
      }
    } catch (error) {
      console.error('Internal server error:', error);
    }
  };

  return (
    <Box p={4} mt={"100px"}>
      <Stack spacing={4} align="center">
        <Heading>Forgot Password</Heading>
        <form onSubmit={(e) => { e.preventDefault(); handleForgotPassword(); }}>
          <FormControl>
            <FormLabel>Email:</FormLabel>
            <Input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </FormControl>
          <Button type="submit" colorScheme="blue">Request Password Reset</Button>
        </form>
      </Stack>

      <Stack spacing={4} align="center" mt={8}>
        <Heading>Reset Password</Heading>
        <form onSubmit={(e) => { e.preventDefault(); handleResetPassword(); }}>
          <FormControl>
            <FormLabel>Token:</FormLabel>
            <Input
              type="text"
              value={token}
              onChange={(e) => setToken(e.target.value)}
              required
            />
          </FormControl>
          <FormControl>
            <FormLabel>New Password:</FormLabel>
            <Input
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
            />
          </FormControl>
          <Button type="submit" colorScheme="blue">Reset Password</Button>
        </form>
      </Stack>

      {message && (
        <Text mt={4} color={message.includes('successfully') ? 'green.500' : 'red.500'}>
          {message}
        </Text>
      )}
    </Box>
  );
};

export default ForgotResetPasswordPage;
