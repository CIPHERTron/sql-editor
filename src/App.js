import './App.css';

import styled from 'styled-components';
import tw from 'twin.macro';

import Routes from './routes';

const Container = styled.div`
	${tw`
  font-extrabold
  text-3xl
  `};
`;

function App() {
	return (
		<Container>
			<Routes />
		</Container>
	);
}

export default App;
