// 等待頁面載入完成
document.addEventListener('DOMContentLoaded', function() {
    console.log('緬甸翡翠場口網站已載入');
    
    // 導航欄滾動效果
    const navLinks = document.querySelectorAll('.nav-links a');
    const sections = document.querySelectorAll('section');
    
    // 平滑滾動
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                window.scrollTo({
                    top: targetSection.offsetTop - 80,
                    behavior: 'smooth'
                });
                
                // 更新活動連結
                navLinks.forEach(l => l.classList.remove('active'));
                this.classList.add('active');
            }
        });
    });
    
    // 滾動時更新導航欄
    window.addEventListener('scroll', function() {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (pageYOffset >= sectionTop - 100) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === '#' + current) {
                link.classList.add('active');
            }
        });
    });
    
    // 查看詳情按鈕
    const viewButtons = document.querySelectorAll('.btn-view');
    viewButtons.forEach(button => {
        button.addEventListener('click', function() {
            const productCard = this.closest('.product-card');
            const productName = productCard.querySelector('h3').textContent;
            const productDesc = productCard.querySelector('.product-desc').textContent;
            const productPrice = productCard.querySelector('.price').textContent;
            
            // 創建詳情彈窗
            const modal = document.createElement('div');
            modal.className = 'product-modal';
            modal.innerHTML = `
                <div class="modal-content">
                    <span class="close-modal">&times;</span>
                    <h3>${productName}</h3>
                    <p>${productDesc}</p>
                    <div class="modal-price">價格：${productPrice}</div>
                    <p class="modal-notice">本網站僅供產品展示，如需進一步了解購買請聯絡line客服ID：aqm122</p>
                </div>
            `;
            
            // 添加樣式
            const style = document.createElement('style');
            style.textContent = `
                .product-modal {
                    position: fixed;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    background: rgba(0,0,0,0.8);
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    z-index: 2000;
                }
                .modal-content {
                    background: white;
                    padding: 40px;
                    border-radius: 15px;
                    max-width: 500px;
                    width: 90%;
                    position: relative;
                }
                .close-modal {
                    position: absolute;
                    top: 15px;
                    right: 15px;
                    font-size: 2rem;
                    cursor: pointer;
                    color: #666;
                }
                .close-modal:hover {
                    color: #2d5c2d;
                }
                .modal-content h3 {
                    color: #2d5c2d;
                    margin-bottom: 15px;
                }
                .modal-price {
                    font-size: 1.5rem;
                    color: #2d5c2d;
                    font-weight: bold;
                    margin: 20px 0;
                }
                .modal-notice {
                    color: #666;
                    font-style: italic;
                    margin-top: 20px;
                    padding: 15px;
                    background: #f5f9f5;
                    border-radius: 8px;
                }
            `;
            
            document.head.appendChild(style);
            document.body.appendChild(modal);
            
            // 關閉彈窗
            modal.querySelector('.close-modal').addEventListener('click', function() {
                document.body.removeChild(modal);
                document.head.removeChild(style);
            });
            
            // 點擊背景關閉
            modal.addEventListener('click', function(e) {
                if (e.target === modal) {
                    document.body.removeChild(modal);
                    document.head.removeChild(style);
                }
            });
        });
    });
    
    // 添加滾動動畫
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // 觀察所有卡片
    document.querySelectorAll('.mine-card, .type-card, .product-card, .knowledge-card').forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        observer.observe(card);
    });
    
    // 翡翠小知識
    const jadeFacts = [
        "翡翠主要產於緬甸北部克欽邦，佔全球翡翠產量的90%以上。",
        "翡翠的『種』指的是質地細膩程度，『水』指的是透明度。",
        '「老坑」翡翠是指開採時間較早的礦區，通常品質較好。',
        "翡翠的顏色豐富多彩，以綠色為貴，還有紫、紅、黃、白等色。",
        "天然翡翠具有獨特的『翠性』，在光線下能看到閃爍的亮點。",
        "A貨翡翠指天然未經處理的翡翠，B貨、C貨是經過處理的。",
        "玻璃種是翡翠中的極品，透明度最高，價值也最高。",
        "翡翠的價值由種、水、色、工四個方面綜合決定。"
    ];
    
    // 隨機顯示小知識
    function showRandomFact() {
        const randomIndex = Math.floor(Math.random() * jadeFacts.length);
        console.log('💎 翡翠小知識：' + jadeFacts[randomIndex]);
    }
    
    // 每30秒顯示一個小知識
    showRandomFact();
    setInterval(showRandomFact, 30000);
    
    // 圖片載入優化
    const images = document.querySelectorAll('img');
    images.forEach(img => {
        img.loading = 'lazy'; // 延遲載入
        img.addEventListener('load', function() {
            this.style.opacity = '1';
        });
        img.style.opacity = '0';
        img.style.transition = 'opacity 0.5s';
    });
    
    // 添加頁面載入動畫
    setTimeout(() => {
        document.body.style.opacity = '1';
        document.body.style.transition = 'opacity 0.5s ease';
    }, 100);
    
    // 初始化
    document.body.style.opacity = '0';
});

// 滾動到頂部按鈕
function createScrollTopButton() {
    const button = document.createElement('button');
    button.innerHTML = '↑';
    button.className = 'scroll-top-btn';
    button.style.cssText = `
        position: fixed;
        bottom: 30px;
        right: 30px;
        width: 50px;
        height: 50px;
        background-color: #2d5c2d;
        color: white;
        border: none;
        border-radius: 50%;
        font-size: 1.5rem;
        cursor: pointer;
        opacity: 0;
        transition: opacity 0.3s, transform 0.3s;
        z-index: 1000;
        box-shadow: 0 4px 15px rgba(0,0,0,0.2);
    `;
    
    document.body.appendChild(button);
    
    // 顯示/隱藏按鈕
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            button.style.opacity = '1';
            button.style.transform = 'scale(1)';
        } else {
            button.style.opacity = '0';
            button.style.transform = 'scale(0)';
        }
    });
    
    // 點擊滾動到頂部
    button.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// 頁面完全載入後創建按鈕
window.addEventListener('load', createScrollTopButton);