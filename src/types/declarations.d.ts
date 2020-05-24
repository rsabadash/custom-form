declare module '*.scss' {
	const content: {[className: string]: string};
	export = content;
}

declare type CustomAnyType = string | number | boolean | null | undefined;
