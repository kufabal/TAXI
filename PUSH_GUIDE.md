# GitHub 푸시 가이드 (구글 로그인 사용자용)

## 1단계: Personal Access Token 만들기

1. https://github.com/settings/tokens 접속
2. "Generate new token" → "Generate new token (classic)" 클릭
3. Note: "TAXI 배포" 입력
4. Expiration: 90 days (또는 원하는 기간)
5. **권한 체크: `repo` 전체 체크**
6. 맨 아래 "Generate token" 클릭
7. **토큰을 복사하세요! (한 번만 보입니다)**

## 2단계: 터미널에서 실행

터미널을 열고 아래 명령어를 **순서대로** 실행하세요:

```bash
# 1. 프로젝트 폴더로 이동
cd /Users/kyoungokeom/Desktop/C-TEST/TAXI

# 2. 원격 저장소 URL 업데이트 (토큰 포함)
git remote set-url origin https://토큰을여기에붙여넣기@github.com/kufabal/TAXI.git

# 3. 푸시
git push -u origin main
```

**예시:**
만약 토큰이 `ghp_abc123xyz456` 라면:
```bash
git remote set-url origin https://ghp_abc123xyz456@github.com/kufabal/TAXI.git
git push -u origin main
```

## 3단계: GitHub Pages 활성화

1. https://github.com/kufabal/TAXI 접속
2. "Settings" 탭 클릭
3. 왼쪽 메뉴에서 "Pages" 클릭
4. "Source"에서 "GitHub Actions" 선택
5. 저장!

## 배포 완료 후 접속 주소

https://kufabal.github.io/TAXI/

