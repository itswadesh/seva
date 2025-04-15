<script lang="ts">
	import { date, dateOnly } from '$lib/utils'
	// import { Checkbox } from '$lib/components/ui/checkbox/index'
	// import * as Select from '$lib/components/ui/select/index'
	// import Select from '$lib/components/form/select.svelte'

	import axios from 'axios'
	import { toast } from 'svelte-sonner'
	import { Button } from '$lib/components/ui/button'
	import Textbox from '$lib/components/misiki/Textbox.svelte'
	import { Checkbox } from '$lib/components/ui/checkbox/index'
	import Label from '$lib/components/ui/label/label.svelte'
	interface Props {
		data: any
	}

	let { data }: Props = $props()
	const roles = [
		{ name: 'DEMO', value: 'DEMO' },
		{ name: 'LIVE', value: 'LIVE' }
	]
	let showModal = $state(false)
	let program = $state({
		ProgramCategory: '',
		ProgramStartDate: '',
		ProgramCompDate: '',
		active: false,
		ProgramBy: '',
		ProgramValidity: '',
		ProgramLocation: ''
	})
	let errors = {}

	const submit = async () => {
		const postData = {
			...program,
			ProgramStartDate: new Date(),
			ProgramCompDate: new Date(),
			ProgramValidity: new Date(program.ProgramValidity)
		}
		if (
			!program.ProgramCategory ||
			!program.ProgramBy ||
			!program.ProgramValidity ||
			!program.ProgramLocation ||
			program.ProgramCategory == '' ||
			program.ProgramBy == '' ||
			program.ProgramValidity == '' ||
			program.ProgramLocation == ''
		) {
			toast.error('All fields are required')
			return
		}

		try {
			const res = await axios.post('/api/admin/programs/new', postData)
			toast.success(`Program created successfully`)
			showModal = false
			window.location.reload()
		} catch (e) {
			toast.error(e.response.data)
		}
	}
	const programs = JSON.parse(data.programs || '[]') || []
</script>

<div class="flex items-center justify-center bg-gray-50 px-4 py-12 sm:px-6 lg:px-8">
	<div class="w-full text-center text-black">
		<h1 class="mb-6 text-center text-2xl font-bold">Programs</h1>
		<Button
			type="submit"
			class="w-1/11 my-2 flex justify-center rounded-md border border-transparent bg-green-500 px-4 py-2 text-lg font-medium shadow-sm  hover:border-black focus:outline-none focus:ring-2 focus:ring-offset-2 "
			onclick={async () => {
				showModal = true
			}}
		>
			Create New Program
		</Button>
		{#if programs.length === 0}
			No program found
		{:else}
			<div class="relative h-[75vh] overflow-x-auto border shadow-md sm:rounded-lg">
				<table class="w-full text-left text-xs rtl:text-right">
					<thead class="whitespace-nowrap uppercase">
						<tr>
							{#each Object.keys(programs[0]) as key, dx}
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
						{#each programs as item, ix}
							<tr class="border-b border-gray-200">
								{#each Object.entries(item) as [key, value], vx}
									<th scope="row" class={vx % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
										<div class="max-w-60 truncate whitespace-pre-wrap px-6 py-4 font-normal">
											{#if key === 'CollectSangatFaceImage' || key === 'ItemsImageBack' || key === 'ItemsImageFront'}
												{#if value}
													<img
														src={value}
														alt={value}
														class="h-20 w-20 object-contain object-left"
													/>
												{:else}
													-
												{/if}
											{:else if key === 'dob' || key === 'startDate' || key === 'compDate'}
												{dateOnly(value)}
											{:else if key === 'active'}
												<div class="flex items-center space-x-2">
													<Checkbox
														class="rounded border border-gray-300"
														id="terms"
														checked={value}
														onCheckedChange={async (v) => {
															try {
																const res = await axios.post('/api/admin/programs', {
																	id: item.id,
																	active: v,
																	pending_approved: false
																})
																if (res.status == 200) {
																	v === true
																		? toast.success(`activated successfully`)
																		: toast.error(`deactivated successfully`)
																}
																window.location.reload()
															} catch (e) {
																toast.error(e.response.data)
															}
														}}
													/>
												</div>
											{:else if key === 'approved_at'}
												{date(value)}
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

{#if showModal}
	<style>
		.frosted-black {
			backdrop-filter: blur(12px);
			background-color: hsla(0, 0%, 0%, 0.75);
		}

		.z-index {
			z-index: 99999;
		}

		@media (max-width: 640px) {
			.width {
				width: 90vw;
			}
		}

		@media (min-width: 640px) {
			.width {
				width: 80vw;
			}
		}

		@media (min-width: 768px) {
			.width {
				width: 70vw;
			}
		}

		@media (min-width: 1024px) {
			.width {
				width: 60vw;
			}
		}

		@media (min-width: 1024px) {
			.width {
				width: 50vw;
			}
		}
	</style>
	<section
		class="frosted-black fixed inset-0 z-[99999] flex h-screen w-full items-center justify-center text-black"
	>
		<div class="overflow-hidden bg-white">
			<div class="h-[70vh] w-[50vh] overflow-y-auto px-10">
				<div class="sticky top-0 z-[100000] flex justify-between gap-4 bg-white py-10">
					<h4 class="capitalize">Create New Program</h4>

					<button
						type="button"
						class="hover:text-primary-500 transition duration-300 focus:outline-none"
						onclick={() => (showModal = false)}
					>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							fill="none"
							viewBox="0 0 24 24"
							stroke-width="1"
							stroke="currentColor"
							class="h-6 w-6"
						>
							<path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12"></path>
						</svg>
						Create
					</button>
				</div>

				<form onsubmit={submit} class="flex flex-col gap-10 pb-10">
					<div>
						<Label for="name">Program Category :</Label>
						<select
							id="category"
							name="category"
							required
							class="h-10 w-full rounded-md border border-gray-300 text-black"
							bind:value={program.ProgramCategory}
						>
							<option value="">Select Category</option>
							{#each roles as role}
								<option value={role.value}>{role.name}</option>
							{/each}
						</select>
					</div>
					<div class="text-black">
						<Textbox
							{errors}
							id="programBy"
							name="programBy"
							label="Program By"
							placeholder="Program By"
							bind:value={program.ProgramBy}
						/>
					</div>
					<div class="text-black">
						<Textbox
							type="date"
							{errors}
							id="ProgramValidity"
							name="ProgramValidity"
							label="Program Validity"
							placeholder="Program Validity"
							bind:value={program.ProgramValidity}
						/>
					</div>
					<div class="text-black">
						<Textbox
							{errors}
							id="ProgramLocation"
							name="Program Location"
							label="Program Location"
							placeholder="Program Location"
							bind:value={program.ProgramLocation}
						/>
					</div>
					<Button
						type="submit"
						class="flex w-full justify-center rounded-md border border-transparent bg-green-500 px-4 py-2 text-lg font-medium shadow-sm hover:border-black  hover:bg-green-200 focus:outline-none focus:ring-2 focus:ring-offset-2 "
					>
						Submit
					</Button>
				</form>
			</div>
		</div>
	</section>
{/if}
