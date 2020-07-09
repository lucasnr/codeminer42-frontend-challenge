import 'styled-components';

declare module 'styled-components' {
	export interface DefaultTheme {
		title: string;
		background: {
			primary: string;
			secondary: string;
		};
		text: {
			primary: string;
			secondary: string;
		};
		colors: {
			primary: string;
			secondary: string;
		};
	}
}
