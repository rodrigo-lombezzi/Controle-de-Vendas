import React, { useState, useMemo, type FormEvent, type JSX } from "react";
import { useNavigate } from "react-router-dom";

type SaleItem = {
    id: string;
    product: string;
    quantity: number;
    price: number;
};

export default function SalesPage(): JSX.Element {
    const navigate = useNavigate();
    const [customer, setCustomer] = useState("");
    const [date, setDate] = useState(() =>
        new Date().toISOString().slice(0, 10)
    );
    const [items, setItems] = useState<SaleItem[]>([
        { id: cryptoRandomId(), product: "", quantity: 1, price: 0 },
    ]);
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);

    const subtotal = useMemo(
        () => items.reduce((s, it) => s + it.quantity * it.price, 0),
        [items]
    );

    const addItem = () =>
        setItems((prev) => [
            ...prev,
            { id: cryptoRandomId(), product: "", quantity: 1, price: 0 },
        ]);

    const updateItem = (id: string, patch: Partial<SaleItem>) =>
        setItems((prev) => prev.map((it) => (it.id === id ? { ...it, ...patch } : it)));

    const removeItem = (id: string) =>
        setItems((prev) => prev.filter((it) => it.id !== id));

    async function handleSubmit(e: FormEvent) {
        e.preventDefault();
        setMessage(null);
        setError(null);

        // validações simples
        if (!customer.trim()) {
            setError("Informe o nome do cliente.");
            return;
        }
        if (items.length === 0) {
            setError("Adicione ao menos um item à venda.");
            return;
        }
        for (const it of items) {
            if (!it.product.trim()) {
                setError("Todos os itens precisam de um produto.");
                return;
            }
            if (it.quantity <= 0) {
                setError("Quantidade deve ser maior que 0.");
                return;
            }
            if (it.price < 0) {
                setError("Preço não pode ser negativo.");
                return;
            }
        }

        const payload = {
            customer,
            date,
            items: items.map((it) => ({
                product: it.product,
                quantity: it.quantity,
                price: it.price,
                lineTotal: Number((it.quantity * it.price).toFixed(2)),
            })),
            subtotal: Number(subtotal.toFixed(2)),
            total: Number(subtotal.toFixed(2)), // ajuste se houver impostos/descontos
        };

        setLoading(true);
        try {
            // alterar URL para o endpoint real da sua API
            const res = await fetch("/api/sales", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload),
            });

            if (!res.ok) {
                const text = await res.text();
                throw new Error(text || "Erro ao salvar a venda.");
            }

            setMessage("Venda cadastrada com sucesso.");
            // resetar formulário
            setCustomer("");
            setDate(new Date().toISOString().slice(0, 10));
            setItems([{ id: cryptoRandomId(), product: "", quantity: 1, price: 0 }]);
            // opcional: navegar para lista de vendas
            // navigate("/sales");
        } catch (err: any) {
            setError(err?.message || "Erro desconhecido.");
        } finally {
            setLoading(false);
        }
    }

    return (
        <div style={styles.container}>
            <h1 style={styles.title}>Cadastro de Venda</h1>

            <form onSubmit={handleSubmit} style={styles.form}>
                <div style={styles.row}>
                    <label style={styles.label}>
                        Cliente
                        <input
                            type="text"
                            value={customer}
                            onChange={(e) => setCustomer(e.target.value)}
                            placeholder="Nome do cliente"
                            style={styles.input}
                        />
                    </label>

                    <label style={styles.label}>
                        Data
                        <input
                            type="date"
                            value={date}
                            onChange={(e) => setDate(e.target.value)}
                            style={styles.input}
                        />
                    </label>
                </div>

                <fieldset style={styles.fieldset}>
                    <legend style={{ padding: "0 8px" }}>Itens</legend>
                    {items.map((it, idx) => (
                        <div key={it.id} style={styles.itemRow}>
                            <input
                                type="text"
                                value={it.product}
                                onChange={(e) => updateItem(it.id, { product: e.target.value })}
                                placeholder={`Produto #${idx + 1}`}
                                style={{ ...styles.input, flex: 2 }}
                            />
                            <input
                                type="number"
                                min={1}
                                value={it.quantity}
                                onChange={(e) =>
                                    updateItem(it.id, { quantity: Number(e.target.value || 0) })
                                }
                                style={{ ...styles.input, width: 100, marginLeft: 8 }}
                            />
                            <input
                                type="number"
                                min={0}
                                step="0.01"
                                value={it.price}
                                onChange={(e) =>
                                    updateItem(it.id, { price: Number(e.target.value || 0) })
                                }
                                style={{ ...styles.input, width: 120, marginLeft: 8 }}
                            />
                            <div style={{ width: 120, textAlign: "right", marginLeft: 8 }}>
                                {(it.quantity * it.price).toFixed(2)}
                            </div>
                            <button
                                type="button"
                                onClick={() => removeItem(it.id)}
                                style={styles.removeBtn}
                                aria-label={`Remover item ${idx + 1}`}
                            >
                                Remover
                            </button>
                        </div>
                    ))}

                    <div style={{ marginTop: 8 }}>
                        <button type="button" onClick={addItem} style={styles.addBtn}>
                            + Adicionar item
                        </button>
                    </div>
                </fieldset>

                <div style={styles.totals}>
                    <div>Subtotal: R$ {subtotal.toFixed(2)}</div>
                    <div style={{ fontWeight: "bold" }}>Total: R$ {subtotal.toFixed(2)}</div>
                </div>

                {error && <div style={styles.error}>{error}</div>}
                {message && <div style={styles.message}>{message}</div>}

                <div style={styles.actions}>
                    <button type="submit" disabled={loading} style={styles.submitBtn}>
                        {loading ? "Salvando..." : "Salvar Venda"}
                    </button>
                    <button
                        type="button"
                        onClick={() => navigate(-1)}
                        style={styles.cancelBtn}
                    >
                        Cancelar
                    </button>
                </div>
            </form>
        </div>
    );
}

