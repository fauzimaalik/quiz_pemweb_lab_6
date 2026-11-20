function formatDate(dateString) {
  return new Intl.DateTimeFormat('id-ID', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  }).format(new Date(`${dateString}T00:00:00`))
}

function tasklist({ tasks, onView, onEdit, onDelete }) {
  if (tasks.length === 0) {
    return (
      <div className="empty-state">
        <span className="empty-icon" aria-hidden="true">✓</span>
        <h3>Belum ada tugas di sini</h3>
        <p>Coba ubah filter atau tambahkan tugas baru.</p>
      </div>
    )
  }

  return (
    <div className="table-scroll">
      <table className="task-table">
        <thead>
          <tr>
            <th scope="col">Tugas</th>
            <th scope="col">ID</th>
            <th scope="col">Status</th>
            <th scope="col">Prioritas</th>
            <th scope="col">Deadline</th>
            <th scope="col" className="actions-heading">Aksi</th>
          </tr>
        </thead>
        <tbody>
          {tasks.map((task) => (
            <tr key={task.id}>
              <td className="task-title-cell">
                <button className="task-title-button" onClick={() => onView(task)}>
                  <span className={`task-check${task.status === 'Selesai' ? ' is-done' : ''}`} aria-hidden="true">
                    {task.status === 'Selesai' ? '✓' : ''}
                  </span>
                  <span>
                    <strong>{task.title}</strong>
                    <small>{task.description}</small>
                  </span>
                </button>
              </td>
              <td className="task-id-cell"><code className="task-id">{task.id}</code></td>
              <td><span className={`status-badge status-${task.status.toLowerCase().replaceAll(' ', '-')}`}>{task.status}</span></td>
              <td>
                <span
                  className={`priority-label priority-${task.priority.toLowerCase()}`}
                  title={`Prioritas: ${task.priority}`}
                  aria-label={`Prioritas: ${task.priority}`}
                >
                  <i />
                </span>
              </td>
              <td className="date-cell">{formatDate(task.deadline)}</td>
              <td>
                <div className="row-actions">
                  <button className="icon-button view-action" onClick={() => onView(task)} aria-label={`Lihat ${task.title}`} title="Lihat detail">
                    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M2.5 12s3.2-6 9.5-6 9.5 6 9.5 6-3.2 6-9.5 6-9.5-6-9.5-6Z" /><circle cx="12" cy="12" r="2.5" /></svg>
                  </button>
                  <button className="icon-button edit-action" onClick={() => onEdit(task)} aria-label={`Edit ${task.title}`} title="Edit tugas">
                    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="m14 5 5 5M4 20l4.3-.9L19.2 8.2a2.1 2.1 0 0 0-3-3L5.3 16.1 4 20Z" /></svg>
                  </button>
                  <button className="icon-button delete-action" onClick={() => onDelete(task)} aria-label={`Hapus ${task.title}`} title="Hapus tugas">
                    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M4 7h16M10 11v6m4-6v6M5.5 7l1 13h11l1-13M9 7V4h6v3" /></svg>
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default tasklist