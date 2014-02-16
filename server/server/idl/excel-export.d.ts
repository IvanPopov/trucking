/// <reference path="node.d.ts" />

declare module "excel-export" {
	export interface IExcelColumn {
		caption: string;
		type: string;
		beforeCellWrite?: (row, cellData) => any;
		width?: number;
	}

	export interface IExcelConfig {
		cols: IExcelColumn[];
		rows: any[][];
	}

	export function execute(conf: IExcelConfig): NodeBuffer; 
}