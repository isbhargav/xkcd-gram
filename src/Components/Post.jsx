import React from 'react'
import { Box, Image, Heading, Flex } from "@chakra-ui/core"

export default function Post({ post }) {
    return (
        <Box p={2} bg="gray.100" shadow='md' >
            <Heading textAlign='center' m={5}>{post.title}</Heading>
            <Flex justifyContent='center'>
                <Image size={350} src={post.img} alt="dan" />
            </Flex>
        </Box>
    )
}
