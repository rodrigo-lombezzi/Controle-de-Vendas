import React, { useState, type FormEvent, type JSX } from "react";
import { useNavigate } from "react-router-dom";

type ProductPayload = {
    name: string;
    description?: string;
    price: number;
    stock: number;
    category?: string;
    imageUrl?: string;
};

export default function AddProductPage(): JSX.Element {
    const navigate = useNavigate();

    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState<number | "">("");
    const [stock, setStock] = useState<number | "">("");
    const [category, setCategory] = useState("");
    const [imageUrl, setImageUrl] = useState("");
    const [submitting, setSubmitting] = useState(false);
    const [errors, setErrors] = useState<Record<string, string>>({});
    const [serverError, setServerError] = useState("");

    function validate(): boolean {
        const e: Record<string, string> = {};
        if (!name.trim()) e.name = "Nome é obrigatório.";
        if (price === "" || Number(price) < 0 || Number.isNaN(Number(price)))
            e.price = "Preço deve ser um número maior ou igual a 0.";
        if (stock === "" || Number(stock) < 0 || !Number.isInteger(Number(stock)))
            e.stock = "Quantidade deve ser um inteiro maior ou igual a 0.";
        setErrors(e);
        return Object.keys(e).length === 0;
    }

    async function handleSubmit(ev: FormEvent) {
        ev.preventDefault();
        setServerError("");
        if (!validate()) return;

        const payload: ProductPayload = {
            name: name.trim(),
            description: description.trim() || undefined,
            price: Number(price),
            stock: Number(stock),
            category: category.trim() || undefined,
            imageUrl: imageUrl.trim() || undefined,
        };

        try {
            setSubmitting(true);
            const res = await fetch("/api/products", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload),
            });

            if (!res.ok) {
                const text = await res.text();
                throw new Error(text || `Erro: ${res.status}`);
            }

            // sucesso: voltar para a lista de produtos
            navigate("/products");
        } catch (err: any) {
            setServerError(err?.message || "Erro ao salvar produto.");
        } finally {
            setSubmitting(false);
        }
    }

    return (
        <div style={{ maxWidth: 720, margin: "24px auto", padding: 16 }}>
            <h1>Adicionar novo produto</h1>

            <form onSubmit={handleSubmit} noValidate>
                <div style={{ marginBottom: 12 }}>
                    <label>
                        Nome<span style={{ color: "red" }}> *</span>
                        <br />
                        <input
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="Nome do produto"
                            style={{ width: "100%", padding: 8 }}
                            disabled={submitting}
                        />
                    </label>
                    {errors.name && (
                        <div style={{ color: "crimson", fontSize: 13 }}>{errors.name}</div>
                    )}
                </div>

                <div style={{ marginBottom: 12 }}>
                    <label>
                        Descrição
                        <br />
                        <textarea
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            placeholder="Descrição (opcional)"
                            style={{ width: "100%", padding: 8, minHeight: 80 }}
                            disabled={submitting}
                        />
                    </label>
                </div>

                <div style={{ display: "flex", gap: 12, marginBottom: 12 }}>
                    <div style={{ flex: 1 }}>
                        <label>
                            Preço (R$)<span style={{ color: "red" }}> *</span>
                            <br />
                            <input
                                value={price}
                                onChange={(e) => setPrice(e.target.value === "" ? "" : Number(e.target.value))}
                                type="number"
                                min="0"
                                step="0.01"
                                style={{ width: "100%", padding: 8 }}
                                disabled={submitting}
                            />
                        </label>
                        {errors.price && (
                            <div style={{ color: "crimson", fontSize: 13 }}>{errors.price}</div>
                        )}
                    </div>

                    <div style={{ width: 160 }}>
                        <label>
                            Quantidade (estoque)
                            <br />
                            <input
                                value={stock}
                                onChange={(e) => setStock(e.target.value === "" ? "" : Number(e.target.value))}
                                type="number"
                                min="0"
                                step="1"
                                style={{ width: "100%", padding: 8 }}
                                disabled={submitting}
                            />
                        </label>
                        {errors.stock && (
                            <div style={{ color: "crimson", fontSize: 13 }}>{errors.stock}</div>
                        )}
                    </div>
                </div>

                <div style={{ marginBottom: 12 }}>
                    <label>
                        Categoria
                        <br />
                        <input
                            value={category}
                            onChange={(e) => setCategory(e.target.value)}
                            placeholder="Ex.: Eletrônicos"
                            style={{ width: "100%", padding: 8 }}
                            disabled={submitting}
                        />
                    </label>
                </div>

                <div style={{ marginBottom: 12 }}>
                    <label>
                        URL da imagem
                        <br />
                        <input
                            value={imageUrl}
                            onChange={(e) => setImageUrl(e.target.value)}
                            placeholder="https://..."
                            style={{ width: "100%", padding: 8 }}
                            disabled={submitting}
                        />
                    </label>
                </div>

                {serverError && (
                    <div style={{ color: "crimson", marginBottom: 12 }}>{serverError}</div>
                )}

                <div style={{ display: "flex", gap: 8 }}>
                    <button type="submit" disabled={submitting} style={{ padding: "8px 16px" }}>
                        {submitting ? "Salvando..." : "Salvar"}
                    </button>
                    <button
                        type="button"
                        onClick={() => navigate(-1)}
                        disabled={submitting}
                        style={{ padding: "8px 16px" }}
                    >
                        Cancelar
                    </button>
                </div>
            </form>
        </div>
    );
}