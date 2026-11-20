function formatDate(dateString) {
  return new Intl.DateTimeFormat('id-ID', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }).format(new Date(`${dateString}T00:00:00`))
}

function taskdetail({ task, onClose, onEdit }) {
  return (
    <div className="modal-backdrop" onMouseDown={(event) => event.target === event.currentTarget && onClose()}>
      <section className="modal-card detail-modal" role="dialog" aria-modal="true" aria-labelledby="task-detail-title">
        <div className="modal-heading">
          <div>
            <span className="modal-kicker">DETAIL TUGAS</span>
            <h2 id="task-detail-title">{task.title}</h2>
          </div>
          <button className="modal-close" onClick={onClose} aria-label="Tutup">×</button>
        </div>
        <div className="detail-description">
          <span>Deskripsi</span>
          <p>{task.description || 'Belum ada deskripsi untuk tugas ini.'}</p>
        </div>
        <div className="detail-meta">
          <div>
            <span>Status</span>
            <strong><span className={`status-badge status-${task.status.toLowerCase().replaceAll(' ', '-')}`}>{task.status}</span></strong>
          </div>
          <div>
            <span>Prioritas</span>
            <strong className={`priority-label priority-${task.priority.toLowerCase()}`}><i />{task.priority}</strong>
          </div>
          <div>
            <span>Deadline</span>
            <strong>{formatDate(task.deadline)}</strong>
          </div>
        </div>
        <div className="modal-actions">
          <button className="button button-quiet" onClick={onClose}>Tutup</button>
          <button className="button button-primary" onClick={() => onEdit(task)}>Edit tugas</button>
        </div>
      </section>
    </div>
  )
}

export default taskdetail