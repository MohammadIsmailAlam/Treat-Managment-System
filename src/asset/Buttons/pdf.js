import jsPDF from "jspdf";
import "jspdf-autotable";

export const handlePDFDownload = (id, data) => {
  // Create a new jsPDF instance
  const doc = new jsPDF();

  // Add content to the document
  Object.entries(data).forEach(([key, value]) => {
    if (key === id) {
      doc.text(`Treat Caption: ${value.caption}`, 10, 10);

      const tableData = [];
      tableData.push(["Name", "Price", "Ordered By", "Total"]);

      value.manualMenuList.forEach((item) => {
        const selectedBy = (item.selectedBy ?? [])
          .map((person) => person.name)
          .join(", ");
        const selectedCount = (item.selectedBy ?? []).length;

        tableData.push([item.name, item.price, selectedBy, selectedCount]);
      });

      doc.autoTable({
        head: tableData.slice(0, 1),
        body: tableData.slice(1),
        startY: 20,
      });
    }
  });

  // Download the PDF document
  doc.save(`${data[id].caption}.pdf`);
};
