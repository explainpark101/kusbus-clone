const CACHE_NAME = 'kusbus-v1';
const urlsToCache = [
  '/',
  '/index.html',
  '/style.css',
  '/app.js',
  '/manifest.json',
  // CSS 파일
  '/css/bootstrap.min.css',
  '/css/maru-buri.css',
  // JavaScript 파일
  '/js/bootstrap.bundle.min.js',
  '/js/jquery-3.7.0.js',
  // 폰트 파일
  '/fonts/MaruBuri/MaruBuri-Regular.woff2',
  '/fonts/MaruBuri/MaruBuri-SemiBold.woff2',
  '/fonts/MaruBuri/MaruBuri-Bold.woff2',
  '/fonts/MaruBuri/MaruBuri-Light.woff2',
  '/fonts/MaruBuri/MaruBuri-ExtraLight.woff2',
  // busschedule 이미지
  '/busschedule/busSchedule.jpg'
];

// 설치 이벤트: 캐시에 파일 저장
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('캐시 열기');
        // 캐시 실패해도 서비스 워커는 활성화되도록 함
        return cache.addAll(urlsToCache).catch((err) => {
          console.log('일부 파일 캐싱 실패:', err);
        });
      })
  );
  // 즉시 활성화되도록 설정
  self.skipWaiting();
});

// fetch 이벤트: 네트워크 요청 가로채기 - 오프라인 지원 강화
self.addEventListener('fetch', (event) => {
  // GET 요청만 캐싱
  if (event.request.method !== 'GET') {
    return;
  }

  event.respondWith(
    caches.match(event.request)
      .then((cachedResponse) => {
        // 캐시에 있으면 캐시에서 반환 (오프라인 지원)
        if (cachedResponse) {
          return cachedResponse;
        }

        // 캐시에 없으면 네트워크 요청 시도
        return fetch(event.request)
          .then((response) => {
            // 네트워크 응답이 성공적이면 캐시에 저장
            if (response && response.status === 200) {
              const responseToCache = response.clone();
              caches.open(CACHE_NAME)
                .then((cache) => {
                  cache.put(event.request, responseToCache);
                });
            }
            return response;
          })
          .catch((error) => {
            // 네트워크 실패 시:
            // 1. HTML 요청이면 index.html 반환
            if (event.request.destination === 'document') {
              return caches.match('/index.html');
            }
            // 2. 외부 리소스 요청이면 빈 응답 또는 기본 응답
            console.log('네트워크 요청 실패 (오프라인):', event.request.url);
            // 오프라인 페이지나 기본 응답을 반환할 수 있음
            return new Response('오프라인 모드', {
              status: 408,
              headers: { 'Content-Type': 'text/plain' }
            });
          });
      })
  );
});

// activate 이벤트: 오래된 캐시 정리 및 즉시 클라이언트 제어 시작
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            console.log('오래된 캐시 삭제:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
  // 즉시 모든 클라이언트에 서비스 워커 제어 시작
  return self.clients.claim();
});

