import React from 'react';
import { Flex, Text } from '@chakra-ui/react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import NotFound from './pages/NotFound';
import Home from './pages/Home';

function Router() {
  return (
    <BrowserRouter>
      <Flex w='100vw' direction='column'>
        <Flex w='100%' h='60px' bgColor='blue' mb='20px' pl='30px' alignItems='center'>
          <Text fontSize='2xl' color='white'>Header</Text>
        </Flex>

        <Flex>
          <Switch>
            <Route path='/poke'><Home /></Route>
            <Route><NotFound /></Route>
          </Switch>
        </Flex>
      </Flex>
    </BrowserRouter>
  );
}

export default Router;
