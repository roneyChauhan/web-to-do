<script lang="ts">
	import { get } from 'svelte/store';
	import Header from '../components/Header.svelte';
    import '../styles/app.scss';
	import { isLoggedIn } from '../services/auth';
</script>

{#if $isLoggedIn}
    <Header />
{/if}
<div class="c-expand c-container-row">
    <div class="c-container c-expand">
        <slot />
    </div>
</div> 
