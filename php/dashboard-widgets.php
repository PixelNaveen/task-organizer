<div class="dashboard-grid">
  <!-- Recent Tasks -->
  <div class="card recent-tasks">
    <div class="card-header">Recent Tasks</div>
    <ul class="list-group list-group-flush recent-tasks-list">
      <!-- Tasks will be injected here dynamically -->
    </ul>
  </div>

  <!-- Upcoming Deadlines -->
 <div class="card deadlines">
  <div class="card-header">Upcoming Deadlines</div>
  <ul class="list-group list-group-flush">
    <!-- Upcoming deadline tasks will be inserted here dynamically -->
  </ul>
</div>


  <div class="card chart extra-tall">
    <div class="card-header d-flex justify-content-between align-items-center">
      <span>Tasks Created Per Day</span>
      <div class="btn-group btn-group-sm" role="group" aria-label="Weekly toggle">
        <button type="button" class="btn btn-primary active" id="btnThisWeek">This Week</button>
        <button type="button" class="btn btn-outline-primary" id="btnLastWeek">Last Week</button>
      </div>
    </div>
    <div class="card-body">
      <div id="tasksPerDayChart" style="height: 350px;"></div>
    </div>
  </div>

  <!-- Motivational Quote -->
  <div class="card quote d-flex justify-content-center align-items-center text-center">
    <div class="card-body">
      <blockquote class="blockquote mb-0">
        <p class="fs-5" id="quoteText">"Small steps every day lead to big results."</p>
        <footer class="blockquote-footer mt-2 text-secondary">
          Inspired by <cite id="quoteAuthor">Unknown</cite>
        </footer>
      </blockquote>
    </div>
  </div>
</div>
