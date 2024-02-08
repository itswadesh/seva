import { writable } from 'svelte/store';

// Define the initial state
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
    CollectSangatFaceImage:'',
    ItemsImageBack: '',
    ItemsImageFront: '',
};

// Create a writable store with the initial state
export const collectionstore = writable(initialState);

// Update function to update the store state
export function updateStore(newState) {
    collectionstore.update(() => newState);
}
