<script lang="ts">
	import { goto } from '$app/navigation';
    import { createForm } from 'svelte-form-validation';
	import * as yup from 'yup';
	import { loginUser } from '../../../services/auth-api';
    let logIn = true;
    let isFormSubmit = false;

    const { values, highlight, isValid } = createForm({
		values: {
			email: '',
			password: '',
		},
		validationSchema: yup.object().shape({
			email: yup.string().email().required(),
			password: yup.string().required(),
		}),
		css: {
			useValid: false,
		},
	});

	const handleSubmit = async () => {
        if ($isValid) {
            isFormSubmit = true;
            await loginUser($values);
            isFormSubmit = false;
        }
	};
</script>
<div class="container">
    <div class="login form">
      <header>Login</header>
      <form on:submit|preventDefault={handleSubmit} class="login-form">
        <input type="text" placeholder="Enter your email" name="email" bind:value={$values.email} use:highlight>
        <input type="password" placeholder="Enter your password" name="password" bind:value={$values.password} use:highlight >
        <button type="submit" disabled={isFormSubmit || !$isValid}  class="login-button">Login</button>
      </form>
      <div class="signup">
        <span class="signup">Don't have an account?
         <!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
         <label for="login" on:click={() => {
            goto('/auth/register');
         }} on:keyup>Signup</label>
        </span>
      </div>
    </div>
  </div>