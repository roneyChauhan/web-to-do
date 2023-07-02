<script lang="ts">
	import { logoutUser } from '../services/auth-api';
	const logout = async () => {
        logoutUser();
	};
</script>
<h1>Welcome To To do App</h1>
<button type="button" on:click={logout}  class="logout-button">Logout</button>