// 페이지 로드 시 실행
document.addEventListener('DOMContentLoaded', function() {
    // 스크롤 애니메이션
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // 애니메이션 대상 요소들
    const animateElements = document.querySelectorAll('.product-card, .news-item, .support-card, .stat, .about-text, .about-image');
    animateElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'all 0.6s ease-out';
        observer.observe(el);
    });

    // 헤더 스크롤 효과
    const header = document.querySelector('.header');
    let lastScrollY = window.scrollY;

    window.addEventListener('scroll', () => {
        const currentScrollY = window.scrollY;
        
        if (currentScrollY > 100) {
            header.style.background = 'rgba(255, 255, 255, 0.95)';
            header.style.backdropFilter = 'blur(20px)';
        } else {
            header.style.background = 'rgba(255, 255, 255, 0.98)';
            header.style.backdropFilter = 'blur(20px)';
        }

        lastScrollY = currentScrollY;
    });

    // 부드러운 스크롤
    const smoothScrollLinks = document.querySelectorAll('a[href^="#"]');
    smoothScrollLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = targetElement.offsetTop - headerHeight - 20;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // FAQ 아코디언
    const faqItems = document.querySelectorAll('.faq-item');
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        const answer = item.querySelector('.faq-answer');
        
        question.addEventListener('click', () => {
            const isActive = item.classList.contains('active');
            
            // 모든 FAQ 닫기
            faqItems.forEach(faq => {
                faq.classList.remove('active');
            });
            
            // 클릭된 항목만 열기
            if (!isActive) {
                item.classList.add('active');
            }
        });
    });

    // 제품 카드 호버 효과
    const productCards = document.querySelectorAll('.product-card');
    productCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-8px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });

    // 버튼 호버 효과
    const buttons = document.querySelectorAll('.btn-primary, .btn-secondary');
    buttons.forEach(button => {
        button.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-2px)';
        });
        
        button.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });

    // 네비게이션 활성 상태 관리
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('.main-nav a');
    
    navLinks.forEach(link => {
        const linkPage = link.getAttribute('href');
        if (linkPage === currentPage) {
            link.classList.add('active');
        }
    });

    // 드롭다운 메뉴 개선
    const dropdowns = document.querySelectorAll('.dropdown');
    dropdowns.forEach(dropdown => {
        const menu = dropdown.querySelector('.dropdown-menu');
        
        dropdown.addEventListener('mouseenter', () => {
            menu.style.opacity = '1';
            menu.style.visibility = 'visible';
            menu.style.transform = 'translateY(0)';
        });
        
        dropdown.addEventListener('mouseleave', () => {
            menu.style.opacity = '0';
            menu.style.visibility = 'hidden';
            menu.style.transform = 'translateY(-10px)';
        });
    });

    // 스크롤 진행률 표시
    const progressBar = document.createElement('div');
    progressBar.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 0%;
        height: 3px;
        background: linear-gradient(90deg, #1e40af, #3b82f6);
        z-index: 1001;
        transition: width 0.1s ease;
    `;
    document.body.appendChild(progressBar);

    window.addEventListener('scroll', () => {
        const scrollTop = window.scrollY;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrollPercent = (scrollTop / docHeight) * 100;
        progressBar.style.width = scrollPercent + '%';
    });

    // 로딩 애니메이션
    const loadingScreen = document.createElement('div');
    loadingScreen.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: #fff;
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 9999;
        transition: opacity 0.5s ease;
    `;
    
    const loadingContent = document.createElement('div');
    loadingContent.innerHTML = `
        <div style="text-align: center;">
            <div style="width: 50px; height: 50px; border: 3px solid #e2e8f0; border-top: 3px solid #1e40af; border-radius: 50%; animation: spin 1s linear infinite; margin: 0 auto 20px;"></div>
            <p style="color: #64748b; font-weight: 500;">로딩 중...</p>
        </div>
    `;
    
    loadingScreen.appendChild(loadingContent);
    document.body.appendChild(loadingScreen);

    // CSS 애니메이션 추가
    const style = document.createElement('style');
    style.textContent = `
        @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
        }
        
        @keyframes fadeInUp {
            from {
                opacity: 0;
                transform: translateY(30px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
        
        @keyframes pulse {
            0%, 100% { transform: scale(1); }
            50% { transform: scale(1.05); }
        }
        
        .hero-content h2 {
            animation: fadeInUp 1s ease-out;
        }
        
        .hero-content p {
            animation: fadeInUp 1s ease-out 0.2s both;
        }
        
        .hero-content .btn-primary {
            animation: fadeInUp 1s ease-out 0.4s both;
        }
        
        .product-card:hover .product-image {
            animation: pulse 0.6s ease-in-out;
        }
    `;
    document.head.appendChild(style);

    // 페이지 로드 완료 후 로딩 화면 제거
    window.addEventListener('load', () => {
        setTimeout(() => {
            loadingScreen.style.opacity = '0';
            setTimeout(() => {
                loadingScreen.remove();
            }, 500);
        }, 1000);
    });

    // 터치 디바이스 지원
    if ('ontouchstart' in window) {
        const touchElements = document.querySelectorAll('.product-card, .news-item, .support-card');
        touchElements.forEach(element => {
            element.addEventListener('touchstart', function() {
                this.style.transform = 'scale(0.98)';
            });
            
            element.addEventListener('touchend', function() {
                this.style.transform = 'scale(1)';
            });
        });
    }

    // 키보드 접근성 개선
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Tab') {
            document.body.classList.add('keyboard-navigation');
        }
    });

    document.addEventListener('mousedown', () => {
        document.body.classList.remove('keyboard-navigation');
    });

    // 성능 최적화를 위한 스로틀링
    function throttle(func, limit) {
        let inThrottle;
        return function() {
            const args = arguments;
            const context = this;
            if (!inThrottle) {
                func.apply(context, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        }
    }

    // 기술자료 탭 기능
    const tabButtons = document.querySelectorAll('.tab-btn');
    const dataItems = document.querySelectorAll('.data-item');
    
    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            const category = button.getAttribute('data-category');
            
            // 모든 탭 버튼 비활성화
            tabButtons.forEach(btn => btn.classList.remove('active'));
            
            // 클릭된 탭 버튼 활성화
            button.classList.add('active');
            
            // 데이터 아이템 필터링
            dataItems.forEach(item => {
                const itemCategory = item.getAttribute('data-category');
                
                if (category === 'all' || itemCategory === category) {
                    item.style.display = 'flex';
                    item.style.opacity = '0';
                    item.style.transform = 'translateY(20px)';
                    
                    setTimeout(() => {
                        item.style.transition = 'all 0.3s ease';
                        item.style.opacity = '1';
                        item.style.transform = 'translateY(0)';
                    }, 100);
                } else {
                    item.style.display = 'none';
                }
            });
        });
    });

    // 스크롤 이벤트 최적화
    const optimizedScrollHandler = throttle(() => {
        const currentScrollY = window.scrollY;
        
        if (currentScrollY > 100) {
            header.style.background = 'rgba(255, 255, 255, 0.95)';
        } else {
            header.style.background = 'rgba(255, 255, 255, 0.98)';
        }
    }, 16);

    window.addEventListener('scroll', optimizedScrollHandler);
});

