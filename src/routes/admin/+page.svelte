<script lang="ts">
    export let data
  </script>
  
  <div>
    <ul>
      {#each data.result as item}
        
          <ul class="mb-2 ">
            {#each Object.entries(item) as [key, value]}
              <li > <span class="mx-4 font-extrabold mb-1">{key}</span> -  <span>{value}</span></li>
            {/each}
          </ul>
        
      {/each}
    </ul>
  </div>
  