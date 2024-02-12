import { useState, useEffect } from "react";
import { motion } from "motion/react";
import { ArrowLeft, CheckCircle, Circle, Clock, Phone, MessageCircle, CreditCard, AlertTriangle } from "lucide-react";
import { Button } from "./ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Separator } from "./ui/separator";
import { ORDER_STATUS_FLOW, PHYSICAL_STATUS_FLOW, formatPrice } from "../../data/constants";
import { DEVICE_ISSUES } from "../../data/devices";
import type { RepairOrder } from "../../types";
import type { OrderStatus, DeliveryMethod } from "../../data/constants";

function formatFirestoreDate(val: any, options?: Intl.DateTimeFormatOptions): string {
  if (!val) return "";
  // Firestore Timestamp
  if (val?.toDate) return val.toDate().toLocaleDateString("en-NG", options);
  // Firestore seconds
  if (val?.seconds) return new Date(val.seconds * 1000).toLocaleDateString("en-NG", options);
  // ISO string or number
  const d = new Date(val);
  if (!isNaN(d.getTime())) return d.toLocaleDateString("en-NG", options);
  return "";
}

interface OrderTrackerProps {
  orders: RepairOrder[];
  onBack: () => void;
  onPayRepairFee: (order: RepairOrder) => void;
  settings: any;
}

