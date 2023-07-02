<script lang="ts">
	import { onMount } from 'svelte';
	import { deleteTask, getTasks, updateTaskStatus } from '../services/task';
	import { ErrorToast } from '../helpers/toasts';
    import { format } from 'date-fns';
	import AddEditTask from '../components/AddEditTask.svelte';

    let isAddEditTask = false;
    let tasks : any = [];
    let selectedTaskId : string = '';
    let query = {
        priority : 'all',
        taskStatus : 'all',
        orderBy : 'createdAt',
        order:'asc'
    };
    const refresh = async () => {
        getTaskList();
    }
    const getTaskList = async () => {
        try {
            const res = await getTasks(query);
            if (res?.data?.tasks) {
                tasks = res.data.tasks;
                if(tasks.length) {
                    for (const item of tasks) {
                        item['isChecked'] = false;
                        if(item?.taskStatus === 'complete') {
                            item.isChecked = true;
                        }
                    }
                }
            }
        } catch(error) {
            ErrorToast.show(`Cannot get tasks. Try again!`);
        }
    }
    const capitalizeFirstLetter = (string:any) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }
    const onCloseForm = (reload = false) => {
        selectedTaskId = '';
        isAddEditTask = false;
        if( reload ) {
            getTaskList();
        }
    }
    const onChangePriority = (e : any) => {
        if (e?.target?.value) {
            query.priority = e.target.value; 
            getTaskList();
        }
    }
    const onChangeStatus = (e : any) => {
        if (e?.target?.value) {
            query.taskStatus = e.target.value; 
            getTaskList();
        }
    }

    const onChangeOrderBy = (e : any) => {
        if (e?.target?.value) {
            query.orderBy = e.target.value; 
            getTaskList();
        }
    }
    const onChangeOrder = () => {
        query.order === 'asc' ? query.order = 'desc' : query.order = 'asc';
        getTaskList();
    }
    const onDeleteTask = async (taskId : string) => {
        if (window.confirm('Are you sure to delete?')) {
            try {
            const res = await deleteTask(taskId);
                if (res?.data) {
                    getTaskList();
                }
            } catch(error) {
                ErrorToast.show(`Cannot delete tasks. Try again!`);
            }
        }
    }
    const onChangeTaskStatus = async (e: any,taskId : any) => {
        e.preventDefault();
        if(e.target.checked){
            if (window.confirm('Are you sure to change task status to complete?')) {
                try {
                    let updateData = {
                        taskStatus : "complete"
                    };
                    const res = await updateTaskStatus(taskId, updateData);
                    if (res?.data) {
                        getTaskList();
                    }
                } catch(error) {
                    ErrorToast.show(`Cannot change task status. Try again!`);
                }
            } else {
                e.target.checked = !e.target.checked;
            }
        } else {
            if (window.confirm('Are you sure to change task status to pending?')) {
                try {
                    let updateData = {
                        taskStatus : "pending"
                    };
                    const res = await updateTaskStatus(taskId, updateData);
                    if (res?.data) {
                        getTaskList();
                    }
                } catch(error) {
                    ErrorToast.show(`Cannot change task status. Try again!`);
                }
            } else {
                e.target.checked = !e.target.checked;
            }
        }
    }
    onMount(() => {
        getTaskList();
    });
