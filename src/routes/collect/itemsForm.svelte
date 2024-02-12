<script lang="ts">
	import { formSchema, type FormSchema } from './schema';
	import * as Form from '$lib/components/ui/form';
	import Button from '$lib/components/ui/button/button.svelte';
	import type { SuperValidated } from 'sveltekit-superforms';

	export let form: SuperValidated<FormSchema>;
</script>

<Form.Root method="POST" {form} schema={formSchema} let:config class="flex flex-col gap-5">
	<div class="flex flex-col gap-2">
		<Form.Field {config} name="mobile">
			<Form.Item>
				<Form.Label>Mobile</Form.Label>

				<Form.Input type="number" min="0" />

				<Form.Validation />
			</Form.Item>
		</Form.Field>

		<Form.Field {config} name="earphones">
			<Form.Item>
				<Form.Label>Earphones</Form.Label>

				<Form.Input type="number" min="0" />

				<Form.Validation />
			</Form.Item>
		</Form.Field>

		<Form.Field {config} name="earpods">
			<Form.Item>
				<Form.Label>Earpods</Form.Label>

				<Form.Input type="number" min="0" />

				<Form.Validation />
			</Form.Item>
		</Form.Field>

		<Form.Field {config} name="charger">
			<Form.Item>
				<Form.Label>Charger</Form.Label>

				<Form.Input type="number" min="0" />

				<Form.Validation />
			</Form.Item>
		</Form.Field>

		<Form.Field {config} name="smartwatch">
			<Form.Item>
				<Form.Label>Smart Watch</Form.Label>

				<Form.Input type="number" min="0" />

				<Form.Validation />
			</Form.Item>
		</Form.Field>

		<Form.Field {config} name="others">
			<Form.Item>
				<Form.Label>Others</Form.Label>

				<Form.Input type="number" min="0" />

				<Form.Validation />
			</Form.Item>
		</Form.Field>
	</div>

	<Button type="submit" class="w-full" variant="secondary">Submit</Button>
</Form.Root>
