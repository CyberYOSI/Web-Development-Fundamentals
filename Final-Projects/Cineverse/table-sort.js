let sortDirection = {};

function sortTable(columnIndex) {
    const table = document.getElementById('filmTable');
    const tbody = table.getElementsByTagName('tbody')[0];
    const rows = Array.from(tbody.getElementsByTagName('tr'));
    
    const isNumeric = columnIndex === 1 || columnIndex === 4 || columnIndex === 5;
    
    if (!sortDirection[columnIndex]) {
        sortDirection[columnIndex] = 'asc';
    } else {
        sortDirection[columnIndex] = sortDirection[columnIndex] === 'asc' ? 'desc' : 'asc';
    }
    
    rows.sort((a, b) => {
        const aValue = a.getElementsByTagName('td')[columnIndex].textContent.trim();
        const bValue = b.getElementsByTagName('td')[columnIndex].textContent.trim();
        
        let comparison = 0;
        
        if (isNumeric) {
            const aNum = parseFloat(aValue);
            const bNum = parseFloat(bValue);
            comparison = aNum - bNum;
        } else {
            comparison = aValue.localeCompare(bValue);
        }
        
        return sortDirection[columnIndex] === 'asc' ? comparison : -comparison;
    });
    
    rows.forEach(row => tbody.appendChild(row));
}
