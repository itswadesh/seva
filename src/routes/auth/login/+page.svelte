<script>
	import { goto } from '$app/navigation'
	import Button from '$lib/components/ui/button/button.svelte'
import Input from '$lib/components/ui/input/input.svelte'
	import { Reload } from 'radix-icons-svelte'
  import { toast } from "svelte-sonner";

  export let data
  let { supabase } = data
  $: ({ supabase } = data)

  let email=''
  let password=''
let isLoading=false
  const handleSignIn = async () => {
    isLoading = true
    const x= await supabase.auth.signInWithPassword({
      email,
      password,
    })
    isLoading = false
    if(x.error?.message){
      toast.error( x.error?.message)
    }else{
      goto('/')
    }
  }

</script>
<div class="flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
  <div class="w-full ">
    <h1 class="text-2xl font-bold text-center mb-6">Sign In</h1>
  
<form on:submit="{handleSignIn}" class="space-y-4 w-full">
  <div>
    <label for="email" class="block text-sm font-medium text-gray-700">Email:</label>
    <Input id="email" name="email" bind:value="{email}" placeholder="Enter your email" required class="mt-1 block w-full py-2 px-3  rounded-md shadow-sm focus:outline-none  sm:text-sm" />
  </div>

  <div>
    <label for="password" class="block text-sm font-medium text-gray-700">Password:</label>
    <Input id="password" type="password" name="password" bind:value="{password}" placeholder="Enter your password" required  class="mt-1 block w-full py-2 px-3 border  rounded-md shadow-sm focus:outline-none  sm:text-sm" />
  </div>
<br/>
  <Button disabled={isLoading} type="submit" class="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium  focus:outline-none focus:ring-2 focus:ring-offset-2 ">
    {#if isLoading}
			 <Reload class="mr-2 h-4 w-4 animate-spin" />
  Please wait
	{:else}
    Sign in
    {/if}</Button>
</form>
    <Button variant="link" on:click="{()=>goto('/auth/signup')}" class="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium focus:outline-none focus:ring-2 focus:ring-offset-2  mt-4">Join as author. Signup Now</Button>
</div>
</div>