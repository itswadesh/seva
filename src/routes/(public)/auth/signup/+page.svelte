<script lang="ts">
	import { z } from 'zod'
	import { goto } from '$app/navigation'
	import Button from '$lib/components/ui/button/button.svelte'
	import Input from '$lib/components/ui/input/input.svelte'
	import axios from 'axios'
	import { Reload } from 'radix-icons-svelte'
	import { toast } from 'svelte-sonner'
	import { Label } from '$lib/components/ui/label'
	import * as RadioGroup from '$lib/components/ui/radio-group'
	import Select from '$lib/components/Select.svelte'
	import { Textbox } from '$lib/components/misiki'

	export let data

	let avatar = null
	let name = 'Swadesh Behera'
	let phone = '8895092508'
	let whatsappNo = '8895092508'
	let dob = '1985-06-22'
	let gender = 'M'
	let fatherName = 'Bipin Behera'
	let center = 'Bangalore'
	let aadharNo = '111111111111'
	let qualification = 'B-Tech'
	let sevaPreference = ''
	let mobileAvailability = ''
	let isLoading = false

	const sevaPreferenceDD = [
		{ name: 'Mobile Window Seva-Front', value: 'Mobile Window Seva-Front' },
		{ name: 'Mobile Backup Seva-Rear', value: 'Mobile Backup Seva-Rear' },
		{ name: 'Queue Management', value: 'Queue Management' },
		{ name: 'Mobile Security', value: 'Mobile Security' },
		{ name: 'Planning & Administration', value: 'Planning & Administration' }
	]
	const mobileAvailabilityDD = [
		{ name: 'Yes - Android Mobile', value: 'Yes - Android Mobile' },
		{ name: 'Yes - iPhone Mobile', value: 'Yes - iPhone Mobile' },
		{ name: 'No', value: 'No' }
	]
	let skills = ''
	const skillsPills = [
		{ name: 'None', value: 'None' },
		{ name: 'MS Office Basic', value: 'MS Office Basic' },
		{ name: 'MS Office Expert', value: 'MS Office Expert' },
		{ name: 'Web Development', value: 'Web Development' },
		{ name: 'Android App Development', value: 'Android App Development' },
		{ name: 'Networking', value: 'Networking' }
	]
	let errors = {}

	const handleSignUp = async () => {
		const user = {
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
			mobileAvailability,
			skills
		}
		const registerSchema = z.object({
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
				.number({ required_error: 'Please enter your aadhar number' })
				.min(12, { message: 'AADHAR number must be 12 characters' }),
			qualification: z
				.string({ required_error: 'Please enter your qualification' })
				.min(1, { message: 'Please enter your qualification' }),
			mobileAvailability: z
				.string({ required_error: 'Please select your mobile availability' })
				.min(1, { message: 'Please select your mobile availability' }),
			sevaPreference: z
				.string({ required_error: 'Please select your seva preference' })
				.min(1, { message: 'Please select your seva preference' }),
			skills: z
				.string({ required_error: 'Please select your skills' })
				.min(1, { message: 'Please select your skills' })
		})

		try {
			const result = registerSchema.parse(user)
			console.log('SUCCESS')
			console.log(result)
		} catch (e) {
			const { fieldErrors: err } = e.flatten()
			errors = err
			return toast.error(errors[Object.keys(errors)[0]][0])
		}
		isLoading = true
		try {
			const userDataRes = await axios.post('/api/auth/signup', user)
			if (userDataRes.data.status == 400) {
				return toast.error(userDataRes.data.message)
			}
			goto('/auth/signup/success')
		} catch (e) {
			toast.error(e?.toString())
			return
		} finally {
			isLoading = false
		}
	}
	const phoneChanged = () => {
		if (phone.length == 10 && !whatsappNo) {
			whatsappNo = phone
		}
	}
</script>

<div class=" flex items-center justify-center bg-gray-50 px-4 py-12 sm:px-6 lg:px-8">
	<div class="w-full">
		<h1 class="mb-6 text-center text-2xl font-bold">New Sewadar Registration</h1>

		<form on:submit={handleSignUp} class="w-full space-y-4">
			<div>avatar with mobile camera</div>
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
				}
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
				maxlength="12"
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

			<div>
				<Select
					title="Select"
					id="mobileAvailability"
					label="Do you have Mobile?:"
					bind:value={mobileAvailability}
					data={mobileAvailabilityDD || []}
					{errors}
				/>
			</div>
			<div>
				<Select
					title="Select"
					label="Seva Preference:"
					id="sevaPreference"
					bind:value={sevaPreference}
					data={sevaPreferenceDD || []}
					{errors}
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
			on:click={() => goto('/auth/login')}
			class=" mt-4 flex w-full justify-center rounded-md border border-transparent px-4 py-2 text-sm shadow-sm focus:outline-none focus:ring-2  focus:ring-offset-2"
		>
			Already have an account? Login Now
		</Button>
	</div>
</div>
