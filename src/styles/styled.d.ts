import 'styled-components';

declare module 'styled-components' {
	export interface DefaultTheme {
		title: string;
		background: {
			primary: string;
		};
		text: {
			primary: string;
		};
	}
}
