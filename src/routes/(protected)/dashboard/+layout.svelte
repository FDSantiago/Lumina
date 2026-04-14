<script lang="ts">
	import { APP_NAME } from '$lib/config';

	import { resolve } from "$app/paths";

	import IconLogOut from '~icons/lucide/log-out';
	import IconUser from '~icons/lucide/user';
	
	let activePage = $state('dashboard');

	let { children } = $props();
</script>

<aside
	class="absolute inset-y-0 left-0 flex w-[180px] shrink-0 flex-col justify-between rounded-r-[28px] bg-[#8FD4FF] px-4 py-7"
>
	<!-- Top: logo + nav -->
	<div class="flex flex-col gap-10">
		<div class="flex flex-col items-center gap-2">
			<img src="/lumina.svg" alt="Lumina Logo" class="h-10 w-10" />
			<h1 class="text-2xl font-extrabold text-[#292836]">{APP_NAME}</h1>
		</div>

		<nav class="flex flex-col gap-1.5">
			<a
				href={resolve('/dashboard')}
				class="rounded-[10px] px-3.5 py-2 text-left text-[13px] font-semibold tracking-wide text-[#1a3a5c] uppercase transition-colors
                 {activePage === 'dashboard' ? 'bg-white/50' : 'hover:bg-white/35'}"
			>
				Dashboard
			</a>
			<a
				href={resolve('/profile')}
				class="rounded-[10px] px-3.5 py-2 text-left text-[13px] font-semibold tracking-wide text-[#1a3a5c] uppercase transition-colors
                 {activePage === 'profile' ? 'bg-white/50' : 'hover:bg-white/35'}"
			>
				Profile
			</a>
		</nav>
	</div>

	<!-- Bottom: user chip + logout -->
	<div class="flex flex-col gap-3.5">
		<div class="flex items-center gap-2.5 rounded-[14px] bg-[#6a3fa6] px-3 py-2.5">
			<div
				class="flex h-[34px] w-[34px] shrink-0 items-center justify-center rounded-full bg-white/25 text-white"
			>
				<IconUser />
			</div>
			<div class="flex flex-col">
				<span class="text-[13px] leading-tight font-bold text-white">Employee</span>
				<span class="text-[11px] text-white/70">Engineering</span>
			</div>
		</div>

		<button
			class="flex cursor-pointer items-center gap-2 rounded-lg px-1.5 py-1 text-[13px] font-semibold text-red-600 transition-colors hover:bg-red-500/10"
		>
			<IconLogOut />
			<a href={resolve("/login")}>Log out</a>
		</button>
	</div>
</aside>

<div class="pl-48 rounded-lg">
	{@render children()}
</div>
