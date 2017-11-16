/// <reference types="react" />

declare module 'react-interval' {
	type Props = {
		callback: Function;
		enabled?: boolean;
		timeout?: number;
	};

	const ReactInterval: React.ComponentClass<Props>;

	export = ReactInterval;
}
