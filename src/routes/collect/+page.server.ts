import { superValidate } from 'sveltekit-superforms/server';
import { formSchema } from './schema';
import { fail, type Actions } from '@sveltejs/kit';
import { updateStore } from '$lib/store/collectionStore';
const initialState = {
	ID: '',
	TokenNo: 0,
	Collect_SewadarID: '',
	Collect_SewadarName: '',
	Mobiles: 0,
	EarPhone: 0,
	EarPod: 0,
	PowerBank: 0,
	Charger: 0,
	SmartWatch: 0,
	Others: 0,
	TotalItems: 0,
	CollectSangatFaceImage: '',
	ItemsImageBack: '',
	ItemsImageFront: ''
};

export const load = async () => {
	return {
		form: await superValidate(formSchema)
	};
};


export const actions: Actions = {
	default: async (event) => {
	  const form = await superValidate(event, formSchema);
	  if (!form.valid) {
		return fail(400, {
		  form,
		});
	  }
	  const updatedState = {
		Mobiles : Number(form.data.mobile),
	  EarPhone : Number(form.data.earphones),
	  EarPod : Number(form.data.earpods),
	  Charger : Number(form.data.charger),
	  SmartWatch : Number(form.data.smartwatch),
	  Others : Number(form.data.others),
	  TotalItems : initialState.Mobiles + initialState.EarPhone + initialState.EarPod + initialState.Charger + initialState.SmartWatch + initialState.Others	
	};
	updateStore(updatedState);
	},
  };