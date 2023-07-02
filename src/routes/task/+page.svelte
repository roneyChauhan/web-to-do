<script lang="ts">
	import 'flatpickr/dist/flatpickr.css';
	import Flatpickr from 'svelte-flatpickr';
    import { format } from 'date-fns';
    import { createForm } from 'svelte-form-validation';
    import * as yup from 'yup';
    import { addTask } from '../../services/task';
	import { ErrorToast, SuccessToast } from '../../helpers/toasts';

    const dateOptions: any = {
		dateFormat: 'd-m-Y',
		minDate: format(new Date(), 'dd-MM-yyyy'),
	};

    let isFormSubmit = false;

    const { values, highlight, isValid } = createForm({
		values: {
            title:'',
			description: '',
			dueDate: '',
            priority:'',
		},
		validationSchema: yup.object().shape({
			title: yup.string().required(),
            description: yup.string(),
			dueDate: yup.string(),
            priority:yup.string().required(),
		}),
		css: {
			useValid: false,
		},
	});

	const handleSubmit = async () => {
        if ($isValid) {
            isFormSubmit = true;
            try {
                const res = await addTask($values);
                console.log('res', res);
                
                if (res) {
                    initData();
                    SuccessToast.show(`Task created successfully`);
                } else {
                    ErrorToast.show(`Cannot add task. Try again!`);
                }
            } catch(error) {
                isFormSubmit = false;
                ErrorToast.show(`Cannot add task. Try again!`);
            }
        }
	};
    const initData = () => {
        $values = {
            title:'',
			description: '',
			dueDate: '',
            priority:'',
		};
    }
</script>
<div class="container mt-5 form">
    <h5>Create Task</h5>
    <form class="login-form" on:submit|preventDefault={handleSubmit}>
        <div class="form-group">
            <label for="title">Title:</label>
            <input type="text" class="form-control" name="title" id="title" placeholder="Title" bind:value={$values.title} >
        </div>
    
        <div class="form-group">
            <label for="description">Description:</label>
            <input type="text" class="form-control" name="description" id="description" placeholder="Description" bind:value={$values.description} >
        </div>

        <div class="form-group">
            <label for="datepicker">Due Date:</label>
            <Flatpickr options={dateOptions} name='dueDate' bind:value={$values.dueDate} />
        </div>      

        <div class="form-group">
            <label for="priority">Priority:</label>
            <select class="form-control" name="priority" id="priority" bind:value={$values.priority} >
                <option value="">Select a priority</option>
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
            </select>
        </div>
        <div class="form-group m-3">
            <button type="submit" disabled={isFormSubmit || !$isValid} class="btn btn-primary">Submit</button>
        </div>
    </form>
</div>
<style>
    .container {
      max-width: 400px;
      margin: 0 auto;
    }
  
    label {
      display: block;
      margin-bottom: 0.5rem;
    }
  </style>