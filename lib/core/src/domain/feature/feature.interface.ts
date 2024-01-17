/**
 * このファイルは、Features型を定義するためのファイルです。
 * Features型は設計されたstatesオブジェクトに依存しています。
 */
import { Context } from "hono";
import { states } from "../../states";

/**
 * Featureの型定義です。
 */
export interface Feature {
	method: string;
	end: string;
	error?: {};
	validate?: (c: Context) => void;
	query?: {
		[queryName: string]: (params: any) => string;
	};
	client?: {
		anchors: string[];
		elements: {
			[elementName: string]: any;
		};
	};
	handler?: (c: Context) => any;
}

type ExtractPaths<S> = S extends { states: infer States }
	? {
			[K in keyof States]: K extends string
				? K | ExtractPaths<States[K]>
				: never;
	  }[keyof States]
	: never;

type AllPaths = ExtractPaths<typeof states>;

/**
 * Featuresの型定義です。
 */
export type Features = {
	[K in AllPaths]: Feature;
};
