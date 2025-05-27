<div>
    <!-- Search and Filter Controls -->
    <div class="mb-4">
        <div class="row g-3 align-items-center">
            <!-- Search Input -->
            <div class="col-12 col-md-4">
                <input
                    type="search"
                    id="taskSearch"
                    class="form-control form-control-lg"
                    placeholder="Search by task title..."
                    aria-label="Search tasks"
                    autocomplete="off"
                />
            </div>
            <!-- Status Dropdown -->
            <div class="col-12 col-md-4 col-lg-3">
                <select id="statusFilter" class="form-select form-select-lg" aria-label="Filter by status">
                    <option value="all">All Statuses</option>
                    <option value="pending">Pending</option>
                    <option value="completed">Completed</option>
                    <option value="overdue">Overdue</option>
                </select>
            </div>
            <!-- Priority Dropdown -->
            <div class="col-12 col-md-4 col-lg-3">
                <select id="priorityFilter" class="form-select form-select-lg" aria-label="Filter by priority">
                    <option value="all">All Priorities</option>
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                </select>
            </div>
        </div>
    </div>

    <!-- Task Table -->
    <div class="table-responsive shadow-sm rounded" id="table-container">
        <table class="table table-hover align-middle mb-0" id="tasksTable">
            <thead class="table-light border-bottom border-3">
                <tr>
                    <th scope="col">Title</th>
                    <th scope="col" style="min-width: 250px;">Description</th>
                    <th scope="col">Status</th>
                    <th scope="col">Due Date</th>
                    <th scope="col">Priority</th>
                    <th scope="col" style="min-width: 120px;">Actions</th>
                </tr>
            </thead>
            <tbody id="tasksTableBody">
                <!-- JS will inject rows here -->
            </tbody>
        </table>
    </div>

    <!-- No Results Message -->
    <div
        id="noResultsMessage"
        class="text-center mt-4 text-muted fw-semibold"
        style="display: none;"
    >
        No tasks found matching your search.
    </div>
</div>
