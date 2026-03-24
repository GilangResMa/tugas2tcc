const API = 'http://127.0.0.1:3000/api/notes';
let editingId = null;

async function loadNotes() {
  try {
    const res = await fetch(API);
    const notes = await res.json();

    const tbody = document.getElementById('notesBody');
    tbody.innerHTML = '';

    notes.forEach((note, index) => {
      const row = document.createElement('tr');

      const tanggal = new Date(note.tanggal_dibuat).toLocaleString('id-ID', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
      });

      row.innerHTML = `
        <td>${index + 1}</td>
        <td><strong>${note.judul}</strong></td>
        <td>${note.isi}</td>
        <td>${tanggal}</td>
        <td class="aksi">
          <button class="btn btn-edit" onclick="editNote(${note.id}, '${note.judul.replace(/'/g, "\\'")}', '${note.isi.replace(/'/g, "\\'")}')">
            ✏️ Edit
          </button>
          <button class="btn btn-delete" onclick="deleteNote(${note.id})">
            🗑️ Hapus
          </button>
        </td>
      `;

      tbody.appendChild(row);
    });
  } catch (err) {
    console.error('Error loading notes:', err);
  }
}

document.getElementById('noteForm').addEventListener('submit', async (e) => {
  e.preventDefault();

  const judul = document.getElementById('judul').value.trim();
  const isi = document.getElementById('isi').value.trim();

  if (!judul || !isi) {
    alert('Judul dan isi tidak boleh kosong!');
    return;
  }

  try {
    if (editingId) {
      // Update
      await fetch(`${API}/${editingId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ judul, isi })
      });
      editingId = null;
      document.getElementById('submitBtn').textContent = 'Tambah Catatan';
    } else {
      // Tambah baru
      await fetch(API, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ judul, isi })
      });
    }

    document.getElementById('noteForm').reset();
    loadNotes();       
  } catch (err) {
    alert('Terjadi kesalahan: ' + err.message);
  }
});

window.editNote = (id, judul, isi) => {
  editingId = id;
  document.getElementById('judul').value = judul;
  document.getElementById('isi').value = isi;
  document.getElementById('submitBtn').textContent = 'Simpan Perubahan';
  window.scrollTo({ top: 0, behavior: 'smooth' });
};

window.deleteNote = async (id) => {
  if (confirm('Yakin ingin menghapus catatan ini?')) {
    try {
      await fetch(`${API}/${id}`, { method: 'DELETE' });
      loadNotes();        
    } catch (err) {
      alert('Gagal menghapus catatan');
    }
  }
};

loadNotes();