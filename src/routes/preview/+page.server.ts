/* eslint-disable @typescript-eslint/no-explicit-any */
import { SangatData } from '$lib/db/schema';
import { db } from '$lib/db/server';
import type { Actions } from './$types';

export const actions: Actions = {
    async default(event) {
        const items = Object.fromEntries(await event.request.formData())

        // console.log('items', items);

        try {
            const newData = await db.insert(SangatData).values({
                TokenNo: items?.TokenNo,
                Collect_SewadarID: items?.Collect_SewadarID,
                Collect_SewadarName: items?.Collect_SewadarName,
                Mobiles: items?.Mobiles,
                EarPhone: items?.EarPhone,
                EarPod: items?.EarPod,
                PowerBank: items?.PowerBank,
                Charger: items?.Charger,
                SmartWatch: items?.SmartWatch,
                Others: items?.Others,
                TotalItems: items?.TotalItems,
                CollectSangatFaceImage: items?.CollectSangatFaceImage,
                ItemsImageBack: items?.ItemsImageBack,
                ItemsImageFront: items?.ItemsImageFront
            });

            console.log('data inserted', newData);
        } catch (error) {
            console.error('Error inserting data:', error);
        }
    }
};
