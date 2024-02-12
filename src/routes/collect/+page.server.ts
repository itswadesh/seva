import { fail, type Actions } from '@sveltejs/kit';
import { formSchema } from './schema';
import { superValidate } from 'sveltekit-superforms/server';
import { updateStore } from '$lib/store/collectionStore';

const initialState = {
	Charger: 0,
	Collect_SewadarID: '',
	Collect_SewadarName: '',
	CollectSangatFaceImage: '',
	EarPhone: 0,
	EarPod: 0,
	ID: '',
	ItemsImageBack: '',
	ItemsImageFront: '',
	Mobiles: 0,
	Others: 0,
	PowerBank: 0,
	SmartWatch: 0,
	TokenNo: 0,
	TotalItems: 0,
};

export const load = async () => {
	return {
		form: await superValidate(formSchema)
	};
};


export const actions: Actions = {
	default: async (event) => {
		const formData = await event.request.formData()

		const charger = formData.get('charger')
		const earphones = formData.get('earphones')
		const earpods = formData.get('earpods')
		const mobile = formData.get('mobile')
		const others = formData.get('others')
		const smartwatch = formData.get('smartwatch')

		// const data = {
		// 	charger,
		// 	earphones,
		// 	earpods,
		// 	mobile,
		// 	others,
		// 	smartwatch,
		// }

		// const form = await superValidate(data, formSchema);

		// if (!form.valid) {
		// 	return fail(400, {
		// 		form,
		// 	});
		// }

		const updatedState = {
			Charger: Number(charger),
			EarPhone: Number(earphones),
			EarPod: Number(earpods),
			Mobiles: Number(mobile),
			Others: Number(others),
			SmartWatch: Number(smartwatch),
			TotalItems: Number(charger) + Number(earphones) + Number(earpods) + Number(mobile) + Number(others) + Number(smartwatch)
		};

		updateStore(updatedState);
	},
};