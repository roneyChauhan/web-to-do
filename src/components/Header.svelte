<script lang="ts">
	import { user } from '../services/auth';
	import { logoutUser } from '../services/auth-api';

    const logout = async () => {
        logoutUser();
	};
</script>

<nav class="navbar navbar-expand-sm bg-dark navbar-dark">
    <div class="container-fluid">
        <span class="navbar-brand">To Do</span>
        <ul class='navbar-nav d-flex'>
            <li class="nav-item dropdown">
                <span class="nav-link dropdown-toggle" role="button" data-bs-toggle="dropdown">Welcome, {$user?.name || '-'}</span>
                <ul class="dropdown-menu">
                    <li>
                        <!-- svelte-ignore a11y-click-events-have-key-events -->
                        <span class="dropdown-item pointer" on:click={logout} >Logout</span>
                    </li>
                </ul>
            </li>
        </ul>
    </div>
  </nav>
<style lang="scss">
.pointer {
    cursor: pointer;
}
</style>