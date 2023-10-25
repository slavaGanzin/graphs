const FlowParser = (script) => {
  const edges = [];
  const nodes = [];

  let y = 0;
  script.forEach(({
    id, kind, data, next,
  }) => {
    if (next) {
      next.map((target) => edges.push({
        id: `${id}-${target}`,
        source: String(id),
        target: String(target),
        sourceHandle: String(edges.filter((x) => x.source === String(id)).length),
      }));
    }

    const link = edges.find((x) => x.target === String(id));
    const siblings = edges.filter((x) => x.source === link?.source);

    let x = 0;
    if (siblings.length > 1) {
      const i = siblings.indexOf(link);
      if (i === 0) y += 1;
      x = 200 * i;
    } else {
      y += 1;
    }
    nodes.push({
      id: String(id), type: kind, data, position: { x, y: y * 150 },
    });
  });
  return { edges, nodes };
};

export default FlowParser;
