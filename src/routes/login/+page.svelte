<script>
	import { APP_NAME } from '$lib/config';
	import { resolve } from '$app/paths';

	import LucideUser from '~icons/lucide/user';
	import LucideUserCog from '~icons/lucide/user-cog';
	import Button from '$lib/components/ui/button/button.svelte';
	import { goto } from '$app/navigation';

	let role = $state('employee');
</script>

<div class="grid h-screen grid-cols-4">
	<div class="col-span-2 grid place-items-center bg-white">
		<div class="w-full max-w-md px-8">
			<div class="mb-8 text-center">
				<h1 class="text-3xl font-extrabold text-amber-400">Welcome Back</h1>
				<p class="mt-2 text-gray-500">Sign in to your account to continue</p>
			</div>

			<div class="mb-6 flex gap-4">
				<button
					onclick={() => (role = 'employee')}
					class="flex flex-1 items-center justify-center gap-2 rounded-full border-2 py-3 font-semibold transition-all
                    {role === 'employee'
						? 'border-gray-300 bg-white shadow-md'
						: 'border-transparent text-gray-400'}"
				>
					<LucideUser class="h-5 w-5" /> Employee
				</button>
				<button
					onclick={() => (role = 'admin')}
					class="flex flex-1 items-center justify-center gap-2 rounded-full border-2 py-3 font-semibold transition-all
                    {role === 'admin'
						? 'border-gray-300 bg-white shadow-md'
						: 'border-transparent text-gray-400'}"
				>
					<LucideUserCog class="h-5 w-5" /> Admin
				</button>
			</div>

			<form class="space-y-4">
				<input
					type="email"
					placeholder="Email Address"
					class="w-full rounded-lg bg-gray-200 p-2 outline-none focus:ring-2 focus:ring-blue-400"
				/>
				<input
					type="password"
					placeholder="Password"
					class="w-full rounded-lg bg-gray-200 p-2 outline-none focus:ring-2 focus:ring-blue-400"
				/>

				<div class="flex items-center justify-between text-sm">
					<label class="flex cursor-pointer items-center gap-2 text-gray-500">
						<input type="checkbox" class="h-4 w-4 rounded border-gray-300" />
						Remember me
					</label>
					<a href="#" class="font-semibold text-amber-500 hover:underline">Forgot Password</a>
				</div>

				<Button
					type="submit"
					class="mt-6 w-full rounded-full bg-blue-500 py-4 text-lg font-bold text-white shadow-lg transition-transform hover:scale-[1.02] active:scale-95"
					style="box-shadow: 0 4px 0px 0px #2563eb;"
					onclick={() => {
                        window.location.href = "/dashboard"
					}}
				>
					Sign in
				</Button>
			</form>
		</div>
	</div>
	<div class="col-span-2 grid grid-rows-3 justify-between bg-[#8FD4FF] p-16">
		<div class="row-span-1 flex items-center justify-center">
			<img src="lumina.svg" alt="Lumina Logo" />
			<h1 class="ml-8 text-center text-8xl font-extrabold text-[#292836]">{APP_NAME}</h1>
		</div>

		<div class="row-span-1 flex flex-col justify-center">
			<h2 class="mb-2 text-5xl font-bold">Bring hidden issues to light.</h2>
			<p class="text-xl">
				Enable safe, anonymous reporting while giving your organization the clarity and
				accountability needed to act on problems and improve workplace transparency.
			</p>
		</div>
		<div class="row-span-1"></div>
	</div>
</div>
