def analyze_feedback(comment: str, rating: int):
    text = comment.lower()

    categories = []

    keyword_map = {
        "too salty": ["salty", "too salty", "salt"],
        "undercooked": ["undercooked", "raw", "not cooked"],
        "too oily": ["oily", "too oily", "oil"],
        "cold food": ["cold", "not hot", "chilled"],
        "portion small": ["small portion", "less quantity", "not enough"],
        "good taste": ["tasty", "good", "nice", "loved", "amazing"],
    }

    for category, keywords in keyword_map.items():
        if any(word in text for word in keywords):
            categories.append(category)

    if rating >= 4:
        sentiment = "positive"
    elif rating == 3:
        sentiment = "neutral"
    else:
        sentiment = "negative"

    if rating <= 2 or len(categories) >= 2:
        severity = "high"
    elif rating == 3:
        severity = "medium"
    else:
        severity = "low"

    return {
        "sentiment": sentiment,
        "categories": categories if categories else ["general"],
        "severity": severity
    }