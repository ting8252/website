// 導航欄滾動效果
window.addEventListener('scroll', function() {
    const nav = document.querySelector('.main-nav');
    if (window.scrollY > 50) {
        nav.style.background = 'rgba(255, 255, 255, 0.95)';
    } else {
        nav.style.background = 'rgba(255, 255, 255, 0.8)';
    }
});

// 手機版選單切換
document.querySelector('.menu-toggle').addEventListener('click', function() {
    const navLinks = document.querySelector('.nav-links');
    navLinks.style.display = navLinks.style.display === 'flex' ? 'none' : 'flex';
});

// 平滑滾動
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// 表單提交處理
document.querySelector('.contact-form').addEventListener('submit', function(e) {
    e.preventDefault();
    alert('感謝您的訊息！我們會盡快回覆您。');
    this.reset();
});

// Calendar functionality
document.addEventListener('DOMContentLoaded', function() {
    let currentDate = new Date();
    let currentMonth = currentDate.getMonth();
    let currentYear = currentDate.getFullYear();

    // 已預約的時段資料
    const bookedSlots = {
        '2024-03-15': ['09:00', '14:00', '19:00'],
        '2024-03-20': ['10:00', '15:00'],
        '2024-03-25': ['11:00', '16:00', '20:00'],
    };

    // 獲取模態框元素
    const modal = document.getElementById('timeSlotModal');
    const closeModal = document.querySelector('.close-modal');
    const selectedDateDisplay = document.getElementById('selectedDate');

    // 關閉模態框
    closeModal.onclick = function() {
        modal.style.display = 'none';
    }

    // 點擊模態框外部關閉
    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = 'none';
        }
    }

    // 更新日曆
    function updateCalendar() {
        const firstDay = new Date(currentYear, currentMonth, 1);
        const lastDay = new Date(currentYear, currentMonth + 1, 0);
        const startingDay = firstDay.getDay();
        const monthLength = lastDay.getDate();

        const monthDisplay = document.getElementById('monthDisplay');
        const calendarDays = document.getElementById('calendar-days');

        const monthNames = ["一月", "二月", "三月", "四月", "五月", "六月",
            "七月", "八月", "九月", "十月", "十一月", "十二月"
        ];

        monthDisplay.textContent = `${currentYear}年 ${monthNames[currentMonth]}`;
        calendarDays.innerHTML = '';

        // 添加空白天數
        for (let i = 0; i < startingDay; i++) {
            const emptyDay = document.createElement('div');
            emptyDay.className = 'calendar-day empty';
            calendarDays.appendChild(emptyDay);
        }

        // 添加月份天數
        for (let day = 1; day <= monthLength; day++) {
            const dayElement = document.createElement('div');
            dayElement.className = 'calendar-day';
            dayElement.textContent = day;

            const dateString = `${currentYear}-${String(currentMonth + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
            
            // 為每個日期添加點擊事件
            dayElement.onclick = function() {
                showTimeSlots(dateString);
            };

            calendarDays.appendChild(dayElement);
        }
    }

    // 顯示時段選擇
    function showTimeSlots(dateString) {
        selectedDateDisplay.textContent = `${dateString} 可預約時段`;
        
        // 重置所有時段狀態
        document.querySelectorAll('.slot').forEach(slot => {
            slot.className = 'slot';
        });

        // 標記已預約的時段
        if (bookedSlots[dateString]) {
            bookedSlots[dateString].forEach(time => {
                const slot = document.querySelector(`.slot[data-time="${time}"]`);
                if (slot) {
                    slot.className = 'slot booked';
                }
            });
        }

        // 顯示模態框
        modal.style.display = 'flex';
    }

    // 時段點擊事件
    document.querySelectorAll('.slot').forEach(slot => {
        slot.onclick = function() {
            if (!this.classList.contains('booked')) {
                const time = this.getAttribute('data-time');
                const date = selectedDateDisplay.textContent.split(' ')[0];
                alert(`您選擇的時間是：${date} ${time}`);
            }
        };
    });

    // 月份切換按鈕
    document.getElementById('prevMonth').onclick = function() {
        currentMonth--;
        if (currentMonth < 0) {
            currentMonth = 11;
            currentYear--;
        }
        updateCalendar();
    };

    document.getElementById('nextMonth').onclick = function() {
        currentMonth++;
        if (currentMonth > 11) {
            currentMonth = 0;
            currentYear++;
        }
        updateCalendar();
    };

    // 初始化日曆
    updateCalendar();
}); 