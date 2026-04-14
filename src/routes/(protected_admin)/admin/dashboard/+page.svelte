<script>
  import IconBell from '~icons/lucide/bell';
  import IconEye from '~icons/lucide/eye';
  import IconSearch from '~icons/lucide/search';

  let searchQuery = '';
  let selectedDepartment = 'All';

  const departments = [
    { label: 'All', count: null },
    { label: 'Engineering', count: 2 },
    { label: 'Marketing', count: 2 },
    { label: 'Sales', count: 2 },
    { label: 'Human Resources', count: 1 },
    { label: 'Operation', count: 1 },
  ];

  const reports = [
    { id: '#2410746', type: 'Harassment',       department: 'Marketing',   severity: 'High',     status: 'New',          date: 'Nov 29, 05:53 PM' },
    { id: '#2410746', type: 'Safety Concern',   department: 'Engineering', severity: 'Medium',   status: 'Under Review', date: 'Nov 29, 05:53 PM' },
    { id: '#2410746', type: 'Policy Violation', department: 'Sales',       severity: 'Low',      status: 'Resolved',     date: 'Nov 29, 05:53 PM' },
    { id: '#2410746', type: 'Harassment',       department: 'Marketing',   severity: 'Critical', status: 'Escalated',    date: 'Nov 29, 05:53 PM' },
    { id: '#2410746', type: 'Discrimination',   department: 'Operation',   severity: 'High',     status: 'Under Review', date: 'Nov 29, 05:53 PM' },
  ];

  let selectedRows = new Set();

  function toggleRow(id) {
    if (selectedRows.has(id)) selectedRows.delete(id);
    else selectedRows.add(id);
    selectedRows = selectedRows;
  }

  $: filtered = reports.filter(r => {
    const matchDept = selectedDepartment === 'All' || r.department === selectedDepartment;
    const q = searchQuery.toLowerCase();
    const matchSearch = !q || r.id.toLowerCase().includes(q) || r.type.toLowerCase().includes(q);
    return matchDept && matchSearch;
  });

  const severityClass = {
    High:     'sev-high',
    Medium:   'sev-medium',
    Low:      'sev-low',
    Critical: 'sev-critical',
  };

  const statusClass = {
    'New':          'sta-new',
    'Under Review': 'sta-review',
    'Resolved':     'sta-resolved',
    'Escalated':    'sta-escalated',
  };
</script>

