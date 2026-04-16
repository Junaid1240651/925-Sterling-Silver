import { useCallback, useEffect, useState, type FormEvent } from "react";
import { MoreVertical, Pencil, Plus, Trash2 } from "lucide-react";
import { apiFetch } from "../../lib/api";
import { useAuth } from "../../context/AuthContext";
import { INDIAN_STATES } from "../../data/indianStates";

export interface SavedAddress {
  id: string;
  label: "HOME" | "WORK";
  fullName: string;
  phone: string;
  pincode: string;
  locality: string;
  addressLine: string;
  city: string;
  state: string;
  landmark?: string;
  altPhone?: string;
}

type AddressFormState = {
  label: "HOME" | "WORK";
  fullName: string;
  phone: string;
  pincode: string;
  locality: string;
  addressLine: string;
  city: string;
  state: string;
  landmark: string;
  altPhone: string;
};

const emptyForm: AddressFormState = {
  label: "HOME",
  fullName: "",
  phone: "",
  pincode: "",
  locality: "",
  addressLine: "",
  city: "",
  state: "",
  landmark: "",
  altPhone: "",
};

export function AccountAddressesPage() {
  const { accessToken } = useAuth();
  const [addresses, setAddresses] = useState<SavedAddress[]>([]);
  const [maxAddresses, setMaxAddresses] = useState(5);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState(emptyForm);
  const [error, setError] = useState<string | null>(null);
  const [menuOpenId, setMenuOpenId] = useState<string | null>(null);

  const load = useCallback(async () => {
    if (!accessToken) return;
    setLoading(true);
    try {
      const res = await apiFetch<{ addresses: SavedAddress[]; maxAddresses: number }>(
        "/api/account/addresses",
        { token: accessToken },
      );
      setAddresses(res.addresses);
      setMaxAddresses(res.maxAddresses);
    } catch {
      setAddresses([]);
    } finally {
      setLoading(false);
    }
  }, [accessToken]);

  useEffect(() => {
    void load();
  }, [load]);

  function openAdd() {
    setEditingId(null);
    setForm(emptyForm);
    setShowForm(true);
    setError(null);
  }

  function openEdit(a: SavedAddress) {
    setEditingId(a.id);
    setForm({
      label: a.label,
      fullName: a.fullName,
      phone: a.phone,
      pincode: a.pincode,
      locality: a.locality,
      addressLine: a.addressLine,
      city: a.city,
      state: a.state,
      landmark: a.landmark ?? "",
      altPhone: a.altPhone ?? "",
    });
    setShowForm(true);
    setError(null);
    setMenuOpenId(null);
  }

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    if (!accessToken) return;
    setError(null);
    try {
      if (editingId) {
        await apiFetch(`/api/account/addresses/${editingId}`, {
          method: "PATCH",
          token: accessToken,
          body: JSON.stringify({
            label: form.label,
            fullName: form.fullName.trim(),
            phone: form.phone.trim(),
            pincode: form.pincode.trim(),
            locality: form.locality.trim(),
            addressLine: form.addressLine.trim(),
            city: form.city.trim(),
            state: form.state.trim(),
            landmark: form.landmark.trim() || undefined,
            altPhone: form.altPhone.trim() || undefined,
          }),
        });
      } else {
        await apiFetch("/api/account/addresses", {
          method: "POST",
          token: accessToken,
          body: JSON.stringify({
            label: form.label,
            fullName: form.fullName.trim(),
            phone: form.phone.trim(),
            pincode: form.pincode.trim(),
            locality: form.locality.trim(),
            addressLine: form.addressLine.trim(),
            city: form.city.trim(),
            state: form.state.trim(),
            landmark: form.landmark.trim() || undefined,
            altPhone: form.altPhone.trim() || undefined,
          }),
        });
      }
      setShowForm(false);
      setEditingId(null);
      await load();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not save address");
    }
  }

  async function remove(id: string) {
    if (!accessToken || !confirm("Remove this address?")) return;
    setMenuOpenId(null);
    try {
      await apiFetch(`/api/account/addresses/${id}`, {
        method: "DELETE",
        token: accessToken,
      });
      await load();
    } catch {
      /* ignore */
    }
  }

  const atLimit = addresses.length >= maxAddresses;

  return (
    <div
      className="rounded-md border shadow-sm p-5 md:p-8"
      style={{
        backgroundColor: "var(--color-bg-white)",
        borderColor: "var(--color-border-light)",
      }}
    >
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-4 border-b mb-6" style={{ borderColor: "var(--color-border-light)" }}>
        <h1
          className="text-2xl md:text-3xl"
          style={{
            fontFamily: "var(--font-heading)",
            color: "var(--color-text-primary)",
          }}
        >
          Manage addresses
        </h1>
        {!atLimit && (
          <button
            type="button"
            onClick={openAdd}
            className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-md text-sm font-semibold"
            style={{
              color: "var(--color-accent)",
              border: "1px solid var(--color-accent)",
            }}
          >
            <Plus size={18} />
            Add a new address
          </button>
        )}
      </div>

      {atLimit && !showForm && (
        <p className="text-sm mb-4" style={{ color: "var(--color-text-muted)" }}>
          You’ve reached the maximum of {maxAddresses} saved addresses. Remove one to add another.
        </p>
      )}

      {loading ? (
        <p className="text-sm" style={{ color: "var(--color-text-muted)" }}>
          Loading addresses…
        </p>
      ) : (
        <ul className="space-y-4">
          {addresses.map((a) => (
            <li
              key={a.id}
              className="relative border rounded-md p-4 pr-12"
              style={{ borderColor: "var(--color-border-light)" }}
            >
              <span
                className="text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded"
                style={{
                  backgroundColor: "var(--color-bg-secondary)",
                  color: "var(--color-text-secondary)",
                }}
              >
                {a.label}
              </span>
              <p className="font-semibold mt-2 text-sm" style={{ color: "var(--color-text-primary)" }}>
                {a.fullName}{" "}
                <span className="font-normal" style={{ color: "var(--color-text-secondary)" }}>
                  {a.phone}
                </span>
              </p>
              <p className="text-sm mt-1 leading-relaxed" style={{ color: "var(--color-text-secondary)" }}>
                {a.addressLine}, {a.locality}, {a.city}, {a.state} — {a.pincode}
              </p>
              <div className="absolute top-3 right-2">
                <button
                  type="button"
                  className="p-2 rounded-md cursor-pointer"
                  style={{ color: "var(--color-text-muted)" }}
                  aria-label="Address options"
                  aria-expanded={menuOpenId === a.id}
                  onClick={() => setMenuOpenId((id) => (id === a.id ? null : a.id))}
                >
                  <MoreVertical size={18} />
                </button>
                {menuOpenId === a.id && (
                  <div
                    className="absolute right-0 top-full mt-1 z-10 min-w-[140px] rounded-md border shadow-lg py-1 text-sm"
                    style={{
                      backgroundColor: "var(--color-bg-white)",
                      borderColor: "var(--color-border-light)",
                    }}
                  >
                    <button
                      type="button"
                      className="w-full flex items-center gap-2 px-3 py-2 text-left hover:opacity-90"
                      style={{ color: "var(--color-text-secondary)" }}
                      onClick={() => openEdit(a)}
                    >
                      <Pencil size={14} /> Edit
                    </button>
                    <button
                      type="button"
                      className="w-full flex items-center gap-2 px-3 py-2 text-left"
                      style={{ color: "#b91c1c" }}
                      onClick={() => void remove(a.id)}
                    >
                      <Trash2 size={14} /> Delete
                    </button>
                  </div>
                )}
              </div>
            </li>
          ))}
        </ul>
      )}

      {showForm && (
        <form
          onSubmit={onSubmit}
          className="mt-8 pt-8 border-t space-y-4"
          style={{ borderColor: "var(--color-border-light)" }}
        >
          <h2 className="text-lg font-medium" style={{ fontFamily: "var(--font-heading)" }}>
            {editingId ? "Edit address" : "New address"}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium mb-1" style={{ color: "var(--color-text-secondary)" }}>
                Name
              </label>
              <input
                required
                value={form.fullName}
                onChange={(e) => setForm((f) => ({ ...f, fullName: e.target.value }))}
                className="w-full px-3 py-2 rounded-md border text-sm"
                style={{ borderColor: "var(--color-border-medium)" }}
              />
            </div>
            <div>
              <label className="block text-xs font-medium mb-1" style={{ color: "var(--color-text-secondary)" }}>
                10-digit mobile
              </label>
              <input
                required
                inputMode="numeric"
                minLength={10}
                maxLength={15}
                value={form.phone}
                onChange={(e) => setForm((f) => ({ ...f, phone: e.target.value.replace(/\D/g, "").slice(0, 15) }))}
                className="w-full px-3 py-2 rounded-md border text-sm"
                style={{ borderColor: "var(--color-border-medium)" }}
              />
            </div>
            <div>
              <label className="block text-xs font-medium mb-1" style={{ color: "var(--color-text-secondary)" }}>
                Pincode
              </label>
              <input
                required
                inputMode="numeric"
                minLength={6}
                maxLength={10}
                value={form.pincode}
                onChange={(e) => setForm((f) => ({ ...f, pincode: e.target.value.replace(/\D/g, "").slice(0, 10) }))}
                className="w-full px-3 py-2 rounded-md border text-sm"
                style={{ borderColor: "var(--color-border-medium)" }}
              />
            </div>
            <div>
              <label className="block text-xs font-medium mb-1" style={{ color: "var(--color-text-secondary)" }}>
                Locality
              </label>
              <input
                required
                value={form.locality}
                onChange={(e) => setForm((f) => ({ ...f, locality: e.target.value }))}
                className="w-full px-3 py-2 rounded-md border text-sm"
                style={{ borderColor: "var(--color-border-medium)" }}
              />
            </div>
            <div className="sm:col-span-2">
              <label className="block text-xs font-medium mb-1" style={{ color: "var(--color-text-secondary)" }}>
                Address (area & street)
              </label>
              <textarea
                required
                rows={2}
                value={form.addressLine}
                onChange={(e) => setForm((f) => ({ ...f, addressLine: e.target.value }))}
                className="w-full px-3 py-2 rounded-md border text-sm resize-y min-h-[72px]"
                style={{ borderColor: "var(--color-border-medium)" }}
              />
            </div>
            <div>
              <label className="block text-xs font-medium mb-1" style={{ color: "var(--color-text-secondary)" }}>
                City / Town
              </label>
              <input
                required
                value={form.city}
                onChange={(e) => setForm((f) => ({ ...f, city: e.target.value }))}
                className="w-full px-3 py-2 rounded-md border text-sm"
                style={{ borderColor: "var(--color-border-medium)" }}
              />
            </div>
            <div>
              <label className="block text-xs font-medium mb-1" style={{ color: "var(--color-text-secondary)" }}>
                State
              </label>
              <select
                required
                value={form.state}
                onChange={(e) => setForm((f) => ({ ...f, state: e.target.value }))}
                className="w-full px-3 py-2 rounded-md border text-sm bg-transparent"
                style={{ borderColor: "var(--color-border-medium)" }}
              >
                <option value="">Select state</option>
                {INDIAN_STATES.map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-xs font-medium mb-1" style={{ color: "var(--color-text-secondary)" }}>
                Landmark (optional)
              </label>
              <input
                value={form.landmark}
                onChange={(e) => setForm((f) => ({ ...f, landmark: e.target.value }))}
                className="w-full px-3 py-2 rounded-md border text-sm"
                style={{ borderColor: "var(--color-border-medium)" }}
              />
            </div>
            <div>
              <label className="block text-xs font-medium mb-1" style={{ color: "var(--color-text-secondary)" }}>
                Alternate phone (optional)
              </label>
              <input
                value={form.altPhone}
                onChange={(e) => setForm((f) => ({ ...f, altPhone: e.target.value.replace(/\D/g, "").slice(0, 15) }))}
                className="w-full px-3 py-2 rounded-md border text-sm"
                style={{ borderColor: "var(--color-border-medium)" }}
              />
            </div>
          </div>
          <fieldset className="flex gap-6 pt-1">
            <legend className="text-xs font-medium mb-2 sr-only">Address type</legend>
            <label className="flex items-center gap-2 text-sm cursor-pointer">
              <input
                type="radio"
                name="addr-label"
                checked={form.label === "HOME"}
                onChange={() => setForm((f) => ({ ...f, label: "HOME" }))}
              />
              Home
            </label>
            <label className="flex items-center gap-2 text-sm cursor-pointer">
              <input
                type="radio"
                name="addr-label"
                checked={form.label === "WORK"}
                onChange={() => setForm((f) => ({ ...f, label: "WORK" }))}
              />
              Work
            </label>
          </fieldset>
          {error && (
            <p className="text-sm" style={{ color: "#b91c1c" }}>
              {error}
            </p>
          )}
          <div className="flex flex-wrap gap-3 pt-2">
            <button
              type="submit"
              className="px-8 py-2.5 rounded-md text-sm font-semibold uppercase tracking-wide"
              style={{
                backgroundColor: "var(--color-accent)",
                color: "var(--color-text-light)",
              }}
            >
              Save
            </button>
            <button
              type="button"
              onClick={() => {
                setShowForm(false);
                setEditingId(null);
                setError(null);
              }}
              className="px-6 py-2.5 rounded-md text-sm font-medium"
              style={{ color: "var(--color-accent)" }}
            >
              Cancel
            </button>
          </div>
        </form>
      )}

      {!loading && addresses.length === 0 && !showForm && (
        <p className="text-sm mt-6" style={{ color: "var(--color-text-muted)" }}>
          No addresses saved yet. Add one for faster checkout.
        </p>
      )}
    </div>
  );
}
