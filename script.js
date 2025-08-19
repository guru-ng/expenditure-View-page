const url="https://docs.google.com/spreadsheets/d/e/2PACX-1vQ0h6p9JLALD3hhyWnZBIpFPTG4RGZTuMVt_DABwmjJsUpoEqyEfi9frogGvH7EYvZrvNRksvBvj89Z/pub?output=csv";
document.addEventListener('DOMContentLoaded', function(){
  Papa.parse(url, {
    download: true,
    header: true,
    complete: function(results) {
      const data = results.data;
      const container = document.getElementById('expenditure-data');
      const dropdown = document.getElementById('monthFilter');
  
      if (data.length === 0) {
        container.innerHTML = '<p>No data available.</p>';
        return;
      }
  
      function renderTable(filteredData) {
        let table = `<div class="overflow-x-auto">
          <table class="min-w-full border border-gray-300 text-sm rounded-lg shadow-md">
          <thead class="bg-blue-100 text-gray-700">
            <tr>`;
        Object.keys(filteredData[0]).forEach(key => {
          table += `<th class="px-4 py-2 border font-semibold text-left">${key}</th>`;
        });
        table += `</tr></thead><tbody>`;
  
        filteredData.forEach((row, index) => {
          const rowClass = index % 2 === 0 ? 'bg-white' : 'bg-gray-50';
          table += `<tr class="${rowClass} hover:bg-blue-50 transition">`;
          Object.values(row).forEach(value => {
            table += `<td class="px-4 py-2 border">${value}</td>`;
          });
          table += `</tr>`;
        });
  
        table += `</tbody></table></div>`;
        container.innerHTML = table;
      }
  
      // Initial render
      renderTable(data);
  
      // Filter on dropdown change
      dropdown.addEventListener('change', () => {
        const selectedMonth = dropdown.value;
        const filtered = selectedMonth
          ? data.filter(row => row.Month === selectedMonth)
          : data;
        renderTable(filtered);
      });
    }
  });
})