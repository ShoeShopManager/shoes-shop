export const formatVNCurrency = (value) => {
    return value.toLocaleString("vi-VN", {
        style: "currency",
        currency: "VND",
    });
};
