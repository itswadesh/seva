<script lang="ts">
	import { z } from 'zod'
	import { goto } from '$app/navigation'
	import Button from '$lib/components/ui/button/button.svelte'
	// import Input from '$lib/components/ui/input/input.svelte'
	// import axios from 'axios'
	import { Reload } from 'radix-icons-svelte'
	import { toast } from 'svelte-sonner'
	import { Label } from '$lib/components/ui/label'
	import * as RadioGroup from '$lib/components/ui/radio-group'
	// import Select from '$lib/components/Select.svelte'
	import Select from '$lib/components/form/select.svelte'
	import { Textbox } from '$lib/components/misiki'
	import { getUserState } from '$lib/user.svelte'
	const userStore = getUserState()
	interface Props {
		data: any
	}
	let capturedImageURI: string = $state()
	let selectedFile: File = $state(null)

	// let { data }: Props = $props()

	let avatar: any = null
	let avatartoShow = $state('')
	let name = $state('')
	let phone = $state('')
	let whatsappNo = $state('')
	let dob = $state('')
	let gender = $state('M')
	let fatherName = $state('')
	let center = $state('')
	let aadharNo = $state('')
	let maskedAadhar = ''
	let qualification = $state('B-Tech')
	let sevaPreference = $state('')
	let sevaPreference1 = $state('')
	let mobileAvailability = $state('')
	let isLoading = $state(false)

	const sevaPreferenceDD = [
		{ name: 'Mobile Window Seva-Front', value: 'WINDOW' },
		{ name: 'Mobile Backup Seva-Rear', value: 'BACKUP' },
		{ name: 'Queue Management', value: 'QUEUE' },
		{ name: 'Mobile Security', value: 'SECURITY' },
		{ name: 'Planning & Administration', value: 'PLANNING' }
	]
	const mobileAvailabilityDD = [
		{ name: 'Yes - Android Mobile', value: 'Yes - Android Mobile' },
		{ name: 'Yes - iPhone Mobile', value: 'Yes - iPhone Mobile' },
		{ name: 'No', value: 'No' }
	]
	let skills = $state('')
	const skillsPills = [
		{ name: 'None', value: 'None' },
		{ name: 'MS Office Basic', value: 'MS Office Basic' },
		{ name: 'MS Office Expert', value: 'MS Office Expert' },
		{ name: 'Web Development', value: 'Web Development' },
		{ name: 'Android App Development', value: 'Android App Development' },
		{ name: 'Networking', value: 'Networking' }
	]
	let errors = $state({})

	const handleSignUp = async () => {
		const user = {
			avatar,
			name,
			phone,
			whatsappNo,
			dob,
			gender,
			fatherName,
			center,
			aadharNo,
			qualification,
			sevaPreference,
			sevaPreference1,
			mobileAvailability,
			skills
		}
		const registerSchema = z.object({
			avatar: z.string({ required_error: 'Please upload your image' }),
			name: z
				.string({ required_error: 'Please enter your name' })
				.min(1, { message: 'Name can not be less than 1 character(s)' }),
			phone: z
				.string({ invalid_type_error: 'Incorrect phone number' })
				.regex(/^\d{10}$/, { message: 'Phone number must be exactly 10 digits' }),
			whatsappNo: z
				.string({ invalid_type_error: 'Incorrect whatsapp number' })
				.regex(/^\d{10}$/, { message: 'Whatsapp number must be exactly 10 digits' }),
			dob: z
				.string({ required_error: 'Please enter your date of birth' })
				.min(1, { message: 'Please enter your date of birth' }),
			gender: z.string({ required_error: 'Please select your gender' }),
			fatherName: z
				.string({ required_error: 'Please enter your father name' })
				.min(1, { message: 'Please enter your father name' }),
			center: z
				.string({ required_error: 'Please enter your center' })
				.min(1, { message: 'Please enter satsang center' }),
			aadharNo: z
				.string({ required_error: 'Please enter your aadhar number' })
				.min(12, { message: 'AADHAR number must be 12 or 16 digits' })
				.max(16, { message: 'AADHAR number must be 12 or 16 digits' }),
			qualification: z
				.string({ required_error: 'Please enter your qualification' })
				.min(1, { message: 'Please enter your qualification' }),
			mobileAvailability: z
				.string({ required_error: 'Please select your mobile availability' })
				.min(1, { message: 'Please select your mobile availability' }),
			sevaPreference: z
				.string({ required_error: 'Please select your seva preference' })
				.min(1, { message: 'Please select your seva preference' }),
			sevaPreference1: z
				.string({ required_error: 'Please select your seva preference' })
				.min(1, { message: 'Please select your seva preference' }),
			skills: z
				.string({ required_error: 'Please select your skills' })
				.min(1, { message: 'Please select your skills' })
		})

		try {
			const result = registerSchema.parse(user)
			isLoading = true

			// Upload image first
			if (selectedFile) {
				const formData = new FormData()
				formData.append('image', selectedFile)
				formData.append('type', phone)
				await fetch('/api/images/update-avatar', {
					method: 'POST',
					body: formData
				})
				avatar = `/uploads/avatar/${phone}.png`
			}

			// Continue with user signup
			userStore.signup(user)
		} catch (e) {
			const { fieldErrors: err } = e.flatten()
			errors = err
			return toast.error(errors[Object.keys(errors)[0]][0])
		}
		isLoading = true
		await updateChangeImageSaved({ phone })
		userStore.signup(user)
	}
	const phoneChanged = () => {
		if (phone.length == 10 && !whatsappNo) {
			whatsappNo = phone
		}
	}

	const handleChangeImageSaved = (e) => {
		const file = e.target.files[0]
		if (file) {
			selectedFile = file
			capturedImageURI = URL.createObjectURL(file)
		}
	}

	function handleAadharInput(event) {
		const rawValue = event.detail.target?.value || '' // Get the raw value
		aadharNo = rawValue.replace(/\D/g, '') // Strip non-digit characters
		maskedAadhar = maskAndFormatAadhar(aadharNo) // Mask and format
	}

	function maskAndFormatAadhar(number) {
		let masked = number.slice(0, -4).replace(/\d/g, 'X') // Replace all but the last 4 digits
		let lastFour = number.slice(-4)
		return (masked + lastFour).replace(/(.{4})/g, '$1-').slice(0, -1) // Format
	}
