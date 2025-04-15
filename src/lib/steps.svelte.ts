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
	sangatId = $state<string>('')
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
	getSangatFaceImage({ programId, sewadarId, sangatId }: { programId: number, sewadarId: number, sangatId: string }) {
		return `/${programId}/${sewadarId}/${sangatId}/face.png`
	}
	getItemsImage({ programId, sewadarId, sangatId, type }: { programId: number, sewadarId: number, sangatId: string, type: string }) {
		const path = `/${programId}/${sewadarId}/${sangatId}/${type}.png`
		return path
	}
	async updateStepId(step_id: number) {
		this.step_id = step_id
	}
	async updateItems(items: Partial<any>) {
		this.items = items
		this.total_items = Object.values(this.items).reduce((sum, val) => +sum + (+val || 0), 0)
	}

	async updateSangatFaceImage({ sangatId, filepath }: { sangatId: string, filepath: string }) {
		this.sangatId = sangatId
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
