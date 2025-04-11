# Gemini 채팅 웹앱

이 웹앱은 Google의 Gemini API를 활용한 채팅 애플리케이션입니다.

## Vercel로 배포하기 (다른 사람들이 접속할 수 있게)

> **상세 가이드**: [Vercel 배포 가이드 (스크린샷 포함)](./Vercel배포가이드.md)

### 1. Gemini API 키 발급받기

1. [Google AI Studio](https://makersuite.google.com/app/apikey)에 로그인합니다.
2. [API 키 생성] 버튼을 클릭하고 이름을 지정한 후 생성합니다.
3. 생성된 API 키를 복사해둡니다 (생성 후 다시 확인할 수 없으니 안전한 곳에 저장하세요).

### 2. GitHub에 프로젝트 업로드하기

#### 방법 1: GitHub 웹사이트에서 직접 업로드하기 (초보자용)

1. [GitHub](https://github.com)에 로그인합니다.
2. 오른쪽 상단의 '+' 버튼 클릭 → 'New repository' 선택
3. 저장소 이름 입력 (예: gemini-chat-app)하고 'Public' 선택
4. 'Create repository' 버튼 클릭
5. '파일 업로드' 또는 'uploading an existing file' 링크 클릭
6. 컴퓨터에서 Gemini 채팅 앱 파일들을 드래그 앤 드롭으로 업로드
7. 'Commit changes' 버튼 클릭

#### 방법 2: GitHub Desktop 사용하기 (간편한 GUI 방법)

1. [GitHub Desktop](https://desktop.github.com/)을 설치합니다.
2. GitHub 계정으로 로그인합니다.
3. 'File' → 'Add Local Repository'를 클릭하고 Gemini 채팅 앱 폴더 선택
4. 'Publish repository' 버튼을 클릭하여 GitHub에 업로드

#### 방법 3: Git 명령어 사용하기 (개발자용)

```bash
git init
git add .
git commit -m "초기 커밋"
git branch -M main
git remote add origin https://github.com/사용자이름/저장소이름.git
git push -u origin main
```

### 3. Vercel에서 배포하기

1. [Vercel](https://vercel.com)에 가입합니다 (GitHub 계정으로 바로 가입 가능).
2. Vercel 대시보드에서 "Add New..." → "Project" 버튼을 클릭합니다.
3. GitHub 계정을 연결하고 방금 만든 저장소를 선택합니다.
   - "Import" 버튼을 클릭하세요.
   - 프레임워크 프리셋으로 "Next.js"가 자동 선택되어 있는지 확인하세요.

4. 환경 변수 설정:
   - "Environment Variables" 섹션을 찾습니다.
   - NAME 필드에 `GEMINI_API_KEY`를 입력합니다.
   - VALUE 필드에 발급받은 실제 API 키를 입력합니다.
   - "Add" 버튼을 클릭합니다.

5. "Deploy" 버튼을 클릭하여 배포를 시작합니다.
   - 배포가 완료될 때까지 기다립니다 (보통 1-2분 소요).

6. 배포가 완료되면 자동으로 생성된 URL(예: `https://프로젝트이름.vercel.app`)을 확인할 수 있습니다.
   - 이 URL을 클릭하면 바로 웹앱이 열립니다.

### 4. 배포 후 설정 (선택사항)

#### 도메인 연결하기
1. Vercel 프로젝트 대시보드에서 "Settings" → "Domains"로 이동합니다.
2. 원하는 도메인을 추가하고 안내에 따라 DNS 설정을 완료합니다.

#### 자동 재배포 설정
- GitHub 저장소에 변경사항을 푸시하면 Vercel이 자동으로 재배포합니다.
- Vercel 대시보드에서 "Settings" → "Git"에서 이 설정을 관리할 수 있습니다.

### 5. 공유하기

1. 배포된 Vercel URL을 복사합니다.
2. 이 URL을 친구들에게 공유하면 누구나 웹브라우저에서 바로 접속할 수 있습니다.
3. 모바일, 태블릿, PC 등 어떤 기기에서도 접속 가능합니다.

## 원클릭 배포 방법 (더 쉬운 방법)

이미 코드가 GitHub에 올라가 있는 경우, 아래 버튼을 클릭하여 바로 배포할 수 있습니다:

[![Vercel로 배포하기](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/yourusername/gemini-chat-app)

이 방법을 사용할 경우:
1. 버튼을 클릭하면 Vercel로 이동합니다.
2. GitHub으로 로그인합니다.
3. 저장소 이름을 설정합니다.
4. 환경 변수에 `GEMINI_API_KEY`를 추가합니다.
5. "Deploy" 버튼을 클릭합니다.

## 주의사항

- Gemini API 키를 GitHub에 직접 업로드하지 마세요. 반드시 Vercel의 환경변수로만 설정하세요.
- 무료 계정으로도 충분히 서비스 운영이 가능합니다.
- Vercel 무료 계정은 매달 100GB의 대역폭을 제공합니다. 