# Service-level agreements

Targets are best-effort and visible to admins via a per-row "SLA" badge.

| Status                       | Target (hours) |
|------------------------------|----------------|
| Order Placed                 | 2              |
| Delivery Started             | 6              |
| Item Picked Up               | 4              |
| Service Started              | 24             |
| Issues Diagnosed             | 24             |
| Repair Fee (Pay Now)         | 48             |
| Payment Completed            | 4              |
| Repair Started               | 72             |
| Repair Completed             | 24             |
| Ready for Return/Pickup      | 24             |
| Return In Progress           | 24             |

These come from `src/utils/sla.ts > SLA_HOURS`. Update both when you
change a target.