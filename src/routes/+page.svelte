<script lang="ts">
  import * as Carousel from '$lib/components/ui/carousel/index.js'
  import { BellRing, Check } from 'lucide-svelte'
  import { Button } from '$lib/components/ui/button'
  import * as Card from '$lib/components/ui/card'
  import { Switch } from '$lib/components/ui/switch'

  const notifications = [
    {
      title: 'Your call has been confirmed.',
      description: '1 hour ago'
    },
    {
      title: 'You have a new message!',
      description: '1 hour ago'
    },
    {
      title: 'Your subscription is expiring soon!',
      description: '2 hours ago'
    }
  ]
</script>

<Carousel.Root
  opts={{
    align: 'start'
  }}
  class="w-full"
>
  <Carousel.Content>
    {#each Array(5) as _, i (i)}
      <Carousel.Item class="md:basis-1/2 lg:basis-1/3">
        <div class="p-1">
          <img
            src="https://images.pexels.com/photos/11061048/pexels-photo-11061048.jpeg?auto=compress&cs=tinysrgb&w=600"
            alt=""
          />
        </div>
      </Carousel.Item>
    {/each}
  </Carousel.Content>
  <Carousel.Previous />
  <Carousel.Next />
</Carousel.Root>

<br />

<div class="grid grid-cols-3">
  <div>
    <Card.Root class="w-[380px]">
      <div class=" flex items-center space-x-4 rounded-md border p-4">
        <BellRing />
        <div class="flex-1 space-y-1">
          <p class="text-sm font-medium leading-none">Quote of the day</p>
          <p class="text-sm text-muted-foreground">xxxxxxxxxxxxxxxxxxxxx</p>
        </div>
      </div>
    </Card.Root>

    <Card.Root class="w-[380px]">
      <Card.Header>
        <Card.Title>Birthdays</Card.Title>
        <Card.Description>05-Feb-2024</Card.Description>
      </Card.Header>
      <Card.Content class="grid gap-4">
        <div>
          {#each notifications as notification, idx (idx)}
            <div
              class="mb-4 grid grid-cols-[25px_1fr] items-start pb-4 last:mb-0 last:pb-0"
            >
              <span
                class="flex h-2 w-2 translate-y-1 rounded-full bg-sky-500"
              />
              <div class="space-y-1">
                <p class="text-sm font-medium leading-none">
                  {notification.title}
                </p>
                <p class="text-sm text-muted-foreground">
                  {notification.description}
                </p>
              </div>
            </div>
          {/each}
        </div>
      </Card.Content>
    </Card.Root>
  </div>

  <Card.Root class="w-[380px]">
    <Card.Header>
      <Card.Title>Tasks</Card.Title>
      <Card.Description>You have 3 unread events.</Card.Description>
    </Card.Header>
    <Card.Content class="grid gap-4">
      <div>
        {#each notifications as notification, idx (idx)}
          <div
            class="mb-4 grid grid-cols-[25px_1fr] items-start pb-4 last:mb-0 last:pb-0"
          >
            <span class="flex h-2 w-2 translate-y-1 rounded-full bg-sky-500" />
            <div class="space-y-1">
              <p class="text-sm font-medium leading-none">
                {notification.title}
              </p>
              <p class="text-sm text-muted-foreground">
                {notification.description}
              </p>
            </div>
          </div>
        {/each}
      </div>
    </Card.Content>
    <Card.Footer>
      <Button class="w-full">
        <Check class="mr-2 h-4 w-4" /> Mark all as read
      </Button>
    </Card.Footer>
  </Card.Root>

  <Card.Root class="w-[380px]">
    <Card.Header>
      <Card.Title>Events</Card.Title>
      <Card.Description>You have 3 unread events.</Card.Description>
    </Card.Header>
    <Card.Content class="grid gap-4">
      <div>
        {#each notifications as notification, idx (idx)}
          <div
            class="mb-4 grid grid-cols-[25px_1fr] items-start pb-4 last:mb-0 last:pb-0"
          >
            <span class="flex h-2 w-2 translate-y-1 rounded-full bg-sky-500" />
            <div class="space-y-1">
              <p class="text-sm font-medium leading-none">
                {notification.title}
              </p>
              <p class="text-sm text-muted-foreground">
                {notification.description}
              </p>
            </div>
          </div>
        {/each}
      </div>
    </Card.Content>
    <!-- <Card.Footer>
      <Button class="w-full">
        <Check class="mr-2 h-4 w-4" /> Mark all as read
      </Button>
    </Card.Footer> -->
  </Card.Root>
</div>
