<script>
	export let feelsLike;
	export let humidity;
	export let windSpeed;
</script>

<footer>
	<div>
		<span> {feelsLike} </span>
		<strong> Feels Like </strong>
	</div>
	<div>
		<span> {humidity} </span>
		<strong> Humidity </strong>
	</div>
	<div>
		<span> {windSpeed} </span>
		<strong> Wind Speed </strong>
	</div>
</footer>

<style>
	footer {
		border: 1px solid #f5f5f5d3;
		padding: 24px;
		width: 100%;
		max-width: 600px;
		margin: 10px auto;
		border-radius: 16px;
		display: flex;
		justify-content: space-around;
		align-items: center;
		background-color: #f5f5f5d3;
		box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
	}

	div {
		display: flex;
		flex-direction: column;
		align-items: center;
	}

	span {
		font-weight: 700;
		font-size: 24px;
		color: #007bff;
	}

	strong {
		color: #555;
		font-size: 16px;
		font-weight: 500;
		margin-top: 8px;
	}
</style>