// 폼 제출 처리
function handleFormSubmit(formId) {
    const form = document.getElementById(formId);
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // 폼 데이터 수집
            const formData = new FormData(this);
            const submitButton = this.querySelector('button[type="submit"]');
            const originalText = submitButton.textContent;
            
            // 버튼 상태 변경
            submitButton.textContent = '전송 중...';
            submitButton.disabled = true;
            
            // 폼 데이터를 객체로 변환
            const inquiryData = {
                name: formData.get('name') || formData.get('customer-name') || '',
                company: formData.get('company') || formData.get('customer-company') || '',
                email: formData.get('email') || formData.get('customer-email') || '',
                phone: formData.get('phone') || formData.get('customer-phone') || '',
                subject: formData.get('subject') || formData.get('inquiry-subject') || '',
                message: formData.get('message') || formData.get('inquiry-message') || '',
                type: formData.get('type') || formData.get('inquiry-type') || '',
                product: formData.get('product') || ''
            };
            
            // 바로 mailto 링크 사용
            sendEmailViaMailto(inquiryData);
            
            // 버튼 상태 복원
            setTimeout(() => {
                submitButton.textContent = originalText;
                submitButton.disabled = false;
            }, 2000);
        });
    }
}

// mailto 링크로 이메일 전송
function sendEmailViaMailto(data) {
    // 이메일 제목 구성
    let emailSubject = '한국엠이에스 문의사항';
    if (data.subject) {
        emailSubject += ` - ${data.subject}`;
    }
    
    // 이메일 본문 구성
    let emailBody = `안녕하세요, 한국엠이에스입니다.\n\n`;
    emailBody += `다음과 같은 문의사항이 접수되었습니다:\n\n`;
    emailBody += `이름: ${data.name}\n`;
    emailBody += `회사명: ${data.company}\n`;
    emailBody += `이메일: ${data.email}\n`;
    if (data.phone) emailBody += `연락처: ${data.phone}\n`;
    if (data.type) emailBody += `문의 유형: ${data.type}\n`;
    if (data.product) emailBody += `관련 제품: ${data.product}\n`;
    emailBody += `제목: ${data.subject}\n\n`;
    emailBody += `문의내용:\n${data.message}\n\n`;
    emailBody += `이 문의사항에 대해 빠른 시일 내에 답변드리겠습니다.\n\n`;
    emailBody += `감사합니다.\n한국엠이에스`;
    
    // mailto 링크 생성
    const mailtoLink = `mailto:kmes.kmkim@gmail.com?subject=${encodeURIComponent(emailSubject)}&body=${encodeURIComponent(emailBody)}`;
    
    // 이메일 클라이언트 열기
    window.location.href = mailtoLink;
    
    // 성공 메시지 표시
    setTimeout(() => {
        alert('문의가 성공적으로 전송되었습니다. 빠른 시일 내에 연락드리겠습니다.');
    }, 1000);
}

// 페이지별 초기화
if (document.querySelector('.tech-form')) {
    handleFormSubmit('techForm');
}

if (document.querySelector('.customer-form')) {
    handleFormSubmit('customerForm');
} 