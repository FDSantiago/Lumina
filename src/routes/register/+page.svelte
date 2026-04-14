<script lang="ts">
	import { APP_NAME } from '$lib/config';
	import Button from '$lib/components/ui/button/button.svelte';
	import { enhance } from '$app/forms';

	let { form } = $props();

	let loading = $state(false);
</script>

<div class="grid h-screen grid-cols-4">
	<div class="col-span-2 grid place-items-center bg-white">
		<div class="w-full max-w-md px-8">
			<div class="mb-8 text-center">
				<h1 class="text-3xl font-extrabold text-amber-400">Create Account</h1>
				<p class="mt-2 text-gray-500">Join {APP_NAME} to submit reports</p>
			</div>

			<form
				method="POST"
				use:enhance={() => {
					loading = true;
					return async ({ update }) => {
						loading = false;
						await update();
					};
				}}
				class="space-y-4"
			>
				<div>
					<label for="name" class="mb-1 block text-sm font-medium text-gray-700">Full Name</label>
					<input
						id="name"
						name="name"
						type="text"
						required
						placeholder="John Doe"
						class="w-full rounded-lg bg-gray-200 p-3 outline-none focus:ring-2 focus:ring-blue-400"
					/>
				</div>

				<div>
					<label for="email" class="mb-1 block text-sm font-medium text-gray-700"
						>Email Address</label
					>
					<input
						id="email"
						name="email"
						type="email"
						required
						placeholder="you@company.com"
						class="w-full rounded-lg bg-gray-200 p-3 outline-none focus:ring-2 focus:ring-blue-400"
					/>
				</div>

				<div>
					<label for="password" class="mb-1 block text-sm font-medium text-gray-700">Password</label
					>
					<input
						id="password"
						name="password"
						type="password"
						required
						placeholder="Min. 8 characters"
						class="w-full rounded-lg bg-gray-200 p-3 outline-none focus:ring-2 focus:ring-blue-400"
					/>
				</div>

				<div>
					<label for="confirmPassword" class="mb-1 block text-sm font-medium text-gray-700"
						>Confirm Password</label
					>
					<input
						id="confirmPassword"
						name="confirmPassword"
						type="password"
						required
						placeholder="Re-enter your password"
						class="w-full rounded-lg bg-gray-200 p-3 outline-none focus:ring-2 focus:ring-blue-400"
					/>
				</div>

				<Button
					type="submit"
					disabled={loading}
					class="mt-6 w-full rounded-full bg-blue-500 py-4 text-lg font-bold text-white shadow-lg transition-transform hover:scale-[1.02] active:scale-95 disabled:opacity-50"
					style="box-shadow: 0 4px 0px 0px #2563eb;"
				>
					{loading ? 'Creating account...' : 'Create Account'}
				</Button>

				<p class="text-center text-sm text-gray-500">
					Already have an account?
					<a href="/login" class="font-semibold text-amber-500 hover:underline">Sign in</a>
				</p>
			</form>
		</div>
	</div>
	<div class="col-span-2 grid grid-rows-3 justify-between bg-[#8FD4FF] p-16">
		<div class="row-span-1 flex items-center justify-center">
			<img src="lumina.svg" alt="Lumina Logo" />
			<h1 class="ml-8 text-center text-8xl font-extrabold text-[#292836]">{APP_NAME}</h1>
		</div>

		<div class="row-span-1 flex flex-col justify-center">
			<h2 class="mb-2 text-5xl font-bold">Report with confidence.</h2>
			<p class="text-xl">
				Your identity is protected. Submit reports anonymously and help create a safer workplace.
			</p>
		</div>
		<div class="row-span-1"></div>
	</div>
</div>
