import Swal from "sweetalert2";

// رسالة النجاح عند إضافة منتج للسلة
export function showAddToCartSuccess() {
  return Swal.fire({
    title: "نجاح!",
    text: "تمت إضافة المنتج إلى السلة",
    icon: "success",
    timer: 2000,
    showConfirmButton: false,
  });
}

// رسالة عامة للنجاح
export function showSuccessMessage(message, title = "نجاح!") {
  return Swal.fire({
    title,
    text: message,
    icon: "success",
    timer: 2000,
    showConfirmButton: false,
  });
}

// رسالة خطأ
export function showErrorMessage(message, title = "خطأ") {
  return Swal.fire({
    title,
    text: message,
    icon: "error",
    timer: 2000,
    showConfirmButton: false,
  });
}
