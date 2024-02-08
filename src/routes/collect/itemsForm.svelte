<script lang="ts">
	import * as Form from '$lib/components/ui/form';
	import { formSchema, type FormSchema } from './schema';
	import type { SuperValidated } from 'sveltekit-superforms';
	export let form: SuperValidated<FormSchema>;
</script>

<div class="mx-32 text-center">
	<Form.Root {form} schema={formSchema} let:config>
		<Form.Field {config} name="mobile">
			<Form.Item>
				<Form.Label>Mobile</Form.Label>
				<Form.Input type="number" />
				<Form.Validation />
			</Form.Item>
		</Form.Field>
		<Form.Field {config} name="earphones">
			<Form.Item>
				<Form.Label>Earphones</Form.Label>
				<Form.Input type="number" />
				<Form.Validation />
			</Form.Item>
		</Form.Field>
		<Form.Field {config} name="earpods">
			<Form.Item>
				<Form.Label>Earpods</Form.Label>
				<Form.Input type="number" />
				<Form.Validation />
			</Form.Item>
		</Form.Field>
		<Form.Field {config} name="charger">
			<Form.Item>
				<Form.Label>Charger</Form.Label>
				<Form.Input type="number" />
				<Form.Validation />
			</Form.Item>
		</Form.Field>
		<Form.Field {config} name="smartwatch">
			<Form.Item>
				<Form.Label>Smart Watch</Form.Label>
				<Form.Input type="number" />
				<Form.Validation />
			</Form.Item>
		</Form.Field>
		<Form.Field {config} name="others">
			<Form.Item>
				<Form.Label>Others</Form.Label>
				<Form.Input type="number" />
				<Form.Validation />
			</Form.Item>
		</Form.Field>
	</Form.Root>
</div>
