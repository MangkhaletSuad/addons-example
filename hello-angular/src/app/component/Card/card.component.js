// รับข้อมูล JSON จาก JSON Server
function fetchData(callback) {
    console.log('Call back');
    fetch('http://localhost:3000/data') // แก้ไข URL ตามที่ JSON Server รัน
        .then(response => response.json())
        .then(data => callback(data))
        .catch(error => console.error('เกิดข้อผิดพลาดในการดึงข้อมูล:', error));
}

// กรองข้อมูลตามช่วงวันที่
function filterData() {
    console.log('Filter');
    const min = document.getElementById('min').value;
    const max = document.getElementById('max').value;

    if (!min || !max) {
        alert('โปรดระบุวันที่เริ่มต้นและสิ้นสุด');
        return;
    }

    fetchData(data => {
        const filteredData = data.filter(item => {
            const itemDate = new Date(item.date);
            return itemDate >= new Date(min) && itemDate <= new Date(max);
        });

        displayFilteredData(filteredData);
    });
}

// แสดงข้อมูลที่ถูกกรอง
function displayFilteredData(data) {
    console.log('Mindate and Maxdate');
    const filteredDataDiv = document.getElementById('filteredData');
    filteredDataDiv.innerHTML = '';

    if (data.length === 0) {
        filteredDataDiv.innerHTML = '<p>ไม่พบข้อมูลที่ตรงกับเงื่อนไข</p>';
        return;
    }

    const ul = document.createElement('ul');
    data.forEach(item => {
        const li = document.createElement('li');
        li.textContent = `วันที่: ${item.date}, ข้อมูล: ${item.data}`;
        ul.appendChild(li);
    });

    filteredDataDiv.appendChild(ul);
}