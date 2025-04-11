# Vercel 배포 가이드 - 스크린샷 포함

이 가이드는 Gemini 채팅 웹앱을 Vercel에 배포하는 방법을 스크린샷과 함께 단계별로 안내합니다.

## 1. 준비물

- GitHub 계정
- Gemini API 키 (https://makersuite.google.com/app/apikey 에서 발급)
- 로컬에 다운로드된 Gemini 채팅 웹앱 코드

## 2. GitHub에 코드 업로드하기

### 방법 1: GitHub 웹사이트에서 직접 업로드하기 (가장 쉬운 방법)

1. [GitHub](https://github.com)에 로그인합니다.
2. 오른쪽 상단의 '+' 버튼을 클릭하고 'New repository'를 선택합니다.
   ![GitHub 새 저장소](https://i.imgur.com/fJCqgQ3.png)
3. 저장소 이름을 입력합니다 (예: 'gemini-chat-app').
4. 'Public' 옵션을 선택하고 'Create repository' 버튼을 클릭합니다.
5. 새로 생성된 저장소 페이지에서 '파일 업로드' 또는 'uploading an existing file' 링크를 클릭합니다.
   ![파일 업로드](https://i.imgur.com/7TcUKu4.png)
6. 컴퓨터에서 Gemini 채팅 앱 파일들을 모두 선택해 드래그 앤 드롭으로 업로드하거나, '파일 선택' 버튼을 클릭하여 업로드합니다.
7. 파일 업로드가 완료되면 페이지 하단의 'Commit changes' 버튼을 클릭합니다.

### 방법 2: 명령줄(Git) 사용하기 (개발자용)

Git이 설치되어 있고 명령줄 사용에 익숙하다면 다음 방법을 사용할 수 있습니다:

1. [GitHub](https://github.com)에 로그인 후 새 저장소를 만듭니다.
2. 터미널(맥/리눅스) 또는 명령 프롬프트(윈도우)를 열고 Gemini 채팅 앱 코드가 있는 폴더로 이동합니다.
3. 다음 명령어를 순서대로 실행합니다:

```bash
git init
git add .
git commit -m "초기 커밋"
git branch -M main
git remote add origin https://github.com/사용자이름/gemini-chat-app.git
git push -u origin main
```

위 명령어에서 `사용자이름/gemini-chat-app.git` 부분은 GitHub에서 저장소를 만들 때 제공하는 URL로 변경해야 합니다.

> **명령줄에서 오류가 발생한다면?** 
> - Git이 설치되어 있는지 확인하세요: `git --version` 명령어로 확인할 수 있습니다.
> - GitHub 계정 정보가 설정되어 있는지 확인하세요: 
>   ```
>   git config --global user.name "GitHub 사용자명"
>   git config --global user.email "GitHub 이메일"
>   ```
> - 인증 문제가 있다면 GitHub 개인 접근 토큰을 사용하거나, GitHub Desktop 앱을 사용해보세요.

### 방법 3: GitHub Desktop 사용하기 (가장 간편한 GUI 방법)

1. [GitHub Desktop](https://desktop.github.com/)을 다운로드하고 설치합니다.
2. GitHub 계정으로 로그인합니다.
3. 'File' > 'Add Local Repository'를 클릭하고 Gemini 채팅 앱 코드가 있는 폴더를 선택합니다.
4. 'Repository' > 'Push'를 클릭하여 코드를 GitHub에 업로드합니다.

## 3. Vercel에 배포하기

### 3.1. Vercel 로그인 & 새 프로젝트 만들기
![Vercel 로그인](https://i.imgur.com/wXn5mMU.png)
1. [Vercel](https://vercel.com)에 접속하여 GitHub 계정으로 로그인하세요.
2. 대시보드에서 'Add New...' → 'Project' 버튼을 클릭하세요.

### 3.2. GitHub 저장소 가져오기
![GitHub 저장소 가져오기](https://i.imgur.com/uCpX7kw.png)
1. GitHub 계정이 연결되어 있는지 확인하세요.
2. 방금 생성한 저장소(gemini-chat-app)를 찾아 'Import' 버튼을 클릭하세요.

### 3.3. 프로젝트 설정하기
![프로젝트 설정](https://i.imgur.com/K4GZhuY.png)
1. 프로젝트 이름이 자동으로 채워집니다.
2. 프레임워크 프리셋이 'Next.js'로 자동 선택되어 있는지 확인하세요.
3. 루트 디렉토리는 비워두세요.

### 3.4. 환경 변수 설정하기
![환경 변수 설정](https://i.imgur.com/mOtjbQq.png)
1. 페이지를 아래로 스크롤하여 'Environment Variables' 섹션을 찾으세요.
2. NAME 필드에 `GEMINI_API_KEY`를 입력하세요.
3. VALUE 필드에 발급받은 Gemini API 키를 입력하세요.
4. 'Add' 버튼을 클릭하세요.

### 3.5. 배포 시작하기
![배포 시작](https://i.imgur.com/NvXz9HK.png)
1. 모든 설정이 완료되었는지 확인하세요.
2. 'Deploy' 버튼을 클릭하세요.
3. 배포가 시작되며, 완료될 때까지 기다리세요 (보통 1-2분 소요).

### 3.6. 배포 완료
![배포 완료](https://i.imgur.com/Zjm8s0l.png)
1. 배포가 완료되면 성공 메시지가 표시됩니다.
2. 'Go to Dashboard' 버튼을 클릭하거나 '프로젝트이름.vercel.app' 링크를 클릭하여 배포된 웹앱을 확인하세요.

## 4. 도메인 설정 (선택사항)

### 4.1. 커스텀 도메인 추가하기
![커스텀 도메인](https://i.imgur.com/Lw1xSqM.png)
1. 프로젝트 대시보드에서 'Settings' 탭을 클릭하세요.
2. 좌측 메뉴에서 'Domains'를 선택하세요.
3. 원하는 도메인을 입력하고 'Add' 버튼을 클릭하세요.
4. Vercel의 안내에 따라 DNS 설정을 완료하세요.

## 5. 변경사항 업데이트하기

코드를 수정한 후 GitHub에 변경사항을 푸시하면 Vercel이 자동으로 재배포합니다:

```bash
git add .
git commit -m "변경사항 설명"
git push
```

## 6. 문제 해결

### 6.1. 배포 실패 시
- 프로젝트 대시보드의 'Deployments' 탭에서 오류 메시지를 확인하세요.
- 환경 변수 `GEMINI_API_KEY`가 올바르게 설정되었는지 확인하세요.
- package.json 파일에 문제가 없는지 확인하세요.

### 6.2. API 키 오류
- Gemini API 키가 유효한지 확인하세요.
- Vercel 대시보드에서 환경 변수가 올바르게 설정되었는지 다시 확인하세요.

## 7. 팁

- Vercel 무료 계정은 매월 100GB의 대역폭과 기본 기능을 제공합니다.
- 트래픽이 많아질 경우 유료 플랜으로 업그레이드할 수 있습니다.
- GitHub와 Vercel을 연결하면 코드 변경 시 자동으로 재배포됩니다. 