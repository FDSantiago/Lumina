	<script lang="ts">
	import { APP_NAME } from '$lib/config';
	import Button from '$lib/components/ui/button/button.svelte';
	import LucideShield from '~icons/lucide/shield';
	import LucideLock from '~icons/lucide/lock';
	import LucideEye from '~icons/lucide/eye';
	import LucideUsers from '~icons/lucide/users';
	import LucideCheckCircle from '~icons/lucide/check-circle';
	import LucideArrowRight from '~icons/lucide/arrow-right';
</script>

<div class="min-h-screen bg-background">
	<nav class="fixed top-0 z-50 w-full border-b border-border/50 bg-background/80 backdrop-blur-lg">
		<div class="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
			<div class="flex items-center gap-2">
				<img src="lumina.svg" alt="Lumina Logo" class="h-8 w-8" />
				<span class="text-xl font-bold text-foreground">{APP_NAME}</span>
			</div>
			<div class="flex items-center gap-4">
				<a
					href="/login"
					class="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
					>Sign In</a
				>
				<Button href="/register" size="sm" class="gap-2">
					Get Started
					<LucideArrowRight class="h-4 w-4" />
				</Button>
			</div>
		</div>
	</nav>

	<section
		class="relative flex min-h-screen flex-col items-center justify-center overflow-hidden pt-16"
	>
		<div class="absolute inset-0 -z-10">
			<div class="absolute top-20 left-1/4 h-72 w-72 rounded-full bg-primary/20 blur-3xl"></div>
			<div
				class="absolute right-1/4 bottom-20 h-96 w-96 rounded-full bg-amber-400/20 blur-3xl"
			></div>
		</div>

		<div class="mx-auto max-w-5xl px-6 text-center">
			<div
				class="mb-6 inline-flex items-center gap-2 rounded-full border border-border bg-card px-4 py-1.5 text-sm"
			>
				<LucideShield class="h-4 w-4 text-primary" />
				<span class="text-muted-foreground">Anonymous & Secure Reporting</span>
			</div>

			<h1 class="mb-6 text-5xl font-extrabold tracking-tight sm:text-6xl lg:text-7xl">
				<span class="text-foreground">Bring hidden issues</span>
				<br />
				<span class="bg-gradient-to-r from-amber-400 to-orange-500 bg-clip-text text-transparent"
					>to light.</span
				>
			</h1>

			<p class="mx-auto mb-10 max-w-2xl text-lg text-muted-foreground sm:text-xl">
				Enable safe, anonymous reporting while giving your organization the clarity and
				accountability needed to act on problems and improve workplace transparency.
			</p>

			<div class="flex flex-col items-center justify-center gap-4 sm:flex-row">
				<Button href="/register" size="lg" class="gap-2 px-8">
					Start Reporting
					<LucideArrowRight class="h-5 w-5" />
				</Button>
				<Button href="/login" variant="outline" size="lg" class="gap-2 px-8">Sign In</Button>
			</div>
		</div>

		<div class="mt-20 flex items-center justify-center gap-8 text-sm text-muted-foreground">
			<div class="flex items-center gap-2">
				<LucideCheckCircle class="h-4 w-4 text-green-500" />
				<span>100% Anonymous</span>
			</div>
			<div class="flex items-center gap-2">
				<LucideCheckCircle class="h-4 w-4 text-green-500" />
				<span>End-to-End Encrypted</span>
			</div>
			<div class="flex items-center gap-2">
				<LucideCheckCircle class="h-4 w-4 text-green-500" />
				<span>GDPR Compliant</span>
			</div>
		</div>
	</section>

	<section class="relative border-t border-border/50 bg-card/50 py-24">
		<div class="mx-auto max-w-7xl px-6">
			<div class="mb-16 text-center">
				<h2 class="mb-4 text-3xl font-extrabold tracking-tight sm:text-4xl">
					Why choose {APP_NAME}?
				</h2>
				<p class="mx-auto max-w-2xl text-muted-foreground">
					A comprehensive platform designed to protect reporters while empowering organizations to
					create positive change.
				</p>
			</div>

			<div class="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
				<div
					class="group relative rounded-2xl border border-border bg-card p-8 transition-all hover:border-primary/50 hover:shadow-lg"
				>
					<div class="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
						<LucideEye class="h-6 w-6 text-primary" />
					</div>
					<h3 class="mb-2 text-xl font-semibold">Complete Anonymity</h3>
					<p class="text-muted-foreground">
						Submit reports without revealing your identity. Your privacy is our top priority with
						zero traceable metadata.
					</p>
				</div>

				<div
					class="group relative rounded-2xl border border-border bg-card p-8 transition-all hover:border-primary/50 hover:shadow-lg"
				>
					<div class="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
						<LucideLock class="h-6 w-6 text-primary" />
					</div>
					<h3 class="mb-2 text-xl font-semibold">End-to-End Encryption</h3>
					<p class="text-muted-foreground">
						All reports are encrypted from submission to resolution. Only authorized personnel can
						access sensitive details.
					</p>
				</div>

				<div
					class="group relative rounded-2xl border border-border bg-card p-8 transition-all hover:border-primary/50 hover:shadow-lg"
				>
					<div class="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
						<LucideUsers class="h-6 w-6 text-primary" />
					</div>
					<h3 class="mb-2 text-xl font-semibold">Role-Based Access</h3>
					<p class="text-muted-foreground">
						Granular permissions ensure the right people see the right information. Employees and
						admins have separate dashboards.
					</p>
				</div>
			</div>
		</div>
	</section>

	<section class="relative py-24">
		<div class="mx-auto max-w-7xl px-6">
			<div
				class="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#292836] to-[#1a1a24] p-12 text-white lg:p-16"
			>
				<div class="absolute -top-20 -right-20 h-64 w-64 rounded-full bg-primary/30 blur-3xl"></div>
				<div
					class="absolute -bottom-20 -left-20 h-64 w-64 rounded-full bg-amber-400/20 blur-3xl"
				></div>

				<div class="relative z-10">
					<h2 class="mb-4 text-3xl font-extrabold tracking-tight sm:text-4xl">
						Ready to make a difference?
					</h2>
					<p class="mb-8 max-w-xl text-lg text-gray-300">
						Join thousands of organizations using Lumina to create safer, more transparent
						workplaces. Get started in minutes.
					</p>
					<Button href="/register" size="lg" class="bg-white text-foreground hover:bg-gray-100">
						Create Free Account
					</Button>
				</div>
			</div>
		</div>
	</section>

	<footer class="border-t border-border/50 py-12">
		<div class="mx-auto max-w-7xl px-6">
			<div class="flex flex-col items-center justify-between gap-4 sm:flex-row">
				<div class="flex items-center gap-2">
					<img src="lumina.svg" alt="Lumina Logo" class="h-6 w-6" />
					<span class="font-semibold text-foreground">{APP_NAME}</span>
				</div>
				<p class="text-sm text-muted-foreground">
					&copy; {new Date().getFullYear()}
					{APP_NAME}. All rights reserved.
				</p>
			</div>
		</div>
	</footer>
</div>
