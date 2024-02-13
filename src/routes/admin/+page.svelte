  <script lang="ts">
    export let data;
  </script>

  <svelte:head>
    <style>
      /* Exclude layout styles */
      body {
        margin: 0;
        padding: 0;
      }
    </style>
  </svelte:head>

  <div class="hidden md:block">
    <table class="table-auto">
      <thead>
        <tr>
          {#each Object.keys(data.result[0]) as key}
            <th class="px-4 py-2">{key}</th>
          {/each}
        </tr>
      </thead>
      <tbody>
        {#each data.result as item}
          <tr>
            {#each Object.values(item) as value}
              <td class="border px-4 py-2">{value}</td>
            {/each}
          </tr>
        {/each}
      </tbody>
    </table>
  </div>

