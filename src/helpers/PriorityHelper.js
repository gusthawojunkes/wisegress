const LABELS = {
    "HIGHEST": "Urgente",
    "HIGH": "Alta",
    "MEDIUM": "Média",
    "LOW": "Baixa",
    "LOWEST": "Muito baixa"
};

const COLORS = {
    "HIGHEST": "red",
    "HIGH": "orange",
    "MEDIUM": "primary",
    "LOW": "green",
    "LOWEST": "default"
};


export function getPriorityLabel(priority) {
    return LABELS[priority] || "Não definido";
}

export function getChipColor(priority) {
    return COLORS[priority] || "default";
}