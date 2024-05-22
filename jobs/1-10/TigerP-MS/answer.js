console.log("프로그램 실행");

// 비동기로 데이터 (mock.json) 가져오고 처리하기
fetch("./mock.json")
  .then((response) => response.json()) // 응답을 JSON으로 변환
  .then((data) => {
    const serviceNames = getServiceNames(data.visitingServices);
    console.log(serviceNames);

    const newestService = findNewestService(data.visitingServices);
    console.log(newestService);

    const filteredServicesName = filterServicesByName(
      data.visitingServices,
      "🦮산책하기"
    );
    console.log(filteredServicesName);

    const filteredServicesKeyword = searchServicesByKeyword(
      data.visitingServices,
      "줍니다."
    );
    console.log(filteredServicesKeyword);

    showResult(serviceNames, newestService, filteredServicesName, filteredServicesKeyword, data);
  })
  .catch((error) => {
    console.error("데이터를 가져오는 동안 오류가 발생했습니다:", error); // 에러 로깅
  })
  .finally(() => {
    console.log("프로그램 종료");
  });

function showResult(serviceNames, newestService, filteredServicesName, filteredServicesKeyword, data)
{
  const serviceNamesContainer = document.getElementById('serviceNames');
  serviceNamesContainer.innerHTML = '<h2 class="text-xl font-semibold mb-4">serviceNames</h2>';
  serviceNames.forEach((name) =>
    {
      const serviceElement = document.createElement('div');
      serviceElement.innerHTML +=
      `<div class="bg-gray-200 p-4 rounded mb-4">${name}</div>`
      serviceNamesContainer.appendChild(serviceElement);
    }
  )

  const newestServiceContainer = document.getElementById('newestService');
  newestServiceContainer.innerHTML =
  '<h2 class="text-xl font-semibold mb-4">newestService</h2>' +
  '<div class="bg-gray-200 p-4 rounded">' +
  `<p>Id: ${newestService.id}</p>` +
  `<p>CreateAt: ${newestService.createAt}</p>` +
  `<p>UpdateAt: ${newestService.updatedAt}</p>` +
  `<p>Name: ${newestService.name}</p>` +
  `<p>Description: ${newestService.desc}</p>` +
  '</div>';

  // console.log(getfilteredServicesNameInputValue());
  // getfilteredServicesNameInputValue(data); 작동 x

  const filteredServicesNameContainer = document.getElementById('filteredServicesName');
  filteredServicesNameContainer.innerHTML = '';
  filteredServicesName.forEach(service =>
    {
      const serviceElement = document.createElement('div');
      serviceElement.innerHTML +=
      '<div class="bg-gray-200 p-4 rounded">' +
      `<p>Id: ${service.id}</p>` +
      `<p>CreateAt: ${service.createAt}</p>` +
      `<p>UpdateAt: ${service.updatedAt}</p>` +
      `<p>Name: ${service.name}</p>` +
      `<p>Description: ${service.desc}</p>` +
      '</div>';
      filteredServicesNameContainer.appendChild(serviceElement);
    }
  )

  const filteredServicesKeywordContainer = document.getElementById('filteredServicesKeyword');
  filteredServicesKeywordContainer.innerHTML = '';
  filteredServicesKeyword.forEach(service =>
    {
      const serviceElement = document.createElement('div');
      serviceElement.innerHTML +=
      '<div class="bg-gray-200 p-4 rounded">' +
      `<p>Id: ${service.id}</p>` +
      `<p>CreateAt: ${service.createAt}</p>` +
      `<p>UpdateAt: ${service.updatedAt}</p>` +
      `<p>Name: ${service.name}</p>` +
      `<p>Description: ${service.desc}</p>` +
      '</div>';
      filteredServicesKeywordContainer.appendChild(serviceElement);
    }
  )

  const visitingServicesContainer = document.getElementById('visitingServices');
  visitingServicesContainer.innerHTML = '';
  data.visitingServices.forEach(service =>
    {
      const serviceElement = document.createElement('div');
      serviceElement.innerHTML +=
      '<div class="bg-gray-200 p-4 rounded">' +
      `<p>Id: ${service.id}</p>` +
      `<p>CreateAt: ${service.createAt}</p>` +
      `<p>UpdateAt: ${service.updatedAt}</p>` +
      `<p>Name: ${service.name}</p>` +
      `<p>Description: ${service.desc}</p>` +
      '</div>';
      visitingServicesContainer.appendChild(serviceElement);
    }
  )
}

// function getfilteredServicesNameInputValue()
// {
//   const inputElement = document.getElementById('filteredServicesNameSerch').value;
//   return inputElement;
// }

// function getfilteredServicesNameInputValue(data)
// {
//   const filteredServicesName = filterServicesByName(
//     data.visitingServices,
//     inputElement
//   );
//   const visitingServicesContainer = document.getElementById('filteredServicesName');
//     visitingServicesContainer.innerHTML = '';
//     filteredServicesName.forEach(service =>
//       {
//         const serviceElement = document.createElement('div');
//         serviceElement.innerHTML +=
//         '<div class="bg-gray-200 p-4 rounded">' +
//         `<p>Id: ${service.id}</p>` +
//         `<p>CreateAt: ${service.createAt}</p>` +
//         `<p>UpdateAt: ${service.updatedAt}</p>` +
//         `<p>Name: ${service.name}</p>` +
//         `<p>Description: ${service.desc}</p>` +
//         '</div>';
//         visitingServicesContainer.appendChild(serviceElement);
//       }
//     )
// }

/**
 * Challenge 1: name 프로퍼티의 값들만 얻어내기.
 *
 * visitingServices 배열에서, name 프로퍼티 값들만 추출해서 새로운 어레이를 리턴하세요.
 **/
function getServiceNames(visitingServices) {
  const names = [];

  // 답안을 작성하세요
  //  ...
  visitingServices.forEach((element, i) => {
    names[i] = element.name; 
  });
  return names;
}

/**
 * Challenge 2: 가장 최근에 생성된 visitingService 찾기
 *
 * visitingServices 배열에서, createAt 프로퍼티 값을 기준으로, 가장 최근에 생성된 visitingService 객체를 리턴하세요.
 */
function findNewestService(visitingServices) {
  // 답안을 작성하세요
  //  ...
  
  // console.log(visitingServices.map(({createAt}) => createAt).forEach((item) => Date.parse(item)));
  // let create = [];
  // visitingServices.map(({createAt}) => createAt).forEach((item) => create.push(Date.parse(item)));
  // const newest = visitingServices[create.indexOf(Math.max(...create))];
  // return newest;
  return visitingServices.reduce((newest, curr) => {
    return (!newest || Date.parse(curr.createAt) > Date.parse(newest.createAt)) ? curr : newest
  }, null);
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

  if (typeof name === 'string')
    visitingServices.filter((service) => service.name === name).forEach(i => filtered.push(i));
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

  // for (i of visitingServices) {
  //   for (j in i) {
  //     if (typeof i[j] === 'string')
  //       if (i[j].includes(keyword))
  //         searched.push(i)
  //     else
  //       if (i[j].toString().includes(keyword))
  //         searched.push(i);
  //   }
  // }
  visitingServices.filter(i =>
    {
      return Object.values(i).some(j =>
        {
          return (typeof j === 'string' && j.includes(keyword))
          || (typeof j !== 'string' && j.toString().includes(keyword));
        }
      );
    }
  ).forEach(i => searched.push(i));
  return searched;
}