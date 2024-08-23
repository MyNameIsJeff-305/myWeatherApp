<script>
	import moment from 'moment';
	export let forecast;
</script>

<section>
	{#if forecast}
		<h3>FORECAST</h3>
		<div>
			{#each forecast as day}
				<article>
					<span>{moment(day.date).format('MM/DD')}</span>
					<!-- svelte-ignore a11y-missing-attribute -->
					<img src={day.day.condition.icon} />
				</article>
			{/each}
		</div>
	{:else}
		<p>No forecast available</p>
	{/if}
</section>

<style>
	h3 {
		font-size: 24px;
		font-weight: 400;
		color: #555;
		margin-bottom: 20px;
	}

	section {
		display: flex;
		justify-content: space-around;
		flex-direction: column;
		align-items: center;
		padding: 0;
		/* margin-top: 24px; */
		width: 100%;
	}

	div {
		display: flex;
		justify-content: space-around;
		align-items: center;
		/* gap: 24px; */
		width: 100%;
	}

	article {
		display: flex;
		flex-direction: column;
		align-items: center;
	}

	span {
		font-size: 16px;
		font-weight: 700;
		color: #555;
	}

	p {
		font-size: 16px;
		font-weight: 700;
		color: #555;
	}
</style>
