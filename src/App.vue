<template>
  <main class="p-10  h-full flex flex-col gap-8 justify-center items-center">
	<button 
		class="py-8 px-12 rounded-md shadow-black-400 shadow bg-green-200 text-black text-4xl"
		@click="handleCounterClick">
			<div class="w-64 grid grid-cols-2">
				<div>
				Counter: 
				</div>
				<div>
					<span class="text-emerald-500">{{count}}</span>
				</div>

			</div>
	</button>

	<button 
		class="py-4 px-12 rounded-md bg-amber-200 text-black text-4xl"
		>
			<div class="w-64 grid grid-cols-2">
				<div>
				Server: 
				</div>
				<div>
					<span class="text-amber-500">{{ serverVal }}</span>
				</div>

			</div>
	</button>
  </main>
</template>

<script setup>
import { computed} from 'vue';
import {addRequestToQueue, handleQueue} from './queue.js'
import {useCounterStore} from './composables/useCounterStore.js'
import {storeToRefs} from 'pinia'

let err = false

const store = useCounterStore()
const { count, server } = storeToRefs(store)

const handleCounterClick = () => {
let url = 'https://httpbin.org/post'
	let data = {
		method: 'POST',
		headers: {
			'Accept': 'application/json, text/plain, */*',
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({counter: ++count.value})
	}
	addRequestToQueue(url, data)
}

const serverVal = computed(() => err ? 'offline' : server.value)

handleCounterClick()

window.setInterval(async () => {
	// testConnection
	await handleQueue()
}, 1000)

</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
.animate-bounce-custom {
	animation: bounce 200ms infinite;
}

</style>
