import { StrictMode } from 'react';
import '../styles/globals.css';
import { Provider } from 'react-redux';
import { store } from 'utils/store';
import 'tailwindcss/tailwind.css';

function MyApp({ Component, pageProps }) {
	return (
		<StrictMode>
			<Provider store={store}>
				<Component {...pageProps} />
			</Provider>
		</StrictMode>
	);
}

export default MyApp;
