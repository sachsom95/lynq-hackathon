import React from 'react'
import {
    Center,
    Container,
    Heading,
    Text,
} from '@chakra-ui/react'

import UploadForm from '../components/UploadForm'

const LandingPage = () => {
  return (
    <Container maxW="container.lg">
        <Center p={4} minHeight="70vh">
            <Container maxW="container.md" textAlign="center">
                <Heading size="2xl" mb={4} color="gray.700">
                    Welcome to TeachGPT.
                </Heading>

                <Text fontSize="xl" color="gray.500">
                    Taking your course work and becoming your private subject expert by building mind maps on your topics of study.
                </Text>
                
                <UploadForm marginTop={4}/>
            </Container>        
        </Center>
    </Container>
  )
}

export default LandingPage