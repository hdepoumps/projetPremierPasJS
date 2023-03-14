const url = new URL(window.location.href);
const id = url.searchParams.get("id");
console.log("id")
document.getElementById("orderId").innerText = id;