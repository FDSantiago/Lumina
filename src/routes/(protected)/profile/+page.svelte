<script>
  let currentPassword = '';
  let newPassword = '';
  let confirmPassword = '';

  let notifications = {
    emailReports: true,
    emailTasks: true,
    pushNotifications: true,
    weeklyDigest: true,
  };

  const activityLog = [
    { action: null, ip: 'IP: 192.168.1.***', date: 'Nov 28, 2025, 11:08 PM' },
    { action: 'Submitted report #REP-847', ip: 'IP: 192.168.1.***', date: 'Nov 28, 2025, 11:08 PM' },
    { action: null, ip: 'IP: 192.168.1.***', date: 'Nov 28, 2025, 11:08 PM' },
    { action: 'Changed password', ip: 'IP: 192.168.1.***', date: 'Nov 28, 2025, 11:08 PM' },
  ];

  function toggleNotification(key) {
    notifications[key] = !notifications[key];
  }

  function handleUpdatePassword() {
    // handle password update
  }
</script>

<div class="page">

  <!-- Profile Info Card -->
  <section class="card">
    <div class="card-header">
      <div class="radio-dot"></div>
      <span class="card-label">Your account details and profile picture</span>
    </div>

    <div class="profile-row">
      <div class="avatar-wrap">
        <div class="avatar">e</div>
        <div class="avatar-badge">
          <Icon icon="mdi:pencil" width="10" />
        </div>
      </div>
      <div class="profile-info">
        <h2 class="profile-name">Employee</h2>
        <p class="profile-dept">Engineering</p>
      </div>
    </div>

    <hr class="divider" />

    <div class="fields-grid">
      <div class="field-group">
        <label class="field-label">
          <span class="radio-sm"></span> Email Address
        </label>
        <input class="field-input" type="email" value="you@gmail.com" readonly />
      </div>
      <div class="field-group">
        <label class="field-label">
          <span class="radio-sm"></span> Employee ID
        </label>
        <input class="field-input" type="text" value="2410746" readonly />
      </div>
      <div class="field-group">
        <label class="field-label">
          <span class="radio-sm"></span> Department
        </label>
        <input class="field-input" type="text" value="Engineering" readonly />
      </div>
      <div class="field-group">
        <label class="field-label">
          <span class="radio-sm"></span> Role
        </label>
        <input class="field-input" type="text" value="Employee" readonly />
      </div>
    </div>
  </section>

  <!-- Password Card -->
  <section class="card">
    <div class="card-header">
      <div class="radio-dot"></div>
      <span class="card-label">Update your password to keep your account secure</span>
    </div>

    <div class="password-section">
      <div class="field-group full-width">
        <label class="field-label-bold">Current Password</label>
        <input
          class="field-input"
          type="password"
          placeholder="Enter current password"
          bind:value={currentPassword}
        />
      </div>

      <div class="fields-grid">
        <div class="field-group">
          <label class="field-label-bold">New Password</label>
          <input
            class="field-input"
            type="password"
            placeholder="Enter new password"
            bind:value={newPassword}
          />
        </div>
        <div class="field-group">
          <label class="field-label-bold">Confirm New Password</label>
          <input
            class="field-input"
            type="password"
            placeholder="Enter new password"
            bind:value={confirmPassword}
          />
        </div>
      </div>

      <button class="btn-primary" onclick={handleUpdatePassword}>
        Update Password
      </button>
    </div>
  </section>

  <!-- Notifications Card -->
  <section class="card">
    <div class="card-header">
      <div class="radio-dot"></div>
      <span class="card-label">Choose how you want to be notified</span>
    </div>

    <div class="notif-list">
      {#each [
        { key: 'emailReports', title: 'Email notification for reports', desc: 'Get notified when your reports are updated' },
        { key: 'emailTasks', title: 'Email notifications for tasks', desc: 'Get reminders about upcoming task deadlines' },
        { key: 'pushNotifications', title: 'Push notifications', desc: 'Receive push notifications in your browser' },
        { key: 'weeklyDigest', title: 'Weekly digest', desc: 'Get a summary of your activity each week' },
      ] as item (item.key)}
        <div class="notif-item">
          <div class="notif-text">
            <p class="notif-title">{item.title}</p>
            <p class="notif-desc">{item.desc}</p>
          </div>
          <button
            class="toggle {notifications[item.key] ? 'on' : 'off'}"
            onclick={() => toggleNotification(item.key)}
            aria-label="Toggle {item.title}"
          >
            <span class="toggle-thumb"></span>
          </button>
        </div>
      {/each}
    </div>
  </section>

  <!-- Account Activity Card -->
  <section class="card">
    <div class="card-header">
      <div class="radio-dot"></div>
      <div>
        <h3 class="card-title">Account Activity</h3>
        <span class="card-label">Recent activity on your account</span>
      </div>
    </div>

    <div class="activity-list">
      {#each activityLog as entry (entry.ip)}
        <div class="activity-item">
          <div class="activity-left">
            {#if entry.action}
              <p class="activity-action">{entry.action}</p>
            {/if}
            <p class="activity-ip">{entry.ip}</p>
          </div>
          <span class="activity-date">{entry.date}</span>
        </div>
      {/each}
    </div>
  </section>

</div>

<style>
  @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&display=swap');

  :global(body) {
    margin: 0;
    background: #f0f7ff;
    font-family: 'DM Sans', sans-serif;
  }

  .page {
    max-width: 680px;
    margin: 0 auto;
    padding: 32px 20px;
    display: flex;
    flex-direction: column;
    gap: 20px;
  }

  /* ── Card ── */
  .card {
    background: #ffffff;
    border: 1px solid #e4edf7;
    border-radius: 14px;
    padding: 24px;
    display: flex;
    flex-direction: column;
    gap: 20px;
  }

  .card-header {
    display: flex;
    align-items: flex-start;
    gap: 10px;
  }

  .radio-dot {
    width: 16px;
    height: 16px;
    border: 2px solid #c5d8ef;
    border-radius: 50%;
    flex-shrink: 0;
    margin-top: 2px;
  }

  .card-label {
    font-size: 13px;
    color: #8da8c4;
    line-height: 1.4;
  }

  .card-title {
    font-size: 17px;
    font-weight: 700;
    color: #1a2e45;
    margin: 0 0 2px;
  }

  /* ── Profile Row ── */
  .profile-row {
    display: flex;
    align-items: center;
    gap: 18px;
  }

  .avatar-wrap {
    position: relative;
    flex-shrink: 0;
  }

  .avatar {
    width: 56px;
    height: 56px;
    border-radius: 50%;
    background: #cce0f5;
    color: #5a8ab0;
    font-size: 22px;
    font-weight: 600;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .avatar-badge {
    position: absolute;
    bottom: 0;
    right: -2px;
    width: 20px;
    height: 20px;
    background: #4a90d9;
    border-radius: 50%;
    border: 2px solid #fff;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #fff;
    cursor: pointer;
  }

  .profile-name {
    font-size: 22px;
    font-weight: 700;
    color: #1a2e45;
    margin: 0 0 3px;
  }

  .profile-dept {
    font-size: 14px;
    color: #8da8c4;
    margin: 0;
  }

  .divider {
    border: none;
    border-top: 1px solid #e8f0f9;
    margin: 0;
  }

  /* ── Fields ── */
  .fields-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 16px;
  }

  .field-group {
    display: flex;
    flex-direction: column;
    gap: 6px;
  }

  .full-width {
    width: 100%;
  }

  .field-label {
    font-size: 13px;
    color: #5a7a9a;
    display: flex;
    align-items: center;
    gap: 6px;
  }

  .radio-sm {
    display: inline-block;
    width: 12px;
    height: 12px;
    border: 2px solid #c5d8ef;
    border-radius: 50%;
    flex-shrink: 0;
  }

  .field-label-bold {
    font-size: 14px;
    font-weight: 600;
    color: #1a2e45;
  }

  .field-input {
    padding: 10px 14px;
    border: 1px solid #dce9f5;
    border-radius: 8px;
    font-size: 14px;
    font-family: 'DM Sans', sans-serif;
    color: #3a5a7a;
    background: #fff;
    outline: none;
    transition: border-color 0.2s;
  }

  .field-input:focus {
    border-color: #4a90d9;
  }

  .field-input[readonly] {
    background: #f8fbff;
    color: #6a8aaa;
    cursor: default;
  }

  /* ── Password ── */
  .password-section {
    display: flex;
    flex-direction: column;
    gap: 16px;
  }

  .btn-primary {
    width: fit-content;
    padding: 11px 26px;
    background: linear-gradient(135deg, #4a90d9, #3a70c9);
    color: #fff;
    border: none;
    border-radius: 10px;
    font-size: 14px;
    font-weight: 600;
    font-family: 'DM Sans', sans-serif;
    cursor: pointer;
    transition: opacity 0.2s, transform 0.15s;
  }

  .btn-primary:hover {
    opacity: 0.9;
    transform: translateY(-1px);
  }

  .btn-primary:active {
    transform: translateY(0);
  }

  /* ── Notifications ── */
  .notif-list {
    display: flex;
    flex-direction: column;
    gap: 0;
  }

  .notif-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 14px 0;
    border-bottom: 1px solid #f0f7ff;
  }

  .notif-item:last-child {
    border-bottom: none;
    padding-bottom: 0;
  }

  .notif-title {
    font-size: 14px;
    font-weight: 600;
    color: #1a2e45;
    margin: 0 0 3px;
  }

  .notif-desc {
    font-size: 12px;
    color: #8da8c4;
    margin: 0;
  }

  /* Toggle */
  .toggle {
    position: relative;
    width: 44px;
    height: 24px;
    border-radius: 12px;
    border: none;
    cursor: pointer;
    padding: 0;
    transition: background 0.25s;
    flex-shrink: 0;
  }

  .toggle.on {
    background: #4a90d9;
  }

  .toggle.off {
    background: #c5d8ef;
  }

  .toggle-thumb {
    position: absolute;
    top: 3px;
    width: 18px;
    height: 18px;
    background: #fff;
    border-radius: 50%;
    transition: left 0.25s;
    box-shadow: 0 1px 3px rgba(0,0,0,0.15);
  }

  .toggle.on .toggle-thumb {
    left: 23px;
  }

  .toggle.off .toggle-thumb {
    left: 3px;
  }

  /* ── Activity ── */
  .activity-list {
    display: flex;
    flex-direction: column;
    gap: 8px;
  }

  .activity-item {
    background: #f4f9ff;
    border-radius: 8px;
    padding: 10px 14px;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .activity-action {
    font-size: 13px;
    font-weight: 600;
    color: #1a2e45;
    margin: 0 0 2px;
  }

  .activity-ip {
    font-size: 12px;
    color: #8da8c4;
    margin: 0;
  }

  .activity-date {
    font-size: 12px;
    color: #8da8c4;
    white-space: nowrap;
    margin-left: 16px;
  }

  /* Responsive */
  @media (max-width: 560px) {
    .fields-grid {
      grid-template-columns: 1fr;
    }
  }
</style>