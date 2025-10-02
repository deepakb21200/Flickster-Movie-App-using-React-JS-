export function addMediaType(arr, type) {
  const result = [];
  arr.forEach(item => {
    result.push({ ...item, media_type: type });
  });
  return result;
}
