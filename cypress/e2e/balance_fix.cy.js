# Calculate total assessment (including Entrance Fee and other valid items)
float_precision = cint(frappe.db.get_default("float_precision")) or 2

total_amount = 0.0
for fee in matri.table_22:
    if fee.amount:
        total_amount += fee.amount  # this includes Entrance Fee dynamically

grand_total = flt(total_amount, float_precision) + charges - excess

# RMI discount logic
if 'RMI' in frappe.get_value("School WC", None, "school_code"):
    if matri.tuition_discount_percent:
        grand_total = grand_total * (matri.tuition_discount_percent / 100)

grand_total = round(grand_total, 2)

# Apply debit adjustments
debit_adj = frappe.db.sql("""
    SELECT SUM(total_amount_paid) FROM `tabLedger Adjustment`
    WHERE student_name=%s AND school_year=%s AND semester=%s AND account='Debit'
""", (matri.student, filters.get("school_year"), filters.get("semester")))
if debit_adj and debit_adj[0][0]:
    grand_total += float(debit_adj[0][0])

_data.update({"asses": round(grand_total, 2)})
