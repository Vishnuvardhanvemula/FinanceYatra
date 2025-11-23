import React from 'react'
import { createRoot } from 'react-dom/client'
import App from './App'
import './index.css'
import favicon from './assets/logo-source.png'

// set favicon dynamically so the bundled asset is used
const setFavicon = (src) => {
	try {
		let link = document.querySelector("link[rel~='icon']");
		if (!link) {
			link = document.createElement('link');
			link.rel = 'icon';
			document.getElementsByTagName('head')[0].appendChild(link);
		}
		link.href = src;
	} catch (e) {
		// ignore in non-browser environments
	}
};

setFavicon(favicon);

const container = document.getElementById('root')
const root = createRoot(container)
root.render(<App />)