</script>

<div
	class=" flex items-center justify-center overflow-x-hidden bg-gray-50 px-4 py-12 sm:px-6 lg:px-8"
>
	<div class="w-full">
		<h1 class="mb-6 text-center text-2xl font-bold">New Sewadar Registration</h1>
		<form onsubmit={handleSignUp} class="w-full space-y-4">
			<div class="flex flex-col gap-4">
				<div class="flex w-full items-center justify-center">
					<label
						for="image-2"
						class="dark:hover:bg-bray-800 flex h-80 w-full cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 hover:bg-gray-100 dark:border-gray-600 dark:bg-gray-700 dark:hover:border-gray-500 dark:hover:bg-gray-600"
					>
						{#if capturedImageURI}
							<img
								src={capturedImageURI}
								alt=""
								class="h-full w-full object-contain object-center"
							/>
						{:else}
							<div class="flex flex-col items-center justify-center pb-6 pt-5">
								<svg
									xmlns="http://www.w3.org/2000/svg"
									fill="none"
									viewBox="0 0 24 24"
									stroke-width="1.5"
									stroke="currentColor"
									class="mb-2 h-8 w-8 text-gray-500 dark:text-gray-400"
								>
									<path
										stroke-linecap="round"
										stroke-linejoin="round"
										d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Zm10.5-11.25h.008v.008h-.008V8.25Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
									/>
								</svg>

								<p class="text-2xl font-bold text-gray-500 dark:text-gray-400">
									Click to Take Picture
								</p>
							</div>
						{/if}

						<input
							id="image-2"
							type="file"
							name="image"
							accept="image/*"
							capture="environment"
							class="hidden"
							onchange={handleChangeImageSaved}
						/>
					</label>
				</div>
			</div>
			<Textbox
				id="name"
				name="name"
				label="Full Name:"
				bind:value={name}
				placeholder="Enter your name"
				{errors}
			/>

			<Textbox
				id="phone"
				name="phone"
				type="tel"
				label="Phone (Use this as UserName):"
				bind:value={phone}
				placeholder="Enter your phone"
				{errors}
				on:change={phoneChanged}
			/>

			<Textbox
				id="whatsappNo"
				name="whatsappNo"
				type="tel"
				label="Whatsapp mobile number:"
				bind:value={whatsappNo}
				placeholder="Enter your whatsapp number"
				{errors}
			/>

			<Textbox
				id="dob"
				name="dob"
				type="date"
				label="Date of Birth:"
				bind:value={dob}
				placeholder="Enter your date of birth"
				{errors}
			/>
			<div>
				<label for="gender" class=" block text-lg text-gray-700">Gender:</label>
				<RadioGroup.Root bind:value={gender} class="flex">
					<div class="flex items-center space-x-2">
						<RadioGroup.Item value="M" id="male" />
						<Label for="male">Male</Label>
					</div>
					<div class="flex items-center space-x-2">
						<RadioGroup.Item value="F" id="female" />
						<Label for="female">Female</Label>
					</div>
				</RadioGroup.Root>
			</div>

			<Textbox
				id="fatherName"
				name="fatherName"
				label="Father's Name:"
				bind:value={fatherName}
				placeholder="Enter your father name"
				{errors}
			/>

			<Textbox
				id="center"
				name="center"
				label="Satsang Center Name:"
				bind:value={center}
				placeholder="Enter satsang center"
				{errors}
			/>

			<Textbox
				id="aadharNo"
				name="aadharNo"
				type="tel"
				label="AADHAR Number:"
				bind:value={aadharNo}
				placeholder="Enter your aadhar number"
				{errors}
			/>

			<Textbox
				id="qualification"
				name="qualification"
				label="Qualification:"
				bind:value={qualification}
				placeholder="Enter your qualification"
				{errors}
			/>

			<div class="">
				<Select
					title="Select"
					id="mobileAvailability"
					label="Do you have Mobile?:"
					bind:value={mobileAvailability}
					data={mobileAvailabilityDD || []}
					{errors}
					class="text-xl"
				/>
			</div>
			<div>
				<Select
					title="Select"
					label="Seva Preference1:"
					id="sevaPreference"
					bind:value={sevaPreference}
					data={sevaPreferenceDD || []}
					{errors}
					class="text-xl"
				/>
			</div>
			<div>
				<Select
					title="Select"
					label="Seva Preference2:"
					id="sevaPreference1"
					bind:value={sevaPreference1}
					data={sevaPreferenceDD || []}
					{errors}
					class="text-xl"
				/>
			</div>
			<div>
				<Select
					title="Select"
					label="Please mention your computer skills:"
					id="skills"
					bind:value={skills}
					data={skillsPills || []}
					{errors}
					class="text-xl"
				/>
			</div>

			<br />
			<Button
				disabled={isLoading}
				type="submit"
				class=" flex w-full justify-center rounded-md border border-transparent px-4 py-2 text-lg shadow-sm "
			>
				{#if isLoading}
					<Reload class="mr-2 h-4 w-4 animate-spin" />
					Please wait
				{:else}
					Sign up
				{/if}
			</Button>
		</form>
		<Button
			variant="link"
			href="/auth/login"
			class=" mt-6 flex w-full justify-center rounded-md border border-transparent px-4 py-2 text-lg shadow-sm focus:outline-none focus:ring-2  focus:ring-offset-2"
		>
			Already have an account? Login Now
		</Button>
	</div>
</div>
