import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Weather from './components/Weather'
import GetLocation from './components/GetLocation';

ReactDOM.render(
	<React.StrictMode>
		<GetLocation />
	</React.StrictMode>,
	document.getElementById('root')
);