export function OrderTracker({ orders, onBack, onPayRepairFee, settings }: OrderTrackerProps) {
  const [selectedOrder, setSelectedOrder] = useState<RepairOrder | null>(null);

  const getStatusFlow = (deliveryMethod: DeliveryMethod): OrderStatus[] => {
    if (deliveryMethod === "physical") return PHYSICAL_STATUS_FLOW;
    return ORDER_STATUS_FLOW.map(s => s.id);
  };

  const getStatusInfo = (status: OrderStatus) => {
    return ORDER_STATUS_FLOW.find(s => s.id === status);
  };

  const getStatusBadge = (status: OrderStatus): { variant: "default" | "secondary" | "destructive" | "outline"; className: string } => {
    if (status === "completed") return { variant: "secondary", className: "bg-green-100 text-green-700 border-green-200 dark:bg-green-950 dark:text-green-400 dark:border-green-800" };
    if (status === "cancelled") return { variant: "destructive", className: "" };
    if (status === "awaiting-repair-payment") return { variant: "secondary", className: "bg-orange-100 text-orange-700 border-orange-200 dark:bg-orange-950 dark:text-orange-400 dark:border-orange-800" };
    return { variant: "secondary", className: "bg-blue-100 text-blue-700 border-blue-200 dark:bg-blue-950 dark:text-blue-400 dark:border-blue-800" };
  };

  const getOverstayFees = (order: RepairOrder): number => {
    if (!settings?.overstayEnabled || order.deliveryMethod !== "physical") return 0;
    if (!["repair-completed", "ready-for-return", "completed"].includes(order.status)) return 0;
    const completedEntry = order.statusHistory.find(h => h.status === "repair-completed");
    if (!completedEntry) return 0;
    const completedDate = new Date(completedEntry.timestamp);
    const now = new Date();
    const daysDiff = Math.floor((now.getTime() - completedDate.getTime()) / (1000 * 60 * 60 * 24));
    const graceDays = settings?.overstayGraceDays || 3;
    if (daysDiff <= graceDays) return 0;
    return (daysDiff - graceDays) * (settings?.overstayFeePerDay || 300);
  };

  if (selectedOrder) {
    const statusFlow = getStatusFlow(selectedOrder.deliveryMethod);
    const currentIndex = statusFlow.indexOf(selectedOrder.status);
    const overstayFees = getOverstayFees(selectedOrder);

    return (
      <div className="min-h-screen bg-secondary/20 pt-20 pb-12">
        <div className="max-w-3xl mx-auto px-4">
          <Button variant="ghost" onClick={() => setSelectedOrder(null)} className="mb-6">
            <ArrowLeft className="w-4 h-4" /> Back to Orders
          </Button>

          <Card className="mb-6">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-xl">Order #{selectedOrder.id.slice(-8).toUpperCase()}</CardTitle>
                  <p className="text-sm text-muted-foreground mt-1">
                    Placed on {formatFirestoreDate(selectedOrder.createdAt, { dateStyle: "long" }) || "Recently"}
                  </p>
                </div>
                <Badge variant={getStatusBadge(selectedOrder.status).variant} className={getStatusBadge(selectedOrder.status).className}>
                  {getStatusInfo(selectedOrder.status)?.label}
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              {/* Device & Issue Info */}
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div>
                  <p className="text-xs text-muted-foreground">Device</p>
                  <p className="text-sm font-medium">{selectedOrder.deviceModel}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Delivery</p>
                  <p className="text-sm font-medium capitalize">{selectedOrder.deliveryMethod.replace("-", " ")}</p>
                </div>
                <div className="col-span-2">
                  <p className="text-xs text-muted-foreground">Issues</p>
                  <div className="flex flex-wrap gap-1 mt-1">
                    {selectedOrder.selectedIssues.map(id => {
                      const issue = DEVICE_ISSUES.find(i => i.id === id);
                      return <Badge key={id} variant="secondary" className="text-xs">{issue?.name || id}</Badge>;
                    })}
                  </div>
                </div>
              </div>

              <Separator className="mb-6" />

              {/* Status Timeline */}
              <h3 className="font-semibold mb-4">Order Progress</h3>
              <div className="space-y-4">
                {statusFlow.map((statusId, index) => {
                  const info = getStatusInfo(statusId);
                  const isCompleted = index < currentIndex;
                  const isCurrent = index === currentIndex;
                  const historyEntry = selectedOrder.statusHistory.find(h => h.status === statusId);

                  return (
                    <div key={statusId} className="flex gap-4">
                      <div className="flex flex-col items-center">
                        {isCompleted ? (
                          <CheckCircle className="w-6 h-6 text-green-600 shrink-0" />
                        ) : isCurrent ? (
                          <motion.div animate={{ scale: [1, 1.2, 1] }} transition={{ repeat: Infinity, duration: 2 }}>
                            <Clock className="w-6 h-6 text-primary shrink-0" />
                          </motion.div>
                        ) : (
                          <Circle className="w-6 h-6 text-muted-foreground/30 shrink-0" />
                        )}
                        {index < statusFlow.length - 1 && (
                          <div className={`w-0.5 flex-1 min-h-8 ${isCompleted ? "bg-green-600" : "bg-muted"}`} />
                        )}
                      </div>
                      <div className="pb-4">
                        <p className={`text-sm font-medium ${isCompleted ? "text-green-600" : isCurrent ? "text-foreground" : "text-muted-foreground"}`}>
                          {info?.label}
                        </p>
                        <p className="text-xs text-muted-foreground">{info?.description}</p>
                        {historyEntry && (
                          <p className="text-xs text-muted-foreground mt-1">
                            {new Date(historyEntry.timestamp).toLocaleString("en-NG")}
                            {historyEntry.note && ` — ${historyEntry.note}`}
                          </p>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Diagnosis & Repair Cost */}
              {selectedOrder.diagnosisNotes && (
                <>
                  <Separator className="my-6" />
                  <div>
                    <h3 className="font-semibold mb-2">Diagnosis Report</h3>
                    <p className="text-sm text-muted-foreground bg-secondary/50 p-3 rounded-lg">{selectedOrder.diagnosisNotes}</p>
                    {selectedOrder.estimatedRepairCost != null && (
                      <p className="mt-2 text-sm font-medium">Estimated Repair Cost: <span className="text-primary">{formatPrice(selectedOrder.estimatedRepairCost)}</span></p>
                    )}
                  </div>
                </>
              )}

              {/* Pay Repair Fee CTA */}
              {selectedOrder.status === "awaiting-repair-payment" && (
                <>
                  <Separator className="my-6" />
                  <div className="bg-orange-50 dark:bg-orange-950/30 border border-orange-200 dark:border-orange-800 rounded-xl p-4">
                    <div className="flex items-start gap-3">
                      <CreditCard className="w-5 h-5 text-orange-600 mt-0.5 shrink-0" />
                      <div className="flex-1">
                        <p className="text-sm font-medium text-orange-800 dark:text-orange-300">Repair Payment Required</p>
                        <p className="text-xs text-orange-600 dark:text-orange-400 mt-1">
                          Total repair cost: {formatPrice(selectedOrder.repairFee || selectedOrder.estimatedRepairCost || 0)}
                        </p>
                        <Button onClick={() => onPayRepairFee(selectedOrder)} className="mt-3" size="sm">
                          Pay Now
                        </Button>
                      </div>
                    </div>
                  </div>
                </>
              )}

              {/* Overstay Warning */}
              {overstayFees > 0 && (
                <>
                  <Separator className="my-6" />
                  <div className="bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-800 rounded-xl p-4">
                    <div className="flex items-start gap-3">
                      <AlertTriangle className="w-5 h-5 text-red-600 mt-0.5 shrink-0" />
                      <div>
                        <p className="text-sm font-medium text-red-800 dark:text-red-300">Overstay Fee Accrued</p>
                        <p className="text-xs text-red-600 dark:text-red-400 mt-1">
                          Your device has exceeded the {settings?.overstayGraceDays || 3}-day grace period.
                          Current overstay fee: {formatPrice(overstayFees)}
                        </p>
                      </div>
                    </div>
                  </div>
                </>
              )}

              {/* Payment Summary */}
              <Separator className="my-6" />
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Service Fee</span>
                  <span>{formatPrice(selectedOrder.serviceFee)}</span>
                </div>
                {selectedOrder.pickupFee > 0 && (
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Pickup Fee</span>
                    <span>{formatPrice(selectedOrder.pickupFee)}</span>
                  </div>
                )}
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Initial Payment</span>
                  <span className="font-medium">{formatPrice(selectedOrder.totalInitialPayment)}</span>
                </div>
                {selectedOrder.repairFee != null && (
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Repair Fee</span>
                    <span className="font-medium">{formatPrice(selectedOrder.repairFee)}</span>
                  </div>
                )}
                {overstayFees > 0 && (
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Overstay Fee</span>
                    <span className="text-red-600 font-medium">{formatPrice(overstayFees)}</span>
                  </div>
                )}
              </div>

              {/* Contact Support */}
              <Separator className="my-6" />
              <div className="flex gap-3">
                <Button variant="outline" size="sm" asChild>
                  <a href={`tel:${settings?.phone || "+2347044556735"}`}>
                    <Phone className="w-4 h-4" /> Call Support
                  </a>
                </Button>
                <Button variant="outline" size="sm" asChild>
                  <a href={settings?.whatsapp || "https://wa.me/hskahsjhsysjksksjs"} target="_blank" rel="noopener noreferrer">
                    <MessageCircle className="w-4 h-4" /> WhatsApp
                  </a>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-secondary/20 pt-20 pb-12">
      <div className="max-w-3xl mx-auto px-4">
        <Button variant="ghost" onClick={onBack} className="mb-6">
          <ArrowLeft className="w-4 h-4" /> Back to Home
        </Button>

        <h1 className="text-2xl font-bold mb-6">My Repair Orders</h1>

        {orders.length === 0 ? (
          <Card>
            <CardContent className="py-12 text-center">
              <Clock className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
              <p className="text-lg font-medium mb-2">No orders yet</p>
              <p className="text-sm text-muted-foreground">Your repair orders will appear here once you book a repair.</p>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-4">
            {orders.map(order => (
              <Card key={order.id} className="cursor-pointer hover:shadow-md transition-shadow" onClick={() => setSelectedOrder(order)}>
                <CardContent className="py-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">#{order.id.slice(-8).toUpperCase()}</p>
                      <p className="text-sm text-muted-foreground">{order.deviceModel}</p>
                      <p className="text-xs text-muted-foreground mt-1">
                        {formatFirestoreDate(order.createdAt, { dateStyle: "medium" }) || "Recently"}
                      </p>
                    </div>
                    <Badge variant={getStatusBadge(order.status).variant} className={getStatusBadge(order.status).className}>
                      {getStatusInfo(order.status)?.label}
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
