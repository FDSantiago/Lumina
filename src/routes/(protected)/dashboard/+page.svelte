<script lang="ts">
	import { Switch, Label } from 'bits-ui';

	import * as Select from '$lib/components/ui/select/index.js';
	import * as Dialog from '$lib/components/ui/dialog/index.js';
	import { Button } from '$lib/components/ui/button/index.js';

	import IconBell from '~icons/lucide/bell';
	import IconUser from '~icons/lucide/user';
	import IconMessageSquare from '~icons/lucide/message-square';
	import IconFileText from '~icons/lucide/file-text';
	import IconCalendar from '~icons/lucide/calendar';
	import DatePicker from '$lib/components/ui/date-picker.svelte';

	const stats = [
		{ icon: IconMessageSquare, value: 2, label: 'New messages' },
		{ icon: IconFileText, value: 4, label: 'Reports submitted' },
		{ icon: IconCalendar, value: 12, label: 'Days this month' }
	];

	let reports = $state([
		{
			title: 'Safety Concern',
			meta: '#Lorem ipsum · 2 days ago',
			badge: 'Under Review',
			isReview: true
		},
		{ title: 'Policy Violation', meta: '#Lorem ipsum · 1 day ago', badge: '', isReview: false }
	]);

	let description = $state('');
	let witnessInfo = $state('');
	let incidentTime = $state('');
	let isAnonymous = $state(false);
	let dialogOpen = $state(false);

	function submitReport() {
		const category = reportCategories.find((c) => c.value === report_value)?.label ?? report_value;
		const severity =
			severities.find((s) => s.value === severities_value)?.label ?? severities_value;
		const newReport = {
			title: category,
			meta: `#${category} · Just now`,
			badge: severity,
			isReview: false
		};
		reports = [newReport, ...reports];
		description = '';
		witnessInfo = '';
		report_value = '';
		severities_value = '';
		incidentTime = '';
		isAnonymous = false;
		dialogOpen = false;
	}

	const reportCategories = [
		{ value: 'safety-concern', label: 'Safety Concern' },
		{ value: 'policy-violation', label: 'Policy Violation' }
	];
	const severities = [
		{ value: 'critical', label: 'Critical' },
		{ value: 'major', label: 'Major' },
		{ value: 'moderate', label: 'Moderate' },
		{ value: 'minor', label: 'Minor' },
		{ value: 'low', label: 'Low' },
		{ value: 'info', label: 'Informational' }
	];

	let report_value = $state<string>('');
	const report_selectedLabel = $derived(
		report_value
			? reportCategories.find((category) => category.value === report_value)?.label
			: 'Select a report category'
	);

	let severities_value = $state<string>('');
	const severities_selectedLabel = $derived(
		severities_value
			? severities.find((category) => category.value === severities_value)?.label
			: 'Select a severity'
	);
</script>

