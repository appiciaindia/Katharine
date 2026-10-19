function readPair(item, primaryKey, secondaryKey) {
  return {
    primary: String(item?.[primaryKey] || "").trim(),
    secondary: String(item?.[secondaryKey] || "").trim(),
  };
}

// Older admin saves could split "heading | description" into two rows.
// Join those rows when loading so they render correctly and can be resaved cleanly.
function normalizeContentRows(items, primaryKey, secondaryKey) {
  if (!Array.isArray(items)) return [];

  const rows = [];
  for (let index = 0; index < items.length; index += 1) {
    const current = readPair(items[index], primaryKey, secondaryKey);
    const next = items[index + 1] ? readPair(items[index + 1], primaryKey, secondaryKey) : null;

    if (!current.secondary && next?.primary && !next.secondary) {
      current.secondary = next.primary;
      index += 1;
    }

    if (current.primary || current.secondary) {
      rows.push({ [primaryKey]: current.primary, [secondaryKey]: current.secondary });
    }
  }

  return rows;
}

export function normalizeWhyPoints(items) {
  return normalizeContentRows(items, "title", "description");
}

export function normalizePageFaqs(items) {
  return normalizeContentRows(items, "question", "answer");
}
