<script lang="ts">
	import './layout.css';
	import favicon from '$lib/assets/favicon.svg';

	import { Toaster, toast } from 'svelte-sonner';
	import { getFlash } from 'sveltekit-flash-message';
	import { page } from '$app/state';
	
  	const flash = getFlash(page);

	if ($flash) {
		toast[$flash.type]($flash.message)
		toast("hi")
	} 

	let { children } = $props();
</script>

<svelte:head><link rel="icon" href={favicon} /></svelte:head>
<Toaster richColors />
{@render children()}
