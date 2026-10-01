function escapeCsvValue(value) {
  if (value === null || value === undefined) {
    return "";
  }

  const stringValue = String(value);

  return `"${stringValue.replace(/"/g, '""')}"`;
}


function downloadCsv(
  filename,
  headers,
  rows
) {
  const csvRows = [
    headers.map(escapeCsvValue).join(","),
    ...rows.map((row) =>
      row.map(escapeCsvValue).join(",")
    ),
  ];

  const csvContent = csvRows.join("\n");

  const blob = new Blob(
    [csvContent],
    {
      type: "text/csv;charset=utf-8;",
    }
  );

  const url = URL.createObjectURL(blob);

  const link = document.createElement("a");

  link.href = url;
  link.download = filename;

  document.body.appendChild(link);

  link.click();

  document.body.removeChild(link);

  URL.revokeObjectURL(url);
}


// =====================================================
// EXPORT REPORT AS CSV
// =====================================================

export function exportReportAsCSV(
  reportId,
  data
) {
  if (!data) {
    throw new Error(
      "Report data is not available."
    );
  }


  // ===================================================
  // PAYMENT REPORT
  // ===================================================

  if (reportId === "payments") {
    const headers = [
      "Transaction ID",
      "Guest Name",
      "Amount",
      "Method",
      "Status",
      "Payment Date",
    ];

    const rows = (
      data.payments || []
    ).map((item) => [
      item.transaction_id,
      item.guest_name,
      item.amount,
      item.method,
      item.status,
      item.payment_date,
    ]);

    downloadCsv(
      "payment-report.csv",
      headers,
      rows
    );

    return;
  }


  // ===================================================
  // GIFT REPORT
  // ===================================================

  if (reportId === "gifts") {
    const headers = [
      "Guest Name",
      "Gift",
      "Gift Type",
      "Amount",
      "Gift Date",
    ];

    const rows = (
      data.gifts || []
    ).map((item) => [
      item.guest_name,
      item.gift,
      item.gift_type,
      item.amount,
      item.gift_date,
    ]);

    downloadCsv(
      "gift-report.csv",
      headers,
      rows
    );

    return;
  }


  // ===================================================
  // GUEST REPORT
  // ===================================================

  if (reportId === "guests") {
    const headers = [
      "Guest Name",
      "Phone",
      "Email",
      "Relation",
      "RSVP Status",
      "Gift Amount",
    ];

    const rows = (
      data.guests || []
    ).map((item) => [
      item.guest_name,
      item.phone,
      item.email,
      item.relation,
      item.rsvp_status,
      item.gift_amount,
    ]);

    downloadCsv(
      "guest-report.csv",
      headers,
      rows
    );

    return;
  }


  // ===================================================
  // WEDDING SUMMARY
  // ===================================================

  if (reportId === "summary") {
    const headers = [
      "Field",
      "Value",
    ];

    const rows = [
      [
        "First Partner",
        data.first_partner,
      ],
      [
        "Second Partner",
        data.second_partner,
      ],
      [
        "Wedding Date",
        data.wedding_date,
      ],
      [
        "Wedding Venue",
        data.wedding_venue,
      ],
      [
        "Total Guests",
        data.total_guests,
      ],
      [
        "Total Gifts",
        data.total_gifts,
      ],
      [
        "Online Gifts",
        data.online_gifts,
      ],
      [
        "Physical Gifts",
        data.physical_gifts,
      ],
      [
        "Total Gift Amount",
        data.total_gift_amount,
      ],
      [
        "Total Payments",
        data.total_payments,
      ],
      [
        "Total Payment Amount",
        data.total_payment_amount,
      ],
    ];

    downloadCsv(
      "wedding-summary.csv",
      headers,
      rows
    );

    return;
  }

  throw new Error(
    "Unknown report type."
  );
}