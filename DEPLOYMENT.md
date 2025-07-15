# 🚀 배포 가이드

## Vercel 배포 (추천)

### 1. Vercel CLI 설치
```bash
npm install -g vercel
```

### 2. Vercel 로그인
```bash
vercel login
```

### 3. 프로젝트 배포
```bash
vercel
```

### 4. 환경변수 설정 (이메일 발송용)
Vercel 대시보드에서 다음 환경변수를 설정하세요:
- `EMAIL_USER`: kmes.kmkim@gmail.com
- `EMAIL_PASS`: Gmail 앱 비밀번호

### 5. 커스텀 도메인 설정 (선택사항)
Vercel 대시보드에서 커스텀 도메인을 연결할 수 있습니다.

## Netlify 배포

### 1. Netlify CLI 설치
```bash
npm install -g netlify-cli
```

### 2. Netlify 로그인
```bash
netlify login
```

### 3. 사이트 배포
```bash
netlify deploy
```

### 4. 폼 처리 설정
Netlify에서는 폼 처리를 위한 별도 설정이 필요합니다.

## GitHub Pages 배포

### 1. GitHub 저장소 생성
GitHub에 새 저장소를 만들고 코드를 푸시하세요.

### 2. GitHub Pages 활성화
- 저장소 설정 → Pages
- Source를 "Deploy from a branch"로 설정
- Branch를 "main"으로 설정

### 3. 자동 배포
GitHub Actions를 사용하여 자동 배포를 설정할 수 있습니다.

## Railway 배포 (서버 기능 포함)

### 1. Railway CLI 설치
```bash
npm install -g @railway/cli
```

### 2. Railway 로그인
```bash
railway login
```

### 3. 프로젝트 배포
```bash
railway init
railway up
```

### 4. 환경변수 설정
Railway 대시보드에서 이메일 환경변수를 설정하세요.

## 배포 후 확인사항

1. **정적 파일**: HTML, CSS, JS 파일이 정상 로드되는지 확인
2. **이메일 발송**: 문의 폼에서 이메일이 정상 발송되는지 확인
3. **반응형**: 모바일에서 정상 표시되는지 확인
4. **구글 맵스**: 지도가 정상 표시되는지 확인

## 문제 해결

### 이메일 발송 실패
- Gmail 2단계 인증 활성화
- 앱 비밀번호 생성
- 환경변수 정확히 설정

### 구글 맵스 로드 실패
- API 키 설정 확인
- 도메인 허용 목록에 배포 URL 추가

### CSS/JS 로드 실패
- 파일 경로 확인
- 캐시 삭제 후 재시도 