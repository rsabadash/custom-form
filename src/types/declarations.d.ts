declare module '*.scss' {
	const content: {[className: string]: string};
	export = content;
}

declare type CustomPrimitiveAnyType = string | number | boolean | null | undefined;
declare type CustomStructureAnyType = { [key: string]: unknown } | [];
declare type FunctionType = () => CustomPrimitiveAnyType | void;
declare type UnionCustomAnyType = CustomPrimitiveAnyType | FunctionType;
