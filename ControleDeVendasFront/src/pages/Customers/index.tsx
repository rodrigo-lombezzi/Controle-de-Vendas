import React, { useState, type JSX } from "react";
import { useNavigate } from "react-router-dom";

type Customer = {
    fullName: string;
    email: string;
    phone: string;
    cpfCnpj: string;
    street: string;
    city: string;
    state: string;
    zip: string;
};

const initialCustomer: Customer = {
    fullName: "",
    email: "",
    phone: "",
    cpfCnpj: "",
    street: "",
    city: "",
    state: "",
    zip: "",
};

export default function CustomersPage(): JSX.Element {
    const [customer, setCustomer] = useState<Customer>(initialCustomer);
    const [errors, setErrors] = useState<Partial<Record<keyof Customer, string>>>(
        {}
    );
    const [submitting, setSubmitting] = useState(false);
    const [message, setMessage] = useState<string | null>(null);
    const navigate = useNavigate();

    const validate = (): boolean => {
        const e: typeof errors = {};
        if (!customer.fullName.trim()) e.fullName = "Nome é obrigatório.";
        if (!customer.email.trim()) e.email = "E‑mail é obrigatório.";
        else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(customer.email))
            e.email = "E‑mail inválido.";
        if (!customer.phone.trim()) e.phone = "Telefone é obrigatório.";
        if (!customer.cpfCnpj.trim()) e.cpfCnpj = "CPF/CNPJ é obrigatório.";
        if (!customer.street.trim()) e.street = "Endereço é obrigatório.";
        if (!customer.city.trim()) e.city = "Cidade é obrigatória.";
        if (!customer.state.trim()) e.state = "Estado é obrigatório.";
        if (!customer.zip.trim()) e.zip = "CEP é obrigatório.";
        setErrors(e);
        return Object.keys(e).length === 0;
    };

    const handleChange =
        (key: keyof Customer) =>
        (ev: React.ChangeEvent<HTMLInputElement>) => {
            setCustomer((prev) => ({ ...prev, [key]: ev.target.value }));
            setErrors((prev) => ({ ...prev, [key]: undefined }));
        };

    const handleSubmit = async (ev: React.FormEvent) => {
        ev.preventDefault();
        setMessage(null);
        if (!validate()) return;
        setSubmitting(true);

        try {
            // Ajuste a URL conforme sua API
            const res = await fetch("/api/customers", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(customer),
            });

            if (!res.ok) {
                const body = await res.json().catch(() => null);
                throw new Error(body?.message || "Erro ao salvar cliente.");
            }

            setMessage("Cliente cadastrado com sucesso.");
            setCustomer(initialCustomer);
            // redireciona para a lista de clientes após 1.2s
            setTimeout(() => navigate("/customers"), 1200);
        } catch (err: any) {
            setMessage(err?.message || "Erro desconhecido.");
        } finally {
            setSubmitting(false);
        }
    };

    const formRowStyle: React.CSSProperties = {
        display: "flex",
        gap: 12,
        marginBottom: 12,
    };

    const inputStyle: React.CSSProperties = {
        flex: 1,
        padding: "8px 10px",
        borderRadius: 4,
        border: "1px solid #ccc",
    };

    const labelStyle: React.CSSProperties = {
        display: "block",
        marginBottom: 6,
        fontSize: 14,
        fontWeight: 600,
    };

    const errorStyle: React.CSSProperties = {
        color: "#b00020",
        fontSize: 13,
        marginTop: 6,
    };

    return (
        <div style={{ maxWidth: 820, margin: "24px auto", padding: 16 }}>
            <h2>Cadastro de Cliente</h2>
            <form onSubmit={handleSubmit} noValidate>
                <div style={{ marginBottom: 12 }}>
                    <label style={labelStyle}>Nome completo</label>
                    <input
                        style={inputStyle}
                        value={customer.fullName}
                        onChange={handleChange("fullName")}
                        placeholder="Nome do cliente"
                        disabled={submitting}
                    />
                    {errors.fullName && <div style={errorStyle}>{errors.fullName}</div>}
                </div>

                <div style={formRowStyle}>
                    <div style={{ flex: 1 }}>
                        <label style={labelStyle}>E‑mail</label>
                        <input
                            style={inputStyle}
                            value={customer.email}
                            onChange={handleChange("email")}
                            placeholder="exemplo@provedor.com"
                            disabled={submitting}
                            type="email"
                        />
                        {errors.email && <div style={errorStyle}>{errors.email}</div>}
                    </div>

                    <div style={{ flex: 1 }}>
                        <label style={labelStyle}>Telefone</label>
                        <input
                            style={inputStyle}
                            value={customer.phone}
                            onChange={handleChange("phone")}
                            placeholder="(XX) XXXXX-XXXX"
                            disabled={submitting}
                        />
                        {errors.phone && <div style={errorStyle}>{errors.phone}</div>}
                    </div>
                </div>

                <div style={{ marginBottom: 12 }}>
                    <label style={labelStyle}>CPF / CNPJ</label>
                    <input
                        style={inputStyle}
                        value={customer.cpfCnpj}
                        onChange={handleChange("cpfCnpj")}
                        placeholder="CPF ou CNPJ"
                        disabled={submitting}
                    />
                    {errors.cpfCnpj && <div style={errorStyle}>{errors.cpfCnpj}</div>}
                </div>

                <fieldset style={{ border: "1px solid #eee", padding: 12, borderRadius: 6 }}>
                    <legend style={{ padding: "0 6px" }}>Endereço</legend>

                    <div style={{ marginBottom: 12 }}>
                        <label style={labelStyle}>Logradouro</label>
                        <input
                            style={inputStyle}
                            value={customer.street}
                            onChange={handleChange("street")}
                            placeholder="Rua, Av., etc."
                            disabled={submitting}
                        />
                        {errors.street && <div style={errorStyle}>{errors.street}</div>}
                    </div>

                    <div style={formRowStyle}>
                        <div style={{ flex: 1 }}>
                            <label style={labelStyle}>Cidade</label>
                            <input
                                style={inputStyle}
                                value={customer.city}
                                onChange={handleChange("city")}
                                disabled={submitting}
                            />
                            {errors.city && <div style={errorStyle}>{errors.city}</div>}
                        </div>

                        <div style={{ width: 120 }}>
                            <label style={labelStyle}>Estado</label>
                            <input
                                style={inputStyle}
                                value={customer.state}
                                onChange={handleChange("state")}
                                disabled={submitting}
                                placeholder="SP"
                            />
                            {errors.state && <div style={errorStyle}>{errors.state}</div>}
                        </div>

                        <div style={{ width: 140 }}>
                            <label style={labelStyle}>CEP</label>
                            <input
                                style={inputStyle}
                                value={customer.zip}
                                onChange={handleChange("zip")}
                                disabled={submitting}
                                placeholder="00000-000"
                            />
                            {errors.zip && <div style={errorStyle}>{errors.zip}</div>}
                        </div>
                    </div>
                </fieldset>

                <div style={{ marginTop: 16, display: "flex", gap: 8 }}>
                    <button
                        type="submit"
                        disabled={submitting}
                        style={{
                            padding: "10px 14px",
                            borderRadius: 6,
                            border: "none",
                            background: "#1976d2",
                            color: "#fff",
                            cursor: submitting ? "not-allowed" : "pointer",
                        }}
                    >
                        {submitting ? "Salvando..." : "Salvar cliente"}
                    </button>

                    <button
                        type="button"
                        onClick={() => navigate("/customers")}
                        disabled={submitting}
                        style={{
                            padding: "10px 14px",
                            borderRadius: 6,
                            border: "1px solid #ccc",
                            background: "#fff",
                            cursor: submitting ? "not-allowed" : "pointer",
                        }}
                    >
                        Cancelar
                    </button>
                </div>

                {message && (
                    <div style={{ marginTop: 12, color: message.includes("sucesso") ? "green" : "#b00020" }}>
                        {message}
                    </div>
                )}
            </form>
        </div>
    );
}