<script>
	import { getWeatherFrom, getForecast, getLocation } from '../services/weather.js';
	import WeatherInfo from './components/weather-info.svelte';
	import WeatherIcon from './components/weather-icon.svelte';
	import ForecastInfo from './components/forecast-info.svelte';
	import { onMount } from 'svelte';

	let city = '';
	let weatherFetch = null;
	let forecast = null;
	let loading = false;
	let error = null;
	let measureSystem = '';
	
	async function getWeather(city) {
		if (!city) return;
		loading = true;
		error = null;
		
		try {
			weatherFetch = await getWeatherFrom(city);
			forecast = await getForecast(city, 5);
			measureSystem = 'imperial';
		} catch (e) {
			error = 'City not found';
			loading = false;
		} finally {
			loading = false;
		}
	}
	
	onMount(() => {
		let location = getLocation();
		console.log(location)
		getWeather("Miami");
	});
</script>

{#if loading}
	<main>
		<header>
			<span class="upper-bar-container">
				<div>
					<img class="logo" alt="This is the App's Logo" src="logo.png" />
				</div>
				<div class="search">
					<input type="text" placeholder="Search for a city" bind:value={city} />
					<button on:click={() => getWeather(city)}>
						<svg
							width="16"
							height="16"
							fill="none"
							viewBox="0 0 24 24"
							stroke-width="1.5"
							stroke="currentColor"
							class="size-6"
						>
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
							/>
						</svg>
					</button>
				</div>
			</span>
		</header>
		<section class="skeleton-section">
			<!-- svelte-ignore a11y-missing-content -->
			<h1 class="skeleton-title"></h1>
			<div class="skeleton-flex">
				<!-- svelte-ignore a11y-missing-content -->
				<h2 class="skeleton-subtitle"></h2>
				<div class="skeleton-circle"></div>
			</div>
			<!-- svelte-ignore a11y-missing-content -->
			<h3 class="skeleton-text"></h3>
		</section>

		<section class="content-section">
			<div class="content-flex">
				<div class="skeleton-bar"></div>
				<div class="skeleton-bar"></div>
				<div class="skeleton-bar"></div>
			</div>
		</section>
		<section class="content-section">
			<div class="content-flex">
				<div class="skeleton-bar"></div>
				<div class="skeleton-bar"></div>
				<div class="skeleton-bar"></div>
			</div>
		</section>
	</main>
{:else if error}
	<main>
		<header>
			<span class="upper-bar-container">
				<div>
					<img class="logo" alt="This is the App's Logo" src="logo.png" />
				</div>
				<div class="search">
					<input type="text" placeholder="Search for a city" bind:value={city} />
					<button on:click={() => getWeather(city)}>
						<svg
							width="16"
							height="16"
							fill="none"
							viewBox="0 0 24 24"
							stroke-width="1.5"
							stroke="currentColor"
							class="size-6"
						>
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
							/>
						</svg>
					</button>
				</div>
			</span>
		</header>
		<section class="error-view">
			<h1>Error</h1>
			<div>
				<h2>404</h2>
				<svg
					width="100"
					height="100"
					viewBox="0 0 24 24"
					fill="none"
					stroke="red"
					stroke-width="2"
					stroke-linecap="round"
					stroke-linejoin="round"
				>
					<circle cx="12" cy="12" r="10"></circle>
					<line x1="15" y1="9" x2="9" y2="15"></line>
					<line x1="9" y1="9" x2="15" y2="15"></line>
				</svg>
			</div>
			<h3>{error}</h3>
		</section>
	</main>
{:else if weatherFetch}
	<main style="background-image: url({weatherFetch.conditionImageURL});">
		<header>
			<span class="upper-bar-container">
				<div>
					<img class="logo" alt="This is the App's Logo" src="logo.png" />
				</div>
				<div class="search">
					<input type="text" placeholder="Search for a city" bind:value={city} />
					<button on:click={() => getWeather(city)}>
						<svg
							width="16"
							height="16"
							fill="none"
							viewBox="0 0 24 24"
							stroke-width="1.5"
							stroke="currentColor"
							class="size-6"
						>
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
							/>
						</svg>
					</button>
				</div>
			</span>
		</header>
		<section>
			<div></div>
			<h1>{weatherFetch.name}</h1>
			<h4>{weatherFetch.country}</h4>
			<div>
				<h2>
					{Math.round(
						measureSystem === 'imperial'
							? weatherFetch.temperature.temp_f
							: weatherFetch.temperature.temp_c
					)}º{measureSystem === 'imperial' ? 'F' : 'C'}
				</h2>
				<WeatherIcon icon={weatherFetch.condition.icon} width="130" />
			</div>
			<h3>{weatherFetch.conditionText}</h3>
		</section>
		<WeatherInfo
			feelsLike={`${measureSystem === 'imperial' ? weatherFetch.feelsLike.feelslike_f : weatherFetch.feelsLike.feelslike_c}º ${measureSystem === 'imperial' ? 'F' : 'C'}`}
			humidity={`${weatherFetch.humidity}%`}
			windSpeed={`${measureSystem === 'imperial' ? weatherFetch.windSpeed.wind_mph + ' mph' : weatherFetch.windSpeed.wind_kph + ' kph'}`}
		/>
		<section>
			<ForecastInfo forecast={forecast.forecast.forecastday} />
		</section>
		<section class="description-container">
			<div class="description-footer">
				<h5>myWeatherApp</h5>
				<p>
					Weather App is a simple weather application that allows users to search for a city and get
					the current weather and a 3-day forecast. Project created by <a
						href="https://github.com/MyNameIsJeff-305">Michel Garcia Ribalta</a
					>
				</p>
			</div>
			<div class="measures-container">
				<h5>Units</h5>
				<div class="temp-speed-checkbox">
					<input
						type="radio"
						id="imperial"
						name="measureSystem"
						value="imperial"
						checked={measureSystem === 'imperial'}
						on:change={() => (measureSystem = 'imperial')}
					/>
					<label for="imperial">Imperial</label>
					<input
						type="radio"
						id="metric"
						name="measureSystem"
						value="metric"
						checked={measureSystem === 'metric'}
						on:change={() => (measureSystem = 'metric')}
					/>
					<label for="metric">Metric</label>
				</div>
			</div>
		</section>
	</main>
{:else}
	<main>
		<p>No weather data available. Search for a city to get started.</p>
	</main>
{/if}

<style>
	main {
		background-size: cover;
		background-position: center;
		background-repeat: no-repeat;
		background-size: cover;
		width: 100%;
		min-height: auto;
		transition: background-image 0.3s ease;
	}

	.description-container {
		display: flex;
		flex-direction: row;
		justify-content: center;
		align-items: center;
		margin-top: 10px;
		padding-top: 16px;
		padding-bottom: 16px;
		gap: 20px;
	}

	.description-footer {
		display: flex;
		text-align: start;
		flex-direction: column;
		justify-content: center;
		align-items: start;
	}

	.description-footer h5 {
		font-size: 1rem;
		font-weight: 700;
		color: #555;
	}

	.description-footer p {
		font-size: 0.6rem;
		font-weight: 400;
		color: #555;
	}

	.logo {
		width: 50px;
		height: 50px;
	}

	.search {
		display: flex;

		justify-content: center;
		align-items: center;
	}

	.upper-bar-container {
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-items: center;
	}

	.measures-container {
		display: flex;
		flex-direction: column;
		justify-content: start;
		align-items: end;
	}

	.temp-speed-checkbox {
		display: flex;
		flex-direction: row;
		justify-content: center;
		align-items: center;
	}

	/* Skeleton styling */
	.skeleton-section {
		height: 400px;
		display: flex;
		flex-direction: column;
		justify-content: space-around;
		align-items: center;
	}

	.skeleton-title,
	.skeleton-subtitle,
	.skeleton-text,
	.skeleton-circle,
	.skeleton-bar {
		background-color: #d1d5db; /* Equivalent to bg-gray-300 */
		border-radius: 0.375rem; /* Equivalent to rounded */
		animation: pulse 1.5s ease-in-out infinite; /* Equivalent to animate-pulse */
	}

	.skeleton-title {
		height: 2rem; /* Equivalent to h-8 */
		width: 50%; /* Equivalent to w-1/2 */
		margin-top: 1rem; /* Optional adjustment for spacing */
	}

	.skeleton-flex {
		display: flex;
		align-items: center; /* Equivalent to items-center */
		gap: 1rem; /* Equivalent to space-x-4 */
		margin-top: 1rem; /* Equivalent to mt-4 */
	}

	.skeleton-subtitle {
		height: 2rem; /* Equivalent to h-8 */
		width: 4rem; /* Equivalent to w-16 */
	}

	.skeleton-circle {
		height: 2rem; /* Equivalent to h-8 */
		width: 2rem; /* Equivalent to w-8 */
		border-radius: 50%; /* Making the div a circle */
	}

	.skeleton-text {
		height: 1.5rem; /* Equivalent to h-6 */
		width: 75%; /* Equivalent to w-3/4 */
		margin-top: 0.5rem; /* Equivalent to mt-2 */
	}

	/* Content section styling */
	.content-section {
		background-color: white; /* Equivalent to bg-white */
		padding: 1rem; /* Equivalent to p-4 */
		border-radius: 0.5rem; /* Equivalent to rounded-lg */
		margin-top: 1rem; /* Equivalent to mt-4 */
	}

	.content-flex {
		display: flex;
		gap: 1rem; /* Equivalent to space-x-4 */
	}

	.skeleton-bar {
		height: 1.5rem; /* Equivalent to h-6 */
		width: 33.333%; /* Equivalent to w-1/3 */
		border-radius: 0.375rem; /* Equivalent to rounded */
	}

	/* Pulse animation */
	@keyframes pulse {
		0%,
		100% {
			opacity: 1;
		}
		50% {
			opacity: 0.5;
		}
	}

	@keyframes pulse {
		0%,
		100% {
			opacity: 1;
		}
		50% {
			opacity: 0.5;
		}
	}

	/* Header styling */
	header {
		display: flex;
		justify-content: center;
		align-items: center;
		padding: 16px;
		border-radius: 16px;
		margin: 10px auto;
		background-color: #f5f5f5d3;
		border: 1px solid #f5f5f5d3;
		box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
		text-align: center;
		max-width: 600px;
		width: 100%;
	}

	span {
		width: 100%;
		max-width: 600px;
		display: flex;
		justify-content: center;
		align-items: center;
	}

	input {
		padding: 12px;
		width: 100%;
		max-width: 400px;
		border: 1px solid #ccc;
		border-radius: 10px;
		font-size: 16px;
		outline: none;
		box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
		transition: border-color 0.2s ease-in-out;
	}

	input:focus {
		border-color: #007bff;
	}

	button {
		background-color: #007bff;
		border: none;
		padding: 12px 16px;
		border-radius: 10px;
		margin-left: 8px;
		cursor: pointer;
		display: flex;
		align-items: center;
		justify-content: center;
		color: white;
		box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
		transition: background-color 0.3s ease;
		/* width: 10%; */
	}

	button:hover {
		background-color: #0056b3;
	}

	svg {
		width: 20px;
		height: 20px;
	}

	/* Main layout */
	main {
		display: flex;
		flex-direction: column;
		align-items: center;
		padding: 32px;
	}

	section {
		background-color: #f5f5f5d3;
		padding: 32px;
		border: 1px solid #f5f5f5d3;
		border-radius: 16px;
		box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
		text-align: center;
		max-width: 600px;
		width: 100%;
	}

	h1 {
		font-weight: 300;
		color: #333;
		text-transform: uppercase;
		padding: 16px 0;
		font-size: 24px;
		letter-spacing: 1.5px;
	}

	h2 {
		font-weight: 300;
		font-size: 100px;
		color: #007bff;
		text-transform: uppercase;
		margin: 0;
	}

	h3 {
		font-weight: 500;
		font-size: 24px;
		color: #555;
		margin-top: 16px;
	}

	h4 {
		font-weight: 300;
		font-size: small;
		color: #555;
		text-transform: uppercase;
		margin: 0;
	}
</style>
