export function uniqueRandoms(min, max, count) {
  if (min > max) throw new Error("min 必须 <= max");
  const rangeSize = max - min + 1;
  if (count > rangeSize)
    throw new Error(
      `无法生成 ${count} 个不重复随机数，因为范围大小只有 ${rangeSize}`
    );

  const arr = Array.from({ length: rangeSize }, (_, i) => min + i);

  for (let i = rangeSize - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }

  return arr.slice(0, count);
}

export function $(domString) {
  const container = document.createElement("div");
  container.innerHTML = domString;
  return container;
}
