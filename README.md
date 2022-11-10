[README 노션 문서](https://confirmed-soil-684.notion.site/YOLO-Crocket-84847de84a534915a401043b5a2add68)

## 요구사항 & 분석

### 스펙 분류 및 분석(Crocket)

- 테이블:
    
    
    | ID | 요구사항 | 세부내용 | 비고 | 예외처리 | 포인트배분 |
    | --- | --- | --- | --- | --- | --- |
    | 1 | 회원가입 & 로그인 | 회원가입을 위한 기본정보로 등록 | 기본정보: 이메일 / 이름 / 전화번호 / 비밀번호 /셀러 여부(콜렉션 필드) |  | 2 |
    |  |  | 로그인 | bcrypt 비밀번호 암호화 및 인증 / jwt 발행  | 400 |  |
    |  |  | 셀러 여부 | boolean 값. 토큰에 포함되어야함. 셀러 관련 api 는 셀러 여부 값이 true 여야 접근 가능. 회원가입시 이폴트 값 false |  |  |
    |  |  | 이메일 | 검증 안함. 중복체크. | 400 |  |
    |  |  | 이름  | 검증 안함 |  |  |
    |  |  | 비밀번호 | 영문 / 숫자 / 특수문자 (각 하나 이상)8-20자 | 400 |  |
    |  |  | 전화번호 | 인증필요(추가구현). 중복검사 필요 | 400 |  |
    | 2 | 셀러 입점 정보 등록 | 셀러 등록을 위한 기본정보로 등록 | 기본정보: 셀러명 / 수익금정산계좌(은행, 계좌번호) / 2차 연락수단 등록 | 400 | 0.5 |
    |  |  | 셀러 여부 | true 로 변경 필요 |  |  |
    |  |  | 셀러명 | 중복 검사 | 400 |  |
    |  |  | 계좌 | 검사 안함 |  |  |
    |  |  | 2차 연락 수단 | 검사 안함. 카카오톡 id 만 포함해도 충분할듯 |  |  |
    | 3 | 셀러의 상품 등록 | 상품 등록을 위해 필요한 항목들을 포함해 상품이 등록 | 썸네일 / 상품 정보 / 배송 정보 | 403 | 4 |
    |  |  | 썸네일 | 최대 8장 등록 | 400 |  |
    |  |  | 상품 상세정보 | 이미지 최대 10장 등록 / 상품명 / 카테고리 / 세부 카테고리 / 옵션/ 가격 / 상품 요약설명 / 유의사항 / 구매일 / | 400 |  |
    |  |  | 지역 / 배송정보 | 구매지역 / 주문마감일 / 배송수단 배송비 / 발송예정일 | 400 |  |
    | 4 | 셀러의 상품 수정 | 상품 수정을 위해 필요한 항목들을 포함해 상품이 수정 | 상품 등록 정보 의미하는 듯. id 3 참조. 셀러 본인이어야 함.  | 403, 400, 404 | 0.5 |
    | 5 | 셀러의 상품 삭제 | 지정된 상품 삭제 가능 | 삭제된 상품은 등록 / 수정 / 조회 할 수 없음. softDelete. (hardDelete 는 추가구현) | 403, 404,  | 0.5 |
    | 6 | 상품 상세 조회 | 상품 id 로 상품을 조회 | 상품 상세 정보를 구성하는 응답값이 포함되어 있어야 한다. id 3 참조. | 404 | 0.5 |
    | 7 | 마켓 상품 리스트 조회 | 마켓상품리스트를 구성하는 응답값이 포함되어야 | 썸네일 / 상품명 / 가격 / 셀러이름 / 발송예정일 / 배송비 |  | 2 |
    |  |  | 검색 | 상품명. 아래 모두 페이지네이션. |  |  |
    |  |  | 검색 | 카테고리 / 국가. 검색어로 검색 안됨. 클릭으로 가능함. |  |  |
    |  |  | 분류 | 카테고리 / 국가 |  |  |
    |  |  | 정렬 | 최신순 / 주문마감일순. 최신순 디폴트. |  |  |
    | 총계 | 7개 |  |  |  | 10포인트 |
- 그외
    - 로그아웃은 프론트가 구현
    - 회원탈퇴는 없음 / 회원수정도 없음
    - 가용시간: 4일 * 10시간 = 40시간 / 2시간 = 20 point
    - 5 point: 분석 및 모델링, API 명세 작성, 테스트 케이스 작성, 프로젝트 구조 작성, 개발일정
    - 5 point: 테스트 및 문서화 작업
    - 포인트 배분은 위의 테이블에 있음
    - 가용시간이 모든 요구사항을 만족시키기에 부족하기 때문에 요구사항을 단순화 할 필요 있음
    - 실제 Crocket 서비스보다 단순화한 모델링 필요

---

## 개발조건

### 목표

- [Croket](https://www.croket.co.kr/) 서비스를 벤치마킹하여 직접 서비스를 구현한다는 생각으로 조건에 해
당하는 API를 구현해주세요.
- 모든 테이블/프로젝트 구조는 자율적으로 구현을 할 수 있으며 URL 및 변수명 등 생각
할 수 있는 좋은 컨벤션에 따라 구현해주세요.

### 기술스택

- 필수 사항 : TypeScript / Node.js / MongoDB / Express
- 선택 사항 : Jest / Validation-Joi
- 버젼 관리 : git / github
- 특이 사항 : typeORM 사용금지
- 추가적으로 다른 기술 또한 자유롭게 사용하셔도 좋습니다.
    - Postman : 테스트 및 api publish
    - multer: 썸네일 및 상품 상세 정보 이미지 삽입
    - AWS S3: 이미지 저장 수단
- 그 외 외부 모듈 :  cors / morgan / dotenv / mongoose / ts-node / nodemon / bcrypt / jwt

---

## 평가항목

- 프로젝트 구조를 어떻게 설계하였는지 또는 그에 대한 이해도가 있는지 평가합니다.
    - 데이터 스키마 설계를 통해 데이터 이해도에 대한 평가를 진행합니다.
    - package 명을 통해 구조화에 얼마나 신경쓰는지 확인합니다.
    - 의존성과 재사용성을 고려한 코드 작성 여부를 평가합니다.
- 테스트 코드를 어떻게 작성했는지 또는 그에 대한 이해도가 있는지 평가합니다.
- api 구현시 최대한 Restful 하게 구현해주세요.
- Api Validation 과 Logging을 어떻게 다루었는지 또는 그에 대한 이해도가 있는지 평가
합니다

---

## 프로젝트 구조

### 프로젝트 특징:

- express 프레임워크 사용
- 비교적 단순하다.
- 확장 가능성이 없다.
- 1명이 개발한다.

### 프로젝트 구조 선택:

- 3계층 레이어: controller-service-dataAccessLayer
    - controller 는 req 와 res 오브젝트를 다룸. 데이터의 입출력을 담당.
    - 비즈니스 로직은 service 에 구현
    - model 은 database 와 입출력을 담당함.
- 기타
    - 설정 및 시크릿은 dotenv 를 사용하여 관리
    - 스스로 제작한 모듈은 middlewares
    - 시작 프로세스를 테스트 가능한 모듈로 분리함. (app.ts / server.ts / mongo.ts)

---

## 모델링

- NoSQL 은 처음 사용하므로 [블로그](https://bcho.tistory.com/665)와 [공식문서](https://mongoosejs.com/docs/index.html)를 참조함
- 콜렉션 요구사항: User, Market, Product

### 콜렉션(데이터)

- User
    
    
    | ID | field | type | required | default | 그외 |
    | --- | --- | --- | --- | --- | --- |
    | 1 | id |  |  |  | 저절로 생성됨 |
    | 2 | email | string | true |  | unique: true, Joi validation |
    | 3 | name | string | true |  |  |
    | 4 | password | string | true |  | 암호화,Joi validation(영문 소문자, 숫자 4-10자) |
    | 5 | seller | boolean | true | false |  |
    | 6 | phone | string | true |  | unique: true, Joi validation(숫자 10-12자) |
    | 7 | created_at |  |  |  | timestamp |
- Seller
    
    
    | ID | field | type | required | default | 그외 |
    | --- | --- | --- | --- | --- | --- |
    | 1 | user_id | objectId | true |  | ref: ‘User’ |
    | 2 | seller_name | string | true |  |  |
    | 3 | account | string | true |  |  |
    | 4 | bank | string | true |  | 암호화 |
    | 5 | contact | string | true |  | 카카오톡id |
    | 7 | created_at | date | true | date.now |  |
- Product
    
    
    | ID | field | type | required | default | 그외 |
    | --- | --- | --- | --- | --- | --- |
    | 1 | id |  |  |  | 자동으로 생성됨 |
    | 2 | seller_id | objectId | true |  | ref: “Seller” |
    | 4 | product_name | string | true |  | 검색 |
    | 5 | category | string | true |  | 검색 / 분류 |
    | 7 | price | decimal | true |  |  |
    | 8 | description | string | false |  |  |
    | 10 | order_deadline | date | true |  | 정렬 |
    | 14 | created_at | date | true | date.now | 정렬 |
    | 15 | deleted_at | boolean | true | false | soft delete  |
- Market
    
    
    | ID | field | type | required | default | 그외 |
    | --- | --- | --- | --- | --- | --- |
    | 1 | id |  | true |  | 자동으로 생성됨 |
    | 2 | nation | string | true |  |  |
    | 3 | product_id | array | false |  |  |
    | 7 | created_at | date | true | date.now |  |

### ERD

<img width="500" alt="테스트 커버리지 스크린샷" src="https://user-images.githubusercontent.com/88824305/201111340-393a4362-7190-4849-bb1d-b82f9188da0e.jpg">

---


## API 명세

[YOLO-Crocket](https://www.notion.so/8298a74918a148f2b123a76ca8654de8)
</br>
[포스트맨](https://documenter.getpostman.com/view/22555415/2s8YemuEcr)

---

## 테스트케이스

| ID | 분류 | 테스트항목 | 결과 |
| --- | --- | --- | --- |
| 1 | 회원가입 | 201 | p |
| 2 | 로그인 | 200 | p |
| 3 | 셀러 등록 | 201 | p |
| 4 | 셀러 상품 등록 | 201 | p |
| 5 | 셀러 상품 수정 | 201 | p |
| 6 | 셀러 상품 삭제 | 204 | p |
| 7 | 상품 상세 보기 | 200 | p |
| 8 | 상품 리스트 조회 | 200 | p |

<img width="500" alt="테스트 스크린샷" src="https://user-images.githubusercontent.com/88824305/201115572-67efcd6e-1696-4421-85cf-a5ccde7300c7.jpg">
</br>
<img width="500" alt="테스트 커버리지 스크린샷" src="https://user-images.githubusercontent.com/88824305/201115721-238b8bdb-40ca-4cdd-8870-7c40b5015ccb.jpg">


---


## 개발 프로세스

[YOLO](https://www.notion.so/4d40c4a0be9e4eed8d8b53153d0b2183)
