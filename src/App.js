import React, { useState, useRef, useEffect } from 'react';
import './App.css';
import { Flex, Box, Stack, Heading, Spinner } from '@chakra-ui/core'
import Post from './Components/Post';

import useHookWithRefCallback from './Hooks/useHookWithRefCallback'

function App() {
  const [count, setCount] = useState(1);
  const currCount = useRef(count);
  const [data, setData] = useState([]);

  useEffect(() => {
    currCount.current = count
  }, [count])

  const add_data = async () => {
    const arr = Array(10).fill(1);
    const prom = arr.map((_, j) => fetch(`https://xkcd.com/${currCount.current + j}/info.0.json`).then(res => res.json()))
    const all = await Promise.all(prom);
    setCount(c => c + 10)
    setData(s => [...s, ...all])
  }
  const [setref] = useHookWithRefCallback(add_data);


  return (

    <Box bg="teal.100">

      <Flex w='100%' paddign={10} bg="gray.500" justify="center" >
        <Heading as="div" size="2xl" color="white"> XKCD-gram</Heading>
      </Flex>

      <Stack align='center' mt='10px' spacing="10px">

        {data.map((p, i) => (<Box key={i}  ><Post post={p} /></Box>))}

      </Stack>
      <div ref={setref} ></div>
      <Flex my={5} justifyContent='center'>

        <Spinner
          thickness="4px"
          speed="0.65s"
          emptyColor="gray.200"
          color="blue.500"
          size="xl"
        />
      </Flex>

    </Box>
  );
}

export default App;