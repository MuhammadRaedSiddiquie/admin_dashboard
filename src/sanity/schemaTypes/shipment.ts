export default {
    name: "shipment",
    type: "document",
    title: "Shipment",
    fields: [
        { name: "userId", type: "string", title: "User ID" },
        { name: "orderId", type: "string", title: "Order ID" },
        { name: "fullName", type: "string", title: "Full Name" },
        { name: "address", type: "string", title: "Address" },
        { name: "city", type: "string", title: "City" },
        { name: "postalCode", type: "string", title: "Postal Code" },
        { name: "country", type: "string", title: "Country" },
        { name: "phone", type: "string", title: "Phone Number" },
        { name: "status", type: "string", title: "Status", options: { list: ["Pending", "Shipped", "Delivered"] } },
    ],
};
