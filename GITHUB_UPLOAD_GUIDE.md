# GitHub에서 직접 파일 업로드하기 (복사-붙여넣기 방식)

## 🎯 가장 쉬운 방법: GitHub 웹사이트에서 직접 업로드

### 1단계: dist 폴더 내용 확인
현재 `dist` 폴더에 다음 파일들이 있습니다:
- `index.html`
- `map.png`
- `logo.png`
- `assets/` 폴더 (안에 JS, CSS 파일들)

### 2단계: GitHub에서 파일 업로드

1. **브라우저에서 접속:**
   ```
   https://github.com/kufabal/TAXI
   ```

2. **"Add file" 버튼 클릭** → **"Upload files" 선택**

3. **dist 폴더의 모든 파일 드래그 앤 드롭:**
   - `index.html`
   - `map.png`
   - `logo.png`
   - `assets` 폴더 전체

4. **"Commit changes" 클릭**
   - 제목: "Upload dist files for GitHub Pages"
   - "Commit directly to the main branch" 선택
   - "Commit changes" 버튼 클릭

### 3단계: GitHub Pages 설정

1. 저장소 페이지에서 **"Settings"** 탭 클릭

2. 왼쪽 메뉴에서 **"Pages"** 클릭

3. **"Source"** 섹션에서:
   - Branch: `main` 선택
   - Folder: **`/ (root)`** 선택
   - **"Save"** 클릭

4. 잠시 기다리면 (1-2분) 배포 완료!

### 4단계: 확인

- https://kufabal.github.io/TAXI/ 접속
- 지도 이미지가 보여야 합니다! 🗺️

---

## 🔧 문제 해결

### 사이트가 여전히 비어있을 때:

1. **GitHub Pages 설정 확인:**
   - Settings → Pages
   - Source가 `/ (root)`로 설정되어 있는지 확인

2. **파일이 루트에 있는지 확인:**
   - 저장소 루트에 `index.html`, `map.png` 등이 있는지 확인
   - `assets` 폴더도 루트에 있어야 함

3. **브라우저 캐시 삭제:**
   - Ctrl+Shift+R (Windows) 또는 Cmd+Shift+R (Mac)
   - 또는 시크릿 모드로 접속

---

## 📝 참고사항

- 이 방법은 **수동 업로드** 방식입니다
- 코드를 수정할 때마다 다시 업로드해야 합니다
- 자동 배포를 원하면 GitHub Actions를 사용해야 하지만, PAT에 `workflow` 권한이 필요합니다

