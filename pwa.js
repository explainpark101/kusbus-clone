const INSTALL_DISMISS_KEY = 'pwa-install-dismissed-2026-1';

// Service Worker 등록
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/service-worker.js')
            .then((registration) => {
                console.log('Service Worker 등록 성공:', registration.scope);

                // 이미 대기 중인 새 서비스 워커가 있으면 업데이트 안내 표시
                if (registration.waiting && navigator.serviceWorker.controller) {
                    showUpdateToast();
                }

                // 새 서비스 워커가 설치되었을 때 감지
                registration.addEventListener('updatefound', () => {
                    const newWorker = registration.installing;
                    if (!newWorker) return;

                    newWorker.addEventListener('statechange', () => {
                        if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
                            showUpdateToast();
                        }
                    });
                });
            })
            .catch((error) => {
                console.log('Service Worker 등록 실패:', error);
            });
    });
}

// 이미지 모달 제어
const imageModal = document.getElementById('imageModal');
const openImageModalBtn = document.getElementById('openImageModal');
const closeImageModalBtn = document.getElementById('closeImageModal');

openImageModalBtn.addEventListener('click', () => {
    imageModal.showModal();
});

closeImageModalBtn.addEventListener('click', () => {
    imageModal.close();
});

// 모달 배경 클릭 시 닫기
imageModal.addEventListener('click', (event) => {
    if (event.target === imageModal) {
        imageModal.close();
    }
});

// ESC 키로 닫기
imageModal.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
        imageModal.close();
    }
});

// PWA 설치 / 업데이트 토스트
let deferredPrompt;
const installToast = document.getElementById('installToast');
const installBtn = document.getElementById('installBtn');
const dismissInstallBtn = document.getElementById('dismissInstallBtn');

const updateToast = document.getElementById('updateToast');
const reloadBtn = document.getElementById('reloadBtn');
const dismissUpdateBtn = document.getElementById('dismissUpdateBtn');

// 이미 설치되어 있는지 확인
function isInstalled() {
    return window.matchMedia('(display-mode: standalone)').matches || 
           window.navigator.standalone === true ||
           document.referrer.includes('android-app://');
}

// 로컬 스토리지에서 설치 토스트 거부 여부 확인 (학기/버전별 키)
function wasInstallDismissed() {
    return localStorage.getItem(INSTALL_DISMISS_KEY) === 'true';
}

// 설치 토스트 표시
function showInstallToast() {
    if (!isInstalled() && !wasInstallDismissed() && deferredPrompt) {
        installToast.style.display = 'block';
        setTimeout(() => {
            installToast.classList.add('show');
        }, 100);
    }
}

// 설치 토스트 숨기기
function hideInstallToast() {
    installToast.classList.remove('show');
    setTimeout(() => {
        installToast.style.display = 'none';
    }, 300);
}

// 업데이트 토스트 표시
function showUpdateToast() {
    updateToast.style.display = 'block';
    setTimeout(() => {
        updateToast.classList.add('show');
    }, 100);
}

// 업데이트 토스트 숨기기
function hideUpdateToast() {
    updateToast.classList.remove('show');
    setTimeout(() => {
        updateToast.style.display = 'none';
    }, 300);
}

// beforeinstallprompt 이벤트 감지
window.addEventListener('beforeinstallprompt', (e) => {
    // 기본 프롬프트 방지
    e.preventDefault();
    // 이벤트 저장
    deferredPrompt = e;
    // 3초 후 토스트 표시
    setTimeout(showInstallToast, 3000);
});

// 설치 버튼 클릭
installBtn.addEventListener('click', async () => {
    if (!deferredPrompt) {
        return;
    }
    
    // 설치 프롬프트 표시
    deferredPrompt.prompt();
    
    // 사용자 선택 대기
    const { outcome } = await deferredPrompt.userChoice;
    
    if (outcome === 'accepted') {
        console.log('사용자가 PWA 설치를 승인했습니다');
    } else {
        console.log('사용자가 PWA 설치를 거부했습니다');
    }
    
    // 이벤트 초기화
    deferredPrompt = null;
    hideInstallToast();
});

// 설치 토스트 닫기 버튼 클릭
dismissInstallBtn.addEventListener('click', () => {
    localStorage.setItem(INSTALL_DISMISS_KEY, 'true');
    hideInstallToast();
});

// 업데이트 토스트 버튼들
reloadBtn.addEventListener('click', () => {
    hideUpdateToast();
    window.location.reload();
});

dismissUpdateBtn.addEventListener('click', () => {
    hideUpdateToast();
});

// 설치 완료 감지
window.addEventListener('appinstalled', () => {
    console.log('PWA가 설치되었습니다');
    deferredPrompt = null;
    hideInstallToast();
});

