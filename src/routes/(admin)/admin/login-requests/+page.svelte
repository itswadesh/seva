<script lang="ts">
	import { date, dateOnly } from '$lib/utils'
	import { Checkbox } from '$lib/components/ui/checkbox/index'
	// import * as Select from '$lib/components/ui/select/index'
	// import Select from '$lib/components/Select.svelte'
	import Select from '$lib/components/form/select.svelte'
	import Button from '$lib/components/misiki/button/button.svelte'
	import axios from 'axios'
	import { toast } from 'svelte-sonner'
	let checked = false
	interface Props {
		data: any
	}

	let { data }: Props = $props()
	let isLoading = false
	const roles = [
		{ name: 'ADMIN', value: 'ADMIN' },
		{ name: 'WINDOW', value: 'WINDOW' },
		{ name: 'BACKUP', value: 'BACKUP' }
	]

	const users = JSON.parse(data.users || '[]') || []
</script>

<div class="flex items-center justify-center bg-gray-50 px-4 py-12 sm:px-6 lg:px-8">
	<div class="w-full text-center text-black">
		<h1 class="mb-6 text-center text-2xl font-bold">Users</h1>
		<div>
			<div class="mb-4 flex items-center justify-between">
				<div class="flex items-center space-x-2">
					<div class="flex items-center justify-between space-x-2">
						<Button
							type="submit"
							class="flex w-full justify-center rounded-md border border-transparent bg-green-500 px-4 py-2 text-lg font-medium  shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 "
							onclick={async () => {
								try {
									const res = await axios.post('/api/admin/users/all', {
										approved: true,
										active: true,
										pending_approved: false
									})
									toast.success('All users approved')
									window.location.reload()
								} catch (e) {
									toast.error(e.response.data)
								}
							}}
						>
							Approve all
						</Button>
					</div>
				</div>
			</div>
		</div>
		{#if users.length === 0}
			No login request registered yet
		{:else}
			<div class="relative h-[75vh] overflow-x-auto border shadow-md sm:rounded-lg">
				<table class="w-full text-left text-xs rtl:text-right">
					<thead class="whitespace-nowrap uppercase">
						<tr>
							{#each Object.keys(users[0]) as key, dx}
								<th
									scope="col"
									class="px-6 py-3
						{dx % 2 === 0 ? 'bg-gray-50' : 'bg-white'}"
								>
									{key.replace(/_/g, ' ').replace(/([a-z])([A-Z])/g, '$1 $2')}
								</th>
							{/each}
						</tr>
					</thead>

					<tbody>
						{#each users as item, ix}
							<tr class="border-b border-gray-200">
								{#each Object.entries(item) as [key, value], vx}
									<th scope="row" class={vx % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
										<div class="max-w-60 truncate whitespace-pre-wrap px-6 py-4 font-normal">
											{#if key === 'CollectSangatFaceImage' || key === 'ItemsImageBack' || key === 'ItemsImageFront' || key === 'avatar'}
												{#if value}
													<img
														src={value}
														alt={value}
														class="h-20 w-20 object-contain object-left"
													/>
												{:else}
													-
												{/if}
											{:else if key === 'dob'}
												{dateOnly(value)}
											{:else if key === 'approved_at'}
												{date(value)}
											{:else if key === 'role'}
												<div class="flex items-center space-x-2">
													<Select
														title="Select"
														id={`role-${vx}`}
														{value}
														optionSelected={async (v) => {
															try {
																const res = await axios.post('/api/admin/users', {
																	id: item.id,
																	role: v
																})
																toast.success(`Role changed successfully`)
															} catch (e) {
																toast.error(e.response.data)
															}
														}}
														data={roles || []}
														class="text-xl"
													/>
													<!-- <Select
														title="Select role"
														{value}
														data={roles || []}
														on:value={async ({ detail }) => {
															// selectedRole = detail
															try {
																const res = await axios.post('/api/admin/users', {
																	id: item.id,
																	role: detail
																})
																toast.success(`Role changed successfully`)
															} catch (e) {
																toast.error(e.response.data)
															}
														}}
													/> -->
												</div>
											{:else if key === 'approved'}
												<div class="flex items-center space-x-2">
													<Checkbox
														class="rounded border border-gray-300"
														id="terms"
														checked={value}
														onCheckedChange={async (v) => {
															try {
																const res = await axios.post('/api/admin/users', {
																	id: item.id,
																	approved: v,
																	pending_approved: false
																})
																if (res.status == 200) {
																	v === true
																		? toast.success(`${item.name} approved successfully`)
																		: toast.error(`${item.name} rejected successfully`)
																}
																window.location.reload()
															} catch (e) {
																toast.error(e.response.data)
															}
														}}
													/>
												</div>{:else if key === 'active'}
												<div class="flex items-center space-x-2">
													<Checkbox
														class="rounded border border-gray-300"
														id="terms"
														checked={value}
														onCheckedChange={async (v) => {
															try {
																const res = await axios.post('/api/admin/users', {
																	id: item.id,
																	active: v
																})
																if (res.status == 200) {
																	v === true
																		? toast.success(`${item.name} active`)
																		: toast.error(`${item.name} inactive`)
																}
																window.location.reload()
															} catch (e) {
																toast.error(e.response?.data)
															}
														}}
													/>
												</div>
											{:else}
												{value || '_'}
											{/if}
										</div>
									</th>
								{/each}
							</tr>
						{/each}
					</tbody>
				</table>
			</div>
		{/if}
	</div>
</div>
