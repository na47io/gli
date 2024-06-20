<script>
	export let data;
</script>

<div class="grid grid-cols-1 md:grid-cols-2 gap-4">
	<!-- a streak card -->
	<div class="bg-white shadow-md rounded-lg p-4 md:col-span-2">
		<h2 class="text-sm font-medium text-gray-500 mb-2">Current Streak 🔥</h2>
		<p class="text-4xl font-bold text-indigo-600">{data.streak} days</p>
	</div>

	<!-- total cost -->
	<div class="bg-white shadow-md rounded-lg p-4">
		<h2 class="text-sm font-medium text-gray-500 mb-2">Total Cost</h2>
		<p class="text-4xl font-bold text-green-600">${data.cost}</p>
	</div>

	<!-- last commit date -->
	<div class="bg-white shadow-md rounded-lg p-4">
		<h2 class="text-sm font-medium text-gray-500 mb-2">Last Commit</h2>
		<p class="text-2xl font-bold text-gray-800">{data.lastCommitMoment.fromNow()}</p>
		<p class="text-sm text-gray-500">{data.lastCommitMoment.format('LLLL')}</p>
	</div>

	<!-- a list of recent push events -->
	{#if data.commits.length}
		<div class="bg-white shadow-md rounded-lg p-4 md:col-span-1">
			<h2 class="text-sm font-medium text-gray-500 mb-2">Recent Push Events</h2>
			<div class="overflow-x-auto">
				<table class="min-w-full divide-y divide-gray-200">
					<thead class="bg-gray-50">
						<tr>
							<th
								class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
								>Commit Message</th
							>
							<th
								class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
								>Timestamp</th
							>
						</tr>
					</thead>
					<tbody class="bg-white divide-y divide-gray-200">
						{#each data.commits as commit}
							<tr>
								<td class="px-6 py-4 whitespace-nowrap text-sm text-gray-600 flex items-center">
									{commit.commit.message}
									<a href={commit.url} target="_blank" class="ml-2">
										<svg
											xmlns="http://www.w3.org/2000/svg"
											class="h-4 w-4 text-blue-500 hover:text-blue-700"
											fill="none"
											viewBox="0 0 24 24"
											stroke="currentColor"
										>
											<path
												stroke-linecap="round"
												stroke-linejoin="round"
												stroke-width="2"
												d="M13 16h-1v-4h-1m1 4h1m-1-4h-1m4-1V7a4 4 0 10-8 0v4m8 0H7v1a2 2 0 002 2h1v4h2v-4h1a2 2 0 002-2v-1z"
											/>
										</svg>
									</a>
								</td>
								<td class="px-6 py-4 whitespace-nowrap text-sm text-gray-600">eree</td>
							</tr>
						{/each}
					</tbody>
				</table>
			</div>
		</div>
	{/if}
</div>
