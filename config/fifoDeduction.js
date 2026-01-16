import BatchStock from "../model/batchStock.model.js";

export const fifoDeduct = async (item, store, qty) => {
  const batches = await BatchStock.find({
    item,
    store,
    quantity: { $gt: 0 },
  }).sort({ receivedDate: 1 }); // FIFO

  let remaining = qty;

  for (const batch of batches) {
    if (remaining <= 0) break;

    const deduct = Math.min(batch.quantity, remaining);

    batch.quantity -= deduct;
    remaining -= deduct;

    await batch.save();
  }

  if (remaining > 0) {
    throw new Error("Insufficient batch stock");
  }
};
