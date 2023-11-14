const RATING = {
    "EXCELLENT": "mdi-emoticon-outline",
    "VERY_GOOD": "mdi-emoticon-happy-outline",
    "GOOD": "mdi-emoticon-neutral-outline",
    "FAIR": "mdi-emoticon-sad-outline",
    "POOR": "mdi-emoticon-angry-outline"
}

export function getRatingIcon() {
    return Object.values(RATING);
}

export function getKeyIconByLabelIcon(labelIcon) {
    return Object.keys(RATING).find(key => RATING[key] === labelIcon) || labelIcon;
}
