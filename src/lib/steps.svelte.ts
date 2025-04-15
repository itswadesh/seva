import { getContext, onDestroy, onMount, setContext } from 'svelte'

export class StepState {
	items = $state<any>({
		Mobiles: 0, Charger: 0, EarPhone: 0, Laptop: 0, SmartWatch: 0, Others: 0, Bag: 0
	})
	total_items = $state<number>(0)
	CollectSangatFaceImage = $state<string>('')
	CollectItemsImageBack = $state<string>('')
	CollectItemsImageFront = $state<string>('')
	TokenNo = $state<string>('')
	step_id = $state<number>(1)
	loading = $state<boolean>(false)
	tokenNo = $state<string>('')
	// getCurrentState() {
	// 	return {
	// 		step_id: this.step_id,
	// 		items: { ...this.items },
	// 		CollectSangatFaceImage: this.CollectSangatFaceImage,
	// 		CollectItemsImageBack: this.CollectItemsImageBack,
	// 		CollectItemsImageFront: this.CollectItemsImageFront,
	// 		TokenNo: this.TokenNo
	// 	}
	// }
	async checkImageExists(path: string) {
		try {
			const response = await fetch(`/uploads${path}`, { method: 'HEAD' });
			return response.ok;
		} catch {
			return false;
		}
	}
	getSangatFaceImage({ programId, sewadarId, tokenNo }: { programId: number, sewadarId: number, tokenNo: string }) {
		return `/${programId}/${sewadarId}/${tokenNo}/face.png`
	}
	getItemsImage({ programId, sewadarId, tokenNo, type }: { programId: number, sewadarId: number, tokenNo: string, type: string }) {
		const path = `/${programId}/${sewadarId}/${tokenNo}/${type}.png`
		return path
	}
	async updateStepId(step_id: number) {
		this.step_id = step_id
	}
	async updateItems(items: Partial<any>) {
		this.items = items
		this.total_items = Object.values(this.items).reduce((sum, val) => +sum + (+val || 0), 0)
	}

	async clearItems() {
		this.items = {
			Mobiles: 0, Charger: 0, EarPhone: 0, Laptop: 0, SmartWatch: 0, Others: 0, Bag: 0
		}
		this.total_items = 0
	}

	async updateSangatFaceImage({ tokenNo, filepath }: { tokenNo: string, filepath: string }) {
		this.tokenNo = tokenNo
		this.CollectSangatFaceImage = filepath
	}

	async updateItemsImage({ CollectItemsImageFront, CollectItemsImageBack }: { CollectItemsImageFront: string, CollectItemsImageBack: string }) {
		this.CollectItemsImageFront = CollectItemsImageFront
		this.CollectItemsImageBack = CollectItemsImageBack
	}

	async updateTokenNo(TokenNo: string) {
		this.TokenNo = TokenNo
	}

}

const STEP_KEY = Symbol('STEP')

export function setStepState() {
	return setContext(STEP_KEY, new StepState())
}

export function getStepState() {
	return getContext<ReturnType<typeof setStepState>>(STEP_KEY)
}
