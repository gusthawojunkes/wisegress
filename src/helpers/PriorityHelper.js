const LABELS = {
    "HIGHEST": "Urgente",
    "HIGH": "Alta",
    "MEDIUM": "Média",
    "LOW": "Baixa",
    "LOWEST": "Baixíssima"
};

export const COLORS = {
    "HIGHEST": "red",
    "HIGH": "orange",
    "MEDIUM": "primary",
    "LOW": "green",
    "LOWEST": "default"
};


export function getPriorityLabel(priority) {
    return LABELS[priority] || "Não definido";
}

export function getPriorityCode(priorityLabel){
    return Object.keys(LABELS).find(key => LABELS[key] === priorityLabel) || priorityLabel;

}

export function getChipColor(priority) {
    return COLORS[priority] || "default";
}

export function getDisplayLabels() {
    return Object.values(LABELS);
}
