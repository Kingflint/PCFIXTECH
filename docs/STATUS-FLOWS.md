# Order status flows

The full standard flow lives in `src/data/constants.ts > ORDER_STATUS_FLOW`.

## Standard pickup-and-return flow

1. Order Placed
2. Delivery Started
3. Item Picked Up
4. Service Started
5. Issues Diagnosed
6. Repair Fee (Pay Now)
7. Payment Completed
8. Repair Started
9. Repair Completed
10. Ready for Return/Pickup
11. Return In Progress
12. Completed

## Physical-only flow (`PHYSICAL_STATUS_FLOW`)

1. Order Placed
2. Service Started
3. Issues Diagnosed
4. Repair Fee (Pay Now)
5. Payment Completed
6. Repair Started
7. Repair Completed
8. Completed

## Store delivery flow

`STORE_DELIVERY_FLOW`: Item Purchased -> Delivery Started -> Delivered -> Purchase Completed.

## Store pickup flow

`STORE_PICKUP_FLOW`: Item Purchased -> Waiting for Pickup -> Item Picked Up -> Purchase Completed.