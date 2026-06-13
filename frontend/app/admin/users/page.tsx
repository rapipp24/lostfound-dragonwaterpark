"use client";

import { useEffect, useState, useCallback } from "react";
import toast from "react-hot-toast";
import Input from "../components/Input";
import Button from "../components/Button";
import { getUsers, registerAdmin } from "../services/authService";
import { User } from "lucide-react";

interface UserData {
  id: number;
  fullName: string;
  email: string;
  role: string;
  createdAt: string;
}

export default function UsersPage() {
  const [users, setUsers] = useState<UserData[]>([]);
  const [loading, setLoading] = useState(true);
  
  // Form state
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const fetchUsers = useCallback(async () => {
    setLoading(true);
    try {
      const data = await getUsers();
      setUsers(data);
    } catch (error: any) {
      toast.error(error.message || "Gagal memuat daftar user.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  const handleCreateAdmin = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const trimmedName = fullName.trim();
    const trimmedEmail = email.trim().toLowerCase();
    
    if (!trimmedName || !trimmedEmail || !password) {
      toast.error("Semua field harus diisi!");
      return;
    }

    if (password.length < 6) {
      toast.error("Password minimal 6 karakter!");
      return;
    }

    setSubmitting(true);
    try {
      await registerAdmin(trimmedName, trimmedEmail, password);
      toast.success("Admin baru berhasil ditambahkan!");
      
      // Clear form
      setFullName("");
      setEmail("");
      setPassword("");
      
      // Re-fetch users
      fetchUsers();
    } catch (error: any) {
      toast.error(error.message || "Gagal membuat admin baru.");
    } finally {
      setSubmitting(false);
    }
  };

  const formatDate = (dateStr: string) => {
    try {
      return new Date(dateStr).toLocaleDateString("id-ID", {
        day: "numeric",
        month: "short",
        year: "numeric",
      });
    } catch {
      return dateStr;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-slate-800">Users Management</h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Side: Users list */}
        <div className="lg:col-span-2 space-y-4">
          <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
            <div className="px-6 py-4 border-b border-slate-200 bg-slate-50/50">
              <h3 className="font-bold text-slate-700">Daftar Pengguna Terdaftar</h3>
            </div>
            
            {loading ? (
              <div className="p-10 text-center text-slate-400">Memuat data...</div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-sm text-slate-800">
                  <thead className="bg-slate-100 text-slate-700">
                    <tr>
                      <th className="text-left p-4">ID</th>
                      <th className="text-left p-4">Nama Lengkap</th>
                      <th className="text-left p-4">Email</th>
                      <th className="text-left p-4">Role</th>
                      <th className="text-left p-4">Registrasi</th>
                    </tr>
                  </thead>
                  <tbody>
                    {users.map((u) => (
                      <tr key={u.id} className="border-t border-slate-200 hover:bg-slate-50 transition-colors">
                        <td className="p-4">{u.id}</td>
                        <td className="p-4 font-semibold">{u.fullName}</td>
                        <td className="p-4">{u.email}</td>
                        <td className="p-4">
                          <span
                            className={`px-2.5 py-1 rounded-full text-xs font-bold ${
                              u.role === "admin"
                                ? "bg-blue-100 text-blue-700"
                                : "bg-slate-100 text-slate-600"
                            }`}
                          >
                            {u.role.toUpperCase()}
                          </span>
                        </td>
                        <td className="p-4 text-slate-500">{formatDate(u.createdAt)}</td>
                      </tr>
                    ))}
                    {users.length === 0 && (
                      <tr>
                        <td colSpan={5} className="p-10 text-center text-slate-500">
                          Tidak ada data pengguna.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>

        {/* Right Side: Create Admin Form */}
        <div className="space-y-4">
          <div className="bg-white border border-slate-200 rounded-xl shadow-sm p-6 space-y-5">
            <div className="flex items-center gap-3 pb-3 border-b border-slate-100">
              <div className="w-10 h-10 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center font-bold">
                <User size={20} />
              </div>
              <div>
                <h3 className="font-bold text-slate-800">Tambah Admin Baru</h3>
                <p className="text-xs text-slate-400">Registrasi akun administrator baru</p>
              </div>
            </div>

            <form onSubmit={handleCreateAdmin} className="space-y-4">
              <Input
                label="Nama Lengkap"
                type="text"
                placeholder="Contoh: Wanda Ananta"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                required
              />

              <Input
                label="Alamat Email"
                type="email"
                placeholder="admin@dragonwaterpark.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />

              <Input
                label="Password Baru"
                type="password"
                placeholder="Min. 6 karakter"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />

              <Button
                type="submit"
                className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white shadow-md shadow-blue-200/50 mt-2"
                disabled={submitting}
              >
                {submitting ? "Mendaftarkan..." : "Daftarkan Admin"}
              </Button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
