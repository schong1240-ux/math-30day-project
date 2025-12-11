# GitHub에 배포하기

## 1. GitHub에 새 저장소 생성

1. GitHub (https://github.com)에 로그인
2. 우측 상단의 "+" 버튼 클릭 → "New repository" 선택
3. 저장소 이름 입력 (예: `math-30day-project`)
4. Public 또는 Private 선택
5. "Create repository" 클릭
6. **README, .gitignore, license를 추가하지 마세요** (이미 로컬에 있음)

## 2. 로컬 저장소를 GitHub에 푸시

GitHub에서 제공하는 명령어를 복사하거나, 아래 명령어를 실행하세요:

```bash
# 원격 저장소 추가 (YOUR_USERNAME을 본인의 GitHub 사용자명으로 변경)
git remote add origin https://github.com/YOUR_USERNAME/math-30day-project.git

# 기본 브랜치를 main으로 변경 (선택사항)
git branch -M main

# GitHub에 푸시
git push -u origin main
```

또는 SSH를 사용하는 경우:

```bash
git remote add origin git@github.com:YOUR_USERNAME/math-30day-project.git
git branch -M main
git push -u origin main
```

## 3. GitHub Pages로 배포 (선택사항)

정적 사이트로 배포하려면:

1. GitHub 저장소 → Settings → Pages
2. Source를 "GitHub Actions" 또는 "Deploy from a branch" 선택
3. Build 후 dist 폴더를 배포하도록 설정

또는 Vercel, Netlify 같은 서비스를 사용할 수도 있습니다.

