const url="https://docs.google.com/spreadsheets/d/e/2PACX-1vQ0h6p9JLALD3hhyWnZBIpFPTG4RGZTuMVt_DABwmjJsUpoEqyEfi9frogGvH7EYvZrvNRksvBvj89Z/pub?output=csv";
Papa.parse(url, {
    download:true,
    header:true,
    complete: function(results){
        const data = results.data;
        const container  = document.getElementById('table-container');
        if(data.length === 0){
            container.innerHTML = '<p>No data available.</p>';
            return;
        }
        let table = `<table class="min-w-full border border-gray-300 text-sm">
  <thead class="bg-gray-100">
    <tr>`;
Object.keys(data[0]).forEach(key => {
    table += `<th class="px-4 py-2 border font-semibold text-left">${key}</th>`;
});
table += `</tr></thead><tbody>`;

data.forEach(row => {
    table += `<tr class="hover:bg-gray-50">`;
    Object.values(row).forEach(value => {
        table += `<td class="px-4 py-2 border">${value}</td>`;
    });
    table += `</tr>`;
});

table += `</tbody></table>`;

        container.innerHTML = table;
    }
})