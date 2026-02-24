// components/tags/TagCloud.jsx
// Nube de tags con tamaño proporcional al count.
// Props:
//   tags — array de { slug, label, count, category }

import { THEME } from "@/styles/theme";
import { TAG_CATEGORIES } from "@/lib/tags";

export default function TagCloud({ tags }) {
  const maxCount = Math.max(...tags.map((t) => t.count), 1);

  function getFontSize(count) {
    const min = 12, max = 22;
    return min + ((count / maxCount) * (max - min));
  }

  function getCategoryColor(category) {
    return TAG_CATEGORIES[category]?.color || THEME.colors.muted;
  }

  return (
    <div style={s.cloud}>
      {tags.map((tag) => (
        <a
          key={tag.slug}
          href={`/tags/${tag.slug}`}
          title={`${tag.count} items`}
          style={{
            ...s.tag,
            fontSize:   `${getFontSize(tag.count)}px`,
            color:       getCategoryColor(tag.category),
            borderColor: getCategoryColor(tag.category) + "40",
          }}
        >
          {tag.label}
        </a>
      ))}
    </div>
  );
}

const s = {
  cloud: {
    display:    "flex",
    flexWrap:   "wrap",
    gap:        "10px",
    alignItems: "center",
  },
  tag: {
    padding:      "4px 12px",
    borderRadius: THEME.radius.full,
    border:       "1.5px solid",
    fontWeight:   600,
    transition:   "all 0.15s",
    lineHeight:   1.4,
  },
};