function cryptoRandomId() {
    // suporte para ambientes que não tenham crypto (fallback simples)
    if (typeof crypto !== "undefined" && typeof crypto.randomUUID === "function") {
        return crypto.randomUUID();
    }
    return Math.random().toString(36).slice(2, 9);
}

const styles: { [k: string]: React.CSSProperties } = {
    container: { maxWidth: 900, margin: "24px auto", padding: 16, fontFamily: "system-ui, sans-serif" },
    title: { marginBottom: 16 },
    form: { display: "flex", flexDirection: "column", gap: 12 },
    row: { display: "flex", gap: 12 },
    label: { display: "flex", flexDirection: "column", flex: 1, gap: 6 },
    input: { padding: "8px 10px", borderRadius: 4, border: "1px solid #ccc" },
    fieldset: { border: "1px solid #ddd", padding: 12, borderRadius: 6 },
    itemRow: { display: "flex", alignItems: "center", gap: 8, marginBottom: 8 },
    addBtn: { padding: "8px 12px", cursor: "pointer" },
    removeBtn: { marginLeft: 8, padding: "6px 10px", cursor: "pointer" },
    totals: { display: "flex", justifyContent: "space-between", marginTop: 8, paddingTop: 8, borderTop: "1px solid #eee" },
    actions: { display: "flex", gap: 8, marginTop: 12 },
    submitBtn: { padding: "10px 14px", background: "#2b6cb0", color: "white", border: "none", borderRadius: 4, cursor: "pointer" },
    cancelBtn: { padding: "10px 14px", background: "#eee", border: "none", borderRadius: 4, cursor: "pointer" },
    error: { color: "#b00020", marginTop: 8 },
    message: { color: "#006400", marginTop: 8 },
};