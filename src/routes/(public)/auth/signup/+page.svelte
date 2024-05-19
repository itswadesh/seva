<script lang="ts">
	import { goto } from '$app/navigation'
	import Button from '$lib/components/ui/button/button.svelte'
	import Input from '$lib/components/ui/input/input.svelte'
	import axios from 'axios'
	import { Reload } from 'radix-icons-svelte'
	import { toast } from 'svelte-sonner'
	import { Label } from '$lib/components/ui/label'
	import * as RadioGroup from '$lib/components/ui/radio-group'
	import Select from '$lib/components/Select.svelte'
	export let data

	let avatar = null
	let name = 'Swadesh Behera'
	let phone = '+918895092508'
	let whatsappNo = '+918895092508' // Autofill from phone
	let dob = '1985-06-22'
	let gender = 'M'
	let fatherName = 'Bipin Behera'
	let center = 'Bangalore'
	let aadharNo = '111111111111'
	let qualification = 'B-Tech'
	let sevaPreference = ''
	let mobileAvailability = '' // Radio
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
	const skills = null
	const skillsPills = [
		{ name: 'None', value: 'None' },
		{ name: 'MS Office Basic', value: 'MS Office Basic' },
		{ name: 'MS Office Expert', value: 'MS Office Expert' },
		{ name: 'Web Development', value: 'Web Development' },
		{ name: 'Android App Development', value: 'Android App Development' },
		{ name: 'Networking', value: 'Networking' }
	]
	const handleSignUp = async () => {
		isLoading = true
		try {
			console.log({
				name,
				phone,
				dob,
				gender,
				fatherName,
				center,
				aadharNo,
				qualification,
				sevaPreference,
				mobileAvailability,
				skills
			})
			const userDataRes = await axios.post('/api/auth/signup', {
				name,
				phone,
				dob,
				gender,
				fatherName,
				center,
				aadharNo,
				qualification,
				sevaPreference,
				mobileAvailability,
				skills
			})
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
</script>

<div class=" flex items-center justify-center bg-gray-50 px-4 py-12 sm:px-6 lg:px-8">
	<div class="w-full">
		<h1 class="mb-6 text-center text-2xl font-bold">New Sewadar Registration</h1>

		<form on:submit={handleSignUp} class="w-full space-y-4">
			<!-- <div>
				<label for="email" class="block text-lg  text-gray-700">Email:</label>
				<Input
					id="email"
					name="email"
					bind:value={email}
					placeholder="Enter your email"
					required
					class="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:outline-none  sm:text-lg"
				/>
			</div> -->

			<div>avatar with mobile camera</div>
			<div>
				<label for="name" class="block text-lg text-gray-700">Full Name:</label>
				<Input
					id="name"
					name="name"
					bind:value={name}
					placeholder="Enter your name"
					required
					class="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:outline-none  sm:text-lg"
				/>
			</div>

			<!-- <div>
				<label for="password" class="block text-lg  text-gray-700">Password:</label>
				<Input
					id="password"
					type="password"
					name="password"
					bind:value={password}
					placeholder="Enter your password"
					required
					class="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:outline-none  sm:text-lg"
				/>
			</div>

			<div>
				<label for="confirmPassword" class="block text-lg  text-gray-700"
					>Confirm Password:</label
				>
				<Input
					id="confirmPassword"
					type="password"
					name="confirmPassword"
					bind:value={confirmPassword}
					placeholder="Enter your confirmPassword"
					required
					class="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:outline-none  sm:text-lg"
				/>
			</div> -->
			<div>
				<label for="phone" class=" block text-lg text-gray-700">
					Phone (use this as UserName):
				</label>
				<Input
					id="phone"
					name="phone"
					bind:value={phone}
					placeholder="Enter your phone"
					required
					class="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:outline-none "
				/>
			</div>
			<div>
				<label for="whatsappNo" class=" block text-lg text-gray-700">
					Whatsapp mobile number:
				</label>
				<Input
					id="whatsappNo"
					name="whatsappNo"
					bind:value={whatsappNo}
					placeholder="Enter your whatsapp number"
					required
					class="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:outline-none "
				/>
			</div>
			<div>
				<label for="dob" class=" block text-lg text-gray-700">DOB:</label>
				<Input
					id="dob"
					name="dob"
					type="date"
					bind:value={dob}
					placeholder="Enter your DOB"
					required
					class="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:outline-none  sm:text-lg"
				/>
			</div>
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
					<!-- <div class="flex items-center space-x-2">
						<RadioGroup.Item value="T" id="trans" />
						<Label for="trans">Trans</Label>
					</div> -->
				</RadioGroup.Root>
			</div>
			<div>
				<label for="fatherName" class=" block text-lg text-gray-700"> Father's Name: </label>
				<Input
					id="fatherName"
					name="fatherName"
					type="text"
					bind:value={fatherName}
					placeholder="Enter your father name"
					required
					class="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:outline-none  sm:text-lg"
				/>
			</div>
			<div>
				<label for="center" class=" block text-lg text-gray-700"> Your Satsang Center Name: </label>
				<Input
					id="center"
					name="center"
					type="text"
					bind:value={center}
					placeholder="Enter Center"
					required
					class="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:outline-none  sm:text-lg"
				/>
			</div>
			<div>
				<label for="aadharNo" class=" block text-lg text-gray-700">AADHAR No:</label>
				<Input
					id="aadharNo"
					name="aadharNo"
					type="text"
					bind:value={aadharNo}
					placeholder="Enter your aadhar no"
					required
					class="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:outline-none  sm:text-lg"
				/>
			</div>
			<div>
				<label for="qualification" class=" block text-lg text-gray-700"> Qualification: </label>
				<Input
					id="qualification"
					name="qualification"
					type="text"
					bind:value={qualification}
					placeholder="Enter your qualification"
					required
					class="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:outline-none  sm:text-lg"
				/>
			</div>
			<div>
				<label for="mobileAvailability" class=" block text-lg text-gray-700">
					Do you have Mobile?:
				</label>
				<Select title="Select" data={mobileAvailabilityDD || []} />
			</div>
			<div>
				<label for="sevaPreference" class=" block text-lg text-gray-700">
					Seva preference (First):
				</label>
				<Select title="Select" data={sevaPreferenceDD || []} />
			</div>
			<div>
				<label for="skills" class=" block text-lg text-gray-700">
					Please mention your computer skills:
				</label>
				<Select title="Select" data={skillsPills || []} />
				<!-- <Input
					id="qualification"
					name="qualification"
					type="text"
					bind:value={computerSkills}
					placeholder="Enter your qualification"
					required
					class="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:outline-none  sm:text-lg"
				/> -->
			</div>
			<!-- <div>
				<label for="address" class="block text-lg  text-gray-700">Address:</label>
				<Input
					id="address"
					name="address"
					bind:value={address}
					placeholder="Enter your address"
					required
					class="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:outline-none  sm:text-lg"
				/>
			</div>
			<div>
				<label for="city" class="block text-lg  text-gray-700">City:</label>
				<Input
					id="city"
					name="city"
					bind:value={city}
					placeholder="Enter your city"
					required
					class="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:outline-none  sm:text-lg"
				/>
			</div>
			<div>
				<label for="state" class="block text-lg  text-gray-700">State:</label>
				<Input
					id="state"
					name="state"
					bind:value={state}
					placeholder="Enter your state"
					required
					class="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:outline-none  sm:text-lg"
				/>
			</div>
			<div>
				<label for="country" class="block text-lg  text-gray-700">Country:</label>
				<Input
					id="country"
					name="country"
					bind:value={country}
					placeholder="Enter your country"
					required
					class="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:outline-none  sm:text-lg"
				/>
			</div>
			<div>
				<label for="zip" class="block text-lg  text-gray-700">Zip:</label>
				<Input
					id="zip"
					name="zip"
					bind:value={zip}
					placeholder="Enter your zip"
					required
					class="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:outline-none  sm:text-lg"
				/>
			</div>
			<div>
				<label for="googleMeetLink" class="block text-lg  text-gray-700"
					>Google Meet Link:</label
				>
				<Input
					id="googleMeetLink"
					name="googleMeetLink"
					bind:value={googleMeetLink}
					placeholder="Enter your googleMeetLink"
					required
					class="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:outline-none  sm:text-lg"
				/>
			</div> -->

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
