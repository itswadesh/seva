<script>
  import '../app.pcss'
  import { Rocket } from 'radix-icons-svelte'
  import * as Alert from '$lib/components/ui/alert/index.js'
  import { Separator } from '$lib/components/ui/separator'
</script>

<Alert.Root>
  <Rocket class="h-4 w-4" />
  <Alert.Title>Heads up!</Alert.Title>
  <Alert.Description
    >You can add components to your app using the cli.</Alert.Description
  >
</Alert.Root>
<section
  class="minimum-width-rem relative flex min-h-screen flex-col bg-white antialiased"
>
  <div class="h-rem w-full flex-1 container">
    <slot />
  </div>
</section>

<div class="container mx-auto">
  <div class="space-y-1">
    <h4 class="text-sm font-medium leading-none">HAL Koraput</h4>
    <p class="text-sm text-muted-foreground"></p>
  </div>
  <Separator class="my-4" />
  <div class="flex h-5 items-center space-x-4 text-sm">
    <div>HR Circulars</div>
    <Separator orientation="vertical" />
    <div>e-Library</div>
    <Separator orientation="vertical" />
    <div>Punch Line</div>
    <Separator orientation="vertical" />
    <div>To-Do</div>
  </div>
  <br />
</div>
