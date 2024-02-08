import { db } from "$lib/db/server";
import {collectionstore} from "$lib/store/collectionStore"
import {SangatData} from "$lib/db/schema"

export async function saveCollectedItems() {
    let items 
    collectionstore.subscribe(value => {
        items = value
    })
   
   console.log(items)
   const newData = await db.insert(SangatData).values(items);
   console.log(newData)
}