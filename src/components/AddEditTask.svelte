<script lang="ts">
	import 'flatpickr/dist/flatpickr.css';
	import Flatpickr from 'svelte-flatpickr';
    import { format } from 'date-fns';
    import { createForm } from 'svelte-form-validation';
    import * as yup from 'yup';
    import { addTask, getTask, updateTask } from '../services/task';
	import { ErrorToast, SuccessToast } from '../helpers/toasts';

    export let taskId : string = '';
    export let onCloseForm: Function;
    let task : any = {};
    let mode = taskId ? 'Edit' : 'Add';
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
    const getTaskList = async () => {
        try {
            const res = await getTask(taskId);
            if (res?.data?.task) {
                task = res.data.task;
                $values = {
                    title : task?.title,
                    description: task?.description,
                    dueDate: task?.dueDate ? format(new Date(task.dueDate.toString()), 'dd/MM/yyyy') : '',
                    priority:task?.priority,
                };
            }
        } catch(error) {
            ErrorToast.show(`Cannot get tasks. Try again!`);
        }
    }
    $: if (taskId != "") {
        getTaskList();
    }

	const handleSubmit = async () => {
        if ($isValid) {
            isFormSubmit = true;
            try {
                const res = mode === 'Add' ? await addTask($values) : await updateTask(taskId, $values);
                if (res) {
                    initData();
                    onCloseForm(true);
                    SuccessToast.show(`Task ${mode} successfully`);
                } else {
                    ErrorToast.show(`Cannot ${mode} task. Try again!`);
                }
            } catch(error) {
                isFormSubmit = false;
                ErrorToast.show(`Cannot ${mode} task. Try again!`);
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
    <h5 class='mt-2'>{mode} Task</h5>
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
            <button type="button" on:click={() => {
                onCloseForm();
            }} class="btn btn-primary">Cancel</button>
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