<div class="row d-flex justify-content-center align-items-center m-2">
    <div class="col-md-12 col-xl-10">
      <div class="card">
        <div class="card-header p-3">
            <h5 class="mb-0">
                <i class="fas fa-tasks me-2"></i>
                Task List
            </h5>
            <div class="d-flex justify-content-end align-items-center mb-4 pt-2 pb-3">
                <p class="small mb-0 me-2 text-muted">Filter</p>
                <select class="select">
                  <option value="1">All</option>
                  <option value="2">Completed</option>
                  <option value="3">Active</option>
                  <option value="4">Has due date</option>
                </select>
                <p class="small mb-0 ms-4 me-2 text-muted">Sort</p>
                <select class="select">
                  <option value="1">Added date</option>
                  <option value="2">Due date</option>
                </select>
                <button class="btn">
                    <i class="material-icons-round icon-left text-primary mr-3">sort</i>
                </button>
                <button class="btn btn-primary">Add Task</button>
            </div>
        </div>
        <div class="card-body" data-mdb-perfect-scrollbar="true">
          <table class="table mb-0">
            <thead>
              <tr>
                <th scope="col">Task</th>
                <th scope="col">Description</th>
                <th scope="col">Priority</th>
                <th scope="col">Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr class="fw-normal">
                <th>
                  <span class="ms-2">Alice Mayer</span>
                </th>
                <td class="align-middle">
                  <span>Call Sam For payments</span>
                </td>
                <td class="align-middle">
                  <h6 class="mb-0"><span class="badge bg-danger">High priority</span></h6>
                </td>
                <td class="align-middle">
                  <a href="#!" data-mdb-toggle="tooltip" title="Done"><i
                      class="fas fa-check text-success me-3"></i></a>
                  <a href="#!" data-mdb-toggle="tooltip" title="Remove"><i
                      class="fas fa-trash-alt text-danger"></i></a>
                </td>
              </tr>
              <tr class="fw-normal">
                <th>
                  
                  <span class="ms-2">Kate Moss</span>
                </th>
                <td class="align-middle">Make payment to Bluedart</td>
                <td class="align-middle">
                  <h6 class="mb-0"><span class="badge bg-success">Low priority</span></h6>
                </td>
                <td class="align-middle d-flex">
                    <button class="dropdown-item">
                        <i class="material-icons-round icon-left text-primary">edit</i>
                    </button>
                    <button class="dropdown-item">
                        <i class="material-icons-round icon-left text-danger">delete</i>
                    </button>
                </td>
              </tr>
              <tr class="fw-normal">
                <th>
                  <span class="ms-2">Danny McChain</span>
                </th>
                <td class="align-middle">Office rent</td>
                <td class="align-middle">
                  <h6 class="mb-0"><span class="badge bg-warning">Middle priority</span></h6>
                </td>
                <td class="align-middle">
                  <a href="#!" data-mdb-toggle="tooltip" title="Done"><i
                      class="fas fa-check text-success me-3"></i></a>
                  <a href="#!" data-mdb-toggle="tooltip" title="Remove"><i
                      class="fas fa-trash-alt text-danger"></i></a>
                </td>
              </tr>
              <tr class="fw-normal">
                <th>
                 
                  <span class="ms-2">Alexa Chung</span>
                </th>
                <td class="align-middle">Office grocery shopping</td>
                <td class="align-middle">
                  <h6 class="mb-0"><span class="badge bg-danger">High priority</span></h6>
                </td>
                <td class="align-middle">
                  <a href="#!" data-mdb-toggle="tooltip" title="Done"><i
                      class="fas fa-check text-success me-3"></i></a>
                  <a href="#!" data-mdb-toggle="tooltip" title="Remove"><i
                      class="fas fa-trash-alt text-danger"></i></a>
                </td>
              </tr>
              <tr class="fw-normal">
                <th class="">
                  <span class="ms-2">Ben Smith</span>
                </th>
                <td class="align-middle">Ask for Lunch to Clients</td>
                <td class="align-middle">
                  <h6 class="mb-0"><span class="badge bg-success">Low priority</span></h6>
                </td>
                <td class="align-middle">
                  <a href="#!" data-mdb-toggle="tooltip" title="Done"><i
                      class="fas fa-check text-success me-3"></i></a>
                  <a href="#!" data-mdb-toggle="tooltip" title="Remove"><i
                      class="fas fa-trash-alt text-danger"></i></a>
                </td>
              </tr>
              <tr class="fw-normal">
                <th class="border-0">
                  
                  <span class="ms-2">Annie Hall</span>
                </th>
                <td class="border-0 align-middle">Create weekly tasks plan</td>
                <td class="border-0 align-middle">
                  <h6 class="mb-0"><span class="badge bg-warning">Medium priority</span></h6>
                </td>
                <td class="border-0 align-middle">
                  <a href="#!" data-mdb-toggle="tooltip" title="Done"><i
                      class="fas fa-check text-success me-3"></i></a>
                  <a href="#!" data-mdb-toggle="tooltip" title="Remove"><i
                      class="fas fa-trash-alt text-warning"></i></a>
                </td>
              </tr>
            </tbody>
          </table>

        </div>
      </div>

    </div>
  </div>