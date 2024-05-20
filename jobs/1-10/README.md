> Created At 2024-05-20

> Author: @smnchoi

# 과제 설명

1. 주석을 참고해서 아래 4개의 함수들을 완성시켜주세요.

2. `/mock.json` 파일을 참고하여, `visitingServices` 구조를 먼저 파악하고 과제를 수행하세요.

3. 답안을 완성하고 나면, PR 을 생성한 뒤 디스코드 DM 을 통해 메시지 주세요. 이후, 코드 리뷰를 진행합니다.

```ts
console.log("프로그램 실행");

// 비동기로 데이터 (mock.json) 가져오고 처리하기
fetch("./mock.json")
  .then((response) => response.json()) // 응답을 JSON으로 변환
  .then((data) => {
    const serviceNames = getServiceNames(data.visitingServices);
    console.log(serviceNames);

    const newestService = findNewestService(data.visitingServices);
    console.log(newestService);

    const filteredServices = filterServicesByName(
      data.visitingServices,
      "🦮산책하기"
    );
    console.log(filteredServices);

    const filteredServices = searchServicesByKeyword(
      data.visitingServices,
      "줍니다."
    );
    console.log(filteredServices);
  })
  .catch((error) => {
    console.error("데이터를 가져오는 동안 오류가 발생했습니다:", error); // 에러 로깅
  })
  .finally(() => {
    console.log("프로그램 종료");
  });

/**
 * Challenge 1: name 프로퍼티의 값들만 얻어내기.
 *
 * visitingServices 배열에서, name 프로퍼티 값들만 추출해서 새로운 어레이를 리턴하세요.
 **/
function getServiceNames(visitingServices) {
  const names = [];

  // 답안을 작성하세요
  //  ...

  return names;
}

/**
 * Challenge 2: 가장 최근에 생성된 visitingService 찾기
 *
 * visitingServices 배열에서, createAt 프로퍼티 값을 기준으로, 가장 최근에 생성된 visitingService 객체를 리턴하세요.
 */
function findNewestService(visitingServices) {
  const newest = undefined;

  // 답안을 작성하세요
  //  ...

  return newest;
}

/**
 * Challenge 3: name 값으로 특정 visitingService 필터링하기
 *
 * 입력받은 name 값을 가지고 있는 visitingService 객체들을 모두 리턴하세요.
 */
function filterServicesByName(visitingServices, name) {
  const filtered = [];

  // 답안을 작성하세요
  //  ...

  return filtered;
}

/**
 * Challenge 4: 특정 keyword 를 포함하고 visitingService 검색하기
 *
 * 입력받은 keyword 를 포함하고 있는 visitingService 객체들을 모두 리턴하세요.
 * id, createAt, updatedAt, name, desc 중에서 어떤 프로퍼티에서라도 keyword 를 포함하고 있다면 리턴해야 합니다.
 */
function searchServicesByKeyword(visitingServices, keyword) {
  const searched = [];

  // 답안을 작성하세요
  //  ...

  return searched;
}
```