<div class="page">

  <!-- Top Bar -->
  <header class="topbar">
    <div class="spacer"></div>
    <div class="topbar-right">
      <button class="icon-btn bell-btn">
        <IconBell width="20" height="20" />
      </button>
      <div class="admin-info">
        <span class="admin-name">Admin</span>
        <span class="admin-role">Admin</span>
      </div>
      <div class="avatar-wrap">
        <div class="avatar">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <circle cx="12" cy="8" r="4"/>
            <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7"/>
          </svg>
        </div>
        <span class="online-dot"></span>
      </div>
    </div>
  </header>

  <main class="content">

    <!-- Department Filters -->
    <div class="filters">
      {#each departments as dept (dept.count)}
        <button
          class="filter-pill {selectedDepartment === dept.label ? 'active' : ''}"
          on:click={() => selectedDepartment = dept.label}
        >
          {#if selectedDepartment === dept.label && dept.label === 'All'}
            <span class="pill-dot"></span>
          {/if}
          {dept.label}
          {#if dept.count !== null}
            <span class="pill-count">{dept.count}</span>
          {/if}
        </button>
      {/each}
    </div>

    <!-- Search -->
    <div class="search-wrap">
      <IconSearch class="search-icon" width="16" height="16" />
      <input
        class="search-input"
        type="text"
        placeholder="Search by ID or description."
        bind:value={searchQuery}
      />
    </div>

    <!-- Table -->
    <div class="table-wrap">
      <table class="table">
        <thead>
          <tr>
            <th class="col-check">
              <span class="check-circle"></span>
            </th>
            <th>ID</th>
            <th>Type</th>
            <th>Department</th>
            <th>Severity</th>
            <th>Status</th>
            <th>Date</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {#each filtered as row, i (i)}
            <tr class:selected={selectedRows.has(i)}>
              <td class="col-check">
                <button class="check-circle {selectedRows.has(i) ? 'checked' : ''}" on:click={() => toggleRow(i)}></button>
              </td>
              <td class="col-id">{row.id}</td>
              <td>{row.type}</td>
              <td>{row.department}</td>
              <td>
                <span class="badge {severityClass[row.severity]}">{row.severity}</span>
              </td>
              <td>
                <span class="badge {statusClass[row.status]}">
                  {#if row.status === 'New'}
                    <span class="status-dot new-dot"></span>
                  {/if}
                  {row.status}
                </span>
              </td>
              <td class="col-date">{row.date}</td>
              <td class="col-actions">
                <button class="action-btn">
                  <IconEye width="17" height="17" />
                </button>
              </td>
            </tr>
          {/each}
        </tbody>
      </table>
    </div>

  </main>
</div>

<style>
  @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&display=swap');

  :global(body) {
    margin: 0;
    background: #f5f8ff;
    font-family: 'DM Sans', sans-serif;
    color: #1a2e45;
  }

  .page {
    min-height: 100vh;
    display: flex;
    flex-direction: column;
  }

  /* ── Topbar ── */
  .topbar {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 14px 32px;
    background: #fff;
    border-bottom: 1px solid #e8f0f9;
  }

  .spacer { flex: 1; }

  .topbar-right {
    display: flex;
    align-items: center;
    gap: 12px;
  }

  .icon-btn {
    background: none;
    border: none;
    cursor: pointer;
    color: #4a6a8a;
    padding: 6px;
    border-radius: 8px;
    display: flex;
    align-items: center;
    transition: background 0.15s;
  }

  .icon-btn:hover { background: #f0f7ff; }

  .admin-info {
    display: flex;
    flex-direction: column;
    text-align: right;
    line-height: 1.2;
  }

  .admin-name {
    font-size: 14px;
    font-weight: 600;
    color: #1a2e45;
  }

  .admin-role {
    font-size: 12px;
    color: #8da8c4;
  }

  .avatar-wrap {
    position: relative;
  }

  .avatar {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background: #e8f0f9;
    border: 2px solid #c8daf0;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #4a6a8a;
  }

  .online-dot {
    position: absolute;
    bottom: 1px;
    right: 1px;
    width: 10px;
    height: 10px;
    background: #22c55e;
    border-radius: 50%;
    border: 2px solid #fff;
  }

  /* ── Content ── */
  .content {
    padding: 28px 32px;
    display: flex;
    flex-direction: column;
    gap: 16px;
  }

  /* ── Filters ── */
  .filters {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
  }

  .filter-pill {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    padding: 6px 14px;
    border-radius: 20px;
    border: 1.5px solid #d8e8f5;
    background: #fff;
    font-size: 13px;
    font-family: 'DM Sans', sans-serif;
    font-weight: 500;
    color: #4a6a8a;
    cursor: pointer;
    transition: all 0.18s;
  }

  .filter-pill:hover {
    border-color: #4a90d9;
    color: #4a90d9;
  }

  .filter-pill.active {
    background: #4a90d9;
    border-color: #4a90d9;
    color: #fff;
  }

  .pill-dot {
    width: 7px;
    height: 7px;
    border-radius: 50%;
    background: #fff;
    flex-shrink: 0;
  }

  .pill-count {
    background: rgba(255,255,255,0.25);
    border-radius: 10px;
    padding: 1px 7px;
    font-size: 11px;
    font-weight: 600;
  }

  .filter-pill:not(.active) .pill-count {
    background: #edf4fb;
    color: #4a6a8a;
  }

  /* ── Search ── */
  .search-wrap {
    position: relative;
  }

  .search-wrap :global(.search-icon) {
    position: absolute;
    left: 14px;
    top: 50%;
    transform: translateY(-50%);
    color: #a0b8d0;
    pointer-events: none;
  }

  .search-input {
    width: 100%;
    box-sizing: border-box;
    padding: 10px 14px 10px 40px;
    border: 1.5px solid #dce9f5;
    border-radius: 10px;
    font-size: 14px;
    font-family: 'DM Sans', sans-serif;
    color: #3a5a7a;
    background: #fff;
    outline: none;
    transition: border-color 0.2s;
  }

  .search-input:focus {
    border-color: #4a90d9;
  }

  .search-input::placeholder {
    color: #b0c8df;
  }

  /* ── Table ── */
  .table-wrap {
    background: #fff;
    border: 1.5px solid #e4edf7;
    border-radius: 14px;
    overflow: hidden;
  }

  .table {
    width: 100%;
    border-collapse: collapse;
    font-size: 14px;
  }

  thead tr {
    background: #f8fbff;
    border-bottom: 1.5px solid #e4edf7;
  }

  th {
    padding: 12px 16px;
    text-align: left;
    font-size: 12.5px;
    font-weight: 600;
    color: #8da8c4;
    white-space: nowrap;
  }

  tbody tr {
    border-bottom: 1px solid #f0f7ff;
    transition: background 0.12s;
  }

  tbody tr:last-child { border-bottom: none; }

  tbody tr:hover { background: #f8fbff; }
  tbody tr.selected { background: #edf5ff; }

  td {
    padding: 14px 16px;
    color: #2a4060;
    white-space: nowrap;
  }

  .col-check {
    width: 36px;
    padding-left: 18px;
  }

  .check-circle {
    width: 18px;
    height: 18px;
    border-radius: 50%;
    border: 2px solid #c5d8ef;
    background: none;
    cursor: pointer;
    display: block;
    transition: border-color 0.15s, background 0.15s;
    padding: 0;
  }

  .check-circle.checked {
    background: #4a90d9;
    border-color: #4a90d9;
  }

  .col-id {
    font-weight: 600;
    color: #1a2e45;
  }

  .col-date {
    color: #6a8aaa;
    font-size: 13px;
  }

  .col-actions {
    text-align: center;
  }

  .action-btn {
    background: none;
    border: none;
    cursor: pointer;
    color: #8da8c4;
    padding: 4px;
    border-radius: 6px;
    display: inline-flex;
    align-items: center;
    transition: color 0.15s, background 0.15s;
  }

  .action-btn:hover {
    color: #4a90d9;
    background: #edf5ff;
  }

  /* ── Badges ── */
  .badge {
    display: inline-flex;
    align-items: center;
    gap: 5px;
    padding: 4px 10px;
    border-radius: 20px;
    font-size: 12px;
    font-weight: 600;
    white-space: nowrap;
  }

  /* Severity */
  .sev-high     { background: #ffe4e4; color: #d94a4a; }
  .sev-medium   { background: #fff0dc; color: #c47a20; }
  .sev-low      { background: #e8e8e8; color: #5a5a5a; }
  .sev-critical { background: #ffd6d6; color: #c43030; }

  /* Status */
  .sta-new       { background: #e8f4ff; color: #4a90d9; border: 1.5px solid #b0d4f5; }
  .sta-review    { background: #fff4e0; color: #d47a20; }
  .sta-resolved  { background: #e2f9ee; color: #28a065; }
  .sta-escalated { background: #ffe8e8; color: #d94a4a; }

  .status-dot {
    width: 7px;
    height: 7px;
    border-radius: 50%;
    flex-shrink: 0;
  }

  .new-dot { background: #4a90d9; }

  /* Responsive */
  @media (max-width: 700px) {
    .content { padding: 16px; }
    .topbar  { padding: 12px 16px; }
    .table-wrap { overflow-x: auto; }
  }
</style>