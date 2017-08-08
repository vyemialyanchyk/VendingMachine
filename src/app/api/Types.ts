const isIndex = (key): boolean => {
	const n = ~~Number(key);
	return String(n) === key && n >= 0;
}

export enum GoodsEnum {
	NONE = 0,
	APPLE = 1,
	PEAR = 2,
	CHERRY = 3,
}
export const GoodLabels: string[] = [
	'',
	'Apple',
	'Pear',
	'Cherry',
]
const GoodsEnum_names: string[] = Object.keys(GoodsEnum).filter(key => !isIndex(key));
const GoodsEnum_indices: number[] = Object.keys(GoodsEnum).filter(key => isIndex(key)).map(index => Number(index));
export namespace GoodsEnum {
	export function getLabel(good: GoodsEnum): string {
		if (good < 0 || good >= GoodLabels.length) {
			good = GoodsEnum.NONE;
		}
		return GoodLabels[good];
	}

	export function getEnum4Name(name: string): GoodsEnum {
		var res: GoodsEnum = names().indexOf(name);
		if (res === -1) {
			res = indices().indexOf(Number(name));
		}
		if (res === undefined) {
			res = GoodsEnum.NONE;
		}
		return res;
	}

	export function names(): string[] {
		return GoodsEnum_names;
	}

	export function indices(): number[] {
		return GoodsEnum_indices;
	}
}