<!-- Shell -->
<div class="flex h-screen overflow-hidden bg-[#f0f4f8] font-sans">
	<!-- ── Main ── -->
	<main class="scrollbar flex flex-1 flex-col gap-5 overflow-y-auto px-7 py-7">
		<!-- Topbar -->
		<header class="flex flex-wrap items-start justify-between gap-3">
			<div>
				<h1 class="text-[26px] leading-tight font-normal text-gray-900">
					Good Morning, <strong class="font-extrabold">employee!</strong>
				</h1>
				<p class="mt-1 text-[13px] text-gray-500">Here's what's happening with your work today.</p>
			</div>

			<div class="flex items-center gap-3.5">
				<div class="flex items-center gap-2.5">
					<button
						class="cursor-pointer rounded-lg p-1.5 text-gray-700 transition-colors hover:bg-gray-200"
					>
						<IconBell />
					</button>
					<div class="flex flex-col">
						<span class="text-[13px] leading-tight font-semibold text-gray-900">Employee</span>
						<span class="text-[11px] text-gray-500">Engineering</span>
					</div>
					<div
						class="relative flex h-[42px] w-[42px] cursor-pointer items-center justify-center rounded-full bg-gray-300 text-gray-700"
					>
						<IconUser />
						<span
							class="absolute right-0.5 bottom-0.5 h-2.5 w-2.5 rounded-full border-2 border-white bg-green-500"
						></span>
					</div>
				</div>

				<Dialog.Root bind:open={dialogOpen}>
					<Dialog.Trigger
						class="cursor-pointer rounded-full bg-blue-500 px-5 py-2.5 text-[13px] font-semibold whitespace-nowrap text-white transition-all hover:bg-blue-600 active:-translate-y-px"
					>
						Submit Report
					</Dialog.Trigger>
					<Dialog.Content
						class="fixed top-[50%] left-[50%] z-50 w-full max-w-[calc(100%-2rem)] translate-x-[-50%] translate-y-[-50%] rounded-lg border bg-white p-5 shadow-popover outline-hidden data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95 sm:max-w-[490px] md:w-full"
					>
						<Dialog.Title class="flex w-full items-center text-lg font-semibold tracking-tight">
							<svg
								class="mr-2 size-10 fill-[#57A5FF]"
								width="120"
								height="120"
								viewBox="0 0 120 120"
								fill="none"
								xmlns="http://www.w3.org/2000/svg"
							>
								<path
									d="M110 0C115.523 2.41413e-07 120 4.47715 120 10V70C120 72.7614 118.881 75.2616 117.071 77.0713L117.072 77.0723L77.0723 117.072L77.0713 117.071C75.2616 118.881 72.7614 120 70 120H10C4.47715 120 1.64853e-06 115.523 0 110V50C1.20706e-07 47.2386 1.11907 44.7384 2.92871 42.9287L2.92773 42.9277L42.9277 2.92773L42.9287 2.92871C44.7384 1.11907 47.2386 -1.20704e-07 50 0H110ZM72 13V48H97V33H87V13H72Z"
								/>
							</svg>

							<h2 class="text-3xl font-bold">Submit a Report</h2>
						</Dialog.Title>
						<Dialog.Description class="text-foreground-alt text-sm">
							Your voice matters. Reports are handled with confidentiality.
						</Dialog.Description>
						<div class="flex flex-col items-start gap-1 pt-7 pb-11">
							<div
								class="flex w-full items-center justify-between rounded-lg border border-black/30 bg-[#D9D9D9] p-4"
							>
								<div>
									<h3 class="text-xl font-bold">Report Anonymously</h3>
									<p class="text-sm">Your identity will be protected</p>
								</div>

								<Switch.Root
									id="dnd"
									name="hello"
									bind:checked={isAnonymous}
									class="data-[state=unchecked]:shadow-mini-inset peer inline-flex h-[36px] min-h-[36px] w-[60px] shrink-0 cursor-pointer items-center rounded-full px-[3px] transition-colors focus-visible:ring-2 focus-visible:ring-foreground focus-visible:ring-offset-2 focus-visible:ring-offset-background focus-visible:outline-hidden disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-[#57A5FF] data-[state=unchecked]:bg-[#9C9C9C] dark:data-[state=checked]:bg-foreground"
								>
									<Switch.Thumb
										class="data-[state=unchecked]:shadow-mini pointer-events-none block size-[30px] shrink-0 rounded-full bg-white transition-transform data-[state=checked]:translate-x-6 data-[state=unchecked]:translate-x-0 dark:bg-foreground dark:shadow-popover"
									/>
								</Switch.Root>
							</div>

							<div class="flex w-full flex-col gap-4">
								<div class="mt-4 flex flex-col gap-1.5">
									<Label.Root class="text-sm font-medium text-gray-700">Report Type</Label.Root>
									<Select.Root type="single" name="favoriteFruit" bind:value={report_value}>
										<Select.Trigger class="w-full">
											{report_selectedLabel}
										</Select.Trigger>
										<Select.Content>
											<Select.Group>
												{#each reportCategories as category (category.value)}
													<Select.Item value={category.value} label={category.label}>
														{category.label}
													</Select.Item>
												{/each}
											</Select.Group>
										</Select.Content>
									</Select.Root>
								</div>

								<div class="flex flex-col gap-1.5">
									<Label.Root class="text-sm font-medium text-gray-700">Severity</Label.Root>
									<Select.Root type="single" name="favoriteFruit" bind:value={severities_value}>
										<Select.Trigger class="w-full">
											{severities_selectedLabel}
										</Select.Trigger>
										<Select.Content>
											<Select.Group>
												{#each severities as category (category.value)}
													<Select.Item value={category.value} label={category.label}>
														{category.label}
													</Select.Item>
												{/each}
											</Select.Group>
										</Select.Content>
									</Select.Root>
								</div>

								<div class="flex justify-between">
									<div class="mx-2 flex w-full flex-col gap-1.5">
										<Label.Root class="text-sm font-medium text-gray-700">Incident Date</Label.Root>
										<DatePicker />
									</div>

									<div class="mx-2 flex w-full flex-col gap-1.5">
										<Label.Root class="text-sm font-medium text-gray-700">Incident Time</Label.Root>
										<input
											type="time"
											class="w-full rounded-lg border border-black/30 bg-white px-3 py-2 text-sm"
											bind:value={incidentTime}
										/>
									</div>
								</div>

								<div class="flex flex-col gap-1.5">
									<Label.Root class="text-sm font-medium text-gray-700">Description</Label.Root>
									<textarea
										placeholder="Describe the incident in detail..."
										class="w-full resize-none rounded-lg border border-black/30 bg-white px-3 py-2 text-sm"
										rows="4"
										bind:value={description}
									></textarea>

									<div class="flex flex-col gap-1.5">
										<Label.Root class="text-sm font-medium text-gray-700"
											>Witness Information (optional)</Label.Root
										>
										<textarea
											placeholder="Describe the incident in detail..."
											class="w-full resize-none rounded-lg border border-black/30 bg-white px-3 py-2 text-sm"
											rows="4"
											bind:value={witnessInfo}
										></textarea>
									</div>
								</div>
							</div>
						</div>
						<Dialog.Footer>
							<Button
								class="cursor-pointer rounded-full bg-blue-500 px-5 py-2.5 text-[13px] font-semibold whitespace-nowrap text-white transition-all hover:bg-blue-600 active:-translate-y-px"
								onclick={submitReport}
							>
								Submit Report
							</Button>
						</Dialog.Footer>
					</Dialog.Content>
				</Dialog.Root>
			</div>
		</header>

		<!-- Stat cards -->
		<div class="grid grid-cols-3 gap-3.5">
			{#each stats as s (s.label)}
				{@const StatIcon = s.icon}
				<div
					class="flex items-center gap-3.5 rounded-2xl border border-gray-200 bg-white px-5 py-[18px]"
				>
					<div
						class="flex h-[38px] w-[38px] shrink-0 items-center justify-center rounded-full border-2 border-gray-300 text-gray-700"
					>
						<StatIcon class="h-4 w-4" />
					</div>
					<div class="flex flex-col">
						<span class="text-[22px] leading-none font-bold text-gray-900">{s.value}</span>
						<span class="mt-0.5 text-[12px] text-gray-500">{s.label}</span>
					</div>
				</div>
			{/each}
		</div>

		<!-- Recent Reports card -->
		<div class="rounded-[18px] border border-gray-200 bg-white p-5">
			<div class="mb-4 flex items-center justify-between">
				<span class="text-[15px] font-bold text-gray-900">My Recent Reports</span>
				<button class="cursor-pointer text-[13px] font-semibold text-blue-500">View all</button>
			</div>

			<div class="flex flex-col gap-3">
				{#each reports as r (r.title)}
					<div
						class="flex items-center justify-between border-b border-gray-100 pb-3 last:border-0 last:pb-0"
					>
						<div>
							<span class="block text-[13px] font-semibold text-gray-900">{r.title}</span>
							<span class="text-[11px] text-gray-400">{r.meta}</span>
						</div>
						{#if r.badge}
							<span
								class="rounded-full px-2.5 py-1 text-[11px] font-semibold
                           {r.isReview ? 'bg-amber-100 text-amber-600' : 'bg-red-100 text-red-500'}"
							>
								{r.badge}
							</span>
						{:else}
							<span class="inline-block h-5 w-[60px] rounded-full bg-red-100"></span>
						{/if}
					</div>
				{/each}
			</div>
		</div>
	</main>
</div>

<style>
	/* Scrollbar styling — not possible with Tailwind utilities alone */
	main::-webkit-scrollbar {
		width: 6px;
	}
	main::-webkit-scrollbar-track {
		background: transparent;
	}
	main::-webkit-scrollbar-thumb {
		background: #d1d5db;
		border-radius: 99px;
	}
</style>
