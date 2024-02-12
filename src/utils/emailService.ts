import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../firebase/config";

interface EmailData {
  to: string;
  subject: string;
  html: string;
}

async function sendEmail(data: EmailData): Promise<void> {
  try {
    await addDoc(collection(db, "mail"), {
      to: data.to,
      message: { subject: data.subject, html: data.html },
    });
    await addDoc(collection(db, "emailLogs"), {
      to: data.to,
      subject: data.subject,
      status: "queued",
      createdAt: serverTimestamp(),
    });
  } catch (error) {
    console.error("Failed to queue email:", error);
  }
}

export async function sendOrderConfirmation(email: string, orderId: string, deviceModel: string, totalPaid: number): Promise<void> {
  await sendEmail({
    to: email,
    subject: `iFixit - Order Confirmation #${orderId.slice(-8).toUpperCase()}`,
    html: `
      <div style="font-family:Inter,sans-serif;max-width:600px;margin:0 auto;padding:20px">
        <h2 style="color:#0071e3">Order Confirmed!</h2>
        <p>Your repair order has been received.</p>
        <table style="width:100%;border-collapse:collapse;margin:16px 0">
          <tr><td style="padding:8px;border-bottom:1px solid #eee"><strong>Order ID</strong></td><td style="padding:8px;border-bottom:1px solid #eee">#${orderId.slice(-8).toUpperCase()}</td></tr>
          <tr><td style="padding:8px;border-bottom:1px solid #eee"><strong>Device</strong></td><td style="padding:8px;border-bottom:1px solid #eee">${deviceModel}</td></tr>
          <tr><td style="padding:8px"><strong>Paid</strong></td><td style="padding:8px">₦${totalPaid.toLocaleString()}</td></tr>
        </table>
        <p style="color:#666;font-size:14px">We'll update you as your repair progresses. Track your order anytime on our website.</p>
        <p style="color:#999;font-size:12px">— iFixit Team</p>
      </div>`,
  });
}

export async function sendStatusUpdate(email: string, orderId: string, statusLabel: string, note?: string): Promise<void> {
  await sendEmail({
    to: email,
    subject: `iFixit - Order #${orderId.slice(-8).toUpperCase()} Update: ${statusLabel}`,
    html: `
      <div style="font-family:Inter,sans-serif;max-width:600px;margin:0 auto;padding:20px">
        <h2 style="color:#0071e3">Order Status Update</h2>
        <p>Your order <strong>#${orderId.slice(-8).toUpperCase()}</strong> has been updated to:</p>
        <div style="background:#f0f7ff;padding:16px;border-radius:8px;margin:16px 0;text-align:center">
          <h3 style="color:#0071e3;margin:0">${statusLabel}</h3>
        </div>
        ${note ? `<p style="color:#666;font-size:14px">${note}</p>` : ""}
        <p style="color:#999;font-size:12px">— iFixit Team</p>
      </div>`,
  });
}

export async function sendDiagnosisReport(email: string, orderId: string, diagnosis: string, estimatedCost: number): Promise<void> {
  await sendEmail({
    to: email,
    subject: `iFixit - Diagnosis Ready for Order #${orderId.slice(-8).toUpperCase()}`,
    html: `
      <div style="font-family:Inter,sans-serif;max-width:600px;margin:0 auto;padding:20px">
        <h2 style="color:#0071e3">Diagnosis Complete</h2>
        <p>We've completed the diagnosis for order <strong>#${orderId.slice(-8).toUpperCase()}</strong>.</p>
        <div style="background:#f9f9f9;padding:16px;border-radius:8px;margin:16px 0">
          <h4 style="margin:0 0 8px">Diagnosis Notes</h4>
          <p style="margin:0;color:#666">${diagnosis}</p>
        </div>
        <p><strong>Estimated Repair Cost:</strong> ₦${estimatedCost.toLocaleString()}</p>
        <p style="color:#666;font-size:14px">Please log in to approve the repair and make payment.</p>
        <p style="color:#999;font-size:12px">— iFixit Team</p>
      </div>`,
  });
}
