# GitHub Pages 배포 - 간단한 방법 (복사-붙여넣기)

## 방법 1: GitHub에서 직접 파일 업로드 (가장 쉬움!)

### 1단계: dist 폴더 내용 확인
터미널에서 다음 명령어 실행:
```bash
cd /Users/kyoungokeom/Desktop/C-TEST/TAXI
ls -la dist/
```

### 2단계: GitHub에서 파일 업로드
1. https://github.com/kufabal/TAXI 접속
2. "Add file" → "Upload files" 클릭
3. `dist` 폴더 안의 **모든 파일**을 드래그 앤 드롭:
   - `index.html`
   - `map.png`
   - `logo.png`
   - `assets` 폴더 전체
4. "Commit changes" 클릭

### 3단계: GitHub Pages 설정
1. 저장소에서 "Settings" 탭 클릭
2. 왼쪽 메뉴 "Pages" 클릭
3. "Source"에서 **"Deploy from a branch"** 선택
4. Branch: `main` 선택
5. Folder: `/ (root)` 선택
6. "Save" 클릭

### 4단계: 배포 확인
- 몇 분 후 https://kufabal.github.io/TAXI/ 접속
- 지도 이미지가 보여야 합니다!

---

## 방법 2: docs 폴더 사용 (자동 배포)

### 1단계: docs 폴더 만들기
터미널에서:
```bash
cd /Users/kyoungokeom/Desktop/C-TEST/TAXI
mkdir -p docs
cp -r dist/* docs/
```

### 2단계: GitHub에 푸시
```bash
git add docs/
git commit -m "Add docs folder for GitHub Pages"
git push origin main
```

### 3단계: GitHub Pages 설정
1. Settings → Pages
2. Source: `main` 브랜치의 `/docs` 폴더 선택
3. Save

---

## 방법 3: GitHub Actions 자동 배포 (추천!)

### 1단계: workflow 파일 만들기
`.github/workflows/deploy.yml` 파일을 만들고 아래 내용 복사:

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [ main ]

permissions:
  contents: read
  pages: write
  id-token: write

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      
      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'
          
      - name: Install dependencies
        run: npm install
        
      - name: Build
        run: npm run build
        
      - name: Setup Pages
        uses: actions/configure-pages@v2
        
      - name: Upload artifact
        uses: actions/upload-pages-artifact@v1
        with:
          path: './dist'
          
      - name: Deploy to GitHub Pages
        id: deployment
        uses: actions/deploy-pages@v1
```

### 2단계: GitHub Pages 설정
1. Settings → Pages
2. Source: **"GitHub Actions"** 선택
3. Save

### 3단계: 푸시
```bash
git add .github/workflows/deploy.yml
git commit -m "Add GitHub Actions deployment"
git push origin main
```

---

## 문제 해결

### 사이트가 비어있을 때:
1. `dist` 폴더에 `map.png`가 있는지 확인
2. `index.html`의 경로가 올바른지 확인 (`/assets/...` 형식)
3. GitHub Pages 설정에서 올바른 폴더 선택했는지 확인

### 이미지가 안 보일 때:
1. `public/map.png` 파일이 있는지 확인
2. `npm run build` 실행해서 `dist`에 복사되는지 확인
3. 브라우저 개발자 도구(F12)에서 콘솔 에러 확인