</script>
{#if isAddEditTask}
    <AddEditTask {onCloseForm} taskId={selectedTaskId} />
{:else}
    <div class="row d-flex justify-content-center align-items-center m-2">
        <div class="col-md-12 col-xl-10">
        <div class="card">
            <div class="card-header p-3">
                <h5 class="mb-0">
                    <i class="fas fa-tasks me-2"></i>
                    Task List
                </h5>
                <div class="d-flex justify-content-end align-items-center mb-4 pt-2 pb-3">
                    <p class="small mb-0 ms-4 me-2 text-muted">Priority</p>
                    <select class="select" name="priority" on:change={(e) => onChangePriority(e)}>
                        <option value="all">All</option>
                        <option value="high">High</option>
                        <option value="medium">Medium</option>
                        <option value="low">Low</option>
                    </select>
                    <p class="small mb-0 ms-4 me-2 text-muted">Status</p>
                    <select class="select" name="status" on:change={(e) => onChangeStatus(e)}>
                        <option value="all">All</option>
                        <option value="pending">Pending</option>
                        <option value="complete">Complete</option>
                    </select>
                    <p class="small mb-0 ms-4 me-2 text-muted">Sort</p>
                    <select class="select" name="orderBy" on:change={(e) => onChangeOrderBy(e)}>
                        <option value="createdAt">Added date</option>
                        <option value="dueDate">Due date</option>
                    </select>
                    <button class="btn" on:click={(e) => onChangeOrder()} >
                        <!-- svelte-ignore a11y-click-events-have-key-events -->
                        <!-- <i class="material-icons-round icon-left text-primary mr-3" on:click={(e) => onChangeOrder()} >sort</i> -->
                        {#if query.order === 'asc'}
                            <img src="/images/sort-ascending.svg" alt="" />
                        {:else}
                            <img src="/images/sort-descending.svg" alt="" />
                        {/if}
                    </button>
                    <button class="btn btn-primary" on:click={() => {
                        isAddEditTask = true;
                    }}>Add Task</button>
                </div>
            </div>
            <div class="card-body" data-mdb-perfect-scrollbar="true">
            <table class="table mb-0">
                <thead>
                <tr>
                    <th scope="col">{''}</th>
                    <th scope="col">Task</th>
                    <th scope="col">Description</th>
                    <th scope="col">Priority</th>
                    <th scope="col">Due Date</th>
                    <th scope="col">Status</th>
                    <th scope="col">Created Date</th>
                    <th scope="col">Actions</th>
                </tr>
                </thead>
                <tbody>
                    {#if tasks.length}
                        {#each tasks as task}
                            <tr class="fw-normal">
                                <th>
                                    <input type=checkbox bind:checked={task.isChecked} on:change={(e) => {
                                        onChangeTaskStatus(e, task._id);
                                    }}>
                                </th>
                                <th>
                                    <span class="ms-2">{task?.title || '-'}</span>
                                </th>
                                <td class="align-middle">
                                    <span>{task?.description || '-'}</span>
                                </td>
                                <td class="align-middle">
                                    <h6 class="mb-0">
                                        <span 
                                        class:bg-danger={task?.priority === 'high'} 
                                        class:bg-success={task?.priority === 'low'} 
                                        class:bg-warning={task?.priority === 'medium'} class="badge">
                                            {task?.priority ? capitalizeFirstLetter(task.priority) : '-'} priority
                                        </span>
                                    </h6>
                                </td>
                                <td class="align-middle">
                                    <span>{task?.dueDate ? format(new Date(task.dueDate.toString()), 'dd/MM/yyyy') : '-'}</span>
                                </td>
                                <td class="align-middle pointer">
                                    <span 
                                    class:bg-success={task?.taskStatus === 'complete'} 
                                    class:bg-warning={task?.taskStatus === 'pending'} class="badge">
                                        {task?.taskStatus ? capitalizeFirstLetter(task.taskStatus) : '-'}
                                    </span>
                                </td>
                                <td class="align-middle">
                                    <span>{task?.createdAt ? format(new Date(task.createdAt.toString()), 'dd/MM/yyyy') : '-'}</span>
                                </td>
                                <td class="align-middle d-flex">
                                    <button class="dropdown-item" on:click={(e) => {
                                        selectedTaskId = task._id;
                                        isAddEditTask = true;
                                    }}>
                                        <i class="material-icons-round icon-left text-primary">edit</i>
                                    </button>
                                    <button class="dropdown-item" on:click={(e) => {
                                        onDeleteTask(task._id);
                                    }} >
                                        <i class="material-icons-round icon-left text-danger">delete</i>
                                    </button>
                                </td>
                            </tr>
                        {/each}
                    {:else}
                    <tr class="fw-normal">
                        <td class="text-center" colspan="7">No Task Found</td>
                    </tr>
                    {/if}
                </tbody>
            </table>

            </div>
        </div>
        </div>
    </div>
{/if}
<style lang="scss">
    .pointer {
        cursor: pointer;
    }
</style>