<script>
    import "../app.css";
</script>

<div>
    <slot />
</div>

<style>
    :global(body) {
        background: transparent;
        display: flex;
        flex-direction: column;
        font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
        place-content: center;
        margin: 0;
        height: 100vh;
        min-height: 100vh;
        max-height: 100vh;
    }

    :global(*, *::before, *::after) {
        box-sizing: border-box;
    }

    :global(h1, h2, h3, h4, h5) {
        margin: 0;
    }

    div {
        /* aspect-ratio: 9 / 16; */
        width: 100%;
        max-width: 100%;
        display: flex;
        flex-direction: column;
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
        border-radius: 8px;
        height: 100vh;
        max-height: 100vh;
    }


</style>