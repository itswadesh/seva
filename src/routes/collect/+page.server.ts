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
		const data = await event.request.formData()

		const form = await superValidate(data, formSchema);

		if (!form.valid) {
			return fail(400, {
				form,
			});
		}

		const updatedState = {
			Mobiles: Number(form.data.mobile),
			EarPhone: Number(form.data.earphones),
			EarPod: Number(form.data.earpods),
			Charger: Number(form.data.charger),
			SmartWatch: Number(form.data.smartwatch),
			Others: Number(form.data.others),
			TotalItems: initialState.Mobiles + initialState.EarPhone + initialState.EarPod + initialState.Charger + initialState.SmartWatch + initialState.Others
		};

		updateStore(updatedState);
	},
};