const API = "http://127.0.0.1:8000";

export function getProductImage(product) {
  const img = product?.images?.[0]?.image;
  if (!img) return "";
  return img.startsWith("http") ? img : `${API}${img}`;
}

export function getAllImages(product) {
  return (product?.images || []).map((img) => {
    const src = img.image || "";
    return src.startsWith("http") ? src : `${API}${src}`;
  });
}