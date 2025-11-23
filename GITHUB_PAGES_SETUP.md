# GitHub Pages 배포 가이드

## 1단계: GitHub 저장소 생성

1. https://github.com 접속 후 로그인
2. 우측 상단 "+" 버튼 → "New repository" 클릭
3. 저장소 이름 입력 (예: `TAXI` 또는 `eway-share`)
4. Public으로 설정 (GitHub Pages는 Public 저장소에서 무료)
5. "Create repository" 클릭

## 2단계: 저장소 이름에 맞게 설정 수정

저장소 이름이 `TAXI`가 아니라면, `vite.config.js` 파일의 base 경로를 수정하세요:

```js
base: process.env.NODE_ENV === 'production' ? '/저장소이름/' : '/',
```

예를 들어 저장소 이름이 `eway-share`라면:
```js
base: process.env.NODE_ENV === 'production' ? '/eway-share/' : '/',
```

## 3단계: 코드 푸시

터미널에서 다음 명령어 실행:

```bash
# Git 초기화 (처음 한 번만)
git init

# 모든 파일 추가
git add .

# 커밋
git commit -m "Initial commit"

# GitHub 저장소 연결 (본인의 저장소 URL로 변경)
git remote add origin https://github.com/본인계정/저장소이름.git

# 푸시
git branch -M main
git push -u origin main
```

## 4단계: GitHub Pages 활성화

1. GitHub 저장소 페이지로 이동
2. "Settings" 탭 클릭
3. 왼쪽 메뉴에서 "Pages" 클릭
4. "Source"에서 "GitHub Actions" 선택
5. 저장하면 자동으로 배포 시작!

## 5단계: 배포 확인

- GitHub 저장소의 "Actions" 탭에서 배포 진행 상황 확인
- 배포 완료 후 `https://본인계정.github.io/저장소이름/` 주소로 접속

## 주의사항

- 저장소 이름을 변경하면 base 경로도 함께 변경해야 합니다
- 배포는 보통 1-2분 정도 소요됩니다
- 코드를 푸시할 때마다 자동으로 재배포됩니다

