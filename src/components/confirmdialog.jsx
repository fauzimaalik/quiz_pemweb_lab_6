function confirmdialog({ title, onCancel, onConfirm }) {
  return (
    <div className="modal-backdrop" onMouseDown={(event) => event.target === event.currentTarget && onCancel()}>
      <section className="modal-card confirm-modal" role="alertdialog" aria-modal="true" aria-labelledby="confirm-title">
        <span className="confirm-icon" aria-hidden="true">
          <svg viewBox="0 0 24 24" fill="none"><path d="M12 8v5m0 3h.01M10.3 3.9 2.7 17a2 2 0 0 0 1.7 3h15.2a2 2 0 0 0 1.7-3l-7.6-13.1a2 2 0 0 0-3.4 0Z" /></svg>
        </span>
        <h2 id="confirm-title">Hapus tugas ini?</h2>
        <p>Tugas <strong>“{title}”</strong> akan dihapus dan tidak dapat dikembalikan.</p>
        <div className="modal-actions">
          <button className="button button-quiet" onClick={onCancel}>Batal</button>
          <button className="button button-danger" onClick={onConfirm}>Ya, hapus tugas</button>
        </div>
      </section>
    </div>
  )
}

export default confirmdialog