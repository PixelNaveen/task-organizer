<!-- Your existing New Task Modal here -->

<!-- Update Task Modal -->
<div class="modal fade" id="updateTaskModal" tabindex="-1" aria-labelledby="updateTaskModalLabel" aria-hidden="true">
  <div class="modal-dialog modal-dialog-centered modal-lg">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="updateTaskModalLabel"><i class="fas fa-edit me-2"></i>Update Task</h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <form id="updateTaskForm">
        <input type="hidden" id="updateTaskId" />
        <div class="modal-body">
          <div class="mb-3">
            <label for="updateTaskTitle" class="form-label">Task Title</label>
            <input type="text" class="form-control" id="updateTaskTitle" required />
          </div>

          <div class="mb-3">
            <label for="updateTaskDescription" class="form-label">Description</label>
            <textarea class="form-control" id="updateTaskDescription" rows="3"></textarea>
          </div>

          <div class="row g-3">
            <div class="col-md-6">
              <label for="updateTaskDueDate" class="form-label">Due Date</label>
              <input type="date" class="form-control" id="updateTaskDueDate" required />
            </div>

            <div class="col-md-6">
              <label for="updateTaskPriority" class="form-label">Priority</label>
              <select class="form-select" id="updateTaskPriority" required>
                <option value="High">High</option>
                <option value="Medium">Medium</option>
                <option value="Low">Low</option>
              </select>
            </div>
          </div>

          <div class="mt-3">
            <label for="updateTaskCategory" class="form-label">Category</label>
            <select class="form-select" id="updateTaskCategory" required>
              <option value="Work">Work</option>
              <option value="Personal">Personal</option>
              <option value="Health">Health</option>
              <option value="Finance">Finance</option>
              <option value="Learning">Learning</option>
              <option value="Home">Home</option>
              <option value="Social">Social</option>
              <option value="Important">Important</option>
            </select>
          </div>
        </div>

        <div class="modal-footer d-flex justify-content-between">
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
          <button type="submit" class="btn btn-primary"><i class="fas fa-check-circle me-1"></i>Update Task</button>
        </div>
      </form>
    </div>
  </div>
</div>
