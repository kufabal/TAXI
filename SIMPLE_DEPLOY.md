# 🚀 간단한 배포 방법 (복사-붙여넣기)

## 현재 상황
- GitHub Actions가 실패하고 있습니다
- 더 간단한 방법으로 배포하겠습니다

## ✅ 해결 방법 (2단계만!)

### 1단계: GitHub 저장소 접속
```
https://github.com/kufabal/TAXI
```

### 2단계: Settings → Pages 설정
1. **"Settings"** 탭 클릭
2. 왼쪽 메뉴에서 **"Pages"** 클릭
3. **"Source"** 부분에서:
   - **Branch**: `main` 선택
   - **Folder**: **`/ (root)`** 선택 ⬅️ 이게 중요!
4. **"Save"** 클릭

### 3단계: 확인
- 1-2분 기다린 후
- https://kufabal.github.io/TAXI/ 접속
- 지도 이미지가 보여야 합니다! 🗺️

---

## 📝 참고
- 이미 `index.html`, `map.png`, `assets` 폴더가 루트에 있습니다
- GitHub Pages 설정만 `/ (root)`로 바꾸면 됩니다
- GitHub Actions는 이제 사용하지 않습니다

