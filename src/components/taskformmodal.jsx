import { useEffect, useState } from 'react'

function taskformmodal({ task, onClose, onSave }) {
  const [formData, setFormData] = useState({
    title: task?.title ?? '',
    description: task?.description ?? '',
    status: task?.status ?? 'Belum dimulai',
    priority: task?.priority ?? 'Sedang',
    deadline: task?.deadline ?? '',
  })

  useEffect(() => {
    function handleKeyDown(event) {
      if (event.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [onClose])

  function updateField(event) {
    setFormData((currentData) => ({
      ...currentData,
      [event.target.name]: event.target.value,
    }))
  }

  function handleSubmit(event) {
    event.preventDefault()
    onSave({ ...formData, title: formData.title.trim(), description: formData.description.trim() })
  }

  return (
    <div className="modal-backdrop" onMouseDown={(event) => event.target === event.currentTarget && onClose()}>
      <section className="modal-card form-modal" role="dialog" aria-modal="true" aria-labelledby="task-form-title">
        <div className="modal-heading">
          <div>
            <span className="modal-kicker">{task ? 'PERBARUI RENCANA' : 'TUGAS BARU'}</span>
            <h2 id="task-form-title">{task ? 'Edit tugas' : 'Tambah tugas'}</h2>
            <p>Isi detail tugasmu agar lebih mudah dikelola.</p>
          </div>
          <button className="modal-close" onClick={onClose} aria-label="Tutup">×</button>
        </div>

        <form onSubmit={handleSubmit}>
          <label className="form-field">
            <span>Judul tugas <b>*</b></span>
            <input
              name="title"
              value={formData.title}
              onChange={updateField}
              placeholder="Contoh: Menyelesaikan laporan"
              required
              maxLength={100}
              autoFocus
            />
          </label>
          <label className="form-field">
            <span>Deskripsi</span>
            <textarea
              name="description"
              value={formData.description}
              onChange={updateField}
              placeholder="Tambahkan catatan singkat tentang tugas ini..."
              rows="3"
            />
          </label>
          <div className="form-grid">
            <label className="form-field">
              <span>Status</span>
              <select name="status" value={formData.status} onChange={updateField}>
                <option>Belum dimulai</option>
                <option>Sedang dikerjakan</option>
                <option>Selesai</option>
              </select>
            </label>
            <label className="form-field">
              <span>Prioritas</span>
              <select name="priority" value={formData.priority} onChange={updateField}>
                <option>Rendah</option>
                <option>Sedang</option>
                <option>Tinggi</option>
              </select>
            </label>
          </div>
          <label className="form-field">
            <span>Deadline <b>*</b></span>
            <input type="date" name="deadline" value={formData.deadline} onChange={updateField} required />
          </label>

          <div className="modal-actions">
            <button type="button" className="button button-quiet" onClick={onClose}>Batal</button>
            <button type="submit" className="button button-primary">
              {task ? 'Simpan perubahan' : 'Tambahkan tugas'}
            </button>
          </div>
        </form>
      </section>
    </div>
  )
}

export default taskformmodal