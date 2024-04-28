import {v4 as uuidv4} from 'uuid';
import Dexie from 'dexie';
import { useCounterStore } from './composables/useCounterStore';
import { storeToRefs } from 'pinia';

export function addRequestToQueue(url, data) {

	const uuid = uuidv4();

	db.queue.add({
		uuid, 
		url,
		data: data,
		counter: 0
	})
}

export function tryRequest(request) {
	try{ 
		fetch(request.url, request.data)
			.then(() => {
				db.queue.where('uuid').equals(request.uuid).delete()
				const store = useCounterStore()
				const {server} = storeToRefs(store)
				server.value = server.value + 1
			}).catch(() => {

		// db.queue.where('uuid').equals(request.uuid).modify({counter: 1})
		})
	} catch (err) {
		db.queue.where('uuid').equals(request.uuid).modify({counter: 1})
		console.log(err)
	}

}

export async function handleQueue() {

	const queue = await db.queue.where('counter').notEqual(1).toArray()

	queue.forEach((val) => {
		tryRequest(val)
	})

}

export const db = new Dexie('wrkbeatQueue');

db.version(1).stores({
  queue: 'uuid, url, data, counter', 
});
