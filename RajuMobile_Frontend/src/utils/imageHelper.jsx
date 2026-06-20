const API = "VITE_API_URL";

export function getProductImage(product) {
  if (product?.image) {
    return product.image.startsWith("http")
      ? product.image
      : `${API}${product.image}`;
  }

  const img = product?.images?.[0]?.image;

  if (!img) return "/no-image.png";

  return img.startsWith("http")
    ? img
    : `${API}${img}`;
}

export function getAllImages(product) {
  return (product?.images || []).map((img) => {
    const src = img.image || "";
    return src.startsWith("http") ? src : `${API}${src}`;
  });
}