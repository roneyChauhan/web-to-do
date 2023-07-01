<script lang="ts">
	import { goto } from '$app/navigation';
    import { createForm } from 'svelte-form-validation';
	import * as yup from 'yup';
	import { registerUser } from '../../../services/auth-api';
    let isFormSubmit = false;

    const { values, highlight, isValid } = createForm({
		values: {
            name:'',
			email: '',
			password: '',
            cpassword:''
		},
		validationSchema: yup.object().shape({
			name: yup.string().required(),
            email: yup.string().email().required(),
			password: yup.string().required().min(6),
            cpassword:yup.string().required().oneOf([yup.ref('password')])
		}),
		css: {
			useValid: false,
		},
	});

	const handleSubmit = async () => {
        if ($isValid) {
            isFormSubmit = true;
            await registerUser($values);
            isFormSubmit = false;
        }
	};

</script>
<div class="container">
    <div class="registration form">
      <header>Signup</header>
      <form on:submit|preventDefault={handleSubmit} class="login-form">
        <input type="text" name="name" placeholder="Enter your name" bind:value={$values.name}>
        <input type="text" name="email" placeholder="Enter your email" bind:value={$values.email}>
        <input type="password" name="password" placeholder="Create a password" bind:value={$values.password}>
        <input type="password" name="cpassword" placeholder="Confirm your password" bind:value={$values.cpassword}>
        <button type="submit" disabled={isFormSubmit || !$isValid}  class="login-button">Signup</button>
      </form>
      <div class="signup">
        <span class="signup">Already have an account?
         <!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
         <label for="login" on:keyup on:click={() => {
            goto('/auth/login');
         }} >Login</label>
        </span>
      </div>
    </div>
</div>